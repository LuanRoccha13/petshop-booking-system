import React from 'react';
import { motion, HTMLMotionProps, useInView } from 'framer-motion';
import { cn } from '../../utils/cn';
import { PREMIUM_TRANSITIONS } from '../../design-tokens/motion';

export interface SectionProps extends HTMLMotionProps<'section'> {
  animateOnScroll?: boolean;
}

/**
 * Structural section of a page.
 * Supports scroll-driven entry animations if `animateOnScroll` is true.
 */
export function Section({ className, children, animateOnScroll = false, ...props }: SectionProps) {
  const ref = React.useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.section
      ref={ref}
      initial={animateOnScroll ? { opacity: 0, y: 20 } : false}
      animate={animateOnScroll ? (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }) : undefined}
      transition={PREMIUM_TRANSITIONS.fadeEmphasis}
      className={cn('w-full py-section', className)}
      {...props}
    >
      {children}
    </motion.section>
  );
}
