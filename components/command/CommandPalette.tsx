'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandItem {
  id: string;
  name: string;
  icon?: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const pages: CommandItem[] = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      action: () => {
        router.push('/dashboard');
        setOpen(false);
      },
      keywords: ['home', 'overview']
    },
    {
      id: 'leads',
      name: 'Leads',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      action: () => {
        router.push('/leads');
        setOpen(false);
      },
      keywords: ['prospects', 'contacts']
    },
    {
      id: 'pipeline',
      name: 'Pipeline',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      action: () => {
        router.push('/pipeline');
        setOpen(false);
      },
      keywords: ['deals', 'sales', 'funnel']
    },
    {
      id: 'contacts',
      name: 'Contacts',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      action: () => {
        router.push('/contacts');
        setOpen(false);
      },
      keywords: ['people', 'customers']
    },
    {
      id: 'campaigns',
      name: 'Campaigns',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      ),
      action: () => {
        router.push('/campaigns');
        setOpen(false);
      },
      keywords: ['marketing', 'email']
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      action: () => {
        router.push('/analytics');
        setOpen(false);
      },
      keywords: ['reports', 'metrics', 'stats']
    }
  ];

  const actions: CommandItem[] = [
    {
      id: 'new-lead',
      name: 'Create New Lead',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      action: () => {
        router.push('/leads/create');
        setOpen(false);
      },
      keywords: ['add', 'create', 'new']
    },
    {
      id: 'new-deal',
      name: 'New Deal',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      action: () => {
        router.push('/deals/create');
        setOpen(false);
      },
      keywords: ['add', 'create', 'new', 'opportunity']
    },
    {
      id: 'send-email',
      name: 'Send Email',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: () => {
        router.push('/email/compose');
        setOpen(false);
      },
      keywords: ['compose', 'message', 'mail']
    }
  ];

  const recent: CommandItem[] = [
    {
      id: 'recent-1',
      name: 'Sarah Johnson',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      action: () => {
        router.push('/leads/1');
        setOpen(false);
      }
    },
    {
      id: 'recent-2',
      name: 'TechCorp Inc Deal',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      action: () => {
        router.push('/deals/1');
        setOpen(false);
      }
    }
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl"
            >
              <Command
                className="rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden"
                value={search}
                onValueChange={setSearch}
              >
                <div className="flex items-center border-b border-neutral-200 dark:border-neutral-800 px-4">
                  <svg className="w-5 h-5 text-neutral-400 dark:text-neutral-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <Command.Input
                    placeholder="Search or jump to..."
                    className="flex-1 bg-transparent py-4 text-sm outline-none text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded">
                    Esc
                  </kbd>
                </div>
                <Command.List className="max-h-96 overflow-y-auto p-2 custom-scrollbar">
                  <Command.Empty className="py-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
                    No results found.
                  </Command.Empty>

                  <Command.Group heading="Pages" className="mb-2">
                    <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Pages
                    </div>
                    {pages.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={`${item.name} ${item.keywords?.join(' ') || ''}`}
                        onSelect={item.action}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-primary-50 dark:aria-selected:bg-primary-900/20 aria-selected:text-primary-700 dark:aria-selected:text-primary-400"
                      >
                        <span className="text-neutral-500 dark:text-neutral-400">{item.icon}</span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="Actions" className="mb-2">
                    <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Actions
                    </div>
                    {actions.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={`${item.name} ${item.keywords?.join(' ') || ''}`}
                        onSelect={item.action}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-primary-50 dark:aria-selected:bg-primary-900/20 aria-selected:text-primary-700 dark:aria-selected:text-primary-400"
                      >
                        <span className="text-neutral-500 dark:text-neutral-400">{item.icon}</span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="Recent" className="mb-2">
                    <div className="px-2 py-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                      Recent
                    </div>
                    {recent.map((item) => (
                      <Command.Item
                        key={item.id}
                        value={item.name}
                        onSelect={item.action}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 aria-selected:bg-primary-50 dark:aria-selected:bg-primary-900/20 aria-selected:text-primary-700 dark:aria-selected:text-primary-400"
                      >
                        <span className="text-neutral-500 dark:text-neutral-400">{item.icon}</span>
                        <span className="text-sm font-medium">{item.name}</span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                </Command.List>
                <div className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">↑↓</kbd> Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">↵</kbd> Select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">Esc</kbd> Close
                  </span>
                </div>
              </Command>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
