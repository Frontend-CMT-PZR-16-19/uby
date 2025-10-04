"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

type Course = {
  _id: string
  title: string
  slug: { current: string } | string
  description: string
  category: {
    title: string
    slug: { current: string } | string
  }
  image?: {
    asset: {
      url: string
    }
  }
  price?: number
  duration?: number
  level?: string
}

export const FeaturedCourses = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/kurslar')
        const data = await response.json()
        const coursesData = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
        setCourses(coursesData.slice(0, 3))
      } catch (error) {
        console.error('Kurslar yüklenemedi:', error)
        setCourses([])
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) {
    return (
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400">Yükleniyor...</div>
        </div>
      </section>
    )
  }

  if (!Array.isArray(courses) || courses.length === 0) return null

  const featuredCourse = courses[0]
  const secondaryCourses = courses.slice(1)

  const getCourseUrl = (course: Course) => {
    const courseSlug = typeof course.slug === 'string' ? course.slug : course.slug.current
    const categorySlug = typeof course.category.slug === 'string' ? course.category.slug : course.category.slug.current
    return `/kurslar/${categorySlug}/${courseSlug}`
  }

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-16 border-b border-gray-200 pb-8">
          <div>
            <div className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-2">Editör Seçimi</div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900">
              Öne Çıkan<br />
              <span className="font-bold italic">Kurslar</span>
            </h2>
          </div>
          <Link 
            href="/kurslar"
            className="hidden md:flex items-center gap-2 text-gray-900 hover:gap-4 transition-all group"
          >
            <span className="text-sm tracking-wider uppercase">Tümünü Gör</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Featured Large Card */}
          <Link
            href={getCourseUrl(featuredCourse)}
            className="group relative h-[700px] overflow-hidden bg-gray-900"
          >
            {featuredCourse.image?.asset?.url && (
              <Image
                src={featuredCourse.image.asset.url}
                alt={featuredCourse.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
            
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="inline-block self-start border border-white/50 px-4 py-2 backdrop-blur-sm">
                <span className="text-white text-xs tracking-widest uppercase">
                  {featuredCourse.category.title}
                </span>
              </div>
              
              <div className="text-white">
                <h3 className="text-4xl lg:text-5xl font-light mb-4 leading-tight">
                  {featuredCourse.title}
                </h3>
                <p className="text-white/80 text-lg mb-6 line-clamp-2">
                  {featuredCourse.description}
                </p>
                <div className="flex items-center gap-4">
                  {featuredCourse.price && (
                    <span className="text-2xl font-bold">
                      ₺{featuredCourse.price.toLocaleString('tr-TR')}
                    </span>
                  )}
                  <div className="flex items-center gap-2 group-hover:gap-3 transition-all">
                    <span className="text-sm tracking-wider uppercase">Detayları İncele</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Secondary Cards */}
          <div className="flex flex-col gap-8">
            {secondaryCourses.map((course) => (
              <Link
                key={course._id}
                href={getCourseUrl(course)}
                className="group relative h-[346px] overflow-hidden bg-gray-900"
              >
                {course.image?.asset?.url && (
                  <Image
                    src={course.image.asset.url}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="inline-block self-start border border-white/50 px-3 py-1 backdrop-blur-sm">
                    <span className="text-white text-xs tracking-widest uppercase">
                      {course.category.title}
                    </span>
                  </div>
                  
                  <div className="text-white">
                    <h3 className="text-2xl lg:text-3xl font-light mb-3 leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      {course.price && (
                        <span className="text-xl font-bold">
                          ₺{course.price.toLocaleString('tr-TR')}
                        </span>
                      )}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/kurslar"
            className="inline-flex items-center gap-3 border-b-2 border-gray-900 pb-2 text-gray-900 hover:gap-5 transition-all text-lg"
          >
            <span className="tracking-wider uppercase font-medium">Tüm Kursları Keşfet</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </section>
  )
}
