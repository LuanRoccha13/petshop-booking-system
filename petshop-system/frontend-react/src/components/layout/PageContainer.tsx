import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/cn';
import { PREMIUM_TRANSITIONS } from '../../design-tokens/motion';

export interface PageContainerProps extends HTMLMotionProps<'div'> {}

/**
 * Root container for a page. Handles entry/exit animations and maximum widths.
 */
export function PageContainer({ className, children, ...props }: PageContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={PREMIUM_TRANSITIONS.fadeStandard}
      className={cn('w-full flex-1 flex flex-col', className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
