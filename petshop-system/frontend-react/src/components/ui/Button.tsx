import { forwardRef } from 'react';
import { HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Spinner } from './Spinner';
import { MotionButton } from '../motion/MotionButton';
import { MOTION } from '../../design-tokens/motion';

export interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

/**
 * Foundation Button Component
 *
 * Herda toda a física do MotionButton (primitivo da Motion Library).
 * Toda animação usa MOTION tokens — nenhum valor hardcoded.
 * Suporta variantes, tamanhos e estado de loading.
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
      'inline-flex items-center justify-center gap-2 font-ui font-semibold rounded-[12px] outline-none whitespace-nowrap isolation-auto';

    const variants = {
      primary:
        'bg-brand-500 text-white',
      secondary:
        'bg-surface/72 text-ink border border-dark-border',
      ghost:
        'bg-transparent text-brand-600 hover:bg-brand-soft',
      danger:
        'bg-danger text-white',
    };

    // Sombras via MOTION tokens — não Tailwind
    const shadowMap = {
      primary:   MOTION.shadow.btnPrimary,
      secondary: MOTION.shadow.cardRest,
      ghost:     MOTION.shadow.none,
      danger:    '0 14px 32px rgba(200,61,53,0.18)',
    };

    const hoverShadowMap = {
      primary:   MOTION.shadow.btnHover,
      secondary: MOTION.shadow.cardHover,
      ghost:     MOTION.shadow.none,
      danger:    '0 20px 44px rgba(200,61,53,0.30)',
    };

    const sizes = {
      sm: 'text-[0.82rem] px-[18px] py-[11px] min-h-[40px]',
      md: 'text-[0.95rem] px-[28px] py-[15px] min-h-[48px]',
      lg: 'text-[1rem] px-[34px] py-[18px] min-h-[56px]',
    };

    const isDisabled = disabled || isLoading;

    return (
      <MotionButton
        ref={ref}
        disabled={isDisabled}
        isLoading={isLoading}
        showGlow={variant === 'primary'}
        // Sobrescreve whileHover para incluir a shadow correta por variante
        whileHover={!isDisabled ? {
          scale: MOTION.scale.hover,
          y: -1,
          boxShadow: hoverShadowMap[variant],
        } : {}}
        whileTap={!isDisabled ? {
          scale: MOTION.scale.tap,
          y: 0,
        } : {}}
        style={{ boxShadow: shadowMap[variant] }}
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
      </MotionButton>
    );
  }
);

Button.displayName = 'Button';
