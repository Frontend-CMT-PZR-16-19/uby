import { NextRequest, NextResponse } from 'next/server'
import { getFeaturedTestimonials, getAllTestimonials } from '@/sanity/lib/testimonialQueries'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    let testimonials

    if (type === 'featured') {
      testimonials = await getFeaturedTestimonials()
    } else {
      testimonials = await getAllTestimonials()
    }

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    )
  }
}
