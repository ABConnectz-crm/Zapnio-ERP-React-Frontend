'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tooltip from '@radix-ui/react-tooltip';

interface SubMenuItem {
  name: string;
  href: string;
}

interface MenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    href: '/dashboard',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: 'business',
    name: 'Business',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    submenu: [
      { name: 'Leads', href: '/leads' },
      { name: 'Contacts', href: '/contacts' },
      { name: 'Companies', href: '/companies' },
      { name: 'Deals', href: '/deals' },
    ],
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    submenu: [
      { name: 'Campaigns', href: '/campaigns' },
      { name: 'Email', href: '/email' },
    ],
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    href: '/integrations',
  },
  {
    id: 'financial',
    name: 'Financial',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    submenu: [
      { name: 'Invoices', href: '/invoices' },
      { name: 'Payments', href: '/payments' },
    ],
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    submenu: [
      { name: 'Users', href: '/users' },
      { name: 'Roles', href: '/roles' },
      { name: 'Configuration', href: '/settings' },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    href: '/analytics',
  },
];

interface IconSidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

export function IconSidebar({ isMobileOpen, onMobileClose }: IconSidebarProps) {
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  const toggleExpand = (itemId: string) => {
    setExpandedItem(prev => prev === itemId ? null : itemId);
  };

  const isItemActive = (item: MenuItem) => {
    if (item.href) return isActive(item.href);
    if (item.submenu) {
      return item.submenu.some(sub => isActive(sub.href));
    }
    return false;
  };

  return (
    <Tooltip.Provider delayDuration={300}>
      {/* Mobile Overlay */}
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
          width: expandedItem ? '280px' : '72px'
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-gradient-to-b from-coral-200 via-lavender-200 to-sky-200 dark:from-coral-400 dark:via-lavender-300 dark:to-sky-300 border-r border-primary-200 dark:border-primary-800 z-40 shadow-elegant overflow-hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-full overflow-y-auto custom-scrollbar p-3">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                {/* Icon Button */}
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (item.href) {
                          window.location.href = item.href;
                        } else if (item.submenu) {
                          toggleExpand(item.id);
                        }
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                        isItemActive(item)
                          ? 'bg-primary-500 text-white shadow-lg'
                          : 'bg-white/60 dark:bg-white/10 text-charcoal-500 dark:text-white hover:bg-white/80 dark:hover:bg-white/20'
                      }`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <AnimatePresence>
                        {expandedItem === item.id && item.submenu && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="text-sm font-medium whitespace-nowrap overflow-hidden"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {item.submenu && expandedItem === item.id && (
                        <motion.svg
                          animate={{ rotate: 180 }}
                          className="w-4 h-4 ml-auto flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      )}
                    </motion.button>
                  </Tooltip.Trigger>
                  {!expandedItem && (
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="right"
                        className="bg-charcoal-500 dark:bg-charcoal-700 text-white px-3 py-2 rounded-lg text-sm shadow-xl"
                        sideOffset={10}
                      >
                        {item.name}
                        <Tooltip.Arrow className="fill-charcoal-500 dark:fill-charcoal-700" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  )}
                </Tooltip.Root>

                {/* Submenu - Expanded */}
                <AnimatePresence>
                  {expandedItem === item.id && item.submenu && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 mt-2 space-y-1 overflow-hidden"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                            isActive(subItem.href)
                              ? 'bg-primary-500 text-white font-medium'
                              : 'bg-white/40 dark:bg-white/10 text-charcoal-500 dark:text-white hover:bg-white/60 dark:hover:bg-white/20'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>
        </div>
      </motion.aside>
    </Tooltip.Provider>
  );
}
