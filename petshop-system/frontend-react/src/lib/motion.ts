/**
 * PawLux Design System — Motion Library
 * Single Source of Truth: PDF "Landing Page Moderna (2)"
 *
 * Seção 11 — Motion Design System
 * Seção 12 — Motion Library
 *
 * Princípios:
 * - Animar apenas transform/opacity (GPU-accelerated).
 * - Mesma ação → mesmo timing e easing em todo o produto.
 * - Respeitar prefers-reduced-motion.
 * - Motion deve informar (o que mudou) ou confirmar (o que aconteceu).
 */

import type { Transition, Variants } from 'framer-motion';

// ── 11.1 Motion Tokens (durações em segundos para Framer Motion) ────────────
export const duration = {
  fast:   0.12,  // 120ms — hover/pressed, microfeedback
  normal: 0.18,  // 180ms — transições de estado (UI)
  slow:   0.26,  // 260ms — overlays e containers
  page:   0.32,  // 320ms — transição de página/rota
  hero:   0.52,  // 520ms — hero/onboarding (uso raro)
} as const;

// ── 11.2 Easings (curvas premium) ───────────────────────────────────────────
export const easing = {
  // Ease Out — padrão para entrada e feedback
  out:     [0.0, 0.0, 0.2, 1.0] as [number, number, number, number],
  // Ease In — saída/fechamento
  in:      [0.4, 0.0, 1.0, 1.0] as [number, number, number, number],
  // Ease In Out — mudanças de layout controladas (tabs, accordion)
  inOut:   [0.4, 0.0, 0.2, 1.0] as [number, number, number, number],
  // Ease Out Expo — reveal premium (hero); usar com parcimônia
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const;

// ── Transitions reutilizáveis ───────────────────────────────────────────────

/** hover/pressed — duration-fast, Ease Out */
export const tFast: Transition = {
  duration: duration.fast,
  ease: easing.out,
};

/** transições de estado — duration-normal, Ease Out */
export const tNormal: Transition = {
  duration: duration.normal,
  ease: easing.out,
};

/** tabs/accordion (layout changes) — duration-normal, Ease In Out */
export const tLayout: Transition = {
  duration: duration.normal,
  ease: easing.inOut,
};

/** overlays/containers — duration-slow, Ease Out */
export const tSlow: Transition = {
  duration: duration.slow,
  ease: easing.out,
};

/** reveal premium — duration-slow, Ease Out Expo */
export const tReveal: Transition = {
  duration: duration.slow,
  ease: easing.outExpo,
};

// ── 12.1 Entrance Animations ────────────────────────────────────────────────

/**
 * Fade In — conteúdo simples, estados de carregamento.
 * Timing: fast/normal
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: tNormal },
  exit:    { opacity: 0, transition: { ...tFast, ease: easing.in } },
};

/**
 * Fade Up — seções, cards, listas curtas (8–12px de lift).
 * Timing: normal
 */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: tNormal },
  exit:    { opacity: 0, y: 6,  transition: { ...tFast, ease: easing.in } },
};

/**
 * Fade Down — slide suave de entrada (menus, dropdowns).
 * Timing: fast (dropdown é rápido por definição)
 */
export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0,  transition: tFast },
  exit:    { opacity: 0, y: -4, transition: { ...tFast, ease: easing.in } },
};

/**
 * Scale In — chips/badges, elementos "pílula".
 * Timing: normal
 */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1,    transition: tNormal },
  exit:    { opacity: 0, scale: 0.98, transition: { ...tFast, ease: easing.in } },
};

/**
 * Fade Left/Right — panels laterais, navegação secundária.
 * Timing: normal
 */
export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: 12 },
  visible: { opacity: 1, x: 0,  transition: tNormal },
  exit:    { opacity: 0, x: 8,  transition: { ...tFast, ease: easing.in } },
};

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0,   transition: tNormal },
  exit:    { opacity: 0, x: -8,  transition: { ...tFast, ease: easing.in } },
};

// ── 12.3 Component Animations ───────────────────────────────────────────────

/**
 * Button — confirmar interatividade.
 * Timing: fast, sem deslocamento excessivo (PDF: "sem deslocamento excessivo").
 */
export const buttonVariants = {
  idle:    { scale: 1 },
  hover:   { scale: 1.01, transition: tFast },
  pressed: { scale: 0.98, transition: tFast },
};

/**
 * Card Hover — hierarquia/seleção, elevação sutil.
 * Timing: fast/normal
 */
export const cardHoverVariants = {
  idle:  { y: 0,  transition: tNormal },
  hover: { y: -2, transition: tNormal },
};

/**
 * Dropdown/Tooltip — contexto rápido, fade+scale mínimo.
 * Timing: fast
 */
export const dropdownVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.97, y: -4 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: tFast },
  exit:    { opacity: 0, scale: 0.98, y: -2, transition: { ...tFast, ease: easing.in } },
};

/**
 * Modal — foco de atenção, backdrop primeiro.
 * Timing: slow
 */
export const backdropVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: tSlow },
  exit:    { opacity: 0, transition: { ...tNormal, ease: easing.in } },
};

export const modalVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.97, y: 8 },
  visible: { opacity: 1, scale: 1,    y: 0, transition: { ...tSlow, ease: easing.outExpo } },
  exit:    { opacity: 0, scale: 0.98, y: 4, transition: { ...tNormal, ease: easing.in } },
};

/**
 * Accordion/Tabs — organizar conteúdo, Ease In Out.
 * Timing: normal
 */
export const accordionVariants: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded:  {
    height: 'auto',
    opacity: 1,
    transition: tLayout,
  },
};

/**
 * Toast/Notification — feedback não bloqueante, entrada discreta.
 * Timing: normal
 */
export const toastVariants: Variants = {
  hidden:  { opacity: 0, y: 8,  scale: 0.98 },
  visible: { opacity: 1, y: 0,  scale: 1,    transition: tNormal },
  exit:    { opacity: 0, y: -4, scale: 0.98, transition: { ...tFast, ease: easing.in } },
};

// ── Reduced Motion ──────────────────────────────────────────────────────────
/**
 * Substituição segura para prefers-reduced-motion.
 * Mantém apenas fades com duração reduzida (80ms), remove transforms.
 */
export const reducedFade: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.08, ease: easing.out } },
  exit:    { opacity: 0, transition: { duration: 0.08, ease: easing.in } },
};

/**
 * Hook helper: retorna a variante correta conforme prefers-reduced-motion.
 * Uso: const variants = useMotionVariant(fadeUp);
 */
export function getMotionVariants(
  fullVariant: Variants,
  prefersReduced = false
): Variants {
  return prefersReduced ? reducedFade : fullVariant;
}
