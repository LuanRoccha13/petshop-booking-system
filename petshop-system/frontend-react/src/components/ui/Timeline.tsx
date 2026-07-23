/**
 * Timeline — Narrativa visual scroll-driven
 *
 * A linha de progresso preenche conforme o scroll avança.
 * Cada nó acende quando entra na zona de leitura do viewport.
 * Tudo baseado em scroll — nenhum timeout ou animação baseada em tempo.
 * Todos os valores de animação usam MOTION tokens.
 */

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { MOTION } from '../../design-tokens/motion';

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress da seção inteira — fonte de verdade da linha
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  });

  // Spring suaviza o scroll para a linha não saltar
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  const lineScaleY = useTransform(lineProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Trilho da linha (fundo cinza) */}
      <div
        className="absolute top-5 bottom-5 left-[19px] w-px bg-ink/8"
        aria-hidden="true"
      />

      {/* Linha de progresso — cresce com o scroll */}
      <motion.div
        aria-hidden="true"
        className="absolute top-5 bottom-5 left-[19px] w-px origin-top bg-brand-500/60"
        style={{ scaleY: lineScaleY }}
      />

      {items.map((item, index) => {
        const threshold = index / Math.max(items.length - 1, 1);
        // Nó acende quando o scroll passa seu threshold
        const nodeOpacity = useTransform(
          lineProgress,
          [Math.max(0, threshold - 0.05), threshold + 0.08],
          [0.35, 1]
        );
        const nodeScale = useTransform(
          lineProgress,
          [Math.max(0, threshold - 0.05), threshold + 0.08],
          [0.85, 1]
        );
        const isLast = index === items.length - 1;

        return (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20, filter: MOTION.blur.reveal }}
            whileInView={{ opacity: 1, y: 0, filter: MOTION.blur.none }}
            viewport={MOTION.viewport.standard}
            transition={{
              duration: MOTION.duration.enter,
              delay: index * MOTION.stagger.base,
              ease: MOTION.ease.premium,
            }}
            className={`relative grid grid-cols-[40px_1fr] gap-5 sm:gap-7 ${!isLast ? 'pb-16' : ''}`}
          >
            {/* Nó — acende via scroll progress */}
            <motion.span
              style={{ opacity: nodeOpacity, scale: nodeScale }}
              className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-ui text-[10px] tracking-wider font-semibold transition-colors duration-700 ${
                item.isActive
                  ? 'bg-brand-500 text-white border-brand-500 shadow-[0_0_20px_rgba(235,106,44,0.35)]'
                  : 'bg-surface text-ink border-ink/12'
              }`}
            >
              {item.number}
            </motion.span>

            {/* Conteúdo */}
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
