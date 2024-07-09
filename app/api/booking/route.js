// pages/api/book-tickets.js
// import { MongoClient } from 'mongodb';
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongo/client";

export async function POST(req) {

    const { name, email, phoneNumber, numTickets, birthDate } = await req.json();
    try {
    const client = await clientPromise;
    const db = await client.db();
    const ticketsCollection = await db.collection('booking');

    const ticket = {
      name,
      email,
      phoneNumber,
      birthDate,
      numTickets,
      status: 'pending',
      date: new Date(),
    };
    const result = await ticketsCollection.insertOne(ticket);
    return NextResponse.json({
      success: true,
      message: 'Ticket booking successful!',
      ticketId: result.insertedId,
    });
  } catch (error) {
    console.error('Error booking tickets:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal Server Error',
    });
  }


    // try {
    //   // Connect to MongoDB
    //   const client = await MongoClient.connect('mongodb://0.0.0.0:27017/test', {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   });

    //   // Access the tickets collection
    //   const db = client.db();
    
    //   const ticketsCollection = db.collection('booking');

    //   // Create a new ticket document
    //   const ticket = {
    //     name,
    //     email,
    //     phoneNumber,
    //     numTickets,
    //   };

    //   // Insert the ticket into the collection
    //   const result = await ticketsCollection.insertOne(ticket);

    //   // Close the MongoDB connection
    //   client.close();

    //   // Return a response indicating the successful booking
    //   return NextResponse.json({
    //     success: true,
    //     message: 'Ticket booking successful!',
    //     ticketId: result.insertedId,
    //   });
    // } catch (error) {
    //   console.error('Error booking tickets:', error);
    //   return NextResponse.json({ 
    //     success: false,
    //     message: 'Internal Server Error' });
    // }

};

