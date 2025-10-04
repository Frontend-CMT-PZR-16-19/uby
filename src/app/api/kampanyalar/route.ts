import { NextResponse } from "next/server";
import { getAllCampaigns } from "@/sanity/lib/campaignQueries";

export async function GET() {
  try {
    console.log("API: Fetching all campaigns"); // Debug için
    
    const campaigns = await getAllCampaigns();
    console.log("API: Campaigns found:", campaigns?.length || 0); // Debug için
    
    return NextResponse.json({
      message: "Campaigns fetched successfully",
      data: campaigns || [],
    });
  } catch (error) {
    console.error("API Error fetching campaigns:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}