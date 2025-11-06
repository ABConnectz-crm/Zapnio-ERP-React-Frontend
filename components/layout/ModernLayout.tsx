'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MainIconSidebar } from './MainIconSidebar';
import { SecondarySidebar } from './SecondarySidebar';
import { GlobalTopBar } from './GlobalTopBar';
import { QuickActions } from '@/components/ui/QuickActions';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

interface ModernLayoutProps {
  children: React.ReactNode;
  thirdLevelNav?: React.ReactNode;
}

// Context for third-level navigation
const ThirdLevelNavContext = createContext<{
  setThirdLevelNav: (nav: React.ReactNode) => void;
}>({
  setThirdLevelNav: () => {},
});

export const useThirdLevelNav = () => useContext(ThirdLevelNavContext);

export function ModernLayout({ children, thirdLevelNav }: ModernLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string | null>('dashboard');
  const [dynamicThirdLevelNav, setDynamicThirdLevelNav] = useState<React.ReactNode>(null);

  // Determine selected menu based on current path
  useEffect(() => {
    if (pathname.startsWith('/dashboard')) {
      setSelectedMenu('dashboard');
    } else if (pathname.startsWith('/leads') || pathname.startsWith('/contacts') || pathname.startsWith('/accounts') || pathname.startsWith('/deals')) {
      setSelectedMenu('crm');
    } else if (pathname.startsWith('/pipeline') || pathname.startsWith('/forecasts') || pathname.startsWith('/quotes')) {
      setSelectedMenu('sales');
    } else if (pathname.startsWith('/projects')) {
      setSelectedMenu('projects');
    } else if (pathname.startsWith('/marketing')) {
      setSelectedMenu('marketing');
    } else if (pathname.startsWith('/reports')) {
      setSelectedMenu('reports');
    }
  }, [pathname]);

  const handleMenuSelect = (menuKey: string) => {
    if (selectedMenu === menuKey && sidebarOpen) {
      // If clicking the same menu and sidebar is open, close it
      setSidebarOpen(false);
    } else {
      // Otherwise, open sidebar with selected menu
      setSelectedMenu(menuKey);
      setSidebarOpen(true);
    }
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const leftPadding = sidebarOpen ? 304 : 64; // 64px icon + 240px secondary OR just 64px
  const finalThirdLevelNav = dynamicThirdLevelNav || thirdLevelNav;

  return (
    <ThirdLevelNavContext.Provider value={{ setThirdLevelNav: setDynamicThirdLevelNav }}>
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-100/50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950/50">
        {/* Animated background pattern */}
        <div className="fixed inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Main Icon Sidebar */}
        <MainIconSidebar onMenuSelect={handleMenuSelect} selectedMenu={selectedMenu} />

        {/* Secondary Sidebar */}
        <SecondarySidebar
          isOpen={sidebarOpen}
          onToggle={handleToggleSidebar}
          selectedMenu={selectedMenu}
        />

        {/* Global Top Bar */}
        <GlobalTopBar sidebarOpen={sidebarOpen} />

        {/* Third Level Navigation Bar - Positioned below GlobalTopBar */}
        {finalThirdLevelNav && (
          <motion.div
            animate={{ paddingLeft: `${leftPadding}px` }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
            className="fixed top-16 right-0 left-0 z-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-sm"
          >
            {finalThirdLevelNav}
          </motion.div>
        )}

        {/* Main Content Area */}
        <motion.main
          id="main-content"
          animate={{ paddingLeft: `${leftPadding}px` }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
          className={`min-h-screen ${finalThirdLevelNav ? 'pt-32' : 'pt-16'}`}
          role="main"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 max-w-[1920px] mx-auto"
          >
            {/* Breadcrumbs */}
            <Breadcrumbs />

            {/* Page Content */}
            {children}
          </motion.div>
        </motion.main>

        {/* Quick Actions FAB */}
        <QuickActions />
      </div>
    </ThirdLevelNavContext.Provider>
  );
}
