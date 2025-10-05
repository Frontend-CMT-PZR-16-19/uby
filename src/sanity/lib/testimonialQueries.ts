import { groq } from 'next-sanity'
import { client } from './client'
import { urlFor } from './image'

export interface Testimonial {
  _id: string
  name: string
  role: string
  company?: string
  course: string
  text: string
  year: string
  rating: number
  featured: boolean
  image?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const query = groq`
    *[_type == "testimonial" && featured == true] | order(_createdAt desc) [0...6] {
      _id,
      name,
      role,
      company,
      course,
      text,
      year,
      rating,
      featured,
      image {
        asset,
        alt
      }
    }
  `
  
  return client.fetch(query)
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const query = groq`
    *[_type == "testimonial"] | order(_createdAt desc) {
      _id,
      name,
      role,
      company,
      course,
      text,
      year,
      rating,
      featured,
      image {
        asset,
        alt
      }
    }
  `
  
  return client.fetch(query)
}

export async function getTestimonialsByCourse(courseName: string): Promise<Testimonial[]> {
  const query = groq`
    *[_type == "testimonial" && course match "*${courseName}*"] | order(_createdAt desc) {
      _id,
      name,
      role,
      company,
      course,
      text,
      year,
      rating,
      featured,
      image {
        asset,
        alt
      }
    }
  `
  
  return client.fetch(query)
}

export function getTestimonialImageUrl(testimonial: Testimonial): string | null {
  if (!testimonial.image?.asset) return null
  return urlFor(testimonial.image).width(200).height(200).url()
}
