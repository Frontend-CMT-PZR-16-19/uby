import React from 'react'
import Image from 'next/image'

export const Hero = () => {
    return (
        <section className="relative h-[75vh]">
            <Image
                src="/walpapers.jpg"
                alt="Üçüncü binyıl hero image"
                fill
                priority
                className="object-cover object-center z-0"
            />
            <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/50 to-transparent" />
                <div className="relative z-10 container mx-auto py-24">
                    <div className="max-w-[50%]">
                    <h1 className="text-8xl text-white font-semibold tracking-tight">
                        Üçüncü Binyıl ile geleceğini inşa et
                    </h1>
                </div>
            </div>
        </section>
    )
}
