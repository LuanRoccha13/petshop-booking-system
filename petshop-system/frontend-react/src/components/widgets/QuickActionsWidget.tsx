import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

export interface QuickActionsWidgetProps {
  onNewBooking?: () => void;
  onAddPet?: () => void;
  onViewHistory?: () => void;
}

export function QuickActionsWidget({ onNewBooking, onAddPet, onViewHistory }: QuickActionsWidgetProps) {
  return (
    <Card variant="highlight" className="p-5 border-none bg-gradient-to-br from-brand-500/10 to-brand-500/5 backdrop-blur-md">
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="font-display font-bold text-lg text-brand-900">O que você precisa?</h3>
        <p className="text-sm text-brand-800/80 leading-snug">Gerencie a rotina do seu pet de forma rápida.</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={onNewBooking} className="w-full justify-center shadow-elevation-1 hover:shadow-elevation-2 transition-shadow" leftIcon={<Icon name="CalendarPlus" size={18} />}>
          Agendar banho ou tosa
        </Button>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <Button onClick={onAddPet} variant="secondary" className="w-full justify-center bg-white text-brand-700 hover:bg-brand-50" size="sm">
            Adicionar pet
          </Button>
          <Button onClick={onViewHistory} variant="secondary" className="w-full justify-center bg-white text-brand-700 hover:bg-brand-50" size="sm">
            Histórico
          </Button>
        </div>
      </div>
    </Card>
  );
}
