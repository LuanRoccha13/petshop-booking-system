import React, { createContext, type ReactNode } from 'react';
import { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
import { MotionCard } from '../motion/MotionCard';

const CardContext = createContext<{ isHovered: boolean }>({ isHovered: false });

export interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  interactive?: boolean;
  variant?: 'default' | 'glass' | 'elevated' | 'flat' | 'highlight' | 'minimal';
  tilt?: boolean;
  children?: ReactNode;
}

/**
 * Foundation Card Component
 *
 * Herda toda a física do MotionCard (primitivo da Motion Library).
 * Cards interativos têm cursor spotlight via MotionValues — zero re-render.
 * Cards interativos opcionalmente têm micro-inclinação (tilt).
 */
export function Card({
  className,
  children,
  interactive = false,
  variant = 'default',
  tilt = false,
  ...props
}: CardProps) {
  const variants = {
    default:   'bg-surface/88 border border-dark-border/10 shadow-sm',
    glass:     'bg-surface/60 backdrop-blur-md border border-white/20',
    elevated:  'bg-surface border border-dark-border/5 shadow-elevation-2',
    flat:      'bg-surface-soft border-transparent',
    highlight: 'bg-brand-500/5 border border-brand-500/20 text-brand-900',
    minimal:   'bg-transparent border-transparent p-0',
  };

  return (
    <CardContext.Provider value={{ isHovered: false }}>
      <MotionCard
        interactive={interactive}
        tilt={tilt && interactive}
        className={cn(
          'rounded-2xl p-6 border transition-colors duration-300',
          variants[variant],
          interactive && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </MotionCard>
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
