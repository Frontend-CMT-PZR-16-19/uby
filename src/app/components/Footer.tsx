import Link from "next/link";
import Image from "next/image";

type Education = {
    title: string;
    href: string
}

type Campus = {
    title: string;
    address: string;
}

type Links = {
    title: string;
    href: string
}
export default function Footer() {

    const phone = "444 3 111";
    const email = "bilgi@ucuncubinyil.com";
    const year = new Date().getFullYear();

    const navbarEducations: Education[] = [
        {
            title: "Makina",
            href: "/makina",
        },
        {
            title: "Yazılım",
            href: "/yazilim"
        },
        {
            title: "İnşaat",
            href: "/insaat",
        },
        {
            title: "Mimari",
            href: "/mimari",
        },
        {
            title: "Robotik Otomasyon ve PLC",
            href: "/robotik",
        },
        {
            title: "İngilizce",
            href: "/ingilizce",
        },
        {
            title: "Mesleki Bilişim",
            href: "/meslekibilisim",
        },
        {
            title: "Grafik Video ve Web Tasarım",
            href: "/grafik",
        },
        {
            title: "Dijital Oyun ve Animasyon",
            href: "/oyunveanimasyon",
        },
    ]

    const navbarCampuses: Campus[] = [
        {
            title: "Mecidiyeköy",
            address: " Eski Osmanlı Sokak No:40 Kat:5 Mecidiyeköy/İstanbul",
        },
        {
            title: "Kadıköy",
            address: " Caferağa Mah. Mühürdar Caddesi No:50 Kadıköy / İstanbul",
        }
    ]

    const navbarLinks: Links[] = [
        {
            title: "Anasayfa",
            href: "/",
        },
        {
            title: "Eğitimlerimiz",
            href: "/egitimlerimiz",
        },
        {
            title: "Etkinlikler",
            href: "/etkinlikler"
        },
        {
            title: "Kampanyalar",
            href: "/kampanyalar"
        },
        {
            title: "İletişim",
            href: "/iletisim"
        },
        {
            title: "Blog",
            href: "/blog"
        }

    ]

    return (
        <div className="relative m-0 bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 p-6 sm:p-8">
            <div className="container mx-auto max-w-7xl">
                {/* Brand */}
                <div className="grid grid-cols-1 gap-8 pb-8 place-items-center">
                    <div className="flex items-center gap-4">
                       
                        <div className="text-center">
                            <h3 className="text-white/90 text-lg font-semibold m-0">ÜçüncüBinyıl Akademi</h3>
                            <p className="text-gray-400 mt-1 max-w-xl">Geleceğin mesleklerine odaklı, uygulamalı eğitimler ve sektör odaklı projelerle kariyerine hız kat.</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 pb-10">
                    <p className="text-white/90 font-sans text-xl sm:text-2xl m-0 tracking-wide">Connect with us:</p>
                    <div className="flex flex-wrap gap-3">
                        {/* Instagram */}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-pink-500/10 hover:ring-pink-400/40">
                            <svg width="22" height="22" fill="currentColor" className="" viewBox="0 0 24 24">
                                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" />
                            </svg>
                        </a>
                        {/* X (formerly Twitter) */}
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-white/10 hover:ring-white/40">
                            <svg width="22" height="22" fill="currentColor" className="" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* Facebook */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white transition hover:bg-blue-500/10 hover:ring-blue-400/40">
                            <svg width="22" height="22" fill="currentColor" className="" viewBox="0 0 24 24">
                                <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.05h-2.1V12h2.1v-1.6c0-2.07 1.23-3.22 3.12-3.22c.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3V12h2.3l-.37 2.9h-1.93v7.05A10 10 0 0 0 22 12z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="border-y border-white/10 py-6 mb-6">
                    <div className="py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="border-l pl-5 border-white/10">
                            <h2 className="text-white/90 uppercase tracking-wider text-sm mb-3">
                                Eğitimlerimiz
                            </h2>
                            <ul className="space-y-2">
                                {navbarEducations.map((education: Education, index: number) => (
                                    <li key={index} className="text-gray-400 hover:text-gray-100 transition-colors">
                                        <Link href={education.href} >{education.title}</Link>
                                    </li>
                                ))}

                            </ul>
                        </div>
                        <div className="pl-5 pb-2 border-l border-white/10 h-fit">
                            <h2 className="text-white/90 uppercase tracking-wider text-sm mb-3">
                                Kampüslerimiz
                            </h2>
                            <ul className="space-y-2">
                                {navbarCampuses.map((campuses: Campus, index: number) => (
                                    <li key={index} className="text-gray-400 hover:text-gray-100 transition-colors max-w-sm">
                                        <p className="text-gray-400"><span className="text-gray-300 font-medium">{campuses.title}:</span> {campuses.address}</p>
                                    </li>
                                ))}
                                <li className="text-gray-300">
                                    {phone}
                                </li>
                                <li className="text-gray-300">
                                    {email}
                                </li>

                            </ul>
                        </div>
                        <div className="pl-5 pb-2 border-l border-white/10 h-fit">
                            <h2 className="text-white/90 uppercase tracking-wider text-sm mb-3 ">
                                Hızlı Menü
                            </h2>
                            <ul className="space-y-2">
                                {navbarLinks.map((links: Links, index: number) => (
                                    <li key={index} className="text-gray-400 hover:text-gray-100 transition-colors">
                                        <Link href={links.href} >{links.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-gray-400 font-sans text-xs sm:text-sm tracking-wide m-0">© {year} ÜçüncüBinyıl Akademi. Tüm hakları saklıdır.</p>
                    <div className="flex items-center gap-4">
                        <Link href="#" className="text-gray-400 hover:text-gray-100 text-xs sm:text-sm">Gizlilik</Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-100 text-xs sm:text-sm">KVKK</Link>
                        <Link href="#" className="text-gray-400 hover:text-gray-100 text-xs sm:text-sm">Kullanım Koşulları</Link>
                        <a href="#top" className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-3 py-1.5 text-gray-200 hover:bg-white/10 text-xs">
                            Yukarı Çık
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}