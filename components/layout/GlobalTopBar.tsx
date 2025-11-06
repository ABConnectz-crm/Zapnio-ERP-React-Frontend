'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, Maximize2, Moon, Sun, Settings as SettingsIcon, Command } from 'lucide-react';
import { useTheme } from 'next-themes';
import { NotificationPanel } from '@/components/ui/NotificationPanel';
import { SettingsPanel } from '@/components/ui/SettingsPanel';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { UserProfileDropdown } from '@/components/ui/UserProfileDropdown';

interface GlobalTopBarProps {
  sidebarOpen: boolean;
}

export function GlobalTopBar({ sidebarOpen }: GlobalTopBarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const leftOffset = sidebarOpen ? 304 : 64;

  // Fullscreen toggle handler
  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Command Palette keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Skip to main content - WCAG */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      <motion.header
        animate={{ paddingLeft: `${leftOffset}px` }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 right-0 left-0 h-16 z-30 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50 shadow-sm"
        role="banner"
      >
        {/* Gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />

        {/* Content */}
        <div className="relative h-full flex items-center justify-between px-6">
          {/* Search Bar */}
          <div className="flex-1 max-w-xl">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="group w-full flex items-center gap-3 px-4 py-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
              aria-label="Open command palette"
            >
              <Search className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
              <span className="flex-1 text-left text-sm text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                Search or jump to...
              </span>
              <div className="flex items-center gap-1 text-xs">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded text-neutral-500 dark:text-neutral-400 font-mono shadow-sm">
                  {typeof navigator !== 'undefined' && navigator?.platform?.toLowerCase().includes('mac') ? '⌘' : 'Ctrl'}
                </kbd>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded text-neutral-500 dark:text-neutral-400 font-mono shadow-sm">
                  K
                </kbd>
              </div>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 ml-6">
            {/* Dark Mode Toggle */}
            {mounted && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-700 hover:from-primary-100 hover:to-accent-100 dark:hover:from-primary-900/30 dark:hover:to-accent-900/30 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
            )}

            {/* Fullscreen */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              onClick={toggleFullscreen}
              className="p-2.5 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-700 hover:from-primary-100 hover:to-accent-100 dark:hover:from-primary-900/30 dark:hover:to-accent-900/30 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              <Maximize2 className="w-5 h-5" />
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              onClick={() => setSettingsOpen(true)}
              className="p-2.5 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-700 hover:from-primary-100 hover:to-accent-100 dark:hover:from-primary-900/30 dark:hover:to-accent-900/30 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
              aria-label="Open settings"
              title="Settings"
            >
              <SettingsIcon className="w-5 h-5" />
            </motion.button>

            {/* Notifications */}
            <div className="relative">
              <motion.button
                ref={notificationButtonRef}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2.5 rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-700 hover:from-primary-100 hover:to-accent-100 dark:hover:from-primary-900/30 dark:hover:to-accent-900/30 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                aria-haspopup="true"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full ring-2 ring-white dark:ring-neutral-900"
                />
              </motion.button>
              <NotificationPanel
                isOpen={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
                buttonRef={notificationButtonRef}
              />
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-neutral-300 dark:via-neutral-600 to-transparent mx-2" aria-hidden="true" />

            {/* User Profile */}
            <div className="relative">
              <motion.button
                ref={profileButtonRef}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-br from-neutral-100 to-neutral-50 dark:from-neutral-800 dark:to-neutral-700 hover:from-primary-100 hover:to-accent-100 dark:hover:from-primary-900/30 dark:hover:to-accent-900/30 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                aria-label="User profile menu"
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white dark:ring-neutral-900">
                  DK
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Dinesh Kumar</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">Admin</p>
                </div>
              </motion.button>
              <UserProfileDropdown
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                buttonRef={profileButtonRef}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}
