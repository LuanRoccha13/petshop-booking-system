import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MOTION } from '../../design-tokens/motion';

interface AuthVisualProps {
  title?: ReactNode;
  subtitle?: string;
}

/**
 * Painel direito do fluxo de autenticação.
 * Funciona como atmosfera secundária (nunca primária em relação ao form).
 *
 * Estruturado em camadas estritas (z-index) para permitir futuras evoluções 
 * sem quebrar CSS ou layout:
 * 
 * L1: Background sólido
 * L2: Ambient Gradient (respirando)
 * L3: Textura/Grain orgânico
 * L4: Iluminação volumétrica da fronteira (blend visual com o form)
 * L5: Textos de suporte
 * L6: [Futuro] Ilustração / Reveal Mask
 */
export function AuthVisual({ 
  title = "Seu ritual já começou.",
  subtitle = "Acompanhe confirmações, horários e recados do atendimento em um painel limpo, rápido e acolhedor."
}: AuthVisualProps) {
  return (
    <aside className="hidden md:flex flex-1 relative items-center justify-center overflow-hidden pointer-events-none select-none">
      
      {/* Layer 1: Background Base */}
      <div className="absolute inset-0 bg-[#ebe3d5] z-0" aria-hidden="true" />
      
      {/* Layer 2: Ambient Gradient (Respiração Lenta) */}
      <motion.div 
        className="absolute inset-0 opacity-40 z-10 mix-blend-color-burn"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(235, 106, 44, 0.12) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(200, 160, 120, 0.2) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        aria-hidden="true"
      />

      {/* Layer 3: Grain Orgânico (Matéria física sutil) */}
      <div 
        className="reveal-grain z-20 mix-blend-overlay" 
        style={{ opacity: 0.2 }} 
        aria-hidden="true" 
      />

      {/* Layer 4: Iluminação de Divisão (Cruza a fronteira vertical) */}
      <div 
        className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-surface to-transparent z-30 opacity-70"
        aria-hidden="true"
      />

      {/* Layer 5: Textos (Atmospheric support) */}
      <div className="relative z-40 max-w-md text-center px-8">
        <motion.h2 
          className="font-display text-4xl lg:text-5xl font-bold text-ink mb-5 tracking-tight"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.premium, delay: 0.1 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-ink-muted text-lg leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.premium, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Layer 6: [Futuro] Espaço preparado arquiteturalmente para ilustrações ou RevealMask 
          <div className="absolute inset-0 z-50 pointer-events-auto"> ... </div>
      */}
      
    </aside>
  );
}
