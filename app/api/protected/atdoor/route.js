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
    
    if (release == 'one'){
      price = 10;
    }
    else if (release == 'two'){
      price = 20;
    }
    else if (release == 'four'){
      price = 40;
    }


    let result;
    try {
        result = await tickets.insertOne({
            uuid: uuid,
            name: 'At Door',
            email: email || 'At Door' ,
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
