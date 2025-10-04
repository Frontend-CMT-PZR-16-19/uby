import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { BookOpen, Users, Clock, Award } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kurslar | UBY',
  description: 'Kurslarımızı keşfedin.',
}

async function getCourses() {
  return await client.fetch(`
    *[_type == "course" && isActive == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      description,
      image {
        asset-> {
          url
        }
      },
      category-> {
        title,
        slug,
        color
      },
      price,
      duration,
      level,
      instructor-> {
        name
      }
    }
  `)
}

async function getCategories() {
  return await client.fetch(`
    *[_type == "courseCategory"] | order(order asc) {
      _id,
      title,
      slug
    }
  `)
}

export default async function KurslarPage() {
  const [courses, categories] = await Promise.all([
    getCourses(),
    getCategories()
  ])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16">
        {categories.length > 0 && (
          <div className="mb-16">
            <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
              <Link
                href="/kurslar"
                className="group relative bg-white px-8 py-4 text-gray-700 font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Tüm Kurslar
                </span>
              </Link>
              {categories.map((category: any) => (
                <Link
                  key={category._id}
                  href={`/kurslar/${category.slug.current}`}
                  className="group relative bg-white px-8 py-4 text-gray-700 font-medium shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    {category.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {courses.length > 0 ? (
          <div>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
              Popüler Kurslar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {courses.map((course: any) => (
                <div key={course._id} className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  
                  {course.image?.asset?.url && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={course.image.asset.url}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {course.category && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-white px-3 py-1 text-sm font-medium">
                            {course.category.title}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Course Info */}
                    <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration || '8'} saat</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span className="capitalize">{course.level || 'Başlangıç'}</span>
                      </div>
                    </div>

                    {course.instructor && (
                      <div className="mb-4 text-sm text-gray-600">
                        <span className="font-medium">Eğitmen: </span>
                        {course.instructor.name}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-2xl font-bold text-primary">
                        {course.price ? `₺${course.price}` : 'Ücretsiz'}
                      </div>
                      <Link
                        href={course.category?.slug?.current 
                          ? `/kurslar/${course.category.slug.current}/${course.slug.current}` 
                          : `/kurslar/${course.slug.current}`
                        }
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 font-medium transition-colors duration-300"
                      >
                        Detaylar
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-blue-600 mx-auto mb-8 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Kurslar Çok Yakında!
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Harika kurslarımız hazırlanıyor. En güncel kurslar için bizi takip etmeye devam edin.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}