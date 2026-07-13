import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { Badge } from '../ui/Badge';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

export interface UpcomingAppointmentsWidgetProps {
  appointments?: any[];
  isLoading?: boolean;
}

export function UpcomingAppointmentsWidget({ appointments = [], isLoading }: UpcomingAppointmentsWidgetProps) {
  if (isLoading) {
    return (
      <Card variant="elevated">
        <Card.Title className="mb-4">Próximos Agendamentos</Card.Title>
        <div className="flex flex-col gap-4">
          <Skeleton variant="text" className="h-24 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <Card.Title>Próximos Agendamentos</Card.Title>
        <Button variant="ghost" size="sm" className="hidden sm:flex text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100">Ver calendário</Button>
      </div>

      {appointments.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="w-16 h-16 bg-surface-soft rounded-full flex items-center justify-center mx-auto mb-4 text-ink-muted border border-dark-border/10">
            <Icon name="CalendarCheck" size={28} />
          </div>
          <h3 className="font-semibold text-ink mb-1 text-lg">Tudo em dia</h3>
          <p className="text-sm text-ink-muted max-w-[220px] mx-auto">Você não tem horários marcados para os próximos dias.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {appointments.map((appt, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-dark-border/10 hover:border-brand-500/30 transition-all hover:shadow-elevation-1 bg-surface group cursor-pointer">
              <div className="flex flex-col items-center justify-center w-14 h-14 bg-brand-soft border border-brand-500/10 text-brand-600 rounded-xl shrink-0">
                <span className="font-display font-bold text-lg leading-none group-hover:scale-110 transition-transform">14</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider mt-0.5">Ago</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-ink">{appt.type}</span>
                  <Badge variant="success" className="h-5 px-1.5 text-[10px]">Confirmado</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-ink-muted font-medium">
                  <span className="flex items-center gap-1.5"><Icon name="Clock" size={14} /> {appt.time}</span>
                  <span className="flex items-center gap-1.5"><Icon name="Dog" size={14} /> {appt.pet}</span>
                </div>
              </div>
              <Icon name="ChevronRight" size={18} className="text-ink-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
