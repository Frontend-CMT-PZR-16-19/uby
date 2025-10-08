import { NextResponse } from "next/server";
import { getPostBySlug } from "@/sanity/lib/blogQueries";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    console.log("API: Fetching post by slug:", params.slug);
    
    const post = await getPostBySlug(params.slug);
    
    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }
    
    console.log("API: Post found:", post.title);
    
    return NextResponse.json({
      message: "Post fetched successfully",
      post: post,
    });
  } catch (error) {
    console.error("API Error fetching post:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}