"use client";

export default function About() {
  return (
     <section className=" relative py-20 bg-oklch-50/10  dark:bg-oklch-900/50">
        <div className="container mx-auto grid grid-cols-2 gap-10 items-center">
            <div className="relative w-full h-[300px] md:h-[400px] lg:h[300px] overflow-hidden rounded-2xl shadow-lg">
                <video 
                src="/Neden-Ucuncu-Binyil-Akademi-_.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                />
            </div>
            <div className="relative flex flex-col space-y-3 ">
                <h3 className="text-4xl font-bold tracking-tight"> Neden <label className="bg-primary p-2">Üçüncü Binyıl</label> ?</h3>
                <p className="text-lg text-white py-5"> 2008’de kurulan Üçüncü Binyıl Akademi, mühendis ve uzman eğitmen kadrosuyla CAD/CAM, yazılım, mimari, inşaat, grafik ve bilişim alanlarında eğitimler vermektedir. Güncel müfredatı ve kaliteli eğitimiyle öğrencilerini sektöre hazırlar, iş hayatında başarıya ulaştırır.</p>
                <button onClick={() => window.location.href = "/hakkimizda"} className="w-[50%] gap-2 flex justify-center bg-primary px-6 py-3 text-white hover:bg-accent/90 transition-colors font-medium shadow-lg shadow-accent/20">
                    Daha Fazla Bilgi
                </button>
            </div>
        </div>
     </section>
    
  )
}
