'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ChevronDown } from 'lucide-react';

interface SubMenuItem {
  id: string;
  name: string;
  href: string;
  description?: string;
}

interface TabItem {
  id: string;
  name: string;
  href: string;
  submenu?: SubMenuItem[];
}

interface ActionButton {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

interface ThirdLevelNavProps {
  title?: string;
  tabs?: TabItem[];
  actions?: ActionButton[];
}

export function ThirdLevelNav({ title, tabs = [], actions = [] }: ThirdLevelNavProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const submenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isTabActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openSubmenu && submenuRefs.current[openSubmenu]) {
        const submenuEl = submenuRefs.current[openSubmenu];
        if (submenuEl && !submenuEl.contains(event.target as Node)) {
          setOpenSubmenu(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openSubmenu]);

  return (
    <div className="h-16 px-6 flex items-center justify-between">
      {/* Title and Tabs */}
      <div className="flex items-center gap-6">
        {title && (
          <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
            {title}
          </h2>
        )}

        {/* Tabs */}
        {tabs.length > 0 && (
          <nav className="flex items-center gap-1" role="navigation" aria-label="Section navigation">
            {tabs.map((tab) => {
              const active = isTabActive(tab.href);
              const hasSubmenu = tab.submenu && tab.submenu.length > 0;

              return (
                <div
                  key={tab.id}
                  className="relative"
                  ref={(el) => { submenuRefs.current[tab.id] = el; }}
                >
                  {hasSubmenu ? (
                    // Tab with submenu - button
                    <motion.button
                      onClick={() => setOpenSubmenu(openSubmenu === tab.id ? null : tab.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative px-4 py-2 rounded-md group flex items-center gap-1"
                    >
                      <span
                        className={`relative z-10 text-sm font-medium transition-colors ${
                          active
                            ? 'text-primary-700 dark:text-primary-300'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                        }`}
                      >
                        {tab.name}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openSubmenu === tab.id ? 'rotate-180' : ''
                        } ${
                          active
                            ? 'text-primary-700 dark:text-primary-300'
                            : 'text-neutral-600 dark:text-neutral-400'
                        }`}
                      />
                      {active && (
                        <motion.div
                          layoutId="thirdLevelActiveTab"
                          className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-md"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  ) : (
                    // Regular tab - link
                    <Link href={tab.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative px-4 py-2 rounded-md group"
                      >
                        <span
                          className={`relative z-10 text-sm font-medium transition-colors ${
                            active
                              ? 'text-primary-700 dark:text-primary-300'
                              : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                          }`}
                        >
                          {tab.name}
                        </span>
                        {active && (
                          <motion.div
                            layoutId="thirdLevelActiveTab"
                            className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-md"
                            transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  )}

                  {/* Submenu Dropdown */}
                  {hasSubmenu && (
                    <AnimatePresence>
                      {openSubmenu === tab.id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50"
                        >
                          <div className="py-2">
                            {tab.submenu!.map((item, index) => (
                              <Link key={item.id} href={item.href}>
                                <motion.div
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  onClick={() => setOpenSubmenu(null)}
                                  className="px-4 py-2.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                                >
                                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                                    {item.name}
                                  </p>
                                  {item.description && (
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                                      {item.description}
                                    </p>
                                  )}
                                </motion.div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>
        )}
      </div>

      {/* Action Buttons */}
      {actions.length > 0 && (
        <div className="flex items-center gap-2">
          {actions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={action.onClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
                action.variant === 'primary'
                  ? 'bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white focus:ring-primary-500'
                  : 'bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 focus:ring-primary-500'
              }`}
            >
              {action.icon}
              {action.label}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
