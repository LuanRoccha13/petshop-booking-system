import React from 'react';
import { cn } from '../../utils/cn';

export interface ContentAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'full';
}

/**
 * Constrains content width centrally.
 */
export function ContentArea({ size = 'lg', className, children, ...props }: ContentAreaProps) {
  const sizes = {
    sm: 'max-w-[680px]', // For Linear Funnels
    md: 'max-w-[960px]', // Standard articles/forms
    lg: 'max-w-[1240px]', // Full dashboards
    full: 'max-w-full',
  };

  return (
    <div className={cn('w-full mx-auto px-4 md:px-6 lg:px-8', sizes[size], className)} {...props}>
      {children}
    </div>
  );
}
