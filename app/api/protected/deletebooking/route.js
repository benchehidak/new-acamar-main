import clientPromise from "@/lib/mongo/client";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

export async function POST(req) {
    const client = await clientPromise;
    const db = await client.db();
    const booking = db.collection('booking');

    // Get id from body
    const { id } = await req.json();

    try {
        // Find the booking with the id and delete it
        const idbooking = new ObjectId(id);
        const result = await booking.deleteOne({ _id: idbooking });

        if (result.deletedCount === 1) {
            // Return success response if the booking was deleted
            return NextResponse.json({ message: 'Booking deleted successfully', success: true });
        } else {
            // Return error response if the booking was not found
            return NextResponse.json({ error: 'Booking not found', success: false });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error deleting booking', success: false });
    }
}
