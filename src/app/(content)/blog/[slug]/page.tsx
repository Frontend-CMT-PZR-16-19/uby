"use client";

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Clock, Tag } from 'lucide-react';
import '@/styles/masonry-grid.css';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: any;
  excerpt: string;
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
  readTime?: number;
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchBlogPost();
  }, [resolvedParams.slug]);

  const fetchBlogPost = async () => {
    try {
      const response = await fetch(`/api/blog-posts/${resolvedParams.slug}`);
      if (!response.ok) {
        throw new Error('Blog post not found');
      }
      
      const data = await response.json();
      setPost(data.post);
      
      const relatedResponse = await fetch('/api/blog-posts?type=blog&limit=2');
      if (relatedResponse.ok) {
        const relatedData = await relatedResponse.json();
        setRelatedPosts(relatedData.posts || []);
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Makale Bulunamadı</h1>
          <Link href="/blog-haberler" className="text-blue-600 hover:text-blue-800">
            ← Blog & Haberler sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <article className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              <Tag className="w-3 h-3" />
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            {post.title}
          </h1>

          <p className="text-xl text-gray-700 mb-12 leading-relaxed font-medium" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            {post.excerpt}
          </p>

          <div className="flex items-center gap-8 mb-16 pb-8 border-b-2 border-gray-300">
            <div className="flex items-center gap-4">
              {post.author.image?.asset?.url ? (
                <div className="w-12 h-12 relative overflow-hidden rounded-full border-2 border-gray-300">
                  <Image
                    src={post.author.image.asset.url}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
              )}
              <div>
                <div className="text-gray-800 font-semibold uppercase tracking-wide text-sm" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
                  {post.author.name}
                </div>
                <div className="text-gray-500 text-xs uppercase tracking-wide" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
                  Yazar
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 font-medium text-sm uppercase tracking-wide" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>{formatDate(post.publishedAt)}</span>
            </div>
          </div>

          {post.image?.asset?.url && (
            <div className="mb-20">
              <div className="aspect-[16/9] relative overflow-hidden border-2 border-gray-300 shadow-lg">
                <Image
                  src={post.image.asset.url}
                  alt={post.image.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {post.image.alt && (
                <p className="text-sm text-gray-600 mt-4 text-center italic font-medium" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                  {post.image.alt}
                </p>
              )}
            </div>
          )}

          <div className="max-w-none">
            <div className="text-gray-900 leading-relaxed space-y-10">
              {post.content && Array.isArray(post.content) ? (
                <div className="space-y-8">
                  {post.content.map((block: any, index: number) => {
                    if (block._type === 'block') {
                      if (index === 0 && block.style === 'normal') {
                        return (
                          <div key={block._key || index} className="first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 first-letter:float-left first-letter:mr-4 first-letter:mt-2 first-letter:leading-none">
                            <p className="text-2xl leading-10 font-medium mb-8" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                              {block.children?.map((child: any) => child.text || '').join('') || ''}
                            </p>
                          </div>
                        )
                      }
                      if (block.style === 'h1') {
                        return (
                          <h1 key={block._key || index} className="text-5xl font-bold text-gray-900 mb-8 mt-16 leading-tight" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                            {block.children?.map((child: any) => child.text || '').join('') || ''}
                          </h1>
                        )
                      }
                      if (block.style === 'h2') {
                        return (
                          <h2 key={block._key || index} className="text-4xl font-bold text-gray-900 mb-6 mt-14 leading-tight border-b-2 border-gray-300 pb-3" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                            {block.children?.map((child: any) => child.text || '').join('') || ''}
                          </h2>
                        )
                      }
                      if (block.style === 'h3') {
                        return (
                          <h3 key={block._key || index} className="text-3xl font-bold text-gray-900 mb-5 mt-12 leading-tight" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                            {block.children?.map((child: any) => child.text || '').join('') || ''}
                          </h3>
                        )
                      }
                      if (block.listItem === 'bullet') {
                        return (
                          <div key={block._key || index} className="mb-8">
                            <div className="flex items-start gap-4">
                              <div className="w-2 h-2 bg-gray-800 rounded-full mt-3 flex-shrink-0"></div>
                              <p className="text-xl leading-9 font-medium text-gray-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                                {block.children?.map((child: any) => child.text || '').join('') || ''}
                              </p>
                            </div>
                          </div>
                        )
                      }
                      return (
                        <p key={block._key || index} className="text-xl leading-9 font-medium mb-8 text-gray-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
                          {block.children?.map((child: any) => child.text || '').join('') || ''}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-600 text-xl font-medium" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>İçerik henüz eklenmemiş.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center font-serif">
                İlgili Makaleler
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost._id} 
                    href={`/blog/${typeof relatedPost.slug === 'string' ? relatedPost.slug : relatedPost.slug?.current || relatedPost._id}`}
                    className="group"
                  >
                    <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {relatedPost.image?.asset?.url && (
                        <div className="aspect-[16/10] relative overflow-hidden">
                          <Image
                            src={relatedPost.image.asset.url}
                            alt={relatedPost.image.alt || relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {relatedPost.category}
                          </span>
                          <span>{formatDate(relatedPost.publishedAt)}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                          <User className="w-4 h-4" />
                          <span>{relatedPost.author.name}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/blog-haberler"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Blog & Haberler'e Dön
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
