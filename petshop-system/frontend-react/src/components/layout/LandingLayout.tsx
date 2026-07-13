import React from 'react';
import { Navigation } from './Navigation';
import { Button } from '../ui/Button';
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
      <header className="fixed top-0 inset-x-0 z-[100] bg-surface/80 backdrop-blur-xl border-b border-dark-border/5 h-[80px] flex items-center transition-all">
        <ContentArea className="flex items-center justify-between w-full">
          <Link to="/" className="flex items-center transition-opacity hover:opacity-90 outline-none focus-visible:shadow-focus rounded-lg">
            <Logo size="md" />
          </Link>
          
          <Navigation 
            orientation="horizontal" 
            className="hidden md:flex" 
            items={[
              { label: 'Serviços', href: '/services' },
              { label: 'Especialistas', href: '/experts' },
              { label: 'O Spa', href: '/spa' },
            ]} 
          />

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-ink-muted hover:text-brand-600 transition-colors hidden sm:block">Entrar</Link>
            <Link to="/register">
              <Button size="sm">Agendar agora</Button>
            </Link>
          </div>
        </ContentArea>
      </header>
      
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
