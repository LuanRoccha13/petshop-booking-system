/**
 * MOTION — Design Tokens de Animação
 *
 * Fonte única de verdade para toda a física da Motion Library.
 * Nenhum componente deve ter valores de animação hardcoded.
 * Tudo vem daqui.
 */

// Mantém retrocompatibilidade com código legado que usa PREMIUM_TRANSITIONS
export { PREMIUM_TRANSITIONS, PANEL_ANIMATIONS } from './motion.legacy';

// ─── Easing ─────────────────────────────────────────────────────────────────
export const ease = {
  premium:  [0.22, 1, 0.36, 1]   as const, // entrada principal — Apple-like
  standard: [0.2, 0.8, 0.2, 1]  as const, // utilitário geral
  exit:     [0.4, 0, 1, 1]       as const, // saída rápida
  emphasis: [0.16, 1, 0.3, 1]    as const, // mais dramático
} as const;

export const spring = {
  comfortable: { type: 'spring', stiffness: 180, damping: 24, mass: 1.0 } as const,
  snap:        { type: 'spring', stiffness: 380, damping: 32, mass: 0.8 } as const,
  physical:    { type: 'spring', stiffness: 260, damping: 20, mass: 0.9 } as const,
} as const;

// ─── Durations (segundos — para Framer Motion) ──────────────────────────────
export const duration = {
  fast:  0.14, // micro-feedback (cliques, hovers)
  base:  0.26, // transições de estado
  slow:  0.44, // mudanças estruturais
  enter: 0.72, // entrada de seção, scroll reveal
  scene: 1.10, // cinematográfico (hero, reveals)
} as const;

// ─── Stagger (delay entre filhos em listas/grids) ───────────────────────────
export const stagger = {
  tight: 0.04,
  base:  0.08,
  loose: 0.14,
} as const;

// ─── Blur (filter string — Framer Motion aceita) ────────────────────────────
export const blur = {
  reveal: 'blur(6px)',
  soft:   'blur(3px)',
  none:   'blur(0px)',
} as const;

// ─── Shadows ────────────────────────────────────────────────────────────────
export const shadow = {
  cardRest:   '0 8px 24px rgba(33,24,17,0.06)',
  cardHover:  '0 24px 56px rgba(33,24,17,0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
  btnPrimary: '0 14px 32px rgba(235,106,44,0.18)',
  btnHover:   '0 20px 44px rgba(235,106,44,0.30)',
  none:       '0 0px 0px rgba(0,0,0,0)',
} as const;

// ─── Scale ──────────────────────────────────────────────────────────────────
export const scale = {
  hover:      1.015,
  tap:        0.975,
  heroScroll: 1.05,
} as const;

// ─── Viewport (para whileInView) ────────────────────────────────────────────
export const viewport = {
  standard: { once: true, margin: '-8%'  } as const,
  early:    { once: true, margin: '-4%'  } as const,
  late:     { once: true, margin: '-14%' } as const,
} as const;

// ─── Objeto MOTION unificado ─────────────────────────────────────────────────
export const MOTION = {
  ease,
  spring,
  duration,
  stagger,
  blur,
  shadow,
  scale,
  viewport,
} as const;
