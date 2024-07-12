import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import QRCode from 'qrcode';
import { NextResponse } from 'next/server';
import path from 'path';
import clientPromise from '@/lib/mongo/client';
import nodemailer from 'nodemailer';

export async function POST(req) {
  // Generate a UUID
  const uuid = uuidv4();
  const client = await clientPromise;
    const db = await client.db();
    const tickets = db.collection('tickets');
    // const bookings = db.collection('booking');
    let price = 20;
    const {name , email, phoneNumber, seller} = await req.json();
    // const bookingEmail = await bookings.findOne({email: email});
    // console.log(bookingEmail);
    // if (bookingEmail && Boolean(!bookingEmail.date)){
    //   price = 20;
    // }
    let result;
    try {
        result = await tickets.insertOne({
            uuid: uuid,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            seller: seller,
            status: 'pending',
            price: price,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating ticket' });  
    }

  try {
    // Generate QR code
    const qrCode = await QRCode.toDataURL(uuid);

    // Convert data URL to buffer
    const dataBuffer = Buffer.from(qrCode.split(',')[1], 'base64');

    // Generate file path
    const filePath = path.join(process.cwd(), 'public', 'qrcodes', `${uuid}.png`);
    console.log(filePath);

    // Save buffer to file
    fs.writeFileSync(filePath, dataBuffer);

    // Return the file path as a response
    // return NextResponse.json({ 'Path' : filePath });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error generating QR code' });
  }
  if(email){
    try {
      //sned mail with nodemailer
      const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',//'mail.gaviota.com.tn',
        port: 587,//465,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'acamar.org@gmail.com',//'no-reply@gaviota.com.tn', // your email address
          pass: process.env.GOOGLE_EMAIL //'Dalibendhiab@10' // your email password
        }
  
      })
      const mailOptions = {
          from: 'acamar.org@gmail.com',
          to: email ,
          subject: `Your Pass for ACAMAR ${uuid.split('-')[0]}`,
          html: `
          <html>
            <head>
              <style>
              body {
                color: white;
                font-family: sans-serif;
              }
              .letter {
                background-image: url("https://i.imgur.com/gnIPw0k.png");
                background-size: cover;
                padding: 50px;
                color: white;
              }
              li {
                list-style-type: none;
              }
  
            </style>
            </head>
            <body class="letter">
            <h1>Your ACAMAR Event Ticket and QR Code</h1>
              <h1>Dear ${name},</h1>
              <p>Thank you for purchasing a ticket to attend ACAMAR on November 04, 2023, Sousse. Attached to this email, you will find your personalized ticket with a unique QR code.</p>
              <h2>Instructions:</h2>
              <ol>
                  <li>Keep a digital or printed copy of this email with your ticket and QR code.</li>
                  <li>Present your QR code at the entrance for scanning.</li>
                  <li>Each ticket is unique and can only be used once.</li>
              </ol>
              
              <h2>Important Reminders:</h2>
              <ul>
                  <li>PLEASE BRING YOUR ID.</li>
                  <li>Arrive on time to ensure a smooth check-in process.</li>
                  <li>Keep your QR code safe for the duration of the event.</li>
                  <li>Tickets are non-transferable and duplicating them is prohibited.</li>
                  <li>For assistance, contact our support team at acamar.org@gmail.com .</li>
              </ul>
              <p>We look forward to welcoming you to ACAMAR!</p>
              <p>Best regards,<br>
              ACAMAR</p>
              <p>Here is your ticket : </p>
              <img src="cid:qrcode" alt="QR Code" />
            </body>
          </html>
          `,
          attachments: [{
              filename: `${uuid}.png`,
              path: path.join(process.cwd(), 'public', 'qrcodes', `${uuid}.png`),
              cid: 'qrcode'
          }]
          };
        
      transporter.sendMail(mailOptions, function(error, info){
          if (error) {
          console.log(error);
          }
          else {
          console.log('Email sent: ' + info.response);
          }
      });
      
      
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Error sending email' });
    }
  }
    return NextResponse.json({ message: 'Ticket created successfully', ticketid: uuid });
}
