import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, disabled, ...props }, ref) => {
    return (
      <label
        className={cn(
          'relative inline-flex items-center cursor-pointer shrink-0',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="w-11 h-6 bg-surface-strong/50 peer-focus-visible:shadow-focus rounded-full peer-checked:bg-brand-500 transition-colors duration-200">
          <div className="absolute top-[2px] left-[2px] bg-white border border-dark-border/10 rounded-full h-5 w-5 transition-transform duration-200 peer-checked:translate-x-full shadow-sm" />
        </div>
      </label>
    );
  }
);

Switch.displayName = 'Switch';
