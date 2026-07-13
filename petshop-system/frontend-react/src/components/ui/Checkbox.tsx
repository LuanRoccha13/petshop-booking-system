import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from './Icon';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center justify-center w-5 h-5 shrink-0">
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className={cn(
            'peer appearance-none w-5 h-5 border rounded bg-surface/88 outline-none transition-all duration-200 cursor-pointer',
            'checked:bg-brand-500 checked:border-brand-500',
            error
              ? 'border-danger focus-visible:shadow-[0_0_0_3px_rgba(217,48,54,0.1)]'
              : 'border-dark-border/20 hover:border-dark-border/40 focus-visible:border-brand-500 focus-visible:shadow-focus',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-soft',
            className
          )}
          {...props}
        />
        <Icon
          name="Check"
          size={14}
          className="absolute text-white opacity-0 pointer-events-none transition-opacity peer-checked:opacity-100"
        />
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
