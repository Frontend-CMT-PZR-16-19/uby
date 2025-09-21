import Link from 'next/link';
import { Logo } from '../../public/logo';

export default function Navbar() {
  const educationItems = [
    { title: "Makina", href: "/makina" },
    { title: "Yazılım", href: "/yazilim" },
    { title: "İnşaat", href: "/insaat" },
    { title: "Mimari", href: "/mimari" },
    { title: "Robotik Otomasyon ve PLC", href: "/robotik" },
    { title: "İngilizce", href: "/ingilizce" },
    { title: "Mesleki Bilişim", href: "/meslekibilisim" },
    { title: "Grafik Video ve Web Tasarım", href: "/grafik" },
    { title: "Dijital Oyun ve Animasyon", href: "/oyunveanimasyon" },
  ];

  const navItems = [
    { title: 'Etkinlikler', href: '/etkinlikler' },
    { title: 'Kampanyalar', href: '/kampanyalar' },
    { title: 'İletişim', href: '/iletisim' },
    { title: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="bg-gradient-to-l from-background via-background/50 to-primary/10 border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <Logo fontSize={100} // Logo yu buraya ekledik
            className='cursor-pointer'
            href='/'
            />
          </div>


              {/* burası Dropdown menüsü sadece Eğitimlerimiz kısmı için yaprığımızı için bunu Array
              dışında manuel ekledim arrayden nasıl çekeceğim aklıma gelmedi */}
          <div className="hidden lg:flex items-center space-x-8 font-semibold">
            <div className="relative group">
              <button className="text-gray-300 hover:text-white rounded-md px-3 py-2 transition-colors duration-200 hover:bg-gray-800 flex items-center gap-1">
                Eğitimlerimiz  
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-64 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="py-2">
                   {/* Eğitimlerimiz Dropdown içindeki eğitimlerin isimleri ve linkleri buraya mapleniyor */}
                  {educationItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="block px-4 py-2 text-base text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>


                  {/* Arrayden çektiğimiz diğer navbar linkleri buraya mapliyoruz */}
            {navItems.map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                className="text-gray-300 hover:text-white rounded-md px-3 py-2 transition-colors duration-200 hover:bg-gray-800"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}