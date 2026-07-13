import React, { createContext, useContext, useState } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
import { PREMIUM_TRANSITIONS } from '../../design-tokens/motion';

const CardContext = createContext<{
  isHovered: boolean;
  setIsHovered: (v: boolean) => void;
}>({ isHovered: false, setIsHovered: () => {} });

export interface CardProps extends HTMLMotionProps<'div'> {
  interactive?: boolean;
  variant?: 'default' | 'glass' | 'elevated' | 'flat' | 'highlight' | 'minimal';
}

export function Card({ className, children, interactive = false, variant = 'default', ...props }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    default: 'bg-surface/88 border border-dark-border/10 shadow-sm',
    glass: 'bg-surface/60 backdrop-blur-md border border-white/20 shadow-elevation-1',
    elevated: 'bg-surface border border-dark-border/5 shadow-elevation-2',
    flat: 'bg-surface-soft border-transparent',
    highlight: 'bg-brand-500/5 border border-brand-500/20 text-brand-900',
    minimal: 'bg-transparent border-transparent p-0',
  };

  return (
    <CardContext.Provider value={{ isHovered, setIsHovered }}>
      <motion.div
        onHoverStart={() => interactive && setIsHovered(true)}
        onHoverEnd={() => interactive && setIsHovered(false)}
        whileHover={interactive ? { y: -2, boxShadow: 'var(--shadow-elevation-2)', borderColor: 'rgba(235, 106, 44, 0.2)' } : {}}
        transition={PREMIUM_TRANSITIONS.springComfortable}
        className={cn(
          'relative overflow-hidden rounded-2xl p-6 transition-colors',
          variants[variant],
          interactive && 'cursor-pointer hover:bg-surface',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    </CardContext.Provider>
  );
}

Card.Header = function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col gap-1.5 mb-4', className)} {...props}>
      {children}
    </div>
  );
};

Card.Title = function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('font-display text-xl font-bold text-ink m-0', className)} {...props}>
      {children}
    </h3>
  );
};

Card.Description = function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-ink-muted leading-relaxed m-0', className)} {...props}>
      {children}
    </p>
  );
};

Card.Content = function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-ink', className)} {...props}>
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-6 pt-4 border-t border-dark-border/10 flex items-center justify-end gap-3', className)} {...props}>
      {children}
    </div>
  );
};
