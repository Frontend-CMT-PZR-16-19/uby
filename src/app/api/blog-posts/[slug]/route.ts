import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { groq } from 'next-sanity'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const resolvedParams = await params
    const slug = resolvedParams.slug

    const query = groq`
      *[_type == "blogPost" && (slug.current == $slug || _id == $slug)] [0] {
        _id,
        title,
        "slug": slug.current,
        content,
        excerpt,
        author-> {
          name,
          image {
            asset-> {
              url
            }
          }
        },
        publishedAt,
        category,
        featured,
        image {
          asset-> {
            url
          },
          alt
        }
      }
    `

    const post = await client.fetch(query, { slug })

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    )
  }
}

