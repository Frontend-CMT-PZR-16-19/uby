# Advanced Masonry Grid Layout

A fully responsive, high-performance masonry grid layout system built with Next.js, TypeScript, and Tailwind CSS. Features modern magazine aesthetics with smooth animations and editorial typography.

## 🚀 Features

### Core Functionality
- **CSS Grid-based Layout**: Optimized performance with native CSS Grid
- **Variable Card Heights**: Dynamic sizing system for natural masonry flow
- **Responsive Design**: Adapts seamlessly across all device sizes
- **Mixed Content Support**: Images, headlines, subheadings, and text excerpts

### Visual Design
- **Magazine Aesthetics**: Clean, editorial design inspired by high-end publications
- **Apple/iOS Typography**: Large headlines, generous white space, minimalistic sans-serif fonts
- **Smooth Animations**: Subtle hover effects with scale, shadow, and overlay transitions
- **Light/Dark Mode**: Built-in theme switching with smooth transitions

### Performance
- **Lazy Loading**: Intersection Observer-based image lazy loading
- **Optimized Images**: Next.js Image component with proper sizing
- **Smooth Scrolling**: Native CSS scroll behavior
- **Accessibility**: Full keyboard navigation and screen reader support

## 📱 Responsive Breakpoints

- **Mobile**: 1-2 columns
- **Tablet**: 2-3 columns  
- **Desktop**: 4-5 columns
- **Large Desktop**: 5 columns

## 🎨 Card Sizes

The grid supports multiple card sizes for visual hierarchy:

- **Featured**: 2x2 grid span with large aspect ratio
- **Large**: 1x2 grid span with 4:3 aspect ratio
- **Medium**: 1x1 grid span with 3:2 aspect ratio
- **Small**: 1x1 grid span with 5:4 aspect ratio
- **Tall**: 1x1 grid span with 3:5 aspect ratio
- **Wide**: 2x1 grid span with 8:3 aspect ratio
- **Square**: 1x1 grid span with 1:1 aspect ratio

## 📁 File Structure

```
src/
├── components/
│   └── AdvancedMasonryGrid.tsx    # Main grid component
├── styles/
│   └── masonry-grid.css          # Grid styles and animations
├── data/
│   └── masonryData.ts            # Sample data
└── app/
    └── (content)/
        └── masonry-demo/
            └── page.tsx          # Demo page
```

## 🛠️ Usage

### Basic Implementation

```tsx
import AdvancedMasonryGrid from '@/components/AdvancedMasonryGrid';
import { sampleMasonryData } from '@/data/masonryData';

export default function MyPage() {
  return (
    <div>
      <AdvancedMasonryGrid cards={sampleMasonryData} />
    </div>
  );
}
```

### Custom Data Structure

```typescript
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
```

## 🎯 Key Components

### AdvancedMasonryGrid
- Main grid container with responsive columns
- Dark mode toggle functionality
- Load more pagination
- Lazy loading implementation

### MasonryCard
- Individual card component
- Hover animations and transitions
- Category badges and meta information
- Responsive typography scaling

### CSS Grid System
- Auto-fit columns with minimum widths
- Gap-based spacing system
- Aspect ratio preservation
- Smooth transitions and animations

## 🌙 Dark Mode Support

The grid automatically detects system preferences and provides a toggle button. Dark mode includes:

- Inverted color schemes
- Adjusted shadows and overlays
- Maintained contrast ratios
- Smooth transition animations

## ♿ Accessibility Features

- **Semantic HTML**: Proper article, heading, and navigation elements
- **ARIA Labels**: Screen reader friendly labels and descriptions
- **Keyboard Navigation**: Full keyboard accessibility
- **Reduced Motion**: Respects `prefers-reduced-motion` settings
- **High Contrast**: Maintains readability in all themes

## 🚀 Performance Optimizations

- **Intersection Observer**: Efficient lazy loading implementation
- **CSS Grid**: Native browser optimization
- **Image Optimization**: Next.js Image component with proper sizing
- **Minimal JavaScript**: Lightweight interactions and animations
- **Critical CSS**: Inline critical styles for faster rendering

## 🎨 Customization

### CSS Variables
The grid uses CSS custom properties for easy theming:

```css
:root {
  --grid-gap: 2rem;
  --card-radius: 16px;
  --shadow-light: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.15);
}
```

### Typography Scale
Responsive typography system:

```css
.masonry-card-title {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-weight: 700;
  line-height: 1.2;
}
```

## 📊 Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **CSS Grid**: Full support in all modern browsers
- **CSS Custom Properties**: Supported in all target browsers
- **Intersection Observer**: Polyfill available for older browsers

## 🔧 Development

### Prerequisites
- Node.js 18+
- Next.js 14+
- TypeScript 5+
- Tailwind CSS 3+

### Installation
```bash
npm install
npm run dev
```

### Demo
Visit `/masonry-demo` to see the grid in action with sample data.

## 📝 License

This project is part of the Üçüncü Binyıl Akademi website and follows the same licensing terms.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**

