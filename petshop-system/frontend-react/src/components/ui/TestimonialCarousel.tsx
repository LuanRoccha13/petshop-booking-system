/**
 * TestimonialCarousel — Infinite Loop Premium
 *
 * Utiliza Framer Motion para deslizar continuamente os depoimentos em um loop infinito (60fps).
 * 
 * Features:
 * - Loop perfeito por meio de duplicação transparente e medição do `offsetWidth`.
 * - Desaceleração suave (pause) no hover apenas em desktops (pointer: fine).
 * - Sem scrollbar, scroll manual nativo removido.
 * - Padding vertical generoso para evitar corte (clipping) do hover (scale/shadow).
 */

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, animate } from 'framer-motion';
import { MotionCard } from '../motion/MotionCard';
import { MOTION } from '../../design-tokens/motion';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  const x = useMotionValue(0);
  const speed = useMotionValue(1);

  // Measure the width of one set of testimonials to know exactly when to wrap
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContentWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [testimonials]);

  // Continuous animation loop
  useAnimationFrame((time, delta) => {
    if (!contentWidth) return;

    const currentSpeed = speed.get();
    if (currentSpeed === 0 && x.get() % contentWidth === 0) return;

    // Smooth speed: 45px per second
    const baseSpeedPxPerSec = 45; 
    const moveBy = baseSpeedPxPerSec * (delta / 1000) * currentSpeed;
    
    let newX = x.get() - moveBy;

    // Seamless loop: when the first set is fully off-screen, reset position
    if (newX <= -contentWidth) {
      newX += contentWidth;
    }

    x.set(newX);
  });

  const handleHoverStart = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      animate(speed, 0, { duration: 0.6, ease: "easeOut" });
    }
  };

  const handleHoverEnd = () => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      animate(speed, 1, { duration: 0.4, ease: "easeIn" });
    }
  };

  const renderCard = (item: Testimonial, index: number) => (
    <MotionCard
      key={index}
      interactive
      tilt
      whileHover={{
        y: -6,
        scale: 1.015,
        boxShadow: MOTION.shadow.cardHover,
        borderColor: 'rgba(235,106,44,0.30)',
      }}
      transition={MOTION.spring.physical}
      className="flex-none w-[85vw] md:w-[400px] shrink-0 min-h-[340px] flex flex-col justify-between border border-ink/10 p-8 md:p-10 rounded-2xl bg-surface-soft/60 backdrop-blur-md"
    >
      <div>
        <span className="text-5xl font-display font-bold text-brand-500 leading-none">"</span>
        <blockquote className="font-display text-xl md:text-2xl mt-4 leading-relaxed text-ink">
          {item.quote}
        </blockquote>
      </div>

      <div className="mt-10 border-t border-ink/10 pt-5">
        <strong className="block text-sm font-semibold text-ink font-body">
          {item.name}
        </strong>
        <span className="block text-[10px] uppercase tracking-wider text-ink-muted font-ui mt-1">
          {item.role}
        </span>
      </div>
    </MotionCard>
  );

  return (
    <div className="relative overflow-hidden pt-8 pb-16 -mx-5 md:mx-0">
      <div 
        className="flex"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onFocus={handleHoverStart}
        onBlur={handleHoverEnd}
      >
        <motion.div 
          className="flex px-5 md:px-0"
          style={{ x }}
        >
          {/* Set 1 */}
          <div ref={containerRef} className="flex gap-5 md:gap-8 pr-5 md:pr-8 shrink-0">
            {testimonials.map((item, idx) => renderCard(item, idx))}
          </div>
          
          {/* Set 2 (Duplicate for loop) */}
          <div className="flex gap-5 md:gap-8 pr-5 md:pr-8 shrink-0" aria-hidden="true">
            {testimonials.map((item, idx) => renderCard(item, idx))}
          </div>
        </motion.div>
      </div>

      {/* Indicadores decorativos */}
      <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 pointer-events-none">
        <div className="w-1.5 h-1.5 rounded-full bg-ink/15 animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-ink/15 animate-pulse" style={{ animationDelay: '0.4s' }} />
        <div className="w-1.5 h-1.5 rounded-full bg-ink/15 animate-pulse" style={{ animationDelay: '0.8s' }} />
      </div>
    </div>
  );
}
