"use client"
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// API'den dönen event tipi
type EventCard = {
  _id: string;
  title: string;
  slug: string | { current: string };
  description: string;
  startDateTime: string; // ISO datetime
  endDateTime: string;   // ISO datetime
  location?: string;
  category?: string;
  image?: {
    asset: {
      url: string;
    }
  } | string;
};

const generateRandomDegree = () => Math.floor(Math.random() * (3 - (-2) + 1) + (-2));

const formatDateParts = (dateTime: string) => {
  const date = new Date(dateTime);
  // Ayları Türkçe olarak almak için
  const monthsTR = [
    "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
    "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"
  ];
  return {
    day: date.getDate().toString().padStart(2, "0"),
    month: monthsTR[date.getMonth()],
    year: date.getFullYear().toString()
  };
};

const formatHour = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
};

export default function EtkinliklerPage() {
  const [events, setEvents] = useState<EventCard[]>([]);

  const getEvents = async () => {
    const response = await fetch("/api/event");
    const data = await response.json();
    setEvents(data?.data || []);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 ">
        <div>
          {events.map((event, idx) => {
            const { day, month, year } = formatDateParts(event.startDateTime);
            const startTime = formatHour(event.startDateTime);
            const endTime = formatHour(event.endDateTime);
            const slug = typeof event.slug === "string" ? event.slug : event.slug?.current;
            const imageUrl = typeof event.image === "string"
              ? event.image
              : event.image?.asset?.url || "/default.jpg";
            return (
              <div key={event._id}>
                <Link
                  href={`/etkinlikler/${slug}`}
                  className="group relative  transition-all duration-300 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex lg:flex-col items-center justify-center bg-gradient-to-br from-primary to-background text-white lg:w-32 lg:h-full min-h-[120px]">
                      <div className="text-center">
                        <div className="text-4xl lg:text-5xl font-bold leading-none mb-1">{day}</div>
                        <div className="text-sm lg:text-base font-medium opacity-90">{month}</div>
                        <div className="text-xs lg:text-sm opacity-75">{year}</div>
                      </div>
                    </div>

                    <div className="flex-1 pl-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                        <div className="flex-1">
                          <div
                            className="flex items-center gap-2 mb-3"
                            style={{ transform: `rotate(${generateRandomDegree()}deg)` }}
                          >
                            {event.category && (
                              <span className="px-3 bg-blue-100 text-blue-700 text-sm font-medium">
                                {event.category}
                              </span>
                            )}
                          </div>
                          <h2 className="text-xl lg:text-2xl font-bold text-gray-600 mb-4 group-hover:text-background transition-colors duration-300">
                            {event.title}
                          </h2>

                          <div className="flex flex-wrap gap-4 mb-4 text-slate-600">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span className="text-sm">{startTime} - {endTime}</span>
                            </div>
                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span className="text-sm">{event.location}</span>
                              </div>
                            )}
                          </div>

                          <p className="text-slate-600 text-sm lg:text-base leading-relaxed mb-6">
                            {event.description}
                          </p>
                        </div>
                        {event?.image && (<div className="lg:w-80 lg:h-48 h-48 relative  overflow-hidden bg-slate-200">
                          <Image
                            src={imageUrl}
                            alt={event.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
                          />
                        </div>)}
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="h-[1px] bg-background/10 my-10" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}