// import clientPromise from "@/lib/mongo/client";
// import { NextResponse } from "next/server";
// import { getSession } from "next-auth/react";

// export async function POST(req) {
    
//     const client = await clientPromise;
//     const db = await client.db();
//     const tickets = db.collection('booking');
//     const result = await tickets.find({}).toArray();
//     return NextResponse.json(result);

// }
import clientPromise from "@/lib/mongo/client";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function POST(req) {
    const client = await clientPromise;
    const db = await client.db();
    const tickets = db.collection('booking');
    
    // Sort the bookings by status in ascending order
    const result = await tickets.find({}).sort({ status: 1 }).toArray();
    
    return NextResponse.json(result);
}
