'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { NotificationCenter } from '@/components/ui/NotificationCenter';

const topNavItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Leads', href: '/leads' },
  { name: 'Contacts', href: '/contacts' },
  { name: 'Companies', href: '/companies' },
  { name: 'Deals', href: '/deals' },
  { name: 'Pipeline', href: '/pipeline' },
  { name: 'Campaigns', href: '/campaigns' },
  { name: 'Analytics', href: '/analytics' },
];

interface TopNavigationProps {
  onMenuClick: () => void;
}

export function TopNavigation({ onMenuClick }: TopNavigationProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  return (
    <header className="h-14 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 border-b border-primary-700 dark:border-primary-900 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="h-full px-4 flex items-center gap-4">
        {/* Left Section - Logo & Menu */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-primary-600 font-bold text-lg">Z</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">Zapnio ERP</span>
          </Link>

          {/* Horizontal Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {topNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center - Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 text-sm focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
            />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Search Icon - Mobile */}
          <button className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Dark Mode Toggle */}
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>

          {/* Fullscreen */}
          <button className="hidden lg:block p-2 rounded-lg hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>

          {/* Notifications */}
          <NotificationCenter />

          {/* Settings */}
          <button className="hidden sm:block p-2 rounded-lg hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 p-1 pr-3 rounded-lg hover:bg-white/10 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
              DK
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-white text-sm font-medium leading-tight">Dinesh Kumar</p>
              <p className="text-white/70 text-xs leading-tight">Company Admin</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
