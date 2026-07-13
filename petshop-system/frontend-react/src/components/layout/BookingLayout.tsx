import React from 'react';
import { Header } from './Header';
import { ContentArea } from './ContentArea';
import { PageContainer } from './PageContainer';
import { Icon } from '../ui/Icon';
import { Link } from 'react-router-dom';

export interface BookingLayoutProps {
  children: React.ReactNode;
  step?: number;
  totalSteps?: number;
}

/**
 * The Linear Funnel layout pattern.
 * Focused strictly on complex sequential flows (like bookings).
 * Maximum width of 680px for the central column to avoid distractions.
 */
export function BookingLayout({ children, step, totalSteps }: BookingLayoutProps) {
  return (
    <div className="min-h-screen bg-bg flex flex-col relative">
      <Header className="bg-transparent border-none shadow-none h-20">
        <ContentArea size="full" className="flex items-center justify-between px-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-ink-muted hover:text-ink font-semibold transition-colors">
            <Icon name="ArrowLeft" size={20} />
            Sair do agendamento
          </Link>
          
          {step && totalSteps && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-ink-muted">Etapa {step} de {totalSteps}</span>
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className={`w-8 h-1.5 rounded-full transition-colors ${i < step ? 'bg-brand-500' : 'bg-dark-border/10'}`} />
                ))}
              </div>
            </div>
          )}
        </ContentArea>
      </Header>

      <main className="flex-1 pb-section">
        <PageContainer>
          <ContentArea size="sm">
            {children}
          </ContentArea>
        </PageContainer>
      </main>
    </div>
  );
}
