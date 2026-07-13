import React from 'react';
import { Dropdown } from '../ui/Dropdown';
import { Avatar } from '../ui/Avatar';
import { Icon } from '../ui/Icon';

export interface UserMenuProps {
  email?: string;
  onLogout?: () => void;
}

export function UserMenu({ email, onLogout }: UserMenuProps) {
  const initials = email ? email.substring(0, 2).toUpperCase() : 'U';

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full focus-visible:shadow-focus">
        <Avatar initials={initials} size="sm" className="hover:ring-2 hover:ring-brand-500/30 transition-all cursor-pointer" />
      </Dropdown.Trigger>
      <Dropdown.Content align="right" className="w-56 p-2">
        <div className="px-3 py-2 mb-2 border-b border-dark-border/10">
          <div className="font-semibold text-sm truncate">{email || 'Usuário'}</div>
          <div className="text-xs text-ink-muted truncate">Plano Premium</div>
        </div>
        
        <Dropdown.Item className="rounded-md mb-1 gap-2">
          <Icon name="User" size={16} />
          Meu Perfil
        </Dropdown.Item>
        <Dropdown.Item className="rounded-md mb-1 gap-2">
          <Icon name="Settings" size={16} />
          Configurações
        </Dropdown.Item>
        <div className="my-1 border-t border-dark-border/10" />
        <Dropdown.Item onClick={onLogout} className="rounded-md gap-2 text-danger hover:bg-danger-soft hover:text-danger">
          <Icon name="LogOut" size={16} />
          Sair da conta
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
