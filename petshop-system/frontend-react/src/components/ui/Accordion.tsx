import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { Icon } from './Icon';
import { PREMIUM_TRANSITIONS } from '../../design-tokens/motion';

const AccordionContext = createContext<{
  activeValues: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}>({ activeValues: [], toggleItem: () => {}, type: 'single' });

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}

export function Accordion({ type = 'single', defaultValue, className, children, ...props }: AccordionProps) {
  const [activeValues, setActiveValues] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );

  const toggleItem = (value: string) => {
    setActiveValues((prev) => {
      if (type === 'single') {
        return prev.includes(value) ? [] : [value];
      }
      return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
    });
  };

  return (
    <AccordionContext.Provider value={{ activeValues, toggleItem, type }}>
      <div className={cn('flex flex-col border border-dark-border/10 rounded-lg bg-surface/88 overflow-hidden', className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

const AccordionItemContext = createContext<{ value: string; isActive: boolean }>({ value: '', isActive: false });

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

Accordion.Item = function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const { activeValues } = useContext(AccordionContext);
  const isActive = activeValues.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isActive }}>
      <div className={cn('border-b border-dark-border/10 last:border-b-0', className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
};

Accordion.Trigger = function AccordionTrigger({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { value, isActive } = useContext(AccordionItemContext);
  const { toggleItem } = useContext(AccordionContext);

  return (
    <button
      aria-expanded={isActive}
      onClick={() => toggleItem(value)}
      className={cn(
        'flex flex-1 items-center justify-between py-4 px-5 w-full font-semibold transition-all hover:bg-surface-strong/30 outline-none focus-visible:shadow-focus',
        className
      )}
      {...props}
    >
      {children}
      <motion.div
        animate={{ rotate: isActive ? 180 : 0 }}
        transition={PREMIUM_TRANSITIONS.springComfortable}
        className="shrink-0 text-ink-muted"
      >
        <Icon name="ChevronDown" size={18} />
      </motion.div>
    </button>
  );
};

Accordion.Content = function AccordionContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { isActive } = useContext(AccordionItemContext);

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={PREMIUM_TRANSITIONS.springComfortable}
          className="overflow-hidden"
        >
          <div className={cn('pb-4 px-5 text-sm text-ink-muted leading-relaxed', className)} {...props}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
