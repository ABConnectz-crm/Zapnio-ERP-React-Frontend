'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface NavSubItem {
  name: string;
  href: string;
}

interface NavSubsection {
  name: string;
  href: string;
  subItems?: NavSubItem[];
}

interface NavSection {
  section: string;
  icon: React.ReactNode;
  href?: string;
  subsections?: NavSubsection[];
}

const navigationStructure: NavSection[] = [
  {
    section: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    href: "/dashboard"
  },
  {
    section: "CRM",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    subsections: [
      {
        name: "Leads",
        href: "/leads",
        subItems: [
          { name: "My Leads", href: "/leads?view=my" },
          { name: "Team Leads", href: "/leads?view=team" },
          { name: "All Leads", href: "/leads?view=all" }
        ]
      },
      {
        name: "Contacts",
        href: "/contacts"
      },
      {
        name: "Companies",
        href: "/companies"
      }
    ]
  },
  {
    section: "Sales",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    subsections: [
      {
        name: "Pipeline",
        href: "/pipeline"
      },
      {
        name: "Deals",
        href: "/deals"
      },
      {
        name: "Forecasts",
        href: "/forecasts"
      }
    ]
  },
  {
    section: "Marketing",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    subsections: [
      {
        name: "Campaigns",
        href: "/campaigns"
      },
      {
        name: "Forms",
        href: "/forms"
      }
    ]
  },
  {
    section: "Analytics",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    href: "/analytics"
  },
  {
    section: "Settings",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    href: "/settings"
  }
];

interface ModernSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export const ModernSidebar: React.FC<ModernSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose
}) => {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedSubsections, setExpandedSubsections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  const toggleSubsection = (subsection: string) => {
    setExpandedSubsections(prev =>
      prev.includes(subsection) ? prev.filter(s => s !== subsection) : [...prev, subsection]
    );
  };

  const isActive = (href: string) => {
    if (!href) return false;
    return pathname === href || pathname?.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? '60px' : '240px',
          x: isMobileOpen ? 0 : undefined
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={clsx(
          'fixed top-0 left-0 z-50 h-screen bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 ease-in-out',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0 w-60' : '-translate-x-full lg:block'
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200 dark:border-neutral-800">
          <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <span className="text-white font-bold text-lg">Z</span>
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-lg font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent whitespace-nowrap"
                >
                  Zapnio ERP
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <motion.svg
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-5 h-5 text-neutral-500 dark:text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </motion.svg>
          </button>

          <button
            onClick={onMobileClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <svg className="w-5 h-5 text-neutral-500 dark:text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          <div className="space-y-1">
            {navigationStructure.map((section) => (
              <div key={section.section}>
                {/* Level 1: Section */}
                {section.href ? (
                  <Link
                    href={section.href}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group',
                      isActive(section.href)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    )}
                    title={isCollapsed ? section.section : undefined}
                  >
                    <span className={clsx(
                      'flex-shrink-0',
                      isActive(section.href)
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300'
                    )}>
                      {section.icon}
                    </span>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          className="text-sm font-medium whitespace-nowrap overflow-hidden"
                        >
                          {section.section}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => !isCollapsed && toggleSection(section.section)}
                      className={clsx(
                        'w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group',
                        'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      )}
                      title={isCollapsed ? section.section : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                          {section.icon}
                        </span>
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              className="text-sm font-medium whitespace-nowrap overflow-hidden"
                            >
                              {section.section}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.svg
                            initial={{ opacity: 0 }}
                            animate={{
                              opacity: 1,
                              rotate: expandedSections.includes(section.section) ? 180 : 0
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-4 h-4 text-neutral-400 dark:text-neutral-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </button>

                    {/* Level 2: Subsections */}
                    <AnimatePresence>
                      {!isCollapsed && expandedSections.includes(section.section) && section.subsections && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-1 space-y-1 overflow-hidden"
                        >
                          {section.subsections.map((subsection) => (
                            <div key={subsection.name}>
                              <div className="flex items-center">
                                <Link
                                  href={subsection.href}
                                  className={clsx(
                                    'flex-1 flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                                    isActive(subsection.href)
                                      ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-700 dark:text-primary-400 font-medium'
                                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                  )}
                                >
                                  {subsection.name}
                                </Link>
                                {subsection.subItems && (
                                  <button
                                    onClick={() => toggleSubsection(subsection.name)}
                                    className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                  >
                                    <motion.svg
                                      animate={{
                                        rotate: expandedSubsections.includes(subsection.name) ? 180 : 0
                                      }}
                                      transition={{ duration: 0.2 }}
                                      className="w-3 h-3 text-neutral-400 dark:text-neutral-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </motion.svg>
                                  </button>
                                )}
                              </div>

                              {/* Level 3: Sub Items */}
                              <AnimatePresence>
                                {expandedSubsections.includes(subsection.name) && subsection.subItems && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="ml-4 mt-1 space-y-1 overflow-hidden"
                                  >
                                    {subsection.subItems.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className={clsx(
                                          'block px-3 py-1.5 rounded-lg text-xs transition-all duration-150',
                                          isActive(subItem.href)
                                            ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-700 dark:text-primary-400 font-medium'
                                            : 'text-neutral-500 dark:text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-700 dark:hover:text-neutral-300'
                                        )}
                                      >
                                        {subItem.name}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800">
          <div className={clsx(
            'flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 cursor-pointer transition-colors',
            isCollapsed && 'justify-center'
          )}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              JD
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="flex-1 min-w-0 overflow-hidden"
                >
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">John Doe</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">john@company.com</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={clsx(
            'mt-2 flex gap-1',
            isCollapsed ? 'justify-center' : 'justify-between'
          )}>
            <ThemeToggle />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.button
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  title="Logout"
                >
                  <svg className="w-5 h-5 text-neutral-700 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
