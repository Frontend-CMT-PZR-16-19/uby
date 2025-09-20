import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-3 border-b shadow-sm flex justify-between items-center" style={{ backgroundColor: '#041016' }}>
      <div className="flex items-center text-xl font-bold text-gray-900 dark:text-gray-100">
        <img src="/logo.png" alt="Logo" className="h-8 w-auto mr-2" />
        <Link href="/">UBY</Link>
      </div>
      <div className="flex flex-row gap-4">
        <Link href="/" className="px-4 py-2 rounded font-medium text-white custom-underline">Ana Sayfa</Link>
        <Link href="/egitimlerimiz" className="px-4 py-2 rounded font-medium text-white custom-underline">Eğitimlerimiz</Link>
        <Link href="/etkinlikler" className="px-4 py-2 rounded font-medium text-white custom-underline">Etkinlikler</Link>
        <Link href="/kampanyalar" className="px-4 py-2 rounded font-medium text-white custom-underline">Kampanyalar</Link>
        <Link href="/blog" className="px-4 py-2 rounded font-medium text-white custom-underline">Blog</Link>
        <Link href="/iletisim" className="px-4 py-2 rounded font-medium text-white custom-underline">İletişim</Link>
      </div>
    </nav>
  );
}