import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { Icon } from '../ui/Icon';

export interface RecentActivityWidgetProps {
  activities?: any[];
  isLoading?: boolean;
}

export function RecentActivityWidget({ activities = [], isLoading }: RecentActivityWidgetProps) {
  if (isLoading) {
    return (
      <Card variant="minimal" className="pt-2">
        <Card.Title className="mb-6 px-1">Atividade Recente</Card.Title>
        <div className="flex flex-col gap-4 px-1">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card variant="minimal" className="pt-2">
      <Card.Title className="mb-6 px-1 text-base">Atividade Recente</Card.Title>
      
      {activities.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm text-ink-muted">Nenhuma atividade recente.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5 px-1 relative before:absolute before:inset-y-2 before:left-[11px] before:w-px before:bg-dark-border/10">
          {activities.map((act, i) => (
            <div key={i} className="flex gap-4 relative group cursor-pointer">
              <div className="relative z-10 w-6 h-6 rounded-full bg-surface border-[3px] border-surface flex items-center justify-center shrink-0">
                <div className="w-2 h-2 rounded-full bg-dark-border/30 group-hover:bg-brand-500 group-hover:scale-150 transition-all duration-300" />
              </div>
              <div className="flex flex-col -mt-0.5">
                <span className="text-sm text-ink font-medium leading-snug group-hover:text-brand-600 transition-colors">{act.description}</span>
                <span className="text-[11px] text-ink-muted mt-0.5 font-medium">{act.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
