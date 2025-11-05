'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { MainIconSidebar } from './MainIconSidebar';
import { SecondarySidebar } from './SecondarySidebar';
import { GlobalTopBar } from './GlobalTopBar';

interface ModernLayoutProps {
  children: React.ReactNode;
}

export function ModernLayout({ children }: ModernLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState<string | null>('dashboard');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
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

      {/* Main Content Area */}
      <motion.main
        animate={{ paddingLeft: `${leftPadding}px` }}
        transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
        className="pt-16 min-h-screen"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6"
        >
          {children}
        </motion.div>
      </motion.main>
    </div>
  );
}
