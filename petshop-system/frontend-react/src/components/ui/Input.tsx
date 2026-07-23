import { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, disabled, onFocus, onBlur, ...props }, ref) => {
    // Mantemos estado local de foco apenas para estilizar icones se necessário,
    // garantindo zero overhead estrutural.
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className="relative flex items-center w-full group">
        {leftIcon && (
          <div 
            className={cn(
              "absolute left-4 pointer-events-none flex items-center transition-colors",
              isFocused ? (error ? "text-danger" : "text-brand-500") : "text-ink-muted group-hover:text-ink/70"
            )}
            style={{ transitionDuration: 'var(--duration-base)', transitionTimingFunction: 'var(--ease-premium)' }}
          >
            {leftIcon}
          </div>
        )}
        
        <input
          ref={ref}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            'w-full min-h-[52px] px-4 font-body text-[0.96rem] text-ink bg-surface/80 backdrop-blur-sm border rounded-[10px] outline-none transition-all',
            leftIcon ? 'pl-11' : '',
            rightIcon ? 'pr-11' : '',
            error
              ? 'border-danger focus-visible:shadow-[0_0_0_4px_rgba(217,48,54,0.12)] bg-danger/5'
              : 'border-dark-border/12 hover:border-dark-border/25 hover:bg-surface focus-visible:bg-surface focus-visible:border-brand-500 focus-visible:shadow-[0_4px_20px_rgba(235,106,44,0.08),0_0_0_3px_rgba(235,106,44,0.15)]',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-soft',
            className
          )}
          style={{ transitionDuration: 'var(--duration-base)', transitionTimingFunction: 'var(--ease-premium)' }}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 text-ink-muted flex items-center transition-opacity z-10">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
