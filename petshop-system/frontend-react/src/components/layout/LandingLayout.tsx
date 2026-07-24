import React from 'react';
import { LandingNavbar } from './LandingNavbar';
import { ContentArea } from './ContentArea';
import { Link } from 'react-router-dom';
import { PageContainer } from './PageContainer';
import { Logo } from '../ui/Logo';

export interface LandingLayoutProps {
  children: React.ReactNode;
}

export function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-bg relative overflow-x-hidden">
      <LandingNavbar />
      
      <main className="flex-1 pt-[80px]">
        <PageContainer>
          {children}
        </PageContainer>
      </main>

      <footer className="bg-surface-soft border-t border-dark-border/5 py-16">
        <ContentArea>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Logo size="md" className="mb-6 opacity-80" />
              <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
                Elevando o padrão de cuidados animais com tecnologia premium e carinho absoluto.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-dark-text mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/login" className="hover:text-brand-500 transition-colors">Login do Tutor</Link></li>
                <li><Link to="/register" className="hover:text-brand-500 transition-colors">Criar conta</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-dark-text mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="hover:text-brand-500 transition-colors">Privacidade</Link></li>
                <li><Link to="/terms" className="hover:text-brand-500 transition-colors">Termos de Uso</Link></li>
              </ul>
            </div>
          </div>
        </ContentArea>
      </footer>
    </div>
  );
}
