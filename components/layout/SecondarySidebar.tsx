'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { SubMenuItem, SUBMENU_CONFIG } from './navigationConfig';

interface SecondarySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedMenu: string | null;
  onSubmenuClick?: (item: SubMenuItem) => void;
}

export function SecondarySidebar({ isOpen, onToggle, selectedMenu, onSubmenuClick }: SecondarySidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const subMenus = SUBMENU_CONFIG;
  const currentSubMenu = selectedMenu ? subMenus[selectedMenu] || [] : [];

  const isActive = (href: string) => pathname === href;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.aside
          initial={{ x: -240, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -240, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
          className="fixed top-0 left-16 h-screen w-60 z-40 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 shadow-sm"
        >
          {/* Solid Background - No Glassmorphism */}

          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Header with Toggle */}
            <div className="flex items-center justify-between px-4 py-6 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {selectedMenu ? selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1) : 'Menu'}
              </h2>
              <motion.button
                onClick={onToggle}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Sub Menu Items */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              <AnimatePresence mode="popLayout">
                {currentSubMenu.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.hasThirdLevelNav ? (
                      // Button for items with third-level nav
                      <button
                        onClick={() => {
                          if (onSubmenuClick) {
                            onSubmenuClick(item);
                          }
                          router.push(item.href);
                        }}
                        className={`
                          w-full group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                          transition-all duration-300
                          ${isActive(item.href)
                            ? 'bg-primary-500 text-white shadow-sm'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400'
                          }
                        `}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="flex-1 font-medium text-sm text-left">{item.name}</span>
                        {item.badge && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`
                              px-2 py-0.5 text-xs font-semibold rounded-full
                              ${isActive(item.href)
                                ? 'bg-white/20 text-white'
                                : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                              }
                            `}
                          >
                            {item.badge}
                          </motion.span>
                        )}
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            isActive(item.href) ? 'text-white' : 'text-neutral-400'
                          }`}
                        />
                      </button>
                    ) : (
                      // Link for regular items without third-level nav
                      <Link
                        href={item.href}
                        className={`
                          group relative flex items-center gap-3 px-3 py-2.5 rounded-lg
                          transition-all duration-300
                          ${isActive(item.href)
                            ? 'bg-primary-500 text-white shadow-sm'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary-600 dark:hover:text-primary-400'
                          }
                        `}
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="flex-1 font-medium text-sm">{item.name}</span>
                        {item.badge && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className={`
                              px-2 py-0.5 text-xs font-semibold rounded-full
                              ${isActive(item.href)
                                ? 'bg-white/20 text-white'
                                : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                              }
                            `}
                          >
                            {item.badge}
                          </motion.span>
                        )}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </nav>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
