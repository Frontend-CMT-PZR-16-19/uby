"use client";

import React, { useState, useEffect } from 'react'
import { Testimonial, getTestimonialImageUrl } from '@/sanity/lib/testimonialQueries'
import Image from 'next/image'

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      const data = await response.json()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials([
        {
          _id: '1',
          name: "Ahmet Yılmaz",
          role: "Makine Mühendisi",
          company: "Bosch",
          course: "SolidWorks Kursu",
          text: "Üçüncü Binyıl Akademi'de aldığım SolidWorks eğitimi sayesinde kariyerimde büyük bir sıçrama yaptım. Eğitmenler son derece bilgili ve deneyimli.",
          year: "2023",
          rating: 5,
          featured: true
        },
        {
          _id: '2',
          name: "Elif Demir",
          role: "Mimarlık Öğrencisi",
          company: "GAD Architecture",
          course: "AutoCAD Kursu",
          text: "Hem teorik hem de pratik odaklı eğitim sistemleri sayesinde kısa sürede profesyonel çizimler yapabilir hale geldim. Kesinlikle tavsiye ederim.",
          year: "2023",
          rating: 5,
          featured: true
        },
        {
          _id: '3',
          name: "Mehmet Kaya",
          role: "Yazılım Geliştirici",
          company: "Freelance",
          course: "Python Programlama",
          text: "Sıfırdan başladım ve şimdi profesyonel projelerde çalışıyorum. Eğitim sonrası destek de çok faydalı oldu.",
          year: "2024",
          rating: 5,
          featured: true
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-1 bg-white">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-12 min-h-[500px] flex flex-col justify-between">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-8"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <div className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-2">Başarı Hikayeleri</div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 max-w-3xl">
            Mezunlarımızın<br />
            <span className="font-bold italic">Sözleri</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-1 bg-white">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial._id}
              className="bg-white p-12 hover:bg-gray-900 hover:text-white transition-all duration-500 group min-h-[500px] flex flex-col justify-between"
            >
              <div>
                <div className="text-6xl font-serif mb-8 text-gray-200 group-hover:text-white/20">"</div>
                
                <p className="text-lg leading-relaxed mb-8">
                  {testimonial.text}
                </p>

                {testimonial.rating && (
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 group-hover:border-white/20 pt-6">
                <div className="text-sm tracking-widest uppercase text-gray-400 group-hover:text-white/60 mb-2">
                  {testimonial.course || 'Genel Eğitim'}
                </div>
                <div className="font-bold text-xl mb-1">
                  {testimonial.name || 'Anonim'}
                </div>
                <div className="text-gray-600 group-hover:text-white/70">
                  {testimonial.role || 'Öğrenci'}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-white/50 mt-1">
                  {testimonial.company && `${testimonial.company} · `}{testimonial.year || '2024'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
