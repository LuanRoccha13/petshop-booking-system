import { cn } from '../../utils/cn';

export interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

export function Spinner({ size = 18, className, ...props }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={cn('animate-spin shrink-0', className)}
      {...props}
    >
      <circle
        cx="9"
        cy="9"
        r="7"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2.5"
      />
      <path
        d="M9 2a7 7 0 017 7"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
