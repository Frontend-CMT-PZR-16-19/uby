import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import CourseCard from '@/components/CourseCard'

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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Kurslar
          </h1>
          <p className="text-gray-600">
            Tüm kurslarımızı burada bulabilirsiniz
          </p>
        </div>

        {categories.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category: any) => (
                <a
                  key={category._id}
                  href={`/kurslar/${category.slug.current}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {category.title}
                </a>
              ))}
            </div>
          </div>
        )}

        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course: any) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Henüz kurs bulunmuyor
            </h3>
            <p className="text-gray-600">
              Yakında yeni kurslar eklenecek.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
