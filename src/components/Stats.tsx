import React from 'react'

export const Stats = () => {
  const stats = [
    {
      value: "15+",
      label: "Yıl",
      description: "Sektör Deneyimi"
    },
    {
      value: "10,000+",
      label: "Mezun",
      description: "Başarılı Kariyer"
    },
    {
      value: "50+",
      label: "Program",
      description: "Eğitim Çeşitliliği"
    },
    {
      value: "%95",
      label: "Memnuniyet",
      description: "Öğrenci Geri Bildirimi"
    }
  ]

  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group"
            >
              <div className="mb-4">
                <div className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm tracking-[0.3em] uppercase text-gray-400 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
              <div className="w-16 h-[1px] bg-gray-200 mx-auto group-hover:w-full group-hover:bg-gray-900 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
