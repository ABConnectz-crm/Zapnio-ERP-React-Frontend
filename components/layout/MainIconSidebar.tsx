'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';
import {
  LayoutDashboard,
  Users,
  TrendingUp,
  Briefcase,
  Mail,
  FileText,
  Settings,
  HelpCircle,
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  href: string;
  subMenuKey?: string;
}

interface MainIconSidebarProps {
  onMenuSelect: (menuKey: string) => void;
  selectedMenu: string | null;
}

export function MainIconSidebar({ onMenuSelect, selectedMenu }: MainIconSidebarProps) {
  const pathname = usePathname();

  const mainMenuItems: MenuItem[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard className="w-6 h-6" />,
      href: '/dashboard',
      subMenuKey: 'dashboard',
    },
    {
      id: 'crm',
      name: 'CRM',
      icon: <Users className="w-6 h-6" />,
      href: '/leads',
      subMenuKey: 'crm',
    },
    {
      id: 'sales',
      name: 'Sales',
      icon: <TrendingUp className="w-6 h-6" />,
      href: '/pipeline',
      subMenuKey: 'sales',
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: <Briefcase className="w-6 h-6" />,
      href: '/projects',
      subMenuKey: 'projects',
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: <Mail className="w-6 h-6" />,
      href: '/marketing',
      subMenuKey: 'marketing',
    },
    {
      id: 'reports',
      name: 'Reports',
      icon: <FileText className="w-6 h-6" />,
      href: '/reports',
      subMenuKey: 'reports',
    },
  ];

  const bottomMenuItems: MenuItem[] = [
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings className="w-6 h-6" />,
      href: '/settings',
    },
    {
      id: 'help',
      name: 'Help',
      icon: <HelpCircle className="w-6 h-6" />,
      href: '/help',
    },
  ];

  const isActive = (item: MenuItem) => {
    return pathname.startsWith(item.href);
  };

  return (
    <Tooltip.Provider delayDuration={0}>
      <motion.aside
        initial={{ x: -64 }}
        animate={{ x: 0 }}
        className="fixed top-0 left-0 h-screen w-16 z-50 flex flex-col"
      >
        {/* Glassmorphism Background */}
        <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-r border-neutral-200/50 dark:border-neutral-700/50" />

        {/* Content */}
        <div className="relative flex flex-col h-full py-4">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center justify-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl">Z</span>
            </motion.div>
          </Link>

          {/* Main Menu Items */}
          <nav className="flex-1 flex flex-col gap-2 px-2">
            {mainMenuItems.map((item) => {
              const active = isActive(item);
              return (
                <Tooltip.Root key={item.id}>
                  <Tooltip.Trigger asChild>
                    <motion.button
                      onClick={() => item.subMenuKey && onMenuSelect(item.subMenuKey)}
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        relative w-12 h-12 rounded-xl flex items-center justify-center
                        transition-all duration-300 group
                        ${active || selectedMenu === item.subMenuKey
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                          : 'bg-neutral-100/50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600'
                        }
                      `}
                    >
                      {item.icon}

                      {/* Active Indicator */}
                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-500 rounded-r-full"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="right"
                      sideOffset={12}
                      className="px-3 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-lg shadow-xl z-50 animate-in fade-in-0 zoom-in-95"
                    >
                      {item.name}
                      <Tooltip.Arrow className="fill-neutral-900 dark:fill-neutral-100" />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              );
            })}
          </nav>

          {/* Bottom Menu Items */}
          <div className="flex flex-col gap-2 px-2 mt-auto">
            {bottomMenuItems.map((item) => (
              <Tooltip.Root key={item.id}>
                <Tooltip.Trigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05, x: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-neutral-100/50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 transition-all duration-300"
                  >
                    {item.icon}
                  </motion.button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    side="right"
                    sideOffset={12}
                    className="px-3 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium rounded-lg shadow-xl z-50 animate-in fade-in-0 zoom-in-95"
                  >
                    {item.name}
                    <Tooltip.Arrow className="fill-neutral-900 dark:fill-neutral-100" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ))}
          </div>
        </div>
      </motion.aside>
    </Tooltip.Provider>
  );
}
