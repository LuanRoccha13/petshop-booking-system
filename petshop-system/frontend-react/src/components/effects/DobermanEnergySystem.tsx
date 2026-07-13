/**
 * DobermanEnergySystem
 *
 * A scroll-driven electrical aura system built exclusively with SVG + Framer Motion.
 * Paths are hand-traced from the actual PNG silhouette (1960×1533 px, Photoroom cutout).
 *
 * Layer architecture:
 *   0 → ambient radial glow       (fills the energy zone)
 *   1 → soft glow outline         (thick, blurred, warm orange halo)
 *   2 → main crisp outline        (animated pathLength, turbulence displaced)
 *   3 → feature paths             (ears, muzzle arc, collar line)
 *   4 → micro sparks              (tiny animating circles)
 *
 * The component is fully decoupled from LandingPage business logic.
 * Pass a `containerRef` pointing to the scroll container (the Hero <section>).
 * Energy progresses from 0 (hero fully in viewport) → 1 (hero fully scrolled past).
 *
 * Extending to other sections:
 * – Export `useEnergyProgress(containerRef)` hook to reuse scroll logic elsewhere.
 * – Accept a `paths` prop to swap in different silhouette data per section.
 */

import { RefObject, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';

/* ─── Types ──────────────────────────────────────────────────────────────── */

export interface EnergySystemProps {
  /** Ref to the hero <section> — used as scroll target */
  containerRef: RefObject<HTMLElement>;
  /** Optional className on the SVG root */
  className?: string;
}

/* ─── Path data ──────────────────────────────────────────────────────────────
   ViewBox: 0 0 1960 1533  (matches the exact PNG pixel dimensions)
   Coordinate origin: top-left of the PNG.
   All paths are OPEN strokes (fill="none") — only the stroke is rendered.

   The main outer silhouette traces clockwise from the nose tip:
     nose → muzzle bridge → forehead → left ear → valley → right ear
     → back of skull → neck → right shoulder → bottom crop

   Additional feature paths handle the inner ear edges and muzzle arc.
────────────────────────────────────────────────────────────────────────── */

const P = {
  /**
   * PRIMARY OUTLINE
   * Traces the visible perimeter of the dog from nose tip clockwise
   * around the head, ears, neck and into the shoulder/chest crop.
   */
  outline: `
    M 195,720
    C 218,668 252,620 298,574
    C 358,514 440,468 530,432
    C 615,398 700,372 762,342
    C 800,315 826,275 840,225
    L 840,88
    C 840,175 846,250 862,308
    C 886,370 926,398 968,406
    C 994,408 1022,400 1050,382
    C 1064,360 1074,330 1082,298
    L 1100,182
    L 1214,68
    C 1222,138 1228,214 1240,284
    C 1258,356 1290,398 1328,420
    C 1384,352 1450,318 1518,322
    C 1588,326 1646,360 1700,408
    C 1756,460 1806,530 1854,610
    C 1904,698 1940,800 1960,912
    L 1960,1533
  `,

  /**
   * MUZZLE UNDERLINE
   * The distinctive lower jaw / chin profile — an important feature silhouette.
   */
  muzzle: `
    M 195,720
    C 212,748 238,768 268,776
    C 308,784 348,768 376,738
    C 404,706 414,664 408,622
    C 400,580 376,546 346,526
    C 316,506 280,498 250,510
    C 222,522 206,546 198,574
    C 192,600 194,630 196,660
    C 196,686 196,704 195,720
  `,

  /**
   * LEFT EAR INNER EDGE
   * The slightly curved inner face of the left (near) ear.
   */
  earLInner: `
    M 840,88
    C 836,140 828,198 820,254
    C 812,310 806,366 812,418
    C 816,444 826,462 842,472
  `,

  /**
   * RIGHT EAR INNER EDGE
   * Inner edge of the tall, narrow right (far) ear.
   */
  earRInner: `
    M 1214,68
    C 1210,128 1204,194 1200,256
    C 1196,318 1196,378 1206,428
    C 1212,452 1224,468 1242,476
  `,

  /**
   * COLLAR ARC
   * The prominent leather collar — a perfect circle-ish arc to trace energy along.
   */
  collar: `
    M 520,910
    C 590,852 676,820 770,816
    C 876,812 978,840 1062,892
    C 1148,944 1212,1016 1248,1100
    C 1268,1150 1272,1206 1258,1258
  `,

  /**
   * SPINE / NECK RIDGE
   * Follows the top line of the neck from skull to shoulder — carries the most energy.
   */
  neckRidge: `
    M 990,410
    C 1068,388 1152,372 1236,370
    C 1330,368 1420,388 1500,428
    C 1578,466 1640,524 1690,596
    C 1742,672 1780,762 1804,860
  `,
};

/* ─── Spark positions (normalized 0-1 in viewBox space) ─────────────────── */

const SPARKS = [
  { x: 0.43, y: 0.06, r: 12, delay: 0.0, dur: 2.8 }, // near right ear tip
  { x: 0.51, y: 0.18, r: 9,  delay: 0.5, dur: 3.2 }, // between ears
  { x: 0.39, y: 0.30, r: 7,  delay: 1.0, dur: 2.4 }, // left ear valley
  { x: 0.62, y: 0.22, r: 10, delay: 0.3, dur: 3.6 }, // right ear back
  { x: 0.72, y: 0.40, r: 8,  delay: 0.8, dur: 2.6 }, // nape
  { x: 0.82, y: 0.56, r: 11, delay: 0.2, dur: 3.0 }, // right shoulder
  { x: 0.13, y: 0.47, r: 7,  delay: 1.2, dur: 2.2 }, // muzzle tip
  { x: 0.28, y: 0.62, r: 8,  delay: 0.6, dur: 3.4 }, // chin area
  { x: 0.55, y: 0.72, r: 6,  delay: 1.4, dur: 2.0 }, // collar center
];

const VW = 1960;
const VH = 1533;

/* ─── Reusable scroll→energy hook ───────────────────────────────────────── */

export function useEnergyProgress(containerRef: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Energy begins at 10% scroll, fully on at 100%
  const raw = useTransform(scrollYProgress, [0, 0.1, 1], [0, 0, 1]);

  // Spring for buttery-smooth interpolation
  return useSpring(raw, { stiffness: 55, damping: 26, mass: 1 });
}

/* ─── Component ──────────────────────────────────────────────────────────── */

export function DobermanEnergySystem({ containerRef, className = '' }: EnergySystemProps) {
  const energy = useEnergyProgress(containerRef);

  // Per-layer energy thresholds
  const ambientGlow    = useTransform(energy, [0.08, 0.5],  [0, 0.65]);
  const glowOutline    = useTransform(energy, [0.15, 0.7],  [0, 1]);
  const outlineProgress = useTransform(energy, [0.2, 0.85], [0, 1]);
  const featureOpacity = useTransform(energy, [0.35, 0.8],  [0, 1]);
  const sparkOpacity   = useTransform(energy, [0.55, 0.9],  [0, 1]);
  const displaceScale  = useTransform(energy, [0, 1],       [0, 4]);

  return (
    <svg
      className={`absolute bottom-0 right-0 h-[90%] w-auto max-w-none pointer-events-none select-none ${className}`}
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        {/* ── Living turbulence — SMIL animates baseFrequency autonomously ── */}
        <filter id="de-turbulence" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence
            id="de-turb-primitive"
            type="fractalNoise"
            baseFrequency="0.008 0.016"
            numOctaves="4"
            seed="12"
            result="noise"
          >
            {/* Autonomous organic oscillation — no JS required */}
            <animate
              attributeName="baseFrequency"
              values="0.008 0.016;0.011 0.022;0.009 0.018;0.008 0.016"
              dur="14s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="seed"
              values="12;17;9;12"
              dur="22s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* ── Outer warm glow — wide blur gives the halo ── */}
        <filter id="de-glow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="22" result="blur" />
          {/* Warm color shift: push R+, push G slightly, kill B */}
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1.3 0.15 0    0 0.04
                    0.4 0.9  0    0 0.01
                    0   0    0.1  0 0
                    0   0    0    1.4 0"
          />
        </filter>

        {/* ── Tight stroke glow — small blur on the crisp outline ── */}
        <filter id="de-stroke-glow" x="-6%" y="-6%" width="112%" height="112%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* ── Spark glow — tight radial bloom ── */}
        <filter id="de-spark" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* ── Energy gradient: warm white → gold → brand orange → fade ── */}
        <linearGradient id="de-gradient" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,252,235,0.95)" />
          <stop offset="22%"  stopColor="rgba(255,214,80,0.90)" />
          <stop offset="55%"  stopColor="#eb6a2c" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#eb6a2c" stopOpacity="0.10" />
        </linearGradient>

        {/* ── Feature gradient — slightly cooler gold for inner edges ── */}
        <linearGradient id="de-feature" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="rgba(255,228,100,0.9)" />
          <stop offset="100%" stopColor="rgba(235,106,44,0.3)" />
        </linearGradient>

        {/* ── Ambient radial gradient ── */}
        <radialGradient id="de-radial" cx="58%" cy="42%" r="52%">
          <stop offset="0%"   stopColor="rgba(235,106,44,0.28)" />
          <stop offset="35%"  stopColor="rgba(255,190,60,0.12)" />
          <stop offset="100%" stopColor="rgba(235,106,44,0)" />
        </radialGradient>
      </defs>

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 0 — AMBIENT GLOW (fills the dog's energy zone)
      ═══════════════════════════════════════════════════════════════ */}
      <motion.ellipse
        cx={VW * 0.58}
        cy={VH * 0.40}
        rx={VW * 0.46}
        ry={VH * 0.48}
        fill="url(#de-radial)"
        style={{ opacity: ambientGlow }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 1 — SOFT GLOW OUTLINE (thick, blurred — the warm halo)
          Uses the exact same path as the crisp outline, but much wider
          and blurred. This creates the "warm energy aura" behind the stroke.
      ═══════════════════════════════════════════════════════════════ */}
      <motion.path
        d={P.outline}
        fill="none"
        stroke="url(#de-gradient)"
        strokeWidth={52}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#de-glow)"
        style={{ pathLength: outlineProgress, opacity: glowOutline }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 2 — MAIN CRISP ELECTRIC OUTLINE
          Thin, precisely positioned, displaced by turbulence for organic motion.
          pathLength drives the "electricity traveling" reveal.
      ═══════════════════════════════════════════════════════════════ */}
      <motion.path
        d={P.outline}
        fill="none"
        stroke="url(#de-gradient)"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#de-turbulence)"
        style={{ pathLength: outlineProgress, opacity: glowOutline }}
      />

      {/* Crisp outline second pass — no turbulence, adds sharpness */}
      <motion.path
        d={P.outline}
        fill="none"
        stroke="rgba(255,238,140,0.55)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#de-stroke-glow)"
        style={{ pathLength: outlineProgress, opacity: featureOpacity }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 3 — FEATURE PATHS
          Muzzle arc, ear edges, collar, neckridge — each independently animated.
          Staggered opacity for a natural "energy spreading" feel.
      ═══════════════════════════════════════════════════════════════ */}

      {/* Muzzle arc */}
      <motion.path
        d={P.muzzle}
        fill="none"
        stroke="url(#de-feature)"
        strokeWidth={4}
        strokeLinecap="round"
        filter="url(#de-stroke-glow)"
        style={{
          pathLength: outlineProgress,
          opacity: useTransform(energy, [0.3, 0.75], [0, 0.85]),
        }}
      />

      {/* Left ear inner edge */}
      <motion.path
        d={P.earLInner}
        fill="none"
        stroke="rgba(255,220,100,0.7)"
        strokeWidth={3.5}
        strokeLinecap="round"
        filter="url(#de-stroke-glow)"
        style={{
          pathLength: outlineProgress,
          opacity: useTransform(energy, [0.38, 0.82], [0, 0.9]),
        }}
      />

      {/* Right ear inner edge */}
      <motion.path
        d={P.earRInner}
        fill="none"
        stroke="rgba(255,220,100,0.7)"
        strokeWidth={3.5}
        strokeLinecap="round"
        filter="url(#de-stroke-glow)"
        style={{
          pathLength: outlineProgress,
          opacity: useTransform(energy, [0.40, 0.84], [0, 0.9]),
        }}
      />

      {/* Neck ridge — the most energetic path */}
      <motion.path
        d={P.neckRidge}
        fill="none"
        stroke="rgba(235,106,44,0.6)"
        strokeWidth={4.5}
        strokeLinecap="round"
        filter="url(#de-turbulence)"
        style={{
          pathLength: outlineProgress,
          opacity: featureOpacity,
        }}
      />

      {/* Collar arc — iconic visual feature */}
      <motion.path
        d={P.collar}
        fill="none"
        stroke="rgba(255,200,80,0.55)"
        strokeWidth={6}
        strokeLinecap="round"
        filter="url(#de-stroke-glow)"
        style={{
          pathLength: outlineProgress,
          opacity: useTransform(energy, [0.45, 0.88], [0, 0.8]),
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          LAYER 4 — MICRO SPARKS
          Tiny glowing particles that escape from the outline.
          Almost imperceptible — purpose is to make the energy feel alive.
      ═══════════════════════════════════════════════════════════════ */}
      {SPARKS.map((s, i) => (
        <motion.circle
          key={i}
          r={s.r}
          fill="rgba(255,235,120,0.92)"
          filter="url(#de-spark)"
          style={{ opacity: sparkOpacity }}
          animate={{
            cx: [s.x * VW, s.x * VW + (i % 2 === 0 ? 18 : -14), s.x * VW + (i % 3 === 0 ? -10 : 12), s.x * VW],
            cy: [s.y * VH, s.y * VH - 22, s.y * VH - 36, s.y * VH - 16, s.y * VH],
            opacity: [0, 0.92, 0.6, 0.88, 0],
            scale: [0.4, 1.2, 0.8, 1.0, 0.3],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.25, 0.55, 0.8, 1],
          }}
        />
      ))}
    </svg>
  );
}
