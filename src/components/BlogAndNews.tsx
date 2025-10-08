"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  image?: string;
  author?: {
    name: string;
  };
  categories?: Array<{
    title: string;
  }>;
};

export default function BlogAndNews() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchPosts = async () => {
    try {
      console.log("Fetching posts from API...");
      
      const response = await fetch('/api/posts');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const contentType = response.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      
      const data = await response.json();
      console.log("Posts API response:", data);
      
      if (data?.data && data.data.length > 0) {
        setPosts(data.data.slice(0, 3)); // En güncel 3 post
        setError(false);
      } else {
        setPosts([]);
        setError(false); // Veri yok ama hata değil
      }
      
    } catch (error) {
      console.error('Posts fetch error:', error);
      setPosts([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-24 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                <div className="h-2 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          NEWS
        </h2>
        <Link 
          href="/blog"
          className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
        >
          All News
        </Link>
      </div>
      
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <article key={post._id} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                  {post.image && (
                    <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="64px"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    {post.categories && post.categories.length > 0 && (
                      <div className="mb-1">
                        <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">
                          {post.categories[0].title}
                        </span>
                      </div>
                    )}

                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors leading-tight text-sm mb-1 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {post.excerpt && (
                      <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-2">
                        {post.excerpt}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {post.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{post.author.name}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <time dateTime={post.publishedAt}>
                          {formatDate(post.publishedAt)}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📰</div>
          <p className="text-gray-500 text-sm">
            {error ? 'Blog servisi şuanda kullanılamıyor' : 'Şuanda mevcut blog yok'}
          </p>
        </div>
      )}
      
      {posts.length > 0 && (
        <div className="mt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Tüm Postları Gör
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}