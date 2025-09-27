import { SubContent } from '@radix-ui/react-menu';
import Link from 'next/link';
import { Logo } from '../../public/logo';

type SubContent = {
  title: string;
  href: string
}

type NavLink = {
  title: string;
  href: string;
  subContent?: SubContent[];
}



export default function Navbar() {


  const NavLinks: NavLink[] = [
    {
      title: 'Kurslar',
      href: '/kurslar',
      subContent: [
        { title: "Makina", href: "/makina" },
        { title: "Yazılım", href: "/yazilim" },
        { title: "İnşaat", href: "/insaat" },
        { title: "Mimari", href: "/mimari" },
        { title: "Robotik Otomasyon ve PLC", href: "/robotik" },
        { title: "İngilizce", href: "/ingilizce" },
        { title: "Mesleki Bilişim", href: "/meslekibilisim" },
        { title: "Grafik Video ve Web Tasarım", href: "/grafik" },
        { title: "Dijital Oyun ve Animasyon", href: "/oyunveanimasyon" },
      ]
    },
    {
      title: "Blog",
      href: "/href",
      subContent: [
        { title: "Haberler", href: "/haberler" },
        { title: "Blog", href: "/blog" },
      ]
    },
    {
      title: 'Etkinlikler',
      href: '/etkinlikler'
    },

    {
      title: 'Kampanyalar',
      href: '/kampanyalar'
    },

    {
      title: 'İletişim',
      href: '/iletisim'
    },
  ];

  return (
    <nav className="bg-background bg-gradient-to-l from-background via-background/50 to-primary/10 border-gray-700">
      <div className="container mx-auto">
        <div className="flex justify-between items-center h-20">

          <Link href="/" className="flex items-center gap-3">
            <Logo fontSize={100}
              className='cursor-pointer'
            />
          </Link>
          <div className="flex">
            {NavLinks.map((item, idx) => (
              <div key={idx} className="hidden lg:flex items-center space-x-8 font-semibold">
                <div className="relative group">
                  <Link href={item.href} className={`text-gray-300 py-1 flex items-center gap-2 pl-4 pr-2 border-b-2 border-transparent  ${item.subContent ? "hover:bg-foreground/40 hover:text-white" : "hover:border-foreground"}`}>
                    {item.title}
                    {item.subContent && <svg className="w-4 h-4 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>}
                  </Link>

                  {item.subContent && (
                    <div className="absolute top-full left-0 w-64 bg-background opacity-0 invisible group-hover:opacity-100 group-hover:visible transform translate-y-2 group-hover:translate-y-0 z-50">

                      
                        {item.subContent?.map((subItem, index) => (
                          <Link
                            key={index}
                            href={subItem.href}
                            className="block px-4 py-2 text-base  hover:text-white hover:bg-background text-gray-500 hover:bg-foreground/40"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>)
                  }
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}