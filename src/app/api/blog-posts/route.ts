import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    let query
    let posts

    if (type === 'blog') {
      query = groq`
        *[_type == "blogPost" && category == "blog"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          content,
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
          image {
            asset-> {
              url
            },
            alt
          },
          featured
        }
      `
    } else if (type === 'news') {
      query = groq`
        *[_type == "blogPost" && category == "news"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          content,
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
          image {
            asset-> {
              url
            },
            alt
          },
          featured
        }
      `
    } else {
      query = groq`
        *[_type == "blogPost"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          content,
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
          image {
            asset-> {
              url
            },
            alt
          },
          featured
        }
      `
    }

    posts = await client.fetch(query)
    
    console.log(`Fetched ${posts?.length || 0} posts for type: ${type}`)
    console.log('Sample post:', posts?.[0])

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
