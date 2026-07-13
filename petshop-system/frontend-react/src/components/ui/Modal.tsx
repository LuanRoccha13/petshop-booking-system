import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Icon } from './Icon';
import { PREMIUM_TRANSITIONS } from '../../design-tokens/motion';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hideCloseButton?: boolean;
}

export function Modal({ isOpen, onClose, title, children, className, hideCloseButton = false }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={PREMIUM_TRANSITIONS.springComfortable}
            className={cn(
              'relative w-full max-w-lg bg-surface border border-dark-border/10 rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[90vh]',
              className
            )}
          >
            {(title || !hideCloseButton) && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border/10">
                {title ? (
                  <h2 className="text-lg font-bold font-display text-ink m-0">{title}</h2>
                ) : (
                  <div />
                )}
                {!hideCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 -mr-2 text-ink-muted hover:text-danger hover:bg-danger-soft rounded-full transition-colors outline-none focus-visible:shadow-focus"
                    aria-label="Fechar"
                  >
                    <Icon name="X" size={20} />
                  </button>
                )}
              </div>
            )}
            <div className="p-6 overflow-y-auto font-body text-ink">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Dialog is essentially an alias for Modal in most standard architectures that don't need complex abstractions.
export const Dialog = Modal;
