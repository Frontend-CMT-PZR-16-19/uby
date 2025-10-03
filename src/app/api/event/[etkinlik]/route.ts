import { NextRequest, NextResponse } from "next/server";
import { getEventBySlug } from "@/sanity/lib/eventQueries";

export async function GET(
  request: NextRequest,
  { params }: { params: { etkinlik: string } }
) {
  try {
    const slug = params.etkinlik;
    console.log("API: Fetching event with slug:", slug); // Debug için
    
    const event = await getEventBySlug(slug);
    console.log("API: Event found:", event ? "Yes" : "No"); // Debug için

    if (!event) {
      return NextResponse.json(
        { message: "Event not found", slug: slug },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Event fetched successfully",
      data: event,
    });
  } catch (error) {
    console.error("API Error fetching event:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}