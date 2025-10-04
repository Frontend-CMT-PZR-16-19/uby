import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ArrowLeft, BookOpen, Users, Clock, Award } from 'lucide-react'
import Image from 'next/image'

interface PageProps {
  params: Promise<{ kategori: string }>
}

async function getCategory(slug: string) {
  return await client.fetch(`
    *[_type == "courseCategory" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description
    }
  `, { slug })
}

async function getCoursesByCategory(categoryId: string) {
  return await client.fetch(`
    *[_type == "course" && category._ref == $categoryId && isActive == true] | order(publishedAt desc) {
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
  `, { categoryId })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori } = await params
  const category = await getCategory(kategori)
  
  if (!category) {
    return {
      title: 'Kategori Bulunamadı | UBY'
    }
  }

  return {
    title: `${category.title} | UBY`,
    description: category.description || `${category.title} kursları`,
  }
}

export default async function KategoriPage({ params }: PageProps) {
  const { kategori } = await params
  const category = await getCategory(kategori)
  
  if (!category) {
    notFound()
  }

  const courses = await getCoursesByCategory(category._id)

  return (
    <div className="min-h-screen ">
      
      <div className="container mx-auto px-6 py-16">
                {courses.length > 0 ? (
          <div>
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

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <Link
                        href={`/kurslar/${category.slug.current}/${course.slug.current}`}
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
                Bu Kategoride Henüz Kurs Yok
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {category.title} kategorisinde yakında harika kurslar eklenecek.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}