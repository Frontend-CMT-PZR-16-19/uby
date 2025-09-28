import { getAllEvents } from "@/sanity/lib/eventQueries";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const response = await getAllEvents();

    return NextResponse.json({
        data: response
    })
}