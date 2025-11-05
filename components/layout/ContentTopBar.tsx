'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Upload, Download, Filter, MoreVertical } from 'lucide-react';

interface TabItem {
  id: string;
  name: string;
  href: string;
}

interface ActionButton {
  id: string;
  label: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

interface ContentTopBarProps {
  title: string;
  tabs?: TabItem[];
  actions?: ActionButton[];
}

export function ContentTopBar({ title, tabs = [], actions = [] }: ContentTopBarProps) {
  const pathname = usePathname();

  const isTabActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="mb-6">
      {/* Solid Card - No Glassmorphism */}
      <div className="relative rounded-lg overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        {/* Solid Background */}

        {/* Content */}
        <div className="relative p-6">
          {/* Title and Actions Row */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                {title}
              </h1>
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
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
                      transition-all duration-300 shadow-sm
                      ${action.variant === 'primary'
                        ? 'bg-primary-500 hover:bg-primary-600 text-white'
                        : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                      }
                    `}
                  >
                    {action.icon}
                    {action.label}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Tabs */}
          {tabs.length > 0 && (
            <div className="flex items-center gap-1 border-t border-neutral-200 dark:border-neutral-800 pt-4">
              {tabs.map((tab) => {
                const active = isTabActive(tab.href);
                return (
                  <Link key={tab.id} href={tab.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative px-4 py-2 rounded-lg"
                    >
                      <span
                        className={`
                          relative z-10 text-sm font-medium transition-colors
                          ${active
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                          }
                        `}
                      >
                        {tab.name}
                      </span>
                      {active && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-lg"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
