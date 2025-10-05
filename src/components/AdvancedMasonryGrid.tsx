"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface MasonryCardData {
  id: string;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  category: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  featured?: boolean;
  size?: 'featured' | 'large' | 'medium' | 'small';
}

interface AdvancedMasonryGridProps {
  cards: MasonryCardData[];
  className?: string;
}

const AdvancedMasonryGrid: React.FC<AdvancedMasonryGridProps> = ({ 
  cards, 
  className = '' 
}) => {
  const [visibleCards, setVisibleCards] = useState<number>(8);
  const [isLoading, setIsLoading] = useState(false);

  // Load more cards
  const loadMore = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCards(prev => Math.min(prev + 4, cards.length));
      setIsLoading(false);
    }, 800);
  }, [cards.length]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const images = document.querySelectorAll('img[data-src]');
    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, [visibleCards]);


  const getCardSize = (index: number, featured?: boolean): string => {
    if (featured) return 'featured';
    const sizes = ['large', 'medium', 'small', 'medium', 'large', 'small'];
    return sizes[index % sizes.length];
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const MasonryCard: React.FC<{ card: MasonryCardData; index: number }> = ({ 
    card, 
    index 
  }) => {
    const size = card.size || getCardSize(index, card.featured);
    
    return (
      <article 
        className={`masonry-card ${size}`}
        role="article"
        aria-labelledby={`title-${card.id}`}
      >
        <div className="masonry-card-image">
          <Image
            src={card.image.url}
            alt={card.image.alt}
            width={card.image.width}
            height={card.image.height}
            priority={index < 4}
            className="transition-transform duration-700 ease-out"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%'
            }}
          />
          <div className="masonry-card-overlay" />
          <div className="masonry-card-category">
            {card.category}
          </div>
        </div>

        <div className="masonry-card-content">
          <h2 
            id={`title-${card.id}`}
            className="masonry-card-title"
          >
            {card.title}
          </h2>
          
          <p className="masonry-card-excerpt">
            {card.excerpt}
          </p>

          <div className="masonry-card-meta">
            <div className="masonry-card-author">
              <User className="w-4 h-4" />
              <span>{card.author.name}</span>
            </div>
            <div className="masonry-card-date">
              <Calendar className="w-4 h-4 inline mr-1" />
              {formatDate(card.publishedAt)}
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Modern
            <span className="text-gray-700 block">
              Magazine Grid
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A responsive masonry grid layout with clean design, 
            elegant typography, and professional magazine aesthetics.
          </p>
        </div>
      </header>

      {/* Masonry Grid */}
      <main className="masonry-container">
        {cards.slice(0, visibleCards).map((card, index) => (
          <MasonryCard 
            key={card.id} 
            card={card} 
            index={index}
          />
        ))}
      </main>

      {/* Load More Button */}
      {visibleCards < cards.length && (
        <div className="text-center py-16">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded transition-colors duration-200"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Loading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Load More Articles
                <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center py-16 px-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 mb-4">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
          <p className="text-sm text-gray-500">
            Advanced Masonry Grid Layout • Responsive Design • Clean Typography
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdvancedMasonryGrid;
