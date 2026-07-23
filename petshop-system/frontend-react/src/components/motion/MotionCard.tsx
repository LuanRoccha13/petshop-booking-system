/**
 * MotionCard — Primitivo base da Motion Library
 *
 * Implementa cursor spotlight via useMotionValue + useMotionTemplate.
 * O Framer Motor atualiza o background diretamente no DOM — zero re-render.
 *
 * Card.tsx usa este primitivo internamente para cards interativos.
 */

import { useRef, useCallback, type ReactNode } from 'react';
import { motion, useMotionValue, useMotionTemplate, HTMLMotionProps } from 'framer-motion';
import { MOTION } from '../../design-tokens/motion';
import { cn } from '../../utils/cn';

export interface MotionCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  interactive?: boolean;
  spotlightColor?: string;
  tilt?: boolean;
  children?: ReactNode;
}

export function MotionCard({
  className,
  children,
  interactive = false,
  spotlightColor = 'rgba(235,106,44,0.06)',
  tilt = false,
  ...props
}: MotionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // MotionValues — atualizados pelo Framer direto no DOM, sem re-render
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Template reativo: string de background atualizada por frame pelo Framer
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      rotateX.set(((y - centerY) / centerY) * -1.5);
      rotateY.set(((x - centerX) / centerX) * 1.5);
    }
  }, [interactive, mouseX, mouseY, rotateX, rotateY, tilt]);

  const handleMouseLeave = useCallback(() => {
    if (!interactive) return;
    if (tilt) {
      rotateX.set(0);
      rotateY.set(0);
    }
  }, [interactive, rotateX, rotateY, tilt]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={interactive ? {
        y: -4,
        boxShadow: MOTION.shadow.cardHover,
        borderColor: 'rgba(235,106,44,0.22)',
      } : {}}
      style={interactive ? { rotateX, rotateY } : {}}
      transition={MOTION.spring.physical}
      className={cn('relative', className)}
      {...props}
    >
      {/* Spotlight que segue o cursor — via MotionTemplate, zero re-render */}
      {interactive && (
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-0"
          style={{ background: spotlight }}
        />
      )}
      <span className="relative z-10 flex flex-col h-full">
        {children}
      </span>
    </motion.div>
  );
}
