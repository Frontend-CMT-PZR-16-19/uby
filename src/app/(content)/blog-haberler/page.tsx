"use client";

import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import '@/styles/masonry-grid.css';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: any;
  author: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
  };
  publishedAt: string;
  category: string;
  image?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  featured: boolean;
}

export default function BlogHaberlerPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [newsPosts, setNewsPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'blog' | 'news'>('blog');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const blogData = await fetch('/api/blog-posts?type=blog');
      const newsData = await fetch('/api/blog-posts?type=news');
      
      const blogResult = await blogData.json();
      const newsResult = await newsData.json();
      
      
      setBlogPosts(blogResult.posts || []);
      setNewsPosts(newsResult.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setBlogPosts([
        {
          _id: '1',
          title: 'CAD/CAM Teknolojilerinde Yeni Trendler',
          slug: 'cad-cam-teknolojilerinde-yeni-trendler',
          excerpt: '2024 yılında CAD/CAM sektöründe öne çıkan teknolojiler ve gelecekte bizi bekleyen yenilikler hakkında kapsamlı bir analiz.',
          author: { name: 'Dr. Mehmet Yılmaz' },
          publishedAt: '2024-01-15',
          category: 'Teknoloji',
          featured: true
        },
        {
          _id: '2',
          title: 'Mimari Tasarımda Sürdürülebilirlik',
          slug: 'mimari-tasarimda-surdurulebilirlik',
          excerpt: 'Modern mimari tasarımda sürdürülebilirlik prensipleri ve çevre dostu yapıların tasarım süreçleri.',
          author: { name: 'Arş. Gör. Ayşe Demir' },
          publishedAt: '2024-01-12',
          category: 'Mimari',
          featured: false
        },
        {
          _id: '3',
          title: 'Python ile Makine Öğrenmesi',
          slug: 'python-ile-makine-ogrenmesi',
          excerpt: 'Python programlama dili kullanarak makine öğrenmesi projelerine başlamak için temel kavramlar.',
          author: { name: 'Eng. Can Özkan' },
          publishedAt: '2024-01-10',
          category: 'Yazılım',
          featured: false
        },
        {
          _id: '4',
          title: '3D Modelleme Teknikleri',
          slug: '3d-modelleme-teknikleri',
          excerpt: 'Profesyonel 3D modelleme teknikleri ve endüstriyel tasarımda kullanılan araçlar.',
          author: { name: 'Tasarımcı Elif Kaya' },
          publishedAt: '2024-01-08',
          category: 'Eğitim',
          featured: false
        },
        {
          _id: '5',
          title: 'Robotik ve Otomasyon',
          slug: 'robotik-ve-otomasyon',
          excerpt: 'Endüstriyel robotik sistemler ve otomasyon teknolojilerinin geleceği.',
          author: { name: 'Dr. Ahmet Yıldız' },
          publishedAt: '2024-01-05',
          category: 'Teknoloji',
          featured: false
        },
        {
          _id: '6',
          title: 'Web Tasarım Trendleri',
          slug: 'web-tasarim-trendleri',
          excerpt: '2024 yılı web tasarım trendleri ve kullanıcı deneyimi odaklı yaklaşımlar.',
          author: { name: 'UX Tasarımcısı Zeynep Öz' },
          publishedAt: '2024-01-03',
          category: 'Yazılım',
          featured: false
        }
      ]);
      
      setNewsPosts([
        {
          _id: '7',
          title: 'Üçüncü Binyıl Akademi Yeni Şube Açıyor',
          slug: 'ucuncu-binyil-akademi-yeni-sube-aciyor',
          excerpt: 'İstanbul\'un en büyük teknoloji merkezlerinden biri olan Maslak\'ta yeni şubemizi açıyoruz. Modern eğitim alanları ve son teknoloji laboratuvarlar.',
          author: { name: 'Haber Merkezi' },
          publishedAt: '2024-01-20',
          category: 'Kurumsal',
          featured: true
        },
        {
          _id: '8',
          title: '2024 Yaz Dönemi Eğitim Programları',
          slug: '2024-yaz-donemi-egitim-programlari',
          excerpt: 'Yaz döneminde açılacak özel eğitim programları ve kampanya fırsatları.',
          author: { name: 'Eğitim Koordinatörlüğü' },
          publishedAt: '2024-01-18',
          category: 'Eğitim',
          featured: false
        },
        {
          _id: '9',
          title: 'Sektör Uzmanlarıyla Buluşma',
          slug: 'sektor-uzmanlariyla-bulusma',
          excerpt: 'Teknoloji sektörünün önde gelen isimleriyle networking etkinliği.',
          author: { name: 'Etkinlik Ekibi' },
          publishedAt: '2024-01-16',
          category: 'Kurumsal',
          featured: false
        },
        {
          _id: '10',
          title: 'Yeni Kurs Programları',
          slug: 'yeni-kurs-programlari',
          excerpt: '2024 yılında eklenen yeni kurs programları ve içerikleri.',
          author: { name: 'Eğitim Merkezi' },
          publishedAt: '2024-01-14',
          category: 'Eğitim',
          featured: false
        },
        {
          _id: '11',
          title: 'Başarı Hikayeleri',
          slug: 'basari-hikayeleri',
          excerpt: 'Mezunlarımızın kariyer başarıları ve aldıkları pozisyonlar.',
          author: { name: 'Alumni Derneği' },
          publishedAt: '2024-01-12',
          category: 'Kurumsal',
          featured: false
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Teknoloji': 'bg-purple-500',
      'Mimari': 'bg-green-500', 
      'Yazılım': 'bg-orange-500',
      'Kurumsal': 'bg-blue-400',
      'Eğitim': 'bg-pink-500',
      'blog': 'bg-indigo-500',
      'news': 'bg-teal-500',
      'default': 'bg-gray-500'
    };
    return colors[category as keyof typeof colors] || colors.default;
  };

  const getCardSize = (index: number, featured: boolean) => {
    if (featured) return 'featured';
    const sizes = ['large', 'medium', 'small', 'tall', 'wide', 'square'];
    return sizes[index % sizes.length];
  };

  const BlogCard = ({ post, featured = false, index = 0, tabType }: { post: BlogPost; featured?: boolean; index?: number; tabType?: string }) => {
    const cardSize = getCardSize(index, featured);
    const categoryColor = getCategoryColor(post.category);
    
    const slug = typeof post.slug === 'string' ? post.slug : ((post.slug as any)?.current ?? post._id);
    const routeType = tabType || (activeTab === 'blog' ? 'blog' : 'haber');

    return (
      <Link href={`/${routeType}/${slug}`}>
        <article className={`masonry-card ${cardSize}`}>
          <div className="masonry-card-image">
          {post.image?.asset?.url ? (
            <Image
              src={post.image.asset.url}
              alt={post.image.alt || post.title}
              width={800}
              height={600}
              style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%'
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: categoryColor.replace('bg-', '#') }}>
              <div className="text-center p-8 text-white">
                <div className="text-6xl mb-4 opacity-80">📝</div>
                <p className="text-white/80 text-sm font-medium">Görsel yakında eklenecek</p>
              </div>
            </div>
          )}
          <div className="masonry-card-category">
            {post.category}
          </div>
        </div>

        <div className="masonry-card-content">
          <h2 className="masonry-card-title">
            {post.title}
          </h2>
          
          <p className="masonry-card-excerpt">
            {post.excerpt}
          </p>

          <div className="masonry-card-meta">
            <div className="masonry-card-author">
              <User className="w-4 h-4" />
              <span>{post.author.name}</span>
            </div>
            <div className="masonry-card-date">
              <Calendar className="w-4 h-4 inline mr-1" />
              {formatDate(post.publishedAt)}
            </div>
          </div>
        </div>
      </article>
      </Link>
    );
  };

  const getAspectRatio = (size: string) => {
    switch (size) {
      case 'featured': return 'aspect-[16/10]';
      case 'large': return 'aspect-[4/3]';
      case 'medium': return 'aspect-[3/4]';
      case 'small': return 'aspect-[5/6]';
      case 'tall': return 'aspect-[3/5]';
      case 'wide': return 'aspect-[8/3]';
      case 'square': return 'aspect-square';
      default: return 'aspect-[4/3]';
    }
  };

  const getTitleSize = (size: string) => {
    switch (size) {
      case 'featured': return 'text-3xl';
      case 'large': return 'text-xl';
      case 'medium': return 'text-lg';
      case 'small': return 'text-base';
      case 'tall': return 'text-lg';
      case 'wide': return 'text-xl';
      case 'square': return 'text-base';
      default: return 'text-lg';
    }
  };

  const getExcerptSize = (size: string) => {
    switch (size) {
      case 'featured': return 'text-base';
      case 'large': return 'text-sm';
      case 'medium': return 'text-sm';
      case 'small': return 'text-xs';
      case 'tall': return 'text-xs';
      case 'wide': return 'text-sm';
      case 'square': return 'text-xs';
      default: return 'text-sm';
    }
  };

  const getGridSpan = (size: string) => {
    switch (size) {
      case 'featured': return 'col-span-2 md:col-span-6 lg:col-span-8';
      case 'large': return 'col-span-2 md:col-span-6 lg:col-span-4';
      case 'medium': return 'col-span-1 md:col-span-3 lg:col-span-4';
      case 'small': return 'col-span-1 md:col-span-3 lg:col-span-2';
      case 'tall': return 'col-span-1 md:col-span-3 lg:col-span-2';
      case 'wide': return 'col-span-2 md:col-span-6 lg:col-span-6';
      case 'square': return 'col-span-1 md:col-span-3 lg:col-span-2';
      default: return 'col-span-1 md:col-span-3 lg:col-span-2';
    }
  };

  const getRowSpan = (size: string) => {
    switch (size) {
      case 'featured': return 'row-span-3 md:row-span-4';
      case 'large': return 'row-span-2 md:row-span-3';
      case 'medium': return 'row-span-2 md:row-span-2';
      case 'small': return 'row-span-1 md:row-span-2';
      case 'tall': return 'row-span-3 md:row-span-4';
      case 'wide': return 'row-span-1 md:row-span-2';
      case 'square': return 'row-span-2 md:row-span-2';
      default: return 'row-span-2 md:row-span-2';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="mb-16">
            <div className="flex justify-center mb-16">
              <div className="w-64 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            
            <div className="mb-12">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Main Title */}
                <div className="lg:col-span-8">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-8 leading-[0.9]">
                    Blog &<br />
                    <span className="font-bold italic text-blue-600">Haberler</span>
                  </h1>
                  <p className="text-lg text-gray-700 font-light leading-relaxed max-w-2xl">
                    Uzman yazarlarımızdan sektör analizleri, teknoloji trendleri ve 
                    eğitim dünyasından güncel haberler.
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className="bg-gray-50 p-6 border-l-4 border-gray-900 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-28"></div>
                      <div className="h-4 bg-gray-200 rounded w-26"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="masonry-container">
            {[1, 2, 3, 4, 5, 6].map((i) => {
              const cardSize = getCardSize(i-1, i === 1);
              
              return (
                <div key={i} className={`masonry-card ${cardSize} loading`}>
                  <div className="masonry-card-image">
                    <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                  </div>
                  <div className="masonry-card-content">
                    <div className="space-y-3">
                      <div className="bg-gray-300 h-4 rounded w-3/4 animate-pulse"></div>
                      <div className="bg-gray-300 h-4 rounded w-1/2 animate-pulse"></div>
                      <div className="bg-gray-300 h-4 rounded w-full animate-pulse"></div>
                      <div className="bg-gray-300 h-4 rounded w-2/3 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="blog" className="w-full">
          <div className="mb-16">
            <div className="flex justify-center mb-16">
              <nav className="flex items-center bg-gray-50 p-1 rounded-full border border-gray-200">
                <button
                  onClick={() => setActiveTab('blog')}
                  className={`px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 rounded-full ${
                    activeTab === 'blog' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  Blog
                </button>
                <div className="w-px h-6 bg-gray-300 mx-1"></div>
                <button
                  onClick={() => setActiveTab('news')}
                  className={`px-8 py-3 text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 rounded-full ${
                    activeTab === 'news' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:bg-white/50'
                  }`}
                >
                  Haberler
                </button>
              </nav>
            </div>
            
            <div className="mb-12">
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-light text-gray-900 mb-8 leading-[0.9]">
                    Blog &<br />
                    <span className="font-bold italic text-blue-600">Haberler</span>
                  </h1>
                  <p className="text-lg text-gray-700 font-light leading-relaxed max-w-2xl">
                    Uzman yazarlarımızdan sektör analizleri, teknoloji trendleri ve 
                    eğitim dünyasından güncel haberler.
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className="bg-gray-50 p-6 border-l-4 border-gray-900">
                    <div className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4 font-medium">
                      İçerik Kategorileri
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700 font-medium">Güncel Makaleler</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                        <span className="text-sm text-gray-700 font-medium">Uzman Görüşleri</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                        <span className="text-sm text-gray-700 font-medium">Sektör Haberleri</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {activeTab === 'blog' && (
            <div className="masonry-container">
              {blogPosts.map((post, index) => (
                <BlogCard 
                  key={post._id}
                  post={post} 
                  featured={post.featured}
                  index={index}
                  tabType="blog"
                />
              ))}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="masonry-container">
              {newsPosts.map((post, index) => (
                <BlogCard 
                  key={post._id}
                  post={post} 
                  featured={post.featured}
                  index={index}
                  tabType="haber"
                />
              ))}
            </div>
          )}
        </Tabs>

        <div className="mt-32 pt-16 border-t border-gray-200">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Bültenimize<br />
              <span className="font-bold italic">Abone Olun</span>
            </h2>
            <p className="text-gray-600 mb-8 font-light">
              En güncel blog yazıları ve haberlerden haberdar olmak için e-posta listemize katılın.
            </p>
            
            <form className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none text-gray-900 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors font-medium tracking-wider uppercase text-sm"
              >
                Abone Ol
              </button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              Gizlilik politikamızı kabul ederek abone oluyorsunuz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
