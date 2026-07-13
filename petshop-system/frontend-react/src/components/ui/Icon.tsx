import { icons, type LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export type IconName = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
}

/**
 * Temporary Icon wrapper for Lucide React.
 * This abstracts the icon library so we can swap it later for proprietary SVG icons.
 * Uses a strict 24px default size to match the Design System grid.
 */
export function Icon({ name, size = 24, className, ...props }: IconProps) {
  const LucideComponent = icons[name] as LucideIcon;

  if (!LucideComponent) {
    console.warn(`Icon "${name}" does not exist in lucide-react.`);
    return null;
  }

  return (
    <LucideComponent
      size={size}
      className={cn('shrink-0', className)}
      strokeWidth={1.5} // Strict 1.5px thickness from Design System
      {...props}
    />
  );
}
