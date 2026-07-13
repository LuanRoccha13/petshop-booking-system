import React from 'react';
import { PageContainer } from './PageContainer';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Replaces the old AuthShell.tsx
 * Adheres to the Split Canvas layout logic conceptually, optimized for auth flows.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 relative z-10 bg-surface shadow-xl">
        <PageContainer className="w-full max-w-md">
          {children}
        </PageContainer>
      </div>
      <div className="hidden md:flex flex-1 relative bg-surface-strong items-center justify-center overflow-hidden">
        {/* Placeholder for dynamic visual/marketing content */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-soft to-surface mix-blend-multiply opacity-50" />
        <div className="relative z-10 max-w-md text-center">
          <h2 className="font-display text-4xl font-bold text-ink mb-4">Seu ritual já começou.</h2>
          <p className="text-ink-muted text-lg">Acompanhe confirmações, horários e recados do atendimento em um painel limpo, rápido e acolhedor.</p>
        </div>
      </div>
    </div>
  );
}
