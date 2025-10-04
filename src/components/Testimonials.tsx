import React from 'react'

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "Makine Mühendisi",
      company: "Bosch",
      course: "SolidWorks Kursu",
      text: "Üçüncü Binyıl Akademi'de aldığım SolidWorks eğitimi sayesinde kariyerimde büyük bir sıçrama yaptım. Eğitmenler son derece bilgili ve deneyimli.",
      year: "2023"
    },
    {
      name: "Elif Demir",
      role: "Mimarlık Öğrencisi",
      company: "GAD Architecture",
      course: "AutoCAD Kursu",
      text: "Hem teorik hem de pratik odaklı eğitim sistemleri sayesinde kısa sürede profesyonel çizimler yapabilir hale geldim. Kesinlikle tavsiye ederim.",
      year: "2023"
    },
    {
      name: "Mehmet Kaya",
      role: "Yazılım Geliştirici",
      company: "Freelance",
      course: "Python Programlama",
      text: "Sıfırdan başladım ve şimdi profesyonel projelerde çalışıyorum. Eğitim sonrası destek de çok faydalı oldu.",
      year: "2024"
    }
  ]

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
              key={index}
              className="bg-white p-12 hover:bg-gray-900 hover:text-white transition-all duration-500 group min-h-[500px] flex flex-col justify-between"
            >
              <div>
                <div className="text-6xl font-serif mb-8 text-gray-200 group-hover:text-white/20">"</div>
                
                <p className="text-lg leading-relaxed mb-8">
                  {testimonial.text}
                </p>
              </div>

              <div className="border-t border-gray-200 group-hover:border-white/20 pt-6">
                <div className="text-sm tracking-widest uppercase text-gray-400 group-hover:text-white/60 mb-2">
                  {testimonial.course}
                </div>
                <div className="font-bold text-xl mb-1">
                  {testimonial.name}
                </div>
                <div className="text-gray-600 group-hover:text-white/70">
                  {testimonial.role}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-white/50 mt-1">
                  {testimonial.company} · {testimonial.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
