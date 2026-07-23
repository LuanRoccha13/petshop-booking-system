/**
 * TestimonialCarousel — Infinite Marquee Premium
 *
 * Desliza continuamente da direita para a esquerda usando CSS puro (acelerado por GPU).
 * A interação não possui scrollbar e desacelera/pausa via `animation-play-state` no CSS (`.marquee-track:hover`).
 * 
 * Padding vertical inserido para evitar clipping (corte de shadows/elevations).
 * Duplicação de elementos para loop perfeito sem re-renderizações ou reflows JS.
 */

import { motion } from 'framer-motion';
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
  // Duplicamos a lista para o loop infinito funcionar perfeitamente com 50% de translado no CSS
  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <div 
      className="relative -mx-5 px-5 py-8 md:mx-0 md:px-0 overflow-hidden"
      style={{
        // Máscara elegante para esvanecer os cantos laterais do marquee
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div className="marquee-track gap-5">
        {infiniteTestimonials.map((item, index) => (
          <MotionCard
            key={index}
            interactive
            tilt
            // initial e whileInView removidos para que não repitam ou atrasem no loop contínuo
            // O hover possui física spring, spotlight por padrão via MotionCard
            whileHover={{
              y: -8,
              rotateZ: 0.5,
              boxShadow: MOTION.shadow.cardHover,
              borderColor: 'rgba(235,106,44,0.30)',
            }}
            transition={MOTION.spring.physical}
            className="flex-none w-[85vw] max-w-[420px] shrink-0 min-h-[340px] flex flex-col justify-between border border-ink/10 p-8 md:p-10 rounded-2xl bg-surface-soft/60 backdrop-blur-md"
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
        ))}
      </div>
    </div>
  );
}
