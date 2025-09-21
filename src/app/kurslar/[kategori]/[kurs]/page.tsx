import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { PortableText } from 'next-sanity'
import { Clock, Users, ArrowLeft } from 'lucide-react'

interface PageProps {
  params: Promise<{ kategori: string; kurs: string }>
}

async function getCourse(categorySlug: string, courseSlug: string) {
  return await client.fetch(`
    *[_type == "course" && slug.current == $courseSlug && category->slug.current == $categorySlug][0] {
      _id,
      title,
      slug,
      description,
      content,
      image {
        asset-> {
          url
        }
      },
      category-> {
        title,
        slug
      },
      price,
      duration,
      level,
      instructor-> {
        name
      },
      isActive
    }
  `, { categorySlug, courseSlug })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kategori, kurs } = await params
  const course = await getCourse(kategori, kurs)
  
  if (!course) {
    return {
      title: 'Kurs Bulunamadı | UBY'
    }
  }

  return {
    title: `${course.title} | UBY`,
    description: course.description || `${course.title} kursu`,
  }
}

export default async function KursDetayPage({ params }: PageProps) {
  const { kategori, kurs } = await params
  const course = await getCourse(kategori, kurs)
  
  if (!course || !course.isActive) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/kurslar"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kurslara Dön
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {course.image?.asset?.url && (
              <div className="aspect-video w-full">
                <Image
                  src={course.image.asset.url}
                  alt={course.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-8">
              <div className="mb-4">
                <span className="text-sm text-gray-600 font-medium">
                  {course.category.title}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              {course.description && (
                <p className="text-lg text-gray-700 mb-6">
                  {course.description}
                </p>
              )}

              <div className="flex items-center gap-6 mb-8 text-sm text-gray-600">
                {course.instructor && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{course.instructor.name}</span>
                  </div>
                )}
                
                {course.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration} saat</span>
                  </div>
                )}
              </div>

              {course.content && (
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="text-gray-900 [&>*]:text-gray-900 [&_p]:text-gray-900 [&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900 [&_h4]:text-gray-900 [&_h5]:text-gray-900 [&_h6]:text-gray-900 [&_li]:text-gray-900 [&_span]:text-gray-900">
                    <PortableText value={course.content} />
                  </div>
                </div>
              )}

              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    {course.price ? (
                      <span className="text-2xl font-bold text-gray-900">
                        ₺{course.price.toLocaleString('tr-TR')}
                      </span>
                    ) : (
                      <span className="text-2xl font-bold text-green-600">
                        Ücretsiz
                      </span>
                    )}
                  </div>
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors">
                    Kursa Başla
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
