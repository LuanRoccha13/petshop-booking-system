import React from 'react';
import { PageContainer } from './PageContainer';

export interface EmptyLayoutProps {
  children: React.ReactNode;
}

/**
 * Bare layout for 404s, maintenance pages, or completely custom full-screen takeovers.
 */
export function EmptyLayout({ children }: EmptyLayoutProps) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <PageContainer className="items-center justify-center text-center">
        {children}
      </PageContainer>
    </div>
  );
}
