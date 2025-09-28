import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    return NextResponse.json({
        data: "Merhaba",
        message: "Tahsin Cozurttu",
      });
}