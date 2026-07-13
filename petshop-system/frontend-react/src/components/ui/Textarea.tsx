import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          'w-full min-h-[100px] p-4 font-body text-[0.96rem] text-ink bg-surface/88 border rounded-md outline-none transition-all duration-200 resize-y',
          error
            ? 'border-danger focus-visible:shadow-[0_0_0_3px_rgba(217,48,54,0.1)]'
            : 'border-dark-border/10 hover:border-dark-border/20 focus-visible:border-brand-500 focus-visible:shadow-focus',
          disabled && 'opacity-50 cursor-not-allowed bg-surface-soft',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
