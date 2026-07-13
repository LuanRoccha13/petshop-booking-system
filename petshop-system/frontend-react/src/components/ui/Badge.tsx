import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-surface-strong text-ink',
    success: 'bg-success-soft text-success border border-success/10',
    warning: 'bg-warning/10 text-warning border border-warning/10',
    danger: 'bg-danger-soft text-danger border border-danger/10',
    info: 'bg-info/10 text-info border border-info/10',
    outline: 'bg-transparent text-ink-muted border border-dark-border',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-[10px] py-[3px] text-xs font-semibold uppercase tracking-wider rounded-pill font-ui',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
