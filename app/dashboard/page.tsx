'use client';

import React from 'react';
import { ModernLayout } from '@/components/layout/ModernLayout';
import { ThirdLevelNav } from '@/components/layout/ThirdLevelNav';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Target, ArrowUpRight, ArrowDownRight, Download, Filter, Plus } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      id: 1,
      title: 'Total Users',
      value: '14',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'cyan',
    },
    {
      id: 2,
      title: 'Total Leads',
      value: '72',
      change: '+8.3%',
      trend: 'up',
      icon: Users,
      color: 'green',
    },
    {
      id: 3,
      title: 'Conversion Rate',
      value: '12.5%',
      subtitle: '9 out of 72',
      change: '+2.4%',
      trend: 'up',
      icon: TrendingUp,
      color: 'purple',
    },
    {
      id: 4,
      title: 'Active Campaigns',
      value: '13',
      change: '-3',
      trend: 'down',
      icon: Target,
      color: 'orange',
    },
  ];

  const recentActivities = [
    { id: 1, title: 'New lead added', user: 'Sarah Johnson', time: '5 minutes ago', type: 'success' },
    { id: 2, title: 'Deal closed', user: 'TechCorp Inc - $125K', time: '1 hour ago', type: 'success' },
    { id: 3, title: 'Follow-up scheduled', user: 'Travel Agency Deal', time: '2 hours ago', type: 'info' },
    { id: 4, title: 'Email campaign sent', user: 'Summer Sale', time: '3 hours ago', type: 'info' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      cyan: 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400',
      green: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      purple: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      orange: 'bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    };
    return colors[color] || colors.cyan;
  };

  return (
    <ModernLayout
      thirdLevelNav={
        <ThirdLevelNav
          title="Dashboard"
          tabs={[
            {
              id: 'overview',
              name: 'Overview',
              href: '/dashboard',
            },
            {
              id: 'analytics',
              name: 'Analytics',
              href: '/dashboard/analytics',
              submenu: [
                { id: 'performance', name: 'Performance', href: '/dashboard/analytics/performance', description: 'View performance metrics' },
                { id: 'conversion', name: 'Conversion', href: '/dashboard/analytics/conversion', description: 'Track conversion rates' },
                { id: 'revenue', name: 'Revenue', href: '/dashboard/analytics/revenue', description: 'Revenue analytics' },
              ]
            },
            {
              id: 'reports',
              name: 'Reports',
              href: '/dashboard/reports',
              submenu: [
                { id: 'sales', name: 'Sales Report', href: '/dashboard/reports/sales', description: 'Detailed sales data' },
                { id: 'leads', name: 'Leads Report', href: '/dashboard/reports/leads', description: 'Lead generation stats' },
                { id: 'custom', name: 'Custom Report', href: '/dashboard/reports/custom', description: 'Build custom reports' },
              ]
            },
          ]}
          actions={[
            { id: 'export', label: 'Export', icon: <Download className="w-4 h-4" />, variant: 'secondary' },
            { id: 'filter', label: 'Filter', icon: <Filter className="w-4 h-4" />, variant: 'secondary' },
          ]}
        />
      }
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              type: 'spring',
              stiffness: 100,
            }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-neutral-100/50 dark:to-neutral-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Animated border gradient */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-20 blur-xl" />
            </div>

            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 mb-2 uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <h3 className="text-4xl font-extrabold bg-gradient-to-br from-neutral-900 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 bg-clip-text text-transparent">
                    {stat.value}
                  </h3>
                  {stat.subtitle && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-2">
                      {stat.subtitle}
                    </p>
                  )}
                </div>

                {/* Icon with gradient background */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`p-3.5 rounded-lg ${getColorClasses(stat.color)} shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <stat.icon className="w-6 h-6" />
                </motion.div>
              </div>

              {/* Trend with gradient background */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700">
                {stat.trend === 'up' ? (
                  <div className="p-1 rounded bg-green-100 dark:bg-green-900/30">
                    <ArrowUpRight className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  </div>
                ) : (
                  <div className="p-1 rounded bg-red-100 dark:bg-red-900/30">
                    <ArrowDownRight className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  </div>
                )}
                <span className={`text-sm font-bold ${stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                  vs last month
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Lead Generation Chart */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6, type: 'spring', stiffness: 80 }}
          whileHover={{ y: -4 }}
          className="group relative bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden p-6"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-1">
                  Lead Generation Trends
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  Last 12 months performance
                </p>
              </div>
              <select className="px-4 py-2 bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all hover:border-primary-300 dark:hover:border-primary-700">
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="h-72 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-700 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-700">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-neutral-400 dark:text-neutral-500">Chart visualization</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lead Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, type: 'spring', stiffness: 80 }}
          whileHover={{ y: -4 }}
          className="group relative bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden p-6"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative">
            <h3 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100 mb-6">
              Lead Status Distribution
            </h3>
            <div className="h-72 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-800 dark:to-neutral-700 rounded-lg flex items-center justify-center border-2 border-dashed border-neutral-200 dark:border-neutral-700">
              <div className="text-center">
                <Target className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-neutral-400 dark:text-neutral-500">Donut chart visualization</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.6, type: 'spring', stiffness: 80 }}
        whileHover={{ y: -4 }}
        className="group relative bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden p-6"
      >
        {/* Decorative gradient */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100">
              Recent Activities
            </h3>
            <motion.button
              whileHover={{ scale: 1.05, x: 2 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors px-3 py-1.5 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            >
              View All →
            </motion.button>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05, type: 'spring', stiffness: 100 }}
                whileHover={{ x: 4, scale: 1.01 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-white to-neutral-50/50 dark:from-neutral-800 dark:to-neutral-700/50 hover:from-primary-50 hover:to-accent-50 dark:hover:from-primary-900/10 dark:hover:to-accent-900/10 border border-neutral-200 dark:border-neutral-700 hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-200 cursor-pointer group/item"
              >
                <div className={`flex-shrink-0 w-2.5 h-2.5 rounded-full mt-2 shadow-lg ${activity.type === 'success' ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-primary-400 to-primary-600'}`}>
                  <div className={`w-full h-full rounded-full animate-ping opacity-75 ${activity.type === 'success' ? 'bg-green-400' : 'bg-primary-400'}`} style={{ animationDuration: '3s' }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover/item:text-primary-700 dark:group-hover/item:text-primary-300 transition-colors">
                    {activity.title}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    {activity.user}
                  </p>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded-md whitespace-nowrap">
                  {activity.time}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </ModernLayout>
  );
}
