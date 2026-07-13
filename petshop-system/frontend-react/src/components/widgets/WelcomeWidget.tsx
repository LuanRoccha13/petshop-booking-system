import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

export interface WelcomeWidgetProps {
  userName?: string;
  isLoading?: boolean;
}

export function WelcomeWidget({ userName, isLoading }: WelcomeWidgetProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 mb-8 animate-pulse">
        <div className="h-8 w-64 bg-surface-strong rounded-md" />
        <div className="h-4 w-96 bg-surface-strong/50 rounded-md" />
      </div>
    );
  }

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <div className="mb-8">
      <h1 className="font-display text-3xl font-bold text-ink mb-2">
        {greeting}, {userName || 'visitante'}.
      </h1>
      <p className="text-ink-muted">Bem-vindo ao painel de cuidados do seu pet. Como podemos ajudar hoje?</p>
    </div>
  );
}
