import React from 'react';
import { cn } from '../../utils/cn';
import logoImage from '../../assets/images/mais-imagens-pet-shop/Gemini_Generated_Image_zdm5p4zdm5p4zdm5-Photoroom.png';

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
      <img
        src={logoImage}
        alt="PURA Logo"
        className={cn(sizes[size], 'w-auto shrink-0 object-contain', isWhite && 'brightness-0 invert')}
      />
      
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
