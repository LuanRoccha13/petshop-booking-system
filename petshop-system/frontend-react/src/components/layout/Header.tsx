import React from 'react';
import { cn } from '../../utils/cn';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export function Header({ className, children, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-header w-full h-[80px] bg-bg/80 backdrop-blur-xl flex items-center',
        className
      )}
      {...props}
    >
      <div className="w-full flex items-center justify-between px-8">
        {children}
      </div>
    </header>
  );
}
