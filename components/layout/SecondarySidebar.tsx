'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  Users,
  UserPlus,
  Building2,
  Phone,
  TrendingUp,
  DollarSign,
  BarChart3,
  Target,
  Mail,
  MessageSquare,
  Send,
  Briefcase,
  FolderKanban,
  Calendar,
  FileText,
  PieChart,
  LayoutDashboard,
} from 'lucide-react';

interface SubMenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
}

interface SecondarySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedMenu: string | null;
}

export function SecondarySidebar({ isOpen, onToggle, selectedMenu }: SecondarySidebarProps) {
  const pathname = usePathname();

  const subMenus: Record<string, SubMenuItem[]> = {
    dashboard: [
      { id: 'overview', name: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, href: '/dashboard' },
      { id: 'analytics', name: 'Analytics', icon: <BarChart3 className="w-5 h-5" />, href: '/dashboard/analytics' },
    ],
    crm: [
      { id: 'leads', name: 'Leads', icon: <Users className="w-5 h-5" />, href: '/leads', badge: '72' },
      { id: 'contacts', name: 'Contacts', icon: <UserPlus className="w-5 h-5" />, href: '/contacts' },
      { id: 'accounts', name: 'Accounts', icon: <Building2 className="w-5 h-5" />, href: '/accounts' },
      { id: 'deals', name: 'Deals', icon: <DollarSign className="w-5 h-5" />, href: '/deals' },
      { id: 'activities', name: 'Activities', icon: <Phone className="w-5 h-5" />, href: '/activities' },
    ],
    sales: [
      { id: 'pipeline', name: 'Pipeline', icon: <TrendingUp className="w-5 h-5" />, href: '/pipeline' },
      { id: 'forecasts', name: 'Forecasts', icon: <BarChart3 className="w-5 h-5" />, href: '/forecasts' },
      { id: 'quotes', name: 'Quotes', icon: <FileText className="w-5 h-5" />, href: '/quotes' },
      { id: 'orders', name: 'Orders', icon: <DollarSign className="w-5 h-5" />, href: '/orders' },
    ],
    projects: [
      { id: 'all-projects', name: 'All Projects', icon: <Briefcase className="w-5 h-5" />, href: '/projects' },
      { id: 'tasks', name: 'Tasks', icon: <FolderKanban className="w-5 h-5" />, href: '/projects/tasks' },
      { id: 'timeline', name: 'Timeline', icon: <Calendar className="w-5 h-5" />, href: '/projects/timeline' },
    ],
    marketing: [
      { id: 'campaigns', name: 'Campaigns', icon: <Target className="w-5 h-5" />, href: '/marketing/campaigns', badge: '13' },
      { id: 'emails', name: 'Email Marketing', icon: <Mail className="w-5 h-5" />, href: '/marketing/emails' },
      { id: 'social', name: 'Social Media', icon: <MessageSquare className="w-5 h-5" />, href: '/marketing/social' },
      { id: 'automation', name: 'Automation', icon: <Send className="w-5 h-5" />, href: '/marketing/automation' },
    ],
    reports: [
      { id: 'sales-reports', name: 'Sales Reports', icon: <BarChart3 className="w-5 h-5" />, href: '/reports/sales' },
      { id: 'lead-reports', name: 'Lead Reports', icon: <PieChart className="w-5 h-5" />, href: '/reports/leads' },
      { id: 'custom-reports', name: 'Custom Reports', icon: <FileText className="w-5 h-5" />, href: '/reports/custom' },
    ],
  };

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
          className="fixed top-0 left-16 h-screen w-60 z-40"
        >
          {/* Glassmorphism Background */}
          <div className="absolute inset-0 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl border-r border-neutral-200/50 dark:border-neutral-700/50 shadow-2xl" />

          {/* Content */}
          <div className="relative flex flex-col h-full">
            {/* Header with Toggle */}
            <div className="flex items-center justify-between px-4 py-6 border-b border-neutral-200/50 dark:border-neutral-700/50">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                {selectedMenu ? selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1) : 'Menu'}
              </h2>
              <motion.button
                onClick={onToggle}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-400 transition-colors"
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
                    <Link
                      href={item.href}
                      className={`
                        group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                        transition-all duration-300
                        ${isActive(item.href)
                          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-primary-600 dark:hover:text-primary-400'
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
