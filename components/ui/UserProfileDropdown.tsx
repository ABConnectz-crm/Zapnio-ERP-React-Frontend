'use client';

import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, HelpCircle, LogOut, CreditCard, Shield, Bell, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export function UserProfileDropdown({ isOpen, onClose, buttonRef }: UserProfileDropdownProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, buttonRef]);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const menuItems = [
    {
      id: 'profile',
      label: 'My Profile',
      icon: User,
      action: () => {
        router.push('/profile');
        onClose();
      },
      description: 'View and edit your profile',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: () => {
        router.push('/settings');
        onClose();
      },
      description: 'Manage your preferences',
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: CreditCard,
      action: () => {
        router.push('/billing');
        onClose();
      },
      description: 'Subscription and invoices',
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      action: () => {
        router.push('/notifications');
        onClose();
      },
      description: 'Manage notifications',
    },
  ];

  const bottomItems = [
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      action: () => {
        router.push('/help');
        onClose();
      },
    },
    {
      id: 'logout',
      label: 'Log Out',
      icon: LogOut,
      action: () => {
        router.push('/login');
        onClose();
      },
      danger: true,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: [0.4, 0.0, 0.2, 1] }}
          className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-neutral-900 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden z-50"
          role="menu"
          aria-label="User profile menu"
        >
          {/* User Info Header */}
          <div className="p-4 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-4 ring-white dark:ring-neutral-900">
                DK
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                  Dinesh Kumar
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 truncate">
                  dinesh@zapnio.com
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span className="text-xs font-medium text-green-700 dark:text-green-400">
                      Admin
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={item.action}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                role="menuitem"
              >
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors">
                  <item.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {item.label}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-200 dark:border-neutral-800" />

          {/* Bottom Items */}
          <div className="p-2">
            {bottomItems.map((item) => (
              <button
                key={item.id}
                onClick={item.action}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all group focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
                  item.danger
                    ? 'hover:bg-red-50 dark:hover:bg-red-900/20 focus:ring-red-500'
                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:ring-primary-500'
                }`}
                role="menuitem"
              >
                <div
                  className={`p-2 rounded-lg transition-colors ${
                    item.danger
                      ? 'bg-neutral-100 dark:bg-neutral-800 group-hover:bg-red-100 dark:group-hover:bg-red-900/30'
                      : 'bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30'
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 transition-colors ${
                      item.danger
                        ? 'text-neutral-600 dark:text-neutral-400 group-hover:text-red-600 dark:group-hover:text-red-400'
                        : 'text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                    }`}
                  />
                </div>
                <span
                  className={`text-sm font-medium ${
                    item.danger
                      ? 'text-neutral-900 dark:text-neutral-100 group-hover:text-red-600 dark:group-hover:text-red-400'
                      : 'text-neutral-900 dark:text-neutral-100'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-3 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-500 dark:text-neutral-400">Version 1.0.0</span>
              <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 rounded px-2 py-1">
                Privacy Policy
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
