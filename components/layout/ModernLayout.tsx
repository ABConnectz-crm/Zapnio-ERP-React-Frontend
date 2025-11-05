'use client';

import { useState } from 'react';
import { ModernSidebar } from './ModernSidebar';
import { ModernHeader } from './ModernHeader';
import { CommandPalette } from '@/components/command/CommandPalette';
import { FAB } from '@/components/ui/FAB';
import { PageTransition } from '@/components/animations/PageTransition';
import clsx from 'clsx';

interface ModernLayoutProps {
  children: React.ReactNode;
}

export function ModernLayout({ children }: ModernLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  return (
    <>
      {/* Command Palette */}
      <CommandPalette />

      {/* Sidebar */}
      <ModernSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Header */}
      <ModernHeader
        onMenuClick={() => setIsMobileSidebarOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Content */}
      <main
        className={clsx(
          'min-h-screen pt-16 transition-all duration-300 bg-neutral-50 dark:bg-neutral-950',
          isSidebarCollapsed ? 'lg:pl-[60px]' : 'lg:pl-[240px]'
        )}
      >
        <PageTransition>
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </PageTransition>
      </main>

      {/* FAB */}
      <FAB />
    </>
  );
}
