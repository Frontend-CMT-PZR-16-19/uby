"use client"
import { Clock, MapPin, Calendar, ArrowLeft, Users, Share2, Heart, Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type EventDetail = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location?: string;
  category?: string;
  image?: string;
  content?: string;
};

export default function EventDetailPage() {
  const params = useParams();
  const etkinlik = params.etkinlik as string;
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const getEventBySlug = async () => {
    try {
      console.log("Fetching event with slug:", etkinlik);
      const response = await fetch(`/api/event/${etkinlik}`);
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("API response data:", data);
      setEvent(data?.data || null);
    } catch (error) {
      console.error("Event fetch error:", error);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (etkinlik) {
      getEventBySlug();
    }
  }, [etkinlik]);

  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  };

  const getEventStatus = () => {
    const now = new Date();
    const startDate = new Date(event?.startDateTime || '');
    const endDate = new Date(event?.endDateTime || '');
    
    if (now < startDate) return { status: 'upcoming', text: 'Yaklaşan', color: 'bg-blue-100 text-blue-700' };
    if (now >= startDate && now <= endDate) return { status: 'ongoing', text: 'Devam Ediyor', color: 'bg-green-100 text-green-700' };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600 font-medium">Etkinlik yükleniyor...</div>
          <div className="text-sm text-gray-500 mt-2">Slug: {etkinlik}</div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Etkinlik Bulunamadı</h1>
            <p className="text-gray-600 mb-6">Aradığınız etkinlik bulunamadı veya mevcut değil.</p>
            <Link 
              href="/etkinlikler" 
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Etkinliklere Geri Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const eventStatus = getEventStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="relative">
        {event.image && (
          <div className="h-96 lg:h-[500px] overflow-hidden">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}
        
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 py-6">
            <Link 
              href="/etkinlikler" 
              className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full hover:bg-white transition-all duration-200 shadow-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Etkinliklere Dön</span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4 pb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {event.category && (
                <span className="inline-flex items-center px-4 py-2 bg-blue-600/90 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  {event.category}
                </span>
              )}
              
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-20 relative  z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="  shadow-xl overflow-hidden">
              <div className="p-8 border-b ">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-700 leading-relaxed mb-6">
                    {event.description}
                  </p>
                  {event.content && (
                    <div className="text-gray-600 leading-relaxed">
                      <div className="whitespace-pre-line">
                        {event.content}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl mb-5 shadow-xl p-6 sticky top-8">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Etkinlik Detayları</h3>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">Tarih</p>
                      <p className="text-gray-600 text-sm">{formatDate(event.startDateTime)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 mb-1">Saat</p>
                      <p className="text-gray-600 text-sm">
                        {formatTime(event.startDateTime)} - {formatTime(event.endDateTime)}
                      </p>
                    </div>
                  </div>
                </div>

                {event.location && (
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-1">Konum</p>
                        <p className="text-gray-600 text-sm">{event.location}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>             

              <div className="mt-6 mb-20 pt-6 border-t border-gray-100">
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Ücretsiz katılım</p>
                  <p>• Online etkinlik</p>
                  <p>• Sertifika verilecek</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}