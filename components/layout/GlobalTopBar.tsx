'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Maximize2, Moon, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';

interface GlobalTopBarProps {
  sidebarOpen: boolean;
}

export function GlobalTopBar({ sidebarOpen }: GlobalTopBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const leftOffset = sidebarOpen ? 304 : 64; // 64px icon + 240px secondary OR just 64px icon

  return (
    <motion.header
      animate={{ paddingLeft: `${leftOffset}px` }}
      transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
      className="fixed top-0 right-0 left-0 h-16 z-30"
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-700/50 shadow-sm" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-between px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search leads, contacts, deals..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 ml-6">
          {/* Dark Mode Toggle */}
          {mounted && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          )}

          {/* Fullscreen */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
          >
            <Maximize2 className="w-5 h-5" />
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2.5 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full ring-2 ring-white dark:ring-neutral-900" />
          </motion.button>

          {/* Divider */}
          <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-700 mx-2" />

          {/* User Profile */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-3 py-2 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold text-sm">
              DK
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Dinesh Kumar</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Admin</p>
            </div>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
