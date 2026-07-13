import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { PREMIUM_TRANSITIONS } from '../../design-tokens/motion';
import { Icon } from '../ui/Icon';

import { HTMLMotionProps } from 'framer-motion';

export interface SidebarProps extends Omit<HTMLMotionProps<"aside">, "children"> {
  isOpen: boolean;
  onClose?: () => void;
  isMobile?: boolean;
  children?: React.ReactNode | ((props: { isCollapsed: boolean }) => React.ReactNode);
}

export function Sidebar({ isOpen, onClose, isMobile = false, className, children, ...props }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Extend children with isCollapsed prop if possible, or call if it's a function
  let childrenContent;
  if (typeof children === 'function') {
    childrenContent = children({ isCollapsed });
  } else {
    childrenContent = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { isCollapsed } as any);
      }
      return child;
    });
  }

  const sidebarContent = (
    <motion.aside
      initial={isMobile ? { x: '-100%' } : false}
      animate={{ 
        x: 0, 
        width: isCollapsed ? 80 : 260 
      }}
      exit={isMobile ? { x: '-100%' } : undefined}
      transition={PREMIUM_TRANSITIONS.springComfortable}
      className={cn(
        'relative z-overlay flex flex-col bg-surface-soft/80 backdrop-blur-xl border border-dark-border/5 rounded-2xl shadow-elevation-1 my-4 ml-4',
        !isMobile && 'h-[calc(100vh-32px)]',
        isMobile && 'fixed inset-y-0 left-0 my-0 ml-0 rounded-none h-screen border-r border-y-0 border-l-0',
        className
      )}
      {...props}
    >
      {!isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 w-6 h-6 bg-surface border border-dark-border/10 rounded-full flex items-center justify-center text-ink-muted hover:text-ink hover:shadow-sm transition-all z-20"
          aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={14} />
        </button>
      )}
      {childrenContent}
    </motion.aside>
  );

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-overlay flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={PREMIUM_TRANSITIONS.fadeStandard}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden="true"
            />
            {sidebarContent}
          </div>
        )}
      </AnimatePresence>
    );
  }

  return sidebarContent;
}
