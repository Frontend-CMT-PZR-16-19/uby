import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { PortableText, PortableTextComponents } from 'next-sanity'
import { Clock, Users, Calendar } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-light mt-12 mb-6 text-gray-900 leading-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-light mt-10 mb-5 text-gray-900 leading-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-light mt-8 mb-4 text-gray-900 leading-tight">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-normal mt-6 mb-3 text-gray-900">{children}</h4>,
    normal: ({ children }) => <p className="mb-6 text-gray-700 leading-relaxed text-lg font-light">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-gray-900 pl-8 py-4 my-8 italic text-gray-600 text-xl font-light">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="space-y-3 mb-8 text-gray-700">{children}</ul>,
    number: ({ children }) => <ol className="space-y-3 mb-8 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-6 pl-2 relative before:content-['—'] before:absolute before:-left-6 before:text-gray-400">{children}</li>,
    number: ({ children }) => <li className="ml-6 pl-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || '#'
      return (
        <a 
          href={href}
          className="text-gray-900 underline hover:text-gray-600 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8 max-w-lg mx-auto">
          <Image
            src={value.asset.url}
            alt={value.alt || 'Kurs görseli'}
            width={600}
            height={400}
            className="w-full h-auto rounded-sm shadow-sm"
          />
          {value.alt && (
            <figcaption className="text-center text-xs text-gray-500 mt-3 tracking-wide italic">
              {value.alt}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

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
      content[] {
        ...,
        _type == "image" => {
          ...,
          asset-> {
            url
          }
        }
      },
      courseObjectives,
      modules,
      targetAudience,
      materials,
      support,
      certificationCriteria,
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

async function getRelatedCourses(currentCourseId: string) {
  return await client.fetch(`
    *[_type == "course" && _id != $currentCourseId && isActive == true] | order(publishedAt desc) [0...6] {
      _id,
      title,
      "slug": slug.current,
      description,
      image {
        asset-> {
          url
        }
      },
      category-> {
        title,
        "slug": slug.current
      },
      price,
      duration,
      level
    }
  `, { currentCourseId })
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

  const relatedCourses = await getRelatedCourses(course._id)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            {course.image?.asset?.url && (
              <div className="aspect-[3/2] w-full max-w-2xl mx-auto mb-12 overflow-hidden">
                <Image
                  src={course.image.asset.url}
                  alt={course.title}
                  width={800}
                  height={533}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}
            
            <div className="mb-6">
              <div className="inline-block border border-gray-300 px-4 py-2">
                <span className="text-xs tracking-[0.3em] uppercase text-gray-600">
                  {course.category.title}
                </span>
              </div>
              </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
                {course.title}
              </h1>

            <div className="flex items-center gap-8 mb-12 pb-8 border-b border-gray-200">
              {course.instructor && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">{course.instructor.name}</span>
                </div>
              )}
              {course.duration && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">{course.duration} saat</span>
                </div>
              )}
              {course.level && (
                <div className="text-sm text-gray-600 uppercase tracking-wider">
                  {course.level === 'beginner' && 'Başlangıç'}
                  {course.level === 'intermediate' && 'Orta'}
                  {course.level === 'advanced' && 'İleri'}
                </div>
              )}
            </div>

            <Tabs defaultValue="aciklama" className="mb-16">
              <TabsList>
                <TabsTrigger value="aciklama">Açıklama</TabsTrigger>
                <TabsTrigger value="icerik">Eğitim İçeriği</TabsTrigger>
                <TabsTrigger value="tarihler">Kurs Tarihleri</TabsTrigger>
              </TabsList>

              <TabsContent value="aciklama">
              {course.description && (
                  <div className="mb-12">
                    <p className="text-2xl font-light text-gray-700 leading-relaxed">
                  {course.description}
                </p>
                  </div>
                )}

                {course.content && (
                  <article className="prose prose-lg max-w-none mb-12">
                    <PortableText 
                      value={course.content} 
                      components={portableTextComponents}
                    />
                  </article>
                )}
                
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-gray-200">
                  <div>
                    <div className="text-sm tracking-wider uppercase text-gray-400 mb-2">
                      Seviye
                    </div>
                    <div className="text-lg text-gray-900">
                      {course.level === 'beginner' && 'Başlangıç'}
                      {course.level === 'intermediate' && 'Orta'}
                      {course.level === 'advanced' && 'İleri'}
                      {!course.level && 'Tüm Seviyeler'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm tracking-wider uppercase text-gray-400 mb-2">
                      Süre
                    </div>
                    <div className="text-lg text-gray-900">
                      {course.duration ? `${course.duration} Saat` : 'Esnek'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm tracking-wider uppercase text-gray-400 mb-2">
                      Eğitmen
                    </div>
                    <div className="text-lg text-gray-900">
                      {course.instructor?.name || 'Uzman Kadro'}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="icerik">
                {course.content ? (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Kurs Hakkında Genel Bilgi</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">
                          Bu kurs, {course.title} alanında kapsamlı bir eğitim sunmaktadır. 
                          Teorik bilgilerle birlikte pratik uygulamalara ağırlık verilerek 
                          katılımcıların gerçek projeler üzerinde çalışması sağlanır.
                        </p>
                        <p>
                          {course.description}
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>Kursun Amaçları ve Hedefleri</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-3">
                          {course.courseObjectives && course.courseObjectives.length > 0 ? (
                            course.courseObjectives.map((objective: string, index: number) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>{objective}</span>
                              </li>
                            ))
                          ) : (
                            <>
                              <li className="flex items-start gap-3">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>Katılımcılara {course.title} alanında temel ve ileri düzey bilgiler kazandırmak</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>Sektörde kullanılan güncel teknolojileri ve araçları tanıtmak</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>Gerçek proje deneyimi kazandırmak ve portfolyo oluşturmalarını sağlamak</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>İş hayatında kullanılabilecek pratik beceriler geliştirmek</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>Eğitim Programı İçeriği</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-6">
                          {course.modules && course.modules.length > 0 ? (
                            course.modules.map((module: any, index: number) => (
                              <div key={index}>
                                <h4 className="font-medium text-gray-900 mb-2">{module.title}</h4>
                                <p className="text-sm text-gray-600">{module.description}</p>
                              </div>
                            ))
                          ) : (
                            <>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Modül 1: Temel Kavramlar</h4>
                                <p className="text-sm text-gray-600">
                                  Giriş seviyesi kavramlar, yazılım/araç tanıtımı, temel kullanım teknikleri
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Modül 2: İleri Seviye Uygulamalar</h4>
                                <p className="text-sm text-gray-600">
                                  Profesyonel tekniklerin öğretilmesi, karmaşık projelerde uygulama
                                </p>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 mb-2">Modül 3: Proje Çalışması</h4>
                                <p className="text-sm text-gray-600">
                                  Gerçek bir proje üzerinde çalışma, ekip çalışması, sunum teknikleri
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger>Kimler İçin Uygundur?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">Bu kurs aşağıdaki profildeki katılımcılar için idealdir:</p>
                        <ul className="space-y-3">
                          {course.targetAudience && course.targetAudience.length > 0 ? (
                            course.targetAudience.map((audience: string, index: number) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>{audience}</span>
                              </li>
                            ))
                          ) : (
                            <>
                              <li className="flex items-start gap-3">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>Bu alanda kariyer yapmak isteyen yeni başlayanlar</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>Mevcut becerilerini geliştirmek isteyen profesyoneller</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>Üniversite öğrencileri ve mezunlar</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>Kariyer değişikliği yapmak isteyenler</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger>Eğitim Yöntemi ve Materyaller</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">
                          Eğitimimiz interaktif bir yaklaşımla yürütülür. Teorik derslerin yanı sıra 
                          bol miktarda pratik çalışma ve proje uygulaması yer alır.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                          <div className="border-l-2 border-gray-900 pl-4">
                            <h5 className="font-medium text-gray-900 mb-2">Eğitim Materyalleri</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {course.materials && course.materials.length > 0 ? (
                                course.materials.map((material: string, index: number) => (
                                  <li key={index}>• {material}</li>
                                ))
                              ) : (
                                <>
                                  <li>• Dijital ders notları</li>
                                  <li>• Video kayıtları</li>
                                  <li>• Örnek projeler</li>
                                  <li>• Alıştırma dosyaları</li>
                                </>
                              )}
                            </ul>
                          </div>
                          <div className="border-l-2 border-gray-900 pl-4">
                            <h5 className="font-medium text-gray-900 mb-2">Ek Destekler</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {course.support && course.support.length > 0 ? (
                                course.support.map((item: string, index: number) => (
                                  <li key={index}>• {item}</li>
                                ))
                              ) : (
                                <>
                                  <li>• Online destek forumu</li>
                                  <li>• Eğitmen ile birebir görüşme</li>
                                  <li>• Eğitim sonrası danışmanlık</li>
                                  <li>• Sertifika programı</li>
                                </>
                              )}
                            </ul>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger>Sertifika ve Değerlendirme</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-4">
                          Kursu başarıyla tamamlayan katılımcılara Üçüncü Binyıl Akademi tarafından 
                          onaylanmış katılım sertifikası verilir.
                        </p>
                        <div className="bg-gray-50 border border-gray-200 p-6 mt-4">
                          <h5 className="font-medium text-gray-900 mb-3">Sertifika Alma Kriterleri:</h5>
                          <ul className="space-y-2 text-sm text-gray-600">
                            {course.certificationCriteria && course.certificationCriteria.length > 0 ? (
                              course.certificationCriteria.map((criteria: string, index: number) => (
                                <li key={index}>• {criteria}</li>
                              ))
                            ) : (
                              <>
                                <li>• Minimum %80 devam zorunluluğu</li>
                                <li>• Tüm proje ödevlerinin tamamlanması</li>
                                <li>• Final projesi sunumu</li>
                                <li>• Eğitmen değerlendirmesinde başarılı olmak</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg font-light">
                      Detaylı eğitim içeriği yakında eklenecektir.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tarihler">
                <Tabs defaultValue="kadikoy" className="w-full">
                  <TabsList className="mb-8">
                    <TabsTrigger value="kadikoy">Kadıköy Şubesi</TabsTrigger>
                    <TabsTrigger value="mecidiyekoy">Mecidiyeköy Şubesi</TabsTrigger>
                  </TabsList>

                  <TabsContent value="kadikoy">
                    <div className="space-y-6">
                      <div className="border border-gray-200 p-8 hover:border-gray-900 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div className="text-sm tracking-wider uppercase text-gray-400">
                                Hafta Sonu - Akşam
                              </div>
                            </div>
                            <div className="text-2xl font-light text-gray-900 mb-2">
                              11 Ekim 2025
                            </div>
                            <div className="text-gray-600 mb-3">
                              Cumartesi - Pazar • 19:00 - 22:00
                            </div>
                            <div className="text-sm text-gray-500">
                              📍 Caferağa, Mühürdar Cd. No:50, Kadıköy
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 text-xs tracking-wider uppercase">
                              Müsait
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            12 Kontenjan
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            ₺{course.price ? course.price.toLocaleString('tr-TR') : '0'}
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 p-8 hover:border-gray-900 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div className="text-sm tracking-wider uppercase text-gray-400">
                                Hafta Sonu Programı
                              </div>
                            </div>
                            <div className="text-2xl font-light text-gray-900 mb-2">
                              18 Ekim 2025
                            </div>
                            <div className="text-gray-600 mb-3">
                              Cumartesi - Pazar • 13:00 - 16:00
                            </div>
                            <div className="text-sm text-gray-500">
                              📍 Caferağa, Mühürdar Cd. No:50, Kadıköy
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 text-xs tracking-wider uppercase">
                              Son 5 Kişi
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            10 Kontenjan
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            ₺{course.price ? course.price.toLocaleString('tr-TR') : '0'}
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 p-8 hover:border-gray-900 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div className="text-sm tracking-wider uppercase text-gray-400">
                                Hafta Sonu Programı
                              </div>
                            </div>
                            <div className="text-2xl font-light text-gray-900 mb-2">
                              22 Kasım 2025
                            </div>
                            <div className="text-gray-600 mb-3">
                              Cumartesi - Pazar • 16:00 - 19:00
                            </div>
                            <div className="text-sm text-gray-500">
                              📍 Caferağa, Mühürdar Cd. No:50, Kadıköy
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 text-xs tracking-wider uppercase">
                              Müsait
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            15 Kontenjan
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            ₺{course.price ? course.price.toLocaleString('tr-TR') : '0'}
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 p-8 hover:border-gray-900 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div className="text-sm tracking-wider uppercase text-gray-400">
                                Hafta Sonu - Sabah
                              </div>
                            </div>
                            <div className="text-2xl font-light text-gray-900 mb-2">
                              06 Aralık 2025
                            </div>
                            <div className="text-gray-600 mb-3">
                              Cumartesi - Pazar • 10:00 - 13:00
                            </div>
                            <div className="text-sm text-gray-500">
                              📍 Caferağa, Mühürdar Cd. No:50, Kadıköy
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 text-xs tracking-wider uppercase">
                              Yeni
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            12 Kontenjan
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            ₺{course.price ? course.price.toLocaleString('tr-TR') : '0'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="mecidiyekoy">
                    <div className="space-y-6">
                      <div className="border border-gray-200 p-8 hover:border-gray-900 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div className="text-sm tracking-wider uppercase text-gray-400">
                                Hafta Sonu Programı
                              </div>
                            </div>
                            <div className="text-2xl font-light text-gray-900 mb-2">
                              20 Eylül 2025
                            </div>
                            <div className="text-gray-600 mb-3">
                              Cumartesi - Pazar • 13:00 - 16:00
                            </div>
                            <div className="text-sm text-gray-500">
                              📍 Eski Osmanlı Sk. No:40 Kat:5, Mecidiyeköy
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 text-xs tracking-wider uppercase">
                              Müsait
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            12 Kontenjan
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            ₺{course.price ? course.price.toLocaleString('tr-TR') : '0'}
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 p-8 hover:border-gray-900 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div className="text-sm tracking-wider uppercase text-gray-400">
                                Hafta Sonu - Sabah
                              </div>
                            </div>
                            <div className="text-2xl font-light text-gray-900 mb-2">
                              25 Ekim 2025
                            </div>
                            <div className="text-gray-600 mb-3">
                              Cumartesi - Pazar • 10:00 - 13:00
                            </div>
                            <div className="text-sm text-gray-500">
                              📍 Eski Osmanlı Sk. No:40 Kat:5, Mecidiyeköy
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-block bg-green-100 text-green-800 px-3 py-1 text-xs tracking-wider uppercase">
                              Müsait
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            10 Kontenjan
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            ₺{course.price ? course.price.toLocaleString('tr-TR') : '0'}
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 p-8 hover:border-gray-900 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div className="text-sm tracking-wider uppercase text-gray-400">
                                Hafta Sonu - Akşam
                              </div>
                            </div>
                            <div className="text-2xl font-light text-gray-900 mb-2">
                              25 Ekim 2025
                            </div>
                            <div className="text-gray-600 mb-3">
                              Cumartesi - Pazar • 19:00 - 22:00
                            </div>
                            <div className="text-sm text-gray-500">
                              📍 Eski Osmanlı Sk. No:40 Kat:5, Mecidiyeköy
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 text-xs tracking-wider uppercase">
                              Son 4 Kişi
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            8 Kontenjan
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            ₺{course.price ? course.price.toLocaleString('tr-TR') : '0'}
                          </div>
                        </div>
                      </div>

                      <div className="border border-gray-200 p-8 hover:border-gray-900 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="w-5 h-5 text-gray-400" />
                              <div className="text-sm tracking-wider uppercase text-gray-400">
                                Hafta Sonu Programı
                              </div>
                            </div>
                            <div className="text-2xl font-light text-gray-900 mb-2">
                              29 Kasım 2025
                            </div>
                            <div className="text-gray-600 mb-3">
                              Cumartesi - Pazar • 16:00 - 19:00
                            </div>
                            <div className="text-sm text-gray-500">
                              📍 Eski Osmanlı Sk. No:40 Kat:5, Mecidiyeköy
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 text-xs tracking-wider uppercase">
                              Yeni
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="text-sm text-gray-500">
                            15 Kontenjan
                          </div>
                          <div className="text-lg font-medium text-gray-900">
                            ₺{course.price ? course.price.toLocaleString('tr-TR') : '0'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="text-center pt-12 mt-12 border-t border-gray-200">
                  <p className="text-gray-500 text-sm">
                    Özel grup eğitimleri ve kurumsal anlaşmalar için{' '}
                    <a href="/iletisim" className="text-gray-900 underline hover:text-gray-600">
                      bizimle iletişime geçin
                    </a>
                    .
                  </p>
                </div>
              </TabsContent>
            </Tabs>
              </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 border border-gray-200 p-8">
                <div className="mb-8">
                  <div className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-4">
                    Kayıt
                  </div>
                  <h2 className="text-3xl font-light mb-2">
                    Kursa<br />
                    <span className="font-bold italic">Katılın</span>
                  </h2>
                </div>

                <div className="mb-8 pb-8 border-b border-gray-200">
                  {course.price ? (
                  <div>
                      <div className="text-4xl font-light text-gray-900 mb-1">
                        ₺{course.price.toLocaleString('tr-TR')}
                      </div>
                      <div className="text-sm text-gray-500">Kurs Ücreti</div>
                    </div>
                    ) : (
                    <div>
                      <div className="text-4xl font-light text-green-600 mb-1">
                        Ücretsiz
                      </div>
                      <div className="text-sm text-gray-500">Herkese Açık</div>
                    </div>
                  )}
                </div>

                <form className="space-y-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Ad Soyad *"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="E-posta *"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="tel"
                      placeholder="Telefon *"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>
                  
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Mesajınız (Opsiyonel)"
                      className="w-full px-0 py-3 bg-transparent border-0 border-b border-gray-300 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-4 px-8 hover:bg-gray-800 transition-colors font-medium tracking-wider uppercase text-sm"
                  >
                    Ön Kayıt Yap
                  </button>
                </form>

                <div className="mt-6 text-xs text-gray-500 text-center">
                  Formu göndererek{' '}
                  <a href="#" className="underline">gizlilik politikasını</a>{' '}
                  kabul etmiş olursunuz.
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedCourses && relatedCourses.length > 0 && (
          <div className="mt-32 pt-16 border-t border-gray-200">
            <div className="mb-16">
              <div className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-4">
                İlgili Eğitimler
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
                Diğer<br />
                <span className="font-bold italic">Kurslarımız</span>
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl">
                Tüm kategorilerdeki diğer eğitim programlarımıza göz atın
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedCourses.map((relatedCourse: any) => (
                <Link
                  key={relatedCourse._id}
                  href={`/kurslar/${relatedCourse.category.slug}/${relatedCourse.slug}`}
                  className="group block"
                >
                  {relatedCourse.image?.asset?.url && (
                    <div className="aspect-[3/2] relative overflow-hidden mb-6 max-w-sm mx-auto">
                      <Image
                        src={relatedCourse.image.asset.url}
                        alt={relatedCourse.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  
                  <div className="mb-3">
                    <div className="inline-block border border-gray-300 px-3 py-1">
                      <span className="text-xs tracking-wider uppercase text-gray-600">
                        {relatedCourse.category.title}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-light text-gray-900 mb-3 group-hover:text-gray-600 transition-colors leading-tight">
                    {relatedCourse.title}
                  </h3>
                  
                  <div className="mb-3">
                    <span className="text-sm text-gray-500 font-medium">
                      {relatedCourse.category.title} Kategorisi
                    </span>
                  </div>

                  {relatedCourse.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2 font-light">
                      {relatedCourse.description}
                    </p>
                  )}

                  <div className="flex items-center pt-4 border-t border-gray-200">
                    {relatedCourse.duration && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{relatedCourse.duration} saat</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/kurslar"
                className="inline-flex items-center gap-3 border-b-2 border-gray-900 pb-2 text-gray-900 hover:gap-5 transition-all text-lg"
              >
                <span className="tracking-wider uppercase font-medium">Tüm Kursları Görüntüle</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
