 type campaignType = {
    title: string;
    description: string;
    imageUrl: string;
}

const campaign : () => campaignType[] = () =>[
    {
        title: "13 Ay Taksit İmkanı",
        description: "Hayalinizdeki eğitimle tanışma zamanı geldi! 13 taksit avantajıyla, eğitim artık elinizin altında!",
        imageUrl: "/kampanya1.jpg",
    },
    {
        title: "2+1 Eğitim Kampanyası",
        description: "2 adet eğitim aldığınız takdirde istediğiniz herhangi 1 eğitime daha ÜCRETSİZ kayıt olabilirsiniz. Eğer sizler de rakiplerinizin önüne geçip daha donanımlı bir çalışan olmak istiyorsanız, kurumumuza gelerek, alanınızla ilgili eğitimlerden faydalanabilirsiniz.",
        imageUrl: "/kampanya2.jpg",
    },
    {
        title: "3+2 Eğitim Kampanyası",
        description: "3 adet eğitim aldığınız takdirde istediğiniz herhangi 2 eğitime daha ÜCRETSİZ kayıt olabilirsiniz. Eğer sizler de rakiplerinizin önüne geçip daha donanımlı bir çalışan olmak istiyorsanız, kurumumuza gelerek, alanınızla ilgili eğitimlerden faydalanabilirsiniz.",
        imageUrl: "/kampanya3.jpg",
    },
    {
        title: "4+4 Eğitim Kampanyası",
        description: "4 adet eğitim aldığınız takdirde istediğiniz herhangi 4 eğitime daha ÜCRETSİZ kayıt olabilirsiniz. Eğer sizler de rakiplerinizin önüne geçip daha donanımlı bir çalışan olmak istiyorsanız, kurumumuza gelerek, alanınızla ilgili eğitimlerden faydalanabilirsiniz",
        imageUrl: "/kampanya4.jpg",
    },
    {
        title: "Ücretsiz İngilizce Kursu",
        description: "Akademimizden eğitim aldığınız takdirde 1 kurdan 4 kur'a kadar ücretsiz olarak Oxford kalitesi ile İngilizce eğitimi kampanyamızdan faydalanabilirsiniz",
        imageUrl: "/kampanya5.jpg",
    },
     {
        title: "Ücretsiz CV Sitesi",
        description: "Kurslarımıza katıldığınızda CV'nizi yayınlamak ve daha hızlı iş bulabilmek için ücretiz CV sitesi hediye ediyoruz.",
        imageUrl: "/kampanya6.jpg",
    },
    {
        title: "Staj Programı",
        description: "Sektör tecrübesi kazanabileceğiniz staj programı ile eğitimini ve sektör tecrübeni aynı anda tamamla.",
        imageUrl: "/kampanya7.jpg",
    }
]
export default function Page() {
    const campaigns = campaign();
    return (
        <main className="min-h-screen  py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="space-y-8">
                    {campaigns.map((campaign, index) => (
                        <div key={campaign.title} className={`p-8 ${index !== campaigns.length - 1 ? 'border-b border-slate-500/30 pb-12' : ''}`}>
                            <div className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                <div className="lg:w-1/2">
                                    <img 
                                        src={campaign.imageUrl} 
                                        alt={campaign.title} 
                                        className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-sm"
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
                    ))}
                </div>
            </div>
        </main>
    )
}