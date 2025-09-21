import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import CourseCard from '@/components/CourseCard'
import { ArrowLeft } from 'lucide-react'

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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/kurslar"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tüm Kurslar
          </Link>
        </div>

        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.title}
          </h1>
          
          {category.description && (
            <p className="text-lg text-gray-600 mb-6">
              {category.description}
            </p>
          )}

          <p className="text-gray-600">
            {courses.length} kurs mevcut
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: any) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bu kategoride henüz kurs yok
            </h3>
            <p className="text-gray-600">
              {category.title} kategorisinde yakında kurslar eklenecek.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
