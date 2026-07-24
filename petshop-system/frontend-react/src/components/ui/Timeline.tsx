import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation, useMotionValueEvent, MotionValue } from 'framer-motion';
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

function TimelineNode({ item, index, total, lineProgress }: { item: TimelineItemProps, index: number, total: number, lineProgress: MotionValue<number> }) {
  const controls = useAnimation();
  const wasActive = useRef(false);
  
  // Ponto de ativação. Ex: 4 itens -> 0, 0.33, 0.66, 1
  // Subtraímos 0.04 (aprox 4%) para que o nó acenda exatamente quando a ponta da linha toca o topo dele
  const threshold = (index / Math.max(total - 1, 1)) - 0.04;

  // Sincroniza perfeitamente com a linha de progresso
  useMotionValueEvent(lineProgress, 'change', (latest) => {
    const isActive = latest >= threshold;

    if (isActive !== wasActive.current) {
      wasActive.current = isActive;

      if (isActive) {
        // Ativando (descendo) -> Cor da marca + Bounce (escala rápida)
        controls.start({
          backgroundColor: 'var(--color-brand-500)',
          borderColor: 'var(--color-brand-500)',
          color: '#ffffff',
          boxShadow: '0 0 0 1px rgba(235,106,44,0.15), 0 8px 18px rgba(235,106,44,0.18)',
          scale: [1, 1.08, 1],
          transition: {
            duration: MOTION.duration.base,
            ease: MOTION.ease.premium,
          }
        });
      } else {
        // Desativando (subindo) -> Retorno suave (sem bounce)
        controls.start({
          backgroundColor: 'var(--color-surface)',
          borderColor: 'rgba(64, 43, 21, 0.12)', // --color-ink/12 aproximado
          color: 'var(--color-text)', // ink
          boxShadow: '0 0 0 0px rgba(235,106,44,0)',
          scale: 1,
          transition: {
            duration: MOTION.duration.base,
            ease: MOTION.ease.premium,
          }
        });
      }
    }
  });

  const isLast = index === total - 1;

  return (
    <motion.article
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
      {/* Indicador Numérico */}
      <motion.span
        animate={controls}
        initial={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'rgba(64, 43, 21, 0.12)',
          color: 'var(--color-text)',
          boxShadow: '0 0 0 0px rgba(235,106,44,0)',
          scale: 1,
        }}
        className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-ui text-[10px] tracking-wider font-semibold"
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
}

export function Timeline({ items }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress da seção inteira — fonte de verdade
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

      {items.map((item, index) => (
        <TimelineNode
          key={index}
          item={item}
          index={index}
          total={items.length}
          lineProgress={lineProgress}
        />
      ))}
    </div>
  );
}
