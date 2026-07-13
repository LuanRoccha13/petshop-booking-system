import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Icon, IconName } from '../ui/Icon';
import { PREMIUM_TRANSITIONS } from '../../design-tokens/motion';

export interface NavItem {
  label: string;
  href: string;
  icon?: IconName;
}

export interface NavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
  isCollapsed?: boolean;
  orientation?: 'vertical' | 'horizontal';
}

export function Navigation({ items, isCollapsed = false, orientation = 'vertical', className, ...props }: NavigationProps) {
  return (
    <nav className={cn('flex', orientation === 'vertical' ? 'flex-col gap-1.5' : 'flex-row items-center gap-4', className)} {...props}>
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          title={isCollapsed ? item.label : undefined}
          className={({ isActive }) =>
            cn(
              'group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors outline-none focus-visible:shadow-focus font-ui text-sm font-semibold',
              isActive
                ? 'text-brand-600 bg-surface'
                : 'text-ink-muted hover:bg-surface hover:text-ink',
              isCollapsed && 'justify-center px-0'
            )
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="activeNavBackground"
                  className="absolute inset-0 bg-brand-500/10 rounded-lg border border-brand-500/20"
                  transition={PREMIUM_TRANSITIONS.springComfortable}
                />
              )}
              {isActive && (
                <motion.div
                  layoutId="activeNavIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-brand-500 rounded-r-full"
                  transition={PREMIUM_TRANSITIONS.springComfortable}
                />
              )}
              <span className="relative z-10 flex items-center justify-center">
                {item.icon && <Icon name={item.icon} size={20} className={cn('transition-transform duration-300', isActive ? 'scale-105' : 'group-hover:scale-110')} />}
              </span>
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="relative z-10 whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
