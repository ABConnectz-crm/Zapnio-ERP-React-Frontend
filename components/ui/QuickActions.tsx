'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Users, TrendingUp, Mail, Calendar, FileText, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  href: string;
  color: string;
}

export function QuickActions() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const actions: QuickAction[] = [
    {
      id: 'new-lead',
      label: 'New Lead',
      icon: Users,
      href: '/leads/create',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'new-deal',
      label: 'New Deal',
      icon: TrendingUp,
      href: '/deals/create',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'new-campaign',
      label: 'New Campaign',
      icon: Target,
      href: '/campaigns/create',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'new-email',
      label: 'Send Email',
      icon: Mail,
      href: '/emails/compose',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'new-event',
      label: 'New Event',
      icon: Calendar,
      href: '/calendar/create',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      id: 'new-task',
      label: 'New Task',
      icon: FileText,
      href: '/tasks/create',
      color: 'from-pink-500 to-rose-500',
    },
  ];

  const handleAction = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2"
          >
            {actions.map((action, index) => (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20, y: 20 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={() => handleAction(action.href)}
                className="group flex items-center gap-3 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-950 pl-3 pr-4 py-3"
                whileHover={{ scale: 1.05, x: -8 }}
                whileTap={{ scale: 0.95 }}
                aria-label={action.label}
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-shadow`}
                >
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                  {action.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-neutral-950"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        aria-label={isOpen ? 'Close quick actions' : 'Open quick actions'}
        aria-expanded={isOpen}
      >
        <Plus className="w-6 h-6" />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <div className="bg-neutral-900 dark:bg-neutral-800 text-white text-sm font-medium px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
              Quick Actions
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-neutral-900 dark:bg-neutral-800" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
