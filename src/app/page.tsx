import Image from "next/image";

export default function Home() {
  return (
    <section className="relative h-[75vh]">
      {/* Background image */}
      <Image
        src="/background-image.png"
        alt="Üçüncü binyıl hero image"
        fill
        priority
        className="object-cover object-center z-0"
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black via-black/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="max-w-[50%]">
          <h1 className="text-8xl text-white font-semibold tracking-tight">
            <label className="bg-primary p-2 leading-32">Üçüncü Binyıl</label> ile geleceğini inşa et
          </h1>
        </div>
      </div>
    </section>
  );
}
