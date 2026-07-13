import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { PREMIUM_TRANSITIONS } from '../../design-tokens/motion';

const DropdownContext = createContext<{
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}>({ isOpen: false, setIsOpen: () => {}, triggerRef: { current: null } });

export interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Dropdown({ className, children, ...props }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // Because the dropdown content is portaled, we need to check if the click was inside the trigger
      // OR inside a portaled element with a specific data attribute (data-dropdown-content)
      const target = e.target as HTMLElement;
      if (triggerRef.current && !triggerRef.current.contains(target) && !target.closest('[data-dropdown-content]')) {
        setIsOpen(false);
      }
    };
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div className={cn('relative inline-block text-left', className)} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Trigger = function DropdownTrigger({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { isOpen, setIsOpen, triggerRef } = useContext(DropdownContext);
  return (
    <button
      ref={triggerRef}
      aria-haspopup="true"
      aria-expanded={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      className={cn('inline-flex items-center justify-center outline-none', className)}
      {...props}
    >
      {children}
    </button>
  );
};

export interface DropdownContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'right';
  width?: string;
}

Dropdown.Content = function DropdownContent({ align = 'left', width = 'w-56', className, children, ...props }: DropdownContentProps) {
  const { isOpen, triggerRef } = useContext(DropdownContext);
  const [coords, setCoords] = useState({ top: 0, left: 0, right: 0 });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + 8,
        left: rect.left,
        right: window.innerWidth - rect.right,
      });
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        data-dropdown-content
        initial={{ opacity: 0, y: -8, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -4, scale: 0.98 }}
        transition={PREMIUM_TRANSITIONS.springComfortable}
        style={{
          position: 'fixed',
          top: coords.top,
          ...(align === 'right' ? { right: coords.right } : { left: coords.left }),
        }}
        className={cn(
          'z-dropdown rounded-xl bg-surface/80 backdrop-blur-xl shadow-elevation-2 border border-dark-border/20 focus:outline-none overflow-hidden',
          width,
          className
        )}
        role="menu"
        {...(props as any)}
      >
        <div className="py-1.5">{children}</div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

Dropdown.Item = function DropdownItem({ className, children, ...props }: DropdownItemProps) {
  const { setIsOpen } = useContext(DropdownContext);

  return (
    <button
      role="menuitem"
      onClick={(e) => {
        setIsOpen(false);
        props.onClick?.(e);
      }}
      className={cn(
        'w-[calc(100%-12px)] mx-[6px] text-left flex items-center px-3 py-2 text-sm text-ink hover:bg-surface-strong/50 hover:text-brand-600 transition-colors font-medium rounded-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
