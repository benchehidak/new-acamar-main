import clientPromise from "@/lib/mongo/client";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

export async function POST(req) {
    
    const client = await clientPromise;
    const db = await client.db();
    const booking = db.collection('booking');
    //get id from body
    const {id} = await req.json();
    //update status to contacted
    try {
        //find the booking with the id
        const idbooking = new ObjectId(id);
        const result = await booking.updateOne({_id: idbooking}, {$set: {status: 'Sold'}});        
        return NextResponse.json(result);
    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error updating booking' });
    }

}