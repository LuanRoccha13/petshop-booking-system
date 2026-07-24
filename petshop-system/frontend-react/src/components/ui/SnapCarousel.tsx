import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface SnapCarouselProps {
  children: React.ReactNode[];
  /** Optional class for the container */
  className?: string;
  /** Gap between items */
  gap?: 'sm' | 'md' | 'lg';
  /** If provided, converts to a grid on desktop with these many columns */
  desktopGridCols?: 2 | 3 | 4;
}

export function SnapCarousel({ children, className = '', gap = 'md', desktopGridCols }: SnapCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const gapClass = {
    sm: 'gap-4',
    md: 'gap-6 md:gap-8',
    lg: 'gap-8 md:gap-12',
  }[gap];

  const gridColsClass = desktopGridCols ? {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[desktopGridCols] : '';

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      // Calculando qual item está mais próximo do centro (ou esquerda)
      const scrollLeft = container.scrollLeft;
      const itemWidth = container.scrollWidth / children.length;
      
      const newIndex = Math.round(scrollLeft / itemWidth);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < children.length) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to handle initial state
    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, [children.length, activeIndex]);

  const scrollTo = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    // A simple approach: we assume items are roughly equal width and fill the scrollable space.
    const itemWidth = container.scrollWidth / children.length;
    container.scrollTo({
      left: itemWidth * index,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Scrollable Track */}
      <div 
        ref={scrollRef}
        className={`flex overflow-x-auto snap-x snap-mandatory hide-scrollbar ${gapClass} px-5 md:px-0 ${
          desktopGridCols ? `md:grid ${gridColsClass} md:overflow-visible md:snap-none` : ''
        }`}
        style={{
          scrollPaddingLeft: '1.25rem', // Match px-5
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div key={index} className={`snap-start flex-none w-[85vw] max-w-full ${desktopGridCols ? 'md:w-auto' : 'md:w-[400px]'}`}>
            {child}
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      {children.length > 1 && (
        <div className={`flex items-center justify-center gap-2 mt-8 lg:mt-10 ${desktopGridCols ? 'md:hidden' : ''}`}>
          {children.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Ir para o slide ${i + 1}`}
              className="relative p-2 outline-none group"
            >
              <div 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i 
                    ? 'bg-brand-500 w-6' 
                    : 'bg-ink/15 group-hover:bg-ink/30'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
