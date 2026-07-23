import React from 'react';
import { PageContainer } from './PageContainer';
import { AuthVisual } from './AuthVisual';

export interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout split premium para o fluxo de autenticação.
 * Lado esquerdo: Formulário repousando sutilmente sobre uma superfície física discreta.
 * Lado direito: Direção de arte e atmosfera contidas no AuthVisual.
 */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row relative">
      
      {/* 
        Form Side (Esquerda) 
        A superfície (bg-surface) já funciona como base, mas aplicamos 
        uma materialidade super discreta no próprio container interno.
      */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-24 relative z-10 bg-surface shadow-[4px_0_24px_rgba(33,24,17,0.02)]">
        <PageContainer className="w-full max-w-md">
          {/* 
            Profundidade física sutil para o formulário.
            "Não deve parecer desenhado sobre a página. Deve transmitir a sensação de um plano físico."
          */}
          <div className="relative bg-surface/40 backdrop-blur-[2px] border border-white/60 p-6 sm:p-10 rounded-[24px] shadow-[0_8px_32px_rgba(33,24,17,0.03)] transition-all duration-700">
            {children}
          </div>
        </PageContainer>
      </div>
      
      {/* Visual Side (Direita) - Isolado em seu próprio componente */}
      <AuthVisual />
      
    </div>
  );
}
