export const PREMIUM_TRANSITIONS = {
  springComfortable: {
    type: "spring",
    stiffness: 180,
    damping: 24,
    mass: 1
  },
  springBouncy: {
    type: "spring",
    stiffness: 300,
    damping: 15
  },
  fadeStandard: {
    duration: 0.22, // 220ms matches --motion-base from brand
    ease: [0.2, 0.8, 0.2, 1] // matches --ease-standard from brand
  },
  fadeEmphasis: {
    duration: 0.52, // 520ms matches --motion-enter-section
    ease: [0.16, 1, 0.3, 1] // matches --ease-emphasis
  }
} as const;

export const PANEL_ANIMATIONS = {
  initial: { opacity: 0, y: 12 }, // slight drop to match original App.tsx PageTransition
  animate: { opacity: 1, y: 0, transition: PREMIUM_TRANSITIONS.springComfortable },
  exit: { opacity: 0, y: -8, transition: PREMIUM_TRANSITIONS.fadeStandard }
} as const;
