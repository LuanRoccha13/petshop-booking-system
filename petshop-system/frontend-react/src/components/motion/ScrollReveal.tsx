/**
 * ScrollReveal — Componente reutilizável de entrada no viewport
 *
 * Elimina o padrão repetido de initial/whileInView/viewport/transition
 * espalhado pela Landing Page. Toda entrada usa a mesma linguagem:
 * opacity + translateY + blur, com MOTION tokens, sem valores hardcoded.
 *
 * Uso:
 *   <ScrollReveal delay={0.1}>
 *     <p>Aparece suavemente ao entrar no viewport</p>
 *   </ScrollReveal>
 *
 *   <ScrollReveal as="section" delay={0.2} blur={false}>
 *     <MySection />
 *   </ScrollReveal>
 */

import { motion, HTMLMotionProps } from 'framer-motion';
import { MOTION } from '../../design-tokens/motion';
import { cn } from '../../utils/cn';

type ValidTag = 'div' | 'section' | 'article' | 'header' | 'footer' | 'main' | 'aside' | 'span';

export interface ScrollRevealProps extends Omit<HTMLMotionProps<'div'>, 'initial' | 'whileInView' | 'viewport' | 'transition'> {
  /** Delay em segundos antes da animação iniciar. Default: 0 */
  delay?: number;
  /** Aplica blur de entrada. Default: true */
  blur?: boolean;
  /** Distância vertical de entrada em px. Default: 16 */
  y?: number;
  /** Threshold de viewport. Default: 'standard' (-8%) */
  threshold?: keyof typeof MOTION.viewport;
  /** Tag HTML a renderizar. Default: 'div' */
  as?: ValidTag;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  blur = true,
  y = 16,
  threshold = 'standard',
  as: Tag = 'div',
  ...props
}: ScrollRevealProps) {
  const MotionTag = motion[Tag as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial={{
        opacity: 0,
        y,
        filter: blur ? MOTION.blur.reveal : MOTION.blur.none,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: MOTION.blur.none,
      }}
      viewport={MOTION.viewport[threshold]}
      transition={{
        duration: MOTION.duration.enter,
        delay,
        ease: MOTION.ease.premium,
      }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
