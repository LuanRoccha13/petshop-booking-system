import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Spinner } from './Spinner';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Foundation Button Component
 * Supports variants, sizes, and loading state.
 * Uses Framer Motion for micro-interactions (hover, tap) following the Design System.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative inline-flex items-center justify-center gap-2 font-ui font-semibold rounded-pill outline-none whitespace-nowrap overflow-hidden isolation-auto';

    const variants = {
      primary:
        'bg-brand-500 text-white shadow-[0_14px_32px_rgba(235,106,44,0.18)] hover:brightness-105 hover:shadow-[0_18px_36px_rgba(235,106,44,0.24)]',
      secondary:
        'bg-surface/72 text-ink border border-dark-border shadow-sm hover:border-brand-500/30 hover:text-brand-600 hover:shadow-md',
      ghost:
        'bg-transparent text-brand-600 hover:bg-brand-soft',
      danger:
        'bg-danger text-white shadow-[0_14px_32px_rgba(200,61,53,0.18)] hover:brightness-105',
    };

    const sizes = {
      sm: 'text-[0.82rem] px-[18px] py-[11px] min-h-[40px]',
      md: 'text-[0.95rem] px-[28px] py-[15px] min-h-[48px]',
      lg: 'text-[1rem] px-[34px] py-[18px] min-h-[56px]',
    };

    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.01 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ duration: 0.14, ease: [0.2, 0.8, 0.2, 1] }} // motion-fast
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isDisabled && 'opacity-50 cursor-not-allowed',
          'focus-visible:shadow-focus',
          className
        )}
        {...props}
      >
        {/* Glow effect for primary button */}
        {variant === 'primary' && !isDisabled && (
          <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 -translate-x-[18%] scale-105 hover:opacity-100 hover:translate-x-0 hover:scale-100 transition-all duration-300 pointer-events-none" />
        )}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner size={size === 'sm' ? 14 : 18} />
        </span>
      )}
      <span className={cn('flex items-center gap-2', isLoading && 'opacity-0')}>
        {leftIcon}
        {children as React.ReactNode}
        {rightIcon}
      </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
