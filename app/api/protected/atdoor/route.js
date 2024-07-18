import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongo/client';

export async function POST(req) {
    // Generate a UUID
    const uuid = uuidv4();
    const client = await clientPromise;
    const db = await client.db();
    const tickets = db.collection('tickets');
    
    let price = 20;
    const {email, seller,release} = await req.json();

    switch (release) {
        case '1':
            price = 10;
            break;
        case '2':
            price = 20;
            break;
        case '3':
            price = 30;
            break;
        case '4x1':
            price = 40;
            break;
        case '4x2':
            price = 80;
            break;
        case '8x1':
            price = 80;
            break;
        case '8x2':
            price = 160;
            break;

        default:
            price = 20;
    }

    let result;
    try {
        result = await tickets.insertOne({
            uuid: uuid,
            name: 'At Door',
            email:  'At Door' ,
            phoneNumber: '0',
            seller: seller,
            status: 'scanned',
            price: price,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        console.log(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating ticket' });  
    }

    return NextResponse.json({ message: 'Ticket created successfully', ticketid: uuid });
}
