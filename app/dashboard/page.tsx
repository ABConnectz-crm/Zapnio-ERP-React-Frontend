'use client';

import React from 'react';
import { ModernLayout } from '@/components/layout/ModernLayout';
import { ContentTopBar } from '@/components/layout/ContentTopBar';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';

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
    <ModernLayout>
      {/* Content Top Bar - Internal Navigation */}
      <ContentTopBar
        title="Dashboard"
        tabs={[
          { id: 'overview', name: 'Overview', href: '/dashboard' },
          { id: 'analytics', name: 'Analytics', href: '/dashboard/analytics' },
          { id: 'reports', name: 'Reports', href: '/dashboard/reports' },
        ]}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="group relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
          >
            {/* Solid Card - No Glassmorphism */}

            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                    {stat.value}
                  </h3>
                  {stat.subtitle && (
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      {stat.subtitle}
                    </p>
                  )}
                </div>

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}
                >
                  <stat.icon className="w-6 h-6" />
                </motion.div>
              </div>

              {/* Trend */}
              <div className="flex items-center gap-1">
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-1">
                  vs last month
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Lead Generation Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm p-6"
        >
          {/* Solid Card - No Glassmorphism */}
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  Lead Generation Trends
                </h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Last 12 months performance
                </p>
              </div>
              <select className="px-3 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="h-64 bg-neutral-50 dark:bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
              <p className="text-neutral-400 dark:text-neutral-500">Chart Area</p>
            </div>
          </div>
        </motion.div>

        {/* Lead Status Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm p-6"
        >
          {/* Solid Card - No Glassmorphism */}
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Lead Status Distribution
          </h3>
          <div className="h-64 bg-neutral-50 dark:bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
            <p className="text-neutral-400 dark:text-neutral-500">Donut Chart Area</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm p-6"
      >
        {/* Solid Card - No Glassmorphism */}
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Recent Activities
            </h3>
            <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'success' ? 'bg-green-500' : 'bg-primary-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {activity.title}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                    {activity.user}
                  </p>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-500">
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
