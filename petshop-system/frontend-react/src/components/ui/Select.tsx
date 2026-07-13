import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from './Icon';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, disabled, children, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full min-h-[50px] pl-4 pr-11 font-body text-[0.96rem] text-ink bg-surface/88 border rounded-md outline-none transition-all duration-200 appearance-none',
            error
              ? 'border-danger focus-visible:shadow-[0_0_0_3px_rgba(217,48,54,0.1)]'
              : 'border-dark-border/10 hover:border-dark-border/20 focus-visible:border-brand-500 focus-visible:shadow-focus',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-soft',
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-4 text-ink-muted pointer-events-none flex items-center">
          <Icon name="ChevronDown" size={16} />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';
