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

      {/*
        Footer — mobile-first layout
        Mobile: pilha vertical com sequência bem definida (Logo → descrição → links → legal → copyright)
        Desktop (md+): grid de 4 colunas, exatamente como antes
      */}
      <footer className="bg-surface-soft border-t border-dark-border/5 py-12 lg:py-16">
        <ContentArea>

          {/* ── Desktop grid (md+) — layout original ── */}
          <div className="hidden md:grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
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

          {/* ── Mobile layout (<md) — sequência vertical ── */}
          <div className="md:hidden flex flex-col gap-10">
            {/* Bloco 1: Logo + Descrição */}
            <div className="flex flex-col gap-4">
              <Logo size="md" className="opacity-80" />
              <p className="text-sm leading-relaxed text-ink-muted max-w-[280px]">
                Elevando o padrão de cuidados animais com tecnologia premium e carinho absoluto.
              </p>
            </div>

            {/* Bloco 2: Links de Plataforma */}
            <div>
              <h4 className="text-[10px] font-ui font-semibold uppercase tracking-widest text-ink-muted mb-4">
                Plataforma
              </h4>
              <ul className="flex flex-col gap-0 -mx-2">
                <li>
                  <Link
                    to="/login"
                    className="flex items-center gap-3 px-2 py-3.5 rounded-xl text-sm font-medium text-ink hover:bg-surface-hover transition-colors"
                  >
                    Login do Tutor
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="flex items-center gap-3 px-2 py-3.5 rounded-xl text-sm font-medium text-ink hover:bg-surface-hover transition-colors"
                  >
                    Criar conta
                  </Link>
                </li>
              </ul>
            </div>

            {/* Bloco 3: Links Legais */}
            <div>
              <h4 className="text-[10px] font-ui font-semibold uppercase tracking-widest text-ink-muted mb-4">
                Legal
              </h4>
              <ul className="flex flex-col gap-0 -mx-2">
                <li>
                  <Link
                    to="/privacy"
                    className="flex items-center gap-3 px-2 py-3.5 rounded-xl text-sm font-medium text-ink hover:bg-surface-hover transition-colors"
                  >
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="flex items-center gap-3 px-2 py-3.5 rounded-xl text-sm font-medium text-ink hover:bg-surface-hover transition-colors"
                  >
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>

            {/* Bloco 4: Copyright */}
            <div className="border-t border-dark-border/10 pt-6">
              <p className="text-[11px] text-ink-muted/60 font-ui">
                © {new Date().getFullYear()} B&T Petshop. Todos os direitos reservados.
              </p>
            </div>
          </div>

        </ContentArea>
      </footer>
    </div>
  );
}
