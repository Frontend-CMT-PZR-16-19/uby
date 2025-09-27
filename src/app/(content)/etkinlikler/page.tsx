import { Clock, MapPin, Users } from "lucide-react";
import Image from "next/image";

type EventCard = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  time: string;
  month: string;
  day: string;
  year: string;
  category: string;
};

const eventscards: EventCard[] = [
  {
    id: 1,
    title: "Üçüncü Binyıl Akademi, FUTURISTECH FEST & FAIR'de!",
    date: "2025-05-05",
    location: "Boğaziçi Üniversitesi Güney Kampüs",
    description: "Teknoloji ve inovasyonun geleceğini keşfetmeye hazır olun! Üçüncü Binyıl Akademi, Boğaziçi Üniversitesi Güney Kampüs Meydanı'nda düzenlenecek FuturisTech Fest & Fair etkinliğinde yerini alıyor! Bu...",
    imageUrl: "/uby-events-1.jpg",
    time: "10:00 - 18:00",
    month: "Mayıs",
    day: "05",
    year: "2025",
    category: "Teknoloji Fuarı"
  },   
  {
    id: 2,
    title: "Üçüncü Binyıl Akademi'den Tersine Mühendislik ile Motor Tasarımı Semineri!",
    date: "2025-04-09",
    location: "Samandra Mesleki ve Teknik Anadolu",
    description: "Mühendislik dünyasında tersine mühendislik, mevcut sistemleri analiz ederek geliştirme süreçlerini optimize etmenin en etkili yöntemlerinden biridir. Üçüncü Binyıl Akademi, Samandra Mesleki ve Teknik Anadolu...",
    imageUrl: "/uby-events-2.jpg",
    time: "10:00 - 17:00",
    month: "Nisan",
    day: "09",
    year: "2025",
    category: "Mühendislik Semineri"
  },
  {
    id: 3,
    title: "Üçüncü Binyıl Akademi’den SolidWorks Eğitim Semineri!",
    date: "2025-03-20",
    location: "İstanbul Üniversitesi",
    description: "Yapay zeka teknolojileri ve makine öğrenmesi algoritmalarının temellerini öğrenin. Pratik uygulamalar ve gerçek projeler ile desteklenen kapsamlı bir eğitim programı.",
    imageUrl: "/uby-events-3.jpg",
    time: "09:00 - 16:00",
    month: "Mart",
    day: "20",
    year: "2025",
    category: "Teknoloji Atölyesi"
  },
  {
    id: 4,
    title: "Üçüncü Binyıl Akademi, DETECH Konferansı’nda!",
    date: "2025-02-15",
    location: "Dokuz Eylül Üniversitesi",
    description: "Yapay zeka ve makine öğrenmesi alanında en son gelişmeleri keşfedin. Uygulamalı projeler ve etkileşimli oturumlarla dolu bir atölye.",
    imageUrl: "/uby-events-4.jpg",
    time: "09:00 - 16:00",
    month: "Şubat",
    day: "15",
    year: "2025",
    category: "Teknoloji Atölyesi"
  },
   {
    id: 5,
    title: "Üçüncü Binyıl Akademi Savunma Teknolojileri Günleri’nde!",
    date: "2025-02-15",
    location: "Çapa Atatürk Ortaokulu",
    description: "Yapay zeka ve makine öğrenmesi alanında en son gelişmeleri keşfedin. Uygulamalı projeler ve etkileşimli oturumlarla dolu bir atölye.",
    imageUrl: "/uby-events-5.jpg",
    time: "09:00 - 16:00",
    month: "Şubat",
    day: "03",
    year: "2025",
    category: "Teknoloji Atölyesi"
  }
  
];

export default function EtkinliklerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 ">
        <div className="space-y-8 ">
          {eventscards.map((event) => (
            <div 
              key={event.id}
              className="group relative mb-15 bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row ">
                <div className="flex lg:flex-col items-center justify-center bg-gradient-to-br from-primary to-background text-white p-6 lg:w-32 lg:h-full min-h-[120px]">
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold leading-none mb-1">
                      {event.day}
                    </div>
                    <div className="text-sm lg:text-base font-medium opacity-90">
                      {event.month}
                    </div>
                    <div className="text-xs lg:text-sm opacity-75">
                      {event.year}
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-6 lg:p-8 ">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                          {event.category}
                        </span>
                      </div>

                      <h2 className="text-xl lg:text-2xl font-bold text-gray-500 mb-4 group-hover:text-black transition-colors duration-300">
                        {event.title}
                      </h2>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-500" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-600 text-sm lg:text-base leading-relaxed mb-6">
                        {event.description}
                      </p>
                      
                    </div>
                    <div className="lg:w-80 lg:h-48 h-48 relative  overflow-hidden bg-slate-200">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}