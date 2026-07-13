import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { Skeleton } from '../ui/Skeleton';
import { Icon } from '../ui/Icon';

export interface PetSummaryWidgetProps {
  pets?: any[];
  isLoading?: boolean;
}

export function PetSummaryWidget({ pets = [], isLoading }: PetSummaryWidgetProps) {
  if (isLoading) {
    return (
      <Card variant="flat">
        <Card.Title className="mb-4">Meus Pets</Card.Title>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </Card>
    );
  }

  return (
    <Card variant="flat" className="h-full">
      <div className="flex items-center justify-between mb-4">
        <Card.Title>Meus Pets</Card.Title>
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-surface border border-dark-border/10 text-ink-muted hover:text-ink hover:shadow-sm transition-all" aria-label="Adicionar Pet">
          <Icon name="Plus" size={16} />
        </button>
      </div>
      
      {pets.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm text-ink-muted">Você ainda não adicionou nenhum pet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pets.map((pet, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl border border-dark-border/5 bg-surface hover:border-dark-border/20 transition-all cursor-pointer group shadow-sm hover:shadow-elevation-1">
              <Avatar initials={pet.name.substring(0, 1)} className="group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-ink group-hover:text-brand-600 transition-colors">{pet.name}</span>
                <span className="text-xs text-ink-muted">{pet.breed || 'SRD'} • {pet.age} anos</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
