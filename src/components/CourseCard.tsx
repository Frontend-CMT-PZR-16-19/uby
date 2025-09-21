import Image from 'next/image'
import Link from 'next/link'
import { Users, Star, BookOpen } from 'lucide-react'

interface Course {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  image?: {
    asset: {
      url: string
    }
  }
  category: {
    title: string
    slug: { current: string }
    color?: string
  }
  price?: number
  duration?: number
  level?: 'beginner' | 'intermediate' | 'advanced'
  instructor?: {
    name: string
  }
}

interface CourseCardProps {
  course: Course
}


export default function CourseCard({ course }: CourseCardProps) {
  const categoryColors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500'
  }

  const categoryColor = course.category.color ? categoryColors[course.category.color as keyof typeof categoryColors] : 'bg-blue-500'

  return (
    <Link
      href={`/kurslar/${course.category.slug.current}/${course.slug.current}`}
      className="block group"
    >
      <article className="bg-white dark:bg-gray-900 overflow-hidden">
        {/* Ana Görsel Alan */}
        <div className="relative h-64 overflow-hidden">
          {course.image?.asset?.url ? (
            <Image
              src={course.image.asset.url}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-gray-400" />
            </div>
          )}
        </div>

        {/* İçerik Alanı */}
        <div className="pt-3 pb-6">
          {/* Başlık */}
          <h3 className="text-lg font-bold text-black dark:text-white mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {course.title}
          </h3>
          
          {/* Açıklama */}
          {course.description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed font-light">
              {course.description}
            </p>
          )}

          {/* Meta Bilgiler */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            {course.instructor && (
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{course.instructor.name}</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}
