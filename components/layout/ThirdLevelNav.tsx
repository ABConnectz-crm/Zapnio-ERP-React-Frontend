'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

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

interface ThirdLevelNavProps {
  title?: string;
  tabs?: TabItem[];
  actions?: ActionButton[];
}

export function ThirdLevelNav({ title, tabs = [], actions = [] }: ThirdLevelNavProps) {
  const pathname = usePathname();

  const isTabActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

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
              return (
                <Link key={tab.id} href={tab.href}>
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
