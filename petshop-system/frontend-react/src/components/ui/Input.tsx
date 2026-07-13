import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-4 text-ink-muted pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full min-h-[50px] px-4 font-body text-[0.96rem] text-ink bg-surface/88 border rounded-md outline-none transition-all duration-200',
            leftIcon ? 'pl-11' : '',
            rightIcon ? 'pr-11' : '',
            error
              ? 'border-danger focus-visible:shadow-[0_0_0_3px_rgba(217,48,54,0.1)]'
              : 'border-dark-border/10 hover:border-dark-border/20 focus-visible:border-brand-500 focus-visible:shadow-focus',
            disabled && 'opacity-50 cursor-not-allowed bg-surface-soft',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 text-ink-muted pointer-events-none flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
