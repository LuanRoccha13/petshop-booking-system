import React from 'react';
import { PageContainer } from './PageContainer';
import { cn } from '../../utils/cn';

export interface SplitCanvasLayoutProps {
  leftPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  leftClassName?: string;
  rightClassName?: string;
}

/**
 * The Split Canvas layout pattern.
 * Exact 50vw/50vw split on desktop. Used for detailed anamnesis or side-by-side comparative flows.
 */
export function SplitCanvasLayout({ leftPanel, rightPanel, leftClassName, rightClassName }: SplitCanvasLayoutProps) {
  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row overflow-hidden">
      <div className={cn('flex-1 lg:h-screen overflow-y-auto bg-surface-soft border-r border-dark-border/10', leftClassName)}>
        <PageContainer className="p-8 md:p-12 h-full">
          {leftPanel}
        </PageContainer>
      </div>
      <div className={cn('flex-1 lg:h-screen overflow-y-auto bg-surface', rightClassName)}>
        <PageContainer className="p-8 md:p-12 h-full">
          {rightPanel}
        </PageContainer>
      </div>
    </div>
  );
}
