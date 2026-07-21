import React from 'react';
import { motion } from 'framer-motion';

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  return (
    <div className="relative -mx-5 px-5 pb-8 overflow-x-auto flex gap-5 snap-x snap-mandatory scrollbar-none md:mx-0 md:px-0">
      {testimonials.map((item, index) => (
        <motion.article 
          key={index}
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-none w-[85vw] max-w-[420px] snap-center shrink-0 min-h-[340px] flex flex-col justify-between border border-ink/10 p-8 md:p-10 rounded-2xl bg-surface-soft/60 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_12px_24px_rgba(33,24,17,0.04)] transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:border-brand-500/30 hover:shadow-[0_24px_48px_rgba(33,24,17,0.08),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-2"
        >
          <div>
            <span className="text-5xl font-display font-bold text-brand-500 leading-none">“</span>
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
        </motion.article>
      ))}
    </div>
  );
}
