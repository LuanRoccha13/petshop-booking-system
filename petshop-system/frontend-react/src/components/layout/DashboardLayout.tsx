import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { UserMenu } from './UserMenu';
import { NotificationCenter } from './NotificationCenter';
import { PageContainer } from './PageContainer';
import { Logo } from '../ui/Logo';
import { Icon } from '../ui/Icon';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
  onLogout?: () => void;
}

const NAV_ITEMS = [
  { label: 'Painel', href: '/dashboard', icon: 'LayoutDashboard' as const },
  { label: 'Meus Pets', href: '/pets', icon: 'PawPrint' as const },
  { label: 'Agendamentos', href: '/bookings', icon: 'CalendarDays' as const },
  { label: 'Histórico Clínico', href: '/history', icon: 'FileText' as const },
];

export function DashboardLayout({ children, userEmail, onLogout }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isMobile={window.innerWidth < 1024} className="flex-shrink-0">
        {({ isCollapsed }: any) => (
          <>
            <div className={cn("p-6 flex items-center", isCollapsed ? "justify-center" : "")}>
              <Logo showText={!isCollapsed} size="md" />
            </div>
            <div className="flex-1 px-4 py-4 overflow-y-auto overflow-x-hidden">
              <Navigation items={NAV_ITEMS} isCollapsed={isCollapsed} />
            </div>
            {!isCollapsed && (
              <div className="p-4 mx-4 mb-4 bg-brand-soft border border-brand-500/10 rounded-xl">
                <p className="text-xs font-semibold text-brand-700 mb-2">Precisa de ajuda?</p>
                <p className="text-xs text-brand-600/80 mb-3">Fale com nossa equipe no WhatsApp para dúvidas.</p>
                <button className="w-full py-1.5 bg-white text-brand-700 text-xs font-semibold rounded-lg shadow-sm border border-brand-500/10 hover:shadow-md transition-shadow">
                  Iniciar chat
                </button>
              </div>
            )}
          </>
        )}
      </Sidebar>

      <div className="flex-1 flex flex-col min-w-0">
        <Header>
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 text-ink-muted hover:text-ink focus-visible:shadow-focus rounded-md outline-none"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Icon name="Menu" />
            </button>
            <h2 className="hidden md:block font-display text-lg font-bold text-ink">Visão Geral</h2>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="hidden md:flex items-center gap-3 px-4 py-2 text-sm font-medium text-ink-muted bg-surface/60 backdrop-blur-sm border border-dark-border/10 rounded-xl hover:bg-surface hover:text-ink hover:shadow-sm transition-all shadow-sm w-64 group">
              <Icon name="Search" size={16} className="text-ink-muted group-hover:text-ink transition-colors" />
              <span>Buscar...</span>
              <kbd className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded border border-dark-border/10 bg-surface-soft text-[10px] font-mono text-ink-muted group-hover:border-dark-border/20 group-hover:text-ink transition-colors">
                <Icon name="Command" size={10} /> K
              </kbd>
            </button>
            <div className="flex items-center gap-2">
              <NotificationCenter />
              <div className="w-px h-6 bg-dark-border/10 mx-1" />
              <UserMenu email={userEmail} onLogout={onLogout} />
            </div>
          </div>
        </Header>

        <main className="flex-1 overflow-y-auto">
          <PageContainer className="px-8 pb-12 pt-2 max-w-7xl mx-auto">
            {children}
          </PageContainer>
        </main>
      </div>
    </div>
  );
}
