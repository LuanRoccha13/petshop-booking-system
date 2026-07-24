/**
 * MotionButton — Primitivo base da Motion Library
 *
 * Toda a física de botões do projeto herda daqui.
 * Nenhum valor de animação é hardcoded — tudo usa MOTION tokens.
 *
 * Button.tsx usa este primitivo internamente.
 * Não é para uso direto — use o <Button> do Design System.
 */

import { forwardRef, type ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { MOTION } from '../../design-tokens/motion';
import { cn } from '../../utils/cn';

export interface MotionButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  disabled?: boolean;
  isLoading?: boolean;
  showGlow?: boolean;
  shimmer?: boolean;
  children?: ReactNode;
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, children, disabled, isLoading, showGlow = false, shimmer = false, ...props }, ref) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        whileHover={!isDisabled ? {
          scale: MOTION.scale.hover,
          y: -1,
        } : {}}
        whileTap={!isDisabled ? {
          scale: MOTION.scale.tap,
          y: 0,
        } : {}}
        transition={{
          duration: MOTION.duration.base,
          ease: MOTION.ease.premium,
        }}
        className={cn('relative overflow-hidden group', className)}
        {...props}
      >
        {/* Glow interno animado — via motion.span, não Tailwind hover */}
        {showGlow && !isDisabled && (
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, rgba(255,255,255,0.22) 0%, transparent 55%)',
            }}
            initial={{ opacity: 0, x: '-20%' }}
            whileHover={{ opacity: 1, x: '0%' }}
            transition={{
              duration: MOTION.duration.slow,
              ease: MOTION.ease.premium,
            }}
          />
        )}
        
        {/* Shimmer Effects: Border contínua, Sweep rotacional, Breathe glow na base */}
        {shimmer && !isDisabled && (
          <>
            <div className="shimmer-border" aria-hidden="true" />
            <div className="shimmer-sweep" aria-hidden="true" />
            <div className="shimmer-breathe" aria-hidden="true" />
          </>
        )}
        
        {children}
      </motion.button>
    );
  }
);

MotionButton.displayName = 'MotionButton';
