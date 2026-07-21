import React from 'react';
import { motion } from 'framer-motion';

export interface TimelineItemProps {
  number: string;
  title: string;
  description: string;
  isActive?: boolean;
}

export interface TimelineProps {
  items: TimelineItemProps[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical Line */}
      <div 
        className="absolute top-6 bottom-6 left-[19px] w-px bg-ink/10" 
        aria-hidden="true" 
      />
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <motion.article 
            key={index}
            initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`relative grid grid-cols-[40px_1fr] gap-5 sm:gap-7 ${!isLast ? 'pb-16' : ''}`}
          >
            {/* Number Circle */}
            <span 
              className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/10 font-ui text-[10px] tracking-wider font-semibold shadow-sm transition-colors duration-500 ${
                item.isActive 
                  ? 'bg-brand-500 text-white border-brand-500 shadow-[0_0_24px_rgba(235,106,44,0.3)]' 
                  : 'bg-surface text-ink'
              }`}
            >
              {item.number}
            </span>
            
            {/* Content */}
            <div className="border-t border-ink/10 pt-5 mt-5">
              <h3 className="font-display text-2xl font-bold text-ink mb-3 tracking-tight">
                {item.title}
              </h3>
              <p className="text-base leading-relaxed text-ink-muted max-w-xl">
                {item.description}
              </p>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
