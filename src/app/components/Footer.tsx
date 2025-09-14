import Link from "next/link";
import { title } from "process";

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
        <div className="bg-gray-800 p-4 m-0">
            <div className="container mx-auto">
                <div className="flex items-center gap-4 pb-10">
                    <p className="text-white font-sans text-2xl m-0">Connect with us:</p>
                    <div className="flex space-x-4">
                        {/* Instagram */}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <svg width="28" height="28" fill="currentColor" className="text-white hover:text-pink-500" viewBox="0 0 24 24">
                                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1 0 2a1 1 0 0 1 0-2z" />
                            </svg>
                        </a>
                        {/* Twitter */}
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <svg width="28" height="28" fill="currentColor" className="text-white hover:text-blue-400" viewBox="0 0 24 24">
                                <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37a8.59 8.59 0 0 1-2.72 1.04a4.28 4.28 0 0 0-7.29 3.9A12.13 12.13 0 0 1 3.1 4.86a4.28 4.28 0 0 0 1.32 5.71a4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.19a4.3 4.3 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2c0-.19 0-.39-.01-.58A8.72 8.72 0 0 0 24 4.59a8.5 8.5 0 0 1-2.54.7z" />
                            </svg>
                        </a>
                        {/* Facebook */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <svg width="28" height="28" fill="currentColor" className="text-white hover:text-blue-600" viewBox="0 0 24 24">
                                <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.05h-2.1V12h2.1v-1.6c0-2.07 1.23-3.22 3.12-3.22c.9 0 1.84.16 1.84.16v2.02h-1.04c-1.03 0-1.35.64-1.35 1.3V12h2.3l-.37 2.9h-1.93v7.05A10 10 0 0 0 22 12z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div className="border-y border-white/10 py-4 mb-4">
                    <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
                        <div className="border-l pl-4 border-white/10">
                            <h2 className="text-white uppercase">
                                Eğitimlerimiz
                            </h2>
                            <ul className="">
                                {navbarEducations.map((education: Education, index: number) => (
                                    <li key={index} className="text-gray-400 hover:text-gray-200 transition">
                                        <Link href={education.href} >{education.title}</Link>
                                    </li>
                                ))}

                            </ul>
                        </div>
                        <div className="pl-4 pb-4 border-l border-white/10 h-fit">
                            <h2 className="text-white uppercase">
                                Kampüslerimiz
                            </h2>
                            <ul className="">
                                {navbarCampuses.map((campuses: Campus, index: number) => (
                                    <li key={index} className="text-gray-400 hover:text-gray-200 transition max-w-sm">
                                        <p className="text-gray-400">{campuses.title}: {campuses.address}</p>
                                    </li>
                                ))}
                                <li className="text-gray-400">
                                    {phone}
                                </li>
                                <li className="text-gray-400">
                                    {email}
                                </li>

                            </ul>
                        </div>
                        <div className="pl-4 pb-4 border-l border-white/10 h-fit">
                            <h2 className="text-white uppercase ">
                                Hızlı Menü
                            </h2>
                            <ul>
                                {navbarLinks.map((links: Links, index: number) => (
                                    <li key={index} className="text-gray-400 hover:text-gray-200 transition">
                                        <Link href={links.href} >{links.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <p className="text-gray-400 font-sans text-sm text-center">© 2025 ÜçüncüBinyıl Akademi. Tüm hakları saklıdır.</p>
            </div>
        </div>
    );
}