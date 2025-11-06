'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Search,
  Home,
  Users,
  TrendingUp,
  Target,
  Mail,
  Calendar,
  Settings,
  FileText,
  BarChart3,
  Plus,
  Command,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: any;
  action: () => void;
  keywords: string[];
  category: 'navigation' | 'actions' | 'recent';
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      title: 'Dashboard',
      description: 'View overview and analytics',
      icon: Home,
      action: () => router.push('/dashboard'),
      keywords: ['dashboard', 'home', 'overview'],
      category: 'navigation',
    },
    {
      id: 'nav-leads',
      title: 'Leads',
      description: 'Manage your leads',
      icon: Users,
      action: () => router.push('/leads'),
      keywords: ['leads', 'contacts', 'customers'],
      category: 'navigation',
    },
    {
      id: 'nav-pipeline',
      title: 'Sales Pipeline',
      description: 'Track deals and opportunities',
      icon: TrendingUp,
      action: () => router.push('/pipeline'),
      keywords: ['pipeline', 'deals', 'sales', 'opportunities'],
      category: 'navigation',
    },
    {
      id: 'nav-campaigns',
      title: 'Campaigns',
      description: 'Marketing campaigns',
      icon: Target,
      action: () => router.push('/campaigns'),
      keywords: ['campaigns', 'marketing', 'email'],
      category: 'navigation',
    },
    {
      id: 'nav-reports',
      title: 'Reports',
      description: 'Analytics and insights',
      icon: BarChart3,
      action: () => router.push('/reports'),
      keywords: ['reports', 'analytics', 'insights'],
      category: 'navigation',
    },
    {
      id: 'nav-settings',
      title: 'Settings',
      description: 'App preferences',
      icon: Settings,
      action: () => router.push('/settings'),
      keywords: ['settings', 'preferences', 'config'],
      category: 'navigation',
    },

    // Actions
    {
      id: 'action-new-lead',
      title: 'Create New Lead',
      description: 'Add a new lead to your CRM',
      icon: Plus,
      action: () => router.push('/leads/create'),
      keywords: ['create', 'new', 'lead', 'add'],
      category: 'actions',
    },
    {
      id: 'action-new-deal',
      title: 'Create New Deal',
      description: 'Add a new deal to pipeline',
      icon: Plus,
      action: () => router.push('/deals/create'),
      keywords: ['create', 'new', 'deal', 'add'],
      category: 'actions',
    },
    {
      id: 'action-new-campaign',
      title: 'Create Campaign',
      description: 'Start a new marketing campaign',
      icon: Plus,
      action: () => router.push('/campaigns/create'),
      keywords: ['create', 'new', 'campaign', 'marketing'],
      category: 'actions',
    },
  ];

  // Filter commands based on query
  const filteredCommands = query
    ? commands.filter(
        cmd =>
          cmd.title.toLowerCase().includes(query.toLowerCase()) ||
          cmd.description?.toLowerCase().includes(query.toLowerCase()) ||
          cmd.keywords.some(kw => kw.toLowerCase().includes(query.toLowerCase()))
      )
    : commands;

  // Group by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // Close on Escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const selectedCommand = filteredCommands[selectedIndex];
        if (selectedCommand) {
          selectedCommand.action();
          onClose();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setSelectedIndex(0);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'navigation':
        return 'Navigation';
      case 'actions':
        return 'Quick Actions';
      case 'recent':
        return 'Recent';
      default:
        return category;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Command Palette */}
          <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[20vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: [0.4, 0.0, 0.2, 1] }}
              className="w-full max-w-2xl bg-white dark:bg-neutral-900 rounded-lg shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
              role="dialog"
              aria-label="Command palette"
              aria-modal="true"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
                <Search className="w-5 h-5 text-neutral-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search for commands, pages, or actions..."
                  className="flex-1 bg-transparent border-none outline-none text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
                  aria-label="Search commands"
                />
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  <kbd className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded text-neutral-600 dark:text-neutral-400 font-mono">
                    Esc
                  </kbd>
                  <span>to close</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[400px] overflow-y-auto p-2">
                {filteredCommands.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4">
                    <Search className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mb-3" />
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                      No results found
                    </p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                      Try searching for something else
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(groupedCommands).map(([category, items]) => (
                      <div key={category}>
                        <div className="px-3 py-1.5">
                          <h3 className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide">
                            {getCategoryLabel(category)}
                          </h3>
                        </div>
                        <div className="space-y-1">
                          {items.map((item, idx) => {
                            const globalIndex = filteredCommands.indexOf(item);
                            const isSelected = globalIndex === selectedIndex;

                            return (
                              <motion.button
                                key={item.id}
                                onClick={() => {
                                  item.action();
                                  onClose();
                                }}
                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
                                  isSelected
                                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-900 dark:text-primary-100'
                                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                                }`}
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.1 }}
                              >
                                <div
                                  className={`p-2 rounded-lg ${
                                    isSelected
                                      ? 'bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
                                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                                  }`}
                                >
                                  <item.icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium">{item.title}</p>
                                  {item.description && (
                                    <p
                                      className={`text-xs mt-0.5 ${
                                        isSelected
                                          ? 'text-primary-700 dark:text-primary-300'
                                          : 'text-neutral-500 dark:text-neutral-400'
                                      }`}
                                    >
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                                {isSelected && (
                                  <ArrowRight className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                )}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-neutral-600 dark:text-neutral-300 font-mono">
                      ↑
                    </kbd>
                    <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-neutral-600 dark:text-neutral-300 font-mono">
                      ↓
                    </kbd>
                    <span>to navigate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-neutral-600 dark:text-neutral-300 font-mono">
                      ↵
                    </kbd>
                    <span>to select</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  <Command className="w-3 h-3" />
                  <span>+</span>
                  <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-neutral-600 dark:text-neutral-300 font-mono">
                    K
                  </kbd>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
