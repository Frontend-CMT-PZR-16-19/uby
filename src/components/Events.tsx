"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';

type EventType = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
  category?: string;
  image?: string;
};

// Named export olarak değiştirin
export function Events() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      console.log("Fetching events from API...");
      
      const response = await fetch("/api/event");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Events API response:", data);
      
      // En güncel 2 etkinliği al (sidebar için)
      const latestEvents = (data?.data || []).slice(0, 2);
      setEvents(latestEvents);
    } catch (error) {
      console.error("Etkinlikler yüklenirken hata:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('tr-TR', { month: 'short' }).toUpperCase()
    };
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-32 mb-6"></div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          EVENTS
        </h2>
        <Link 
          href="/etkinlikler"
          className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
        >
          All Events
        </Link>
      </div>
      
      {events.length > 0 ? (
        <div className="space-y-6">
          {events.map((event) => {
            const { day, month } = formatDate(event.startDateTime);
            
            return (
              <article key={event._id} className="group">
                <Link href={`/etkinlikler/${event.slug}`} className="block">
                  <div className="flex gap-4 p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary text-white flex flex-col items-center justify-center text-xs font-bold">
                        <span className="text-lg leading-none">{day}</span>
                        <span className="text-[10px] opacity-90">{month}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors leading-tight text-sm mb-2">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-600 text-xs mb-2 line-clamp-2">
                        {event.description}
                      </p>
                      
                      {event.location && (
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">Henüz etkinlik bulunmuyor.</p>
      )}
      
      <div className="mt-6 text-center">
        <Link
          href="/etkinlikler"
          className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Tüm Etkinlikleri Gör
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}