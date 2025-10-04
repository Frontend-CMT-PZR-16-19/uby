import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const Hero = () => {
    return (
        <section className="relative h-screen min-h-[800px] overflow-hidden">
            <Image
                src="/walpapers.jpg"
                alt="Üçüncü binyıl hero image"
                fill
                priority
                className="object-cover object-center z-0 scale-105"
            />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-between py-20">
                <div className="text-white/80 text-sm tracking-[0.3em] uppercase font-light">
                    Est. 2008
                </div>
                
                <div className="max-w-5xl">
                    <div className="mb-8">
                        <div className="inline-block border border-white/30 px-6 py-2 mb-6 backdrop-blur-sm">
                            <span className="text-white/90 text-sm tracking-wider uppercase font-light">
                                Profesyonel Eğitim
                            </span>
                        </div>
                    </div>
                    
                    <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-light tracking-tight mb-8 leading-[0.95]">
                        Geleceğini<br />
                        <span className="font-bold italic">İnşa Et</span>
                    </h1>
                    
                    <div className="max-w-2xl mb-12">
                        <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light">
                            CAD/CAM, yazılım ve mühendislik alanlarında 15 yılı aşkın deneyimimizle 
                            kariyerinizi şekillendiriyoruz.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6">
                        <Link 
                            href="/kurslar"
                            className="group inline-flex items-center justify-between px-10 py-5 bg-white text-gray-900 font-medium text-lg hover:bg-gray-900 hover:text-white transition-all duration-500 border border-white"
                        >
                            <span>Kursları Keşfet</span>
                            <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                        <Link 
                            href="/iletisim"
                            className="group inline-flex items-center justify-between px-10 py-5 bg-transparent border border-white text-white font-medium text-lg hover:bg-white hover:text-gray-900 transition-all duration-500"
                        >
                            <span>İletişim</span>
                            <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-8 max-w-3xl text-white">
                    <div>
                        <div className="text-4xl font-bold mb-2">15+</div>
                        <div className="text-sm text-white/70 uppercase tracking-wider">Yıl Deneyim</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">10K+</div>
                        <div className="text-sm text-white/70 uppercase tracking-wider">Mezun</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold mb-2">50+</div>
                        <div className="text-sm text-white/70 uppercase tracking-wider">Kurs</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
