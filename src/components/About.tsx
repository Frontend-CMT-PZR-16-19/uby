"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Testimonial } from '@/sanity/lib/testimonialQueries';

export default function About() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials?type=featured');
      const data = await response.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([
        {
          _id: '1',
          name: 'Ahmet Yılmaz',
          role: 'Makine Mühendisi',
          company: 'Bosch',
          course: 'SolidWorks Kursu',
          text: 'Üçüncü Binyıl Akademi\'de aldığım SolidWorks eğitimi sayesinde kariyerimde büyük bir sıçrama yaptım. Eğitmenler son derece bilgili ve deneyimli.',
          year: '2023',
          rating: 5,
          featured: true
        },
        {
          _id: '2',
          name: 'Elif Demir',
          role: 'Mimarlık Öğrencisi',
          company: 'GAD Architecture',
          course: 'AutoCAD Kursu',
          text: 'Hem teorik hem de pratik odaklı eğitim sistemleri sayesinde kısa sürede profesyonel çizimler yapabilir hale geldim. Kesinlikle tavsiye ederim.',
          year: '2023',
          rating: 5,
          featured: true
        },
        {
          _id: '3',
          name: 'Mehmet Kaya',
          role: 'Yazılım Geliştirici',
          company: 'Freelance',
          course: 'Python Programlama',
          text: 'Sıfırdan başladım ve şimdi profesyonel projelerde çalışıyorum. Eğitim sonrası destek de çok faydalı oldu.',
          year: '2024',
          rating: 5,
          featured: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-white">
      <div className="grid lg:grid-cols-2">
        {/* Testimonials Column */}
        <div className="relative h-[600px] lg:h-auto bg-white flex flex-col justify-center p-8 lg:p-12">
          <div className="max-w-lg mx-auto">
            <div className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-6">
              Öğrenci Yorumları
            </div>
            
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight text-gray-900">
              Başarı<br />
              <span className="font-bold italic text-blue-600">Hikayeleri</span>
            </h2>

            {loading ? (
              <div className="space-y-4">
                <div className="animate-pulse bg-gray-200 h-4 rounded"></div>
                <div className="animate-pulse bg-gray-200 h-4 rounded w-3/4"></div>
                <div className="animate-pulse bg-gray-200 h-4 rounded w-1/2"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <div key={testimonial._id} className="border-l-4 border-blue-600 pl-6 py-4">
                    <div className="text-lg font-light text-gray-700 leading-relaxed mb-3">
                      "{testimonial.text}"
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{testimonial.name || 'Anonim'}</div>
                        <div className="text-sm text-gray-500">{testimonial.role || 'Öğrenci'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">{testimonial.course || 'Genel Eğitim'}</div>
                        <div className="text-xs text-gray-400">{testimonial.year || '2024'}</div>
                      </div>
                    </div>
                    {testimonial.rating && (
                      <div className="flex mt-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button 
                onClick={() => window.location.href = "/hakkimizda"} 
                className="inline-flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <span className="tracking-wider uppercase text-sm">Tüm Yorumları Gör</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex flex-col justify-center p-12 lg:p-20 bg-gray-900 text-white">
          <div className="max-w-xl">
            <div className="text-sm tracking-[0.3em] uppercase text-white/60 mb-4">
              Kurumsal
            </div>
            
            <h2 className="text-5xl md:text-6xl font-light mb-8 leading-tight">
              Neden<br />
              <span className="font-bold italic">Üçüncü Binyıl?</span>
            </h2>
            
            <div className="space-y-6 text-lg text-white/80 leading-relaxed font-light mb-12">
              <p>
                <span className="font-bold text-white">2008'den bu yana</span> Türkiye'nin önde gelen 
                eğitim kurumlarından biri olarak, mühendis ve uzman eğitmen kadromuzla 
                CAD/CAM, yazılım, mimari, inşaat, grafik ve bilişim alanlarında 
                profesyonel eğitimler vermekteyiz.
              </p>
              
              <p>
                Güncel müfredatımız ve kaliteli eğitim anlayışımızla öğrencilerimizi 
                sektöre hazırlıyor, iş hayatında başarıya ulaşmalarını sağlıyoruz.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-8 mb-12 pb-12 border-b border-white/20">
              <div>
                <div className="text-3xl font-bold mb-2">Güncel</div>
                <div className="text-sm text-white/70">Müfredat</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Uzman</div>
                <div className="text-sm text-white/70">Eğitmenler</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Sertifikalı</div>
                <div className="text-sm text-white/70">Eğitim</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">Kariyer</div>
                <div className="text-sm text-white/70">Desteği</div>
              </div>
            </div>

            <button 
              onClick={() => window.location.href = "/hakkimizda"} 
              className="inline-flex items-center gap-3 border-b-2 border-white pb-2 hover:gap-5 transition-all"
            >
              <span className="tracking-wider uppercase text-sm">Kurumu Keşfet</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
