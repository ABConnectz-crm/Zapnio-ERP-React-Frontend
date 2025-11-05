'use client';

import { useState } from 'react';
import { IconSidebar } from './IconSidebar';
import { CleanTopBar } from './CleanTopBar';
import { motion } from 'framer-motion';

interface ZapnioLayoutProps {
  children: React.ReactNode;
}

export function ZapnioLayout({ children }: ZapnioLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-lavender-50 to-sky-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Top Bar */}
      <CleanTopBar onMenuClick={() => setIsMobileSidebarOpen(true)} />

      {/* Icon Sidebar */}
      <IconSidebar
        isMobileOpen={isMobileSidebarOpen}
        onMobileClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="pt-14 lg:pl-[72px] min-h-screen transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
