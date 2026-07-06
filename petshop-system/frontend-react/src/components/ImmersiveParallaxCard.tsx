import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

type ImmersiveParallaxCardProps = {
  /** Passe a imagem de fundo sem a pessoa recortada. */
  backgroundSrc: string;
  /** Passe o PNG/WebP transparente da silhueta/pessoa em primeiro plano. */
  foregroundSrc: string;
  /**
   * Substitua este valor pelo `d="..."` exportado do SVG que acompanha o contorno
   * da silhueta do foreground.
   */
  silhouettePath?: string;
  backgroundAlt?: string;
  foregroundAlt?: string;
  glowColor?: string;
  className?: string;
  cardClassName?: string;
};

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}

/**
 * Exemplo de uso:
 *
 * <ImmersiveParallaxCard
 *   backgroundSrc="/assets/background.jpg" // troque pelo fundo sem a pessoa
 *   foregroundSrc="/assets/woman-cutout.png" // troque pelo PNG transparente
 *   silhouettePath="M 500,300 ..." // opcional: cole aqui o path do contorno exportado do Figma/Illustrator
 * />
 */
export default function ImmersiveParallaxCard({
  backgroundSrc,
  foregroundSrc,
  silhouettePath,
  backgroundAlt = 'Imagem de fundo do card imersivo',
  foregroundAlt = 'Silhueta destacada em primeiro plano',
  glowColor = '#00ffcc',
  className,
  cardClassName,
}: ImmersiveParallaxCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, prefersReducedMotion
    ? { stiffness: 1000, damping: 200, mass: 0.1 }
    : { stiffness: 110, damping: 26, mass: 0.22 });

  const backgroundScale = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.15]
  );
  const foregroundScale = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.08]
  );
  const backgroundBlur = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? ['blur(0px)', 'blur(0px)', 'blur(0px)'] : ['blur(0px)', 'blur(2px)', 'blur(4px)']
  );
  const pathLength = useTransform(smoothProgress, [0.1, 0.6], prefersReducedMotion ? [1, 1] : [0, 1]);
  const rayOpacity = useTransform(
    smoothProgress,
    [0.05, 0.1, 0.5, 0.6],
    prefersReducedMotion ? [0.75, 0.75, 0.75, 0.75] : [0, 1, 1, 0]
  );
  const foregroundGlowOpacity = useTransform(
    smoothProgress,
    [0, 0.18, 0.55, 1],
    prefersReducedMotion ? [0.22, 0.22, 0.22, 0.22] : [0.08, 0.22, 0.24, 0.12]
  );

  return (
    <div
      ref={containerRef}
      className={cx('relative h-[220vh] bg-transparent', className)}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden px-4 md:px-8">
        <div
          className={cx(
            'relative aspect-[3/2] w-[min(92vw,1280px)] max-h-[78vh] overflow-hidden rounded-[28px] shadow-2xl',
            cardClassName
          )}
        >
          <motion.div
            style={{ scale: backgroundScale, filter: backgroundBlur }}
            className="absolute inset-0 z-0 h-full w-full"
          >
            {/* Troque `backgroundSrc` pela sua imagem de fundo sem a pessoa recortada. */}
            <img
              src={backgroundSrc}
              className="h-full w-full object-cover"
              alt={backgroundAlt}
            />
          </motion.div>

          {silhouettePath ? (
            <motion.svg
              style={{ opacity: rayOpacity }}
              viewBox="0 0 1000 1000"
              className="pointer-events-none absolute inset-0 z-10 h-full w-full mix-blend-screen"
              aria-hidden="true"
            >
              <motion.path
                /* Substitua `silhouettePath` pelo `d="..."` exportado do seu SVG. */
                d={silhouettePath}
                fill="none"
                stroke={glowColor}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  pathLength,
                  filter: `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 18px ${glowColor})`,
                }}
              />
            </motion.svg>
          ) : null}

          <motion.div
            style={{ opacity: foregroundGlowOpacity }}
            className="pointer-events-none absolute inset-x-[18%] bottom-[6%] z-[15] h-[62%] rounded-full blur-3xl"
            aria-hidden="true"
          >
            <div
              className="h-full w-full rounded-full"
              style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 68%)` }}
            />
          </motion.div>

          <motion.div
            style={{ scale: foregroundScale }}
            className="absolute inset-0 z-20 h-full w-full origin-bottom"
          >
            {/* Troque `foregroundSrc` pelo PNG transparente da pessoa/silhueta. */}
            <img
              src={foregroundSrc}
              className="h-full w-full origin-bottom object-cover object-center"
              alt={foregroundAlt}
            />
          </motion.div>

          <div
            className="pointer-events-none absolute inset-0 z-30"
            aria-hidden="true"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.04) 45%, rgba(0,0,0,0.22) 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
