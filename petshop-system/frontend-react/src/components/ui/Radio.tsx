import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center justify-center w-5 h-5 shrink-0">
        <input
          ref={ref}
          type="radio"
          disabled={disabled}
          className={cn(
            'peer appearance-none w-5 h-5 border rounded-full bg-surface/88 outline-none transition-all duration-200 cursor-pointer',
            'checked:border-brand-500',
            error
              ? 'border-danger focus-visible:shadow-[0_0_0_3px_rgba(217,48,54,0.1)]'
              : 'border-dark-border/20 hover:border-dark-border/40 focus-visible:border-brand-500 focus-visible:shadow-focus',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-soft',
            className
          )}
          {...props}
        />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-brand-500 scale-0 pointer-events-none transition-transform duration-200 peer-checked:scale-100" />
      </div>
    );
  }
);

Radio.displayName = 'Radio';
