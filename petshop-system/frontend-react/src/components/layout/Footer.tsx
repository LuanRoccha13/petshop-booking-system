import React from 'react';
import { cn } from '../../utils/cn';
import { ContentArea } from './ContentArea';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

export function Footer({ className, children, ...props }: FooterProps) {
  return (
    <footer
      className={cn(
        'w-full bg-dark-bg text-dark-text-muted py-12 border-t border-dark-border mt-auto',
        className
      )}
      {...props}
    >
      <ContentArea>
        {children}
      </ContentArea>
    </footer>
  );
}
