import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { PREMIUM_TRANSITIONS } from '../../design-tokens/motion';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
    }
  };

  const getAnimationProps = () => {
    const initialOffsets = { top: { y: 4 }, bottom: { y: -4 }, left: { x: 4 }, right: { x: -4 } };
    return {
      initial: { opacity: 0, ...initialOffsets[position] },
      animate: { opacity: 1, x: position === 'left' || position === 'right' ? 0 : '-50%', y: position === 'top' || position === 'bottom' ? 0 : '-50%' },
      exit: { opacity: 0, ...initialOffsets[position] },
      transition: PREMIUM_TRANSITIONS.fadeStandard,
    };
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      ref={triggerRef}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            role="tooltip"
            {...getAnimationProps()}
            className={cn(
              'absolute z-[400] px-3 py-1.5 text-xs font-semibold text-white bg-ink rounded-md whitespace-nowrap shadow-md pointer-events-none',
              getPositionStyles(),
              className
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
