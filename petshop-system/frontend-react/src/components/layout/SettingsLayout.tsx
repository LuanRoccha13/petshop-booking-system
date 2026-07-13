import React from 'react';
import { PageContainer } from './PageContainer';
import { ContentArea } from './ContentArea';
import { Navigation } from './Navigation';
import { DashboardLayout } from './DashboardLayout';

export interface SettingsLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
  onLogout?: () => void;
}

const SETTINGS_NAV = [
  { label: 'Perfil', href: '/settings/profile', icon: 'User' as const },
  { label: 'Notificações', href: '/settings/notifications', icon: 'Bell' as const },
  { label: 'Pagamento', href: '/settings/billing', icon: 'CreditCard' as const },
  { label: 'Segurança', href: '/settings/security', icon: 'Shield' as const },
];

/**
 * Nested layout for Settings pages inside the Dashboard.
 */
export function SettingsLayout({ children, userEmail, onLogout }: SettingsLayoutProps) {
  return (
    <DashboardLayout userEmail={userEmail} onLogout={onLogout}>
      <ContentArea size="lg" className="py-8">
        <h1 className="font-display text-3xl font-bold text-ink mb-8">Configurações</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <Navigation items={SETTINGS_NAV} className="sticky top-24" />
          </aside>
          <main className="flex-1">
            <PageContainer>
              {children}
            </PageContainer>
          </main>
        </div>
      </ContentArea>
    </DashboardLayout>
  );
}
