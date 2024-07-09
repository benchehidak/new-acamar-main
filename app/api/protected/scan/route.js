import clientPromise from "@/lib/mongo/client";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

export async function POST(req) {
    
    const client = await clientPromise;
    const db = await client.db();
    const tickets = db.collection('tickets');
    //get id from body
    const {ticketid} = await req.json();
    //update status to contacted
    try {

        const result = await tickets.findOneAndUpdate({uuid: ticketid}, {$set: {status: 'scanned'}});
        if(result.value === null){
            return NextResponse.json({ success: false, message: 'Ticket not found'});
        }
        else if(result.value.status === 'scanned'){
            return NextResponse.json({ success: false, message: 'Ticket already scanned'});
        }
        return NextResponse.json({ success: true, message: 'Ticket scanned' });

    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ message: error.toString() });
    }

}