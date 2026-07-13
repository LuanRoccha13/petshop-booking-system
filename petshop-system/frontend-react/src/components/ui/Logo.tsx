import React from 'react';
import { cn } from '../../utils/cn';

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'monochrome' | 'white';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ variant = 'default', showText = true, size = 'md', className, ...props }: LogoProps) {
  const isWhite = variant === 'white';
  
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(sizes[size], 'w-auto shrink-0')}
      >
        {/* Continuous line art approximating the dog & hand */}
        <path
          d="M 50 90 
             C 20 90 10 70 10 50 
             C 10 30 25 20 40 10 
             C 50 20 50 40 40 50 
             C 30 60 30 70 40 80
             C 60 80 80 60 80 50
             C 80 35 70 25 60 20
             C 70 25 80 30 90 40"
          stroke={isWhite ? 'currentColor' : 'var(--brand-500, #eb6a2c)'}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('transition-colors', variant === 'monochrome' && 'stroke-ink')}
        />
        {/* Dog Ear */}
        <path
          d="M 40 10 C 25 20 20 40 35 45 C 45 40 50 20 40 10 Z"
          stroke={isWhite ? 'currentColor' : 'var(--brand-500, #eb6a2c)'}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('transition-colors', variant === 'monochrome' && 'stroke-ink')}
        />
        {/* Hand contour inner */}
        <path
          d="M 15 55 C 30 75 55 80 75 60"
          stroke={isWhite ? 'currentColor' : 'var(--brand-500, #eb6a2c)'}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('transition-colors', variant === 'monochrome' && 'stroke-ink')}
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col justify-center">
          <span 
            className={cn(
              'font-display font-bold leading-none tracking-tight',
              textSizes[size],
              isWhite ? 'text-white' : 'text-ink'
            )}
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            PURA
          </span>
          {size !== 'sm' && (
            <span 
              className={cn(
                'text-[0.6rem] font-medium tracking-wide mt-0.5',
                isWhite ? 'text-white/80' : 'text-ink-muted'
              )}
            >
              Pet Wellness Booking System
            </span>
          )}
        </div>
      )}
    </div>
  );
}
