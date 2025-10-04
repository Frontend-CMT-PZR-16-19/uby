"use client";

import Image from 'next/image';

export default function About() {
  return (
    <section className="relative bg-white">
      <div className="grid lg:grid-cols-2">
        {/* Video/Image Column */}
        <div className="relative h-[600px] lg:h-auto bg-gray-100 flex items-center justify-center">
          <Image
            src="/sembol.png"
            alt="Üçüncü Binyıl Akademi Logo"
            width={500}
            height={500}
            className="w-full h-full max-w-lg max-h-lg object-contain"
          />
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
