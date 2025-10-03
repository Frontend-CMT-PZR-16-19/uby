"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

type CampaignType = {
    _id: string;
    title: string;
    description: string;
    imageUrl?: string;
    image?: {
        asset: {
            url: string;
        }
    } | string;
}

export default function Page() {
    const [campaigns, setCampaigns] = useState<CampaignType[]>([]);
    const [loading, setLoading] = useState(true);

    const getCampaigns = async () => {
        try {
            // URL'yi kampanyalar olarak değiştir
            const response = await fetch("/api/kampanyalar");
            
            // Response kontrolü ekle
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log("Campaigns data:", data?.data);
            setCampaigns(data?.data || []);
        } catch (error) {
            console.error("Campaigns fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCampaigns();
    }, []);

    // Image URL'ini düzgün şekilde al
    const getImageUrl = (campaign: CampaignType) => {
        if (campaign.imageUrl) return campaign.imageUrl;
        if (typeof campaign.image === "string") return campaign.image;
        if (campaign.image?.asset?.url) return campaign.image.asset.url;
        return "/default-campaign.jpg";
    };

   if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Kampanyalar yükleniyor...</div>
        </div>
      </div>
    );
  }

    return (
        <main className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {campaigns.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600">Henüz kampanya bulunmuyor.</p>
                        </div>
                    ) : (
                        campaigns.map((campaign, index) => (
                            <div key={campaign._id} className={`p-8 ${index !== campaigns.length - 1 ? 'border-b border-slate-300 pb-12' : ''}`}>
                                <div className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                    <div className="lg:w-1/2">
                                        <Image 
                                            src={getImageUrl(campaign)}
                                            alt={campaign.title} 
                                            width={600}
                                            height={400}
                                            className="w-full h-64 lg:h-80 object-cover  shadow-sm"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            onError={(e) => {
                                                e.currentTarget.src = "/default-campaign.jpg";
                                            }}
                                        />
                                    </div>
                                    <div className="lg:w-1/2 text-center lg:text-left">
                                        <h2 className="text-3xl font-bold text-gray-600 mb-6">{campaign.title}</h2>
                                        <p className="text-gray-700 text-lg leading-relaxed">{campaign.description}</p>
                                        <button className="mt-6 bg-background hover:bg-background/50 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 cursor-pointer">
                                            Detayları Gör
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    )
}