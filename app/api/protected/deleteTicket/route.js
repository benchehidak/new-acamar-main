import clientPromise from "@/lib/mongo/client";
import { NextResponse } from "next/server";
// import { getSession } from "next-auth/react";

export async function POST(req) {
    
    const client = await clientPromise;
    const db = await client.db();
    const Tickets = db.collection('tickets');
    const {ticketId} = await req.json();
    try
    {
        const result = Tickets.deleteOne({uuid: ticketId});
        return NextResponse.json({success: true});

    }
    catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error deleting ticket', success: false });
    }


}