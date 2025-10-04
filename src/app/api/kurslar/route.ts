import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: NextRequest){
    try {
        const courses = await client.fetch(`
            *[_type == "course" && isActive == true] | order(publishedAt desc) {
                _id,
                title,
                "slug": slug,
                description,
                image {
                    asset-> {
                        url
                    }
                },
                category-> {
                    title,
                    "slug": slug
                },
                price,
                duration,
                level,
                isActive
            }
        `);

        return NextResponse.json({
            data: courses,
            message: "Kurslar başarıyla getirildi",
        });
    } catch (error) {
        console.error("Kurslar getirilirken hata:", error);
        return NextResponse.json({
            data: [],
            message: "Kurslar getirilemedi",
            error: error instanceof Error ? error.message : "Bilinmeyen hata"
        }, { status: 500 });
    }
}