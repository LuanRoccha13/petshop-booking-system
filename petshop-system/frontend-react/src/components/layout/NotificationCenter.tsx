import React from 'react';
import { Dropdown } from '../ui/Dropdown';
import { Icon } from '../ui/Icon';
import { Badge } from '../ui/Badge';

export function NotificationCenter() {
  return (
    <Dropdown>
      <Dropdown.Trigger className="relative p-2 rounded-full hover:bg-surface-strong/30 text-ink-muted hover:text-ink transition-colors focus-visible:shadow-focus">
        <Icon name="Bell" size={20} />
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-surface" />
      </Dropdown.Trigger>
      <Dropdown.Content align="right" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3 border-b border-dark-border/10">
          <h3 className="font-display font-bold text-ink m-0">Notificações</h3>
          <Badge variant="outline">2 novas</Badge>
        </div>
        <div className="max-h-[300px] overflow-y-auto p-2">
          <Dropdown.Item className="rounded-md mb-1 items-start gap-3 p-3">
            <div className="mt-0.5 w-2 h-2 rounded-full bg-brand-500 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Vacina próxima</span>
              <span className="text-xs text-ink-muted mt-0.5">A vacina V10 do Spike vence em 3 dias.</span>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className="rounded-md items-start gap-3 p-3">
            <div className="mt-0.5 w-2 h-2 rounded-full bg-transparent shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Agendamento confirmado</span>
              <span className="text-xs text-ink-muted mt-0.5">Banho e tosa para amanhã às 14:00.</span>
            </div>
          </Dropdown.Item>
        </div>
      </Dropdown.Content>
    </Dropdown>
  );
}
