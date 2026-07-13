import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { CommandPalette } from './CommandPalette';

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * The outermost wrapper for the entire application.
 * Manages global states like Command Palette, Toast notifications, etc.
 */
export function AppShell({ className, children, ...props }: AppShellProps) {
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);

  return (
    <div className={cn('min-h-screen bg-bg text-ink flex flex-col font-body selection:bg-brand-500/20', className)} {...props}>
      {children}
      <CommandPalette isOpen={isCmdKOpen} onClose={() => setIsCmdKOpen(false)} />
      {/* ToastContainer would go here */}
    </div>
  );
}
