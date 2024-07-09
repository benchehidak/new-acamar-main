import clientPromise from "@/lib/mongo/client";
import { NextResponse } from "next/server";

export async function POST(req) {

        const client = await clientPromise;
        const db = await client.db();
        const tickets = db.collection('tickets');
        const result = await tickets.find({}).toArray();
        return NextResponse.json(result);

}