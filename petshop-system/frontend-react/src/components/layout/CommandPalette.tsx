import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Icon } from '../ui/Icon';
import { cn } from '../../utils/cn';

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  // Quick Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // You would typically dispatch to a global state here, but for this primitive we just assume it's controlled.
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideCloseButton className="max-w-2xl mt-[10vh] self-start bg-surface/95 backdrop-blur-xl">
      <div className="flex flex-col h-full border-b border-dark-border/10">
        <div className="relative flex items-center px-4 py-3">
          <Icon name="Search" size={20} className="text-brand-500 absolute left-6" />
          <input
            autoFocus
            className="w-full bg-transparent border-none outline-none pl-10 pr-4 py-2 font-body text-lg text-ink placeholder:text-ink-muted"
            placeholder="O que você está procurando?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex items-center gap-1 absolute right-6">
            <kbd className="px-2 py-1 text-xs font-ui font-semibold bg-surface-strong/30 text-ink-muted rounded border border-dark-border/10">ESC</kbd>
          </div>
        </div>
      </div>
      
      {/* Example static results body */}
      <div className="p-4 max-h-[400px] overflow-y-auto">
        {query ? (
          <div className="py-8 text-center text-ink-muted text-sm">
            Nenhum resultado encontrado para "{query}"
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2 px-2">Ações Rápidas</h4>
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-surface-strong/30 transition-colors text-ink font-semibold">
                <Icon name="CalendarPlus" size={18} className="text-brand-500" />
                Novo Agendamento
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-surface-strong/30 transition-colors text-ink font-semibold">
                <Icon name="UserPlus" size={18} className="text-brand-500" />
                Adicionar Pet
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
