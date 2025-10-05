"use client";

import React from 'react';
import AdvancedMasonryGrid from '@/components/AdvancedMasonryGrid';
import { sampleMasonryData } from '@/data/masonryData';
import '@/styles/masonry-grid.css';

export default function MasonryDemoPage() {
  return (
    <div className="min-h-screen">
      <AdvancedMasonryGrid cards={sampleMasonryData} />
    </div>
  );
}

