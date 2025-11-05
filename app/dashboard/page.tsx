'use client';

import React from 'react';
import { ModernLayout } from '@/components/layout/ModernLayout';
import { GradientCard } from '@/components/ui/GradientCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { StaggerList, listItem } from '@/components/animations/StaggerList';

export default function DashboardPage() {
  const recentLeads = [
    { id: 1, name: 'Sarah Johnson', company: 'TechCorp Inc', status: 'qualified', value: '$45,000', assignedTo: 'John Doe', date: '2024-01-15' },
    { id: 2, name: 'Michael Chen', company: 'Global Solutions', status: 'new', value: '$32,000', assignedTo: 'Jane Smith', date: '2024-01-15' },
    { id: 3, name: 'Emily Davis', company: 'StartupXYZ', status: 'contacted', value: '$18,000', assignedTo: 'John Doe', date: '2024-01-14' },
    { id: 4, name: 'Robert Wilson', company: 'Enterprise Co', status: 'proposal', value: '$95,000', assignedTo: 'Mike Johnson', date: '2024-01-14' },
    { id: 5, name: 'Lisa Anderson', company: 'Innovation Labs', status: 'negotiation', value: '$67,000', assignedTo: 'Jane Smith', date: '2024-01-13' },
  ];

  const upcomingTasks = [
    { id: 1, title: 'Follow up with Sarah Johnson', type: 'call', dueDate: 'Today, 2:00 PM', priority: 'high' },
    { id: 2, title: 'Send proposal to Enterprise Co', type: 'email', dueDate: 'Today, 4:30 PM', priority: 'high' },
    { id: 3, title: 'Demo meeting with TechCorp', type: 'meeting', dueDate: 'Tomorrow, 10:00 AM', priority: 'medium' },
    { id: 4, title: 'Review contract with Legal', type: 'task', dueDate: 'Jan 18, 3:00 PM', priority: 'low' },
  ];

  const activityFeed = [
    { id: 1, type: 'lead', message: 'New lead Sarah Johnson added', time: '5 minutes ago', icon: '👤' },
    { id: 2, type: 'deal', message: 'Deal closed: TechCorp Inc - $125K', time: '1 hour ago', icon: '🎉' },
    { id: 3, type: 'email', message: 'Email campaign "Summer Sale" sent', time: '2 hours ago', icon: '📧' },
    { id: 4, type: 'meeting', message: 'Meeting scheduled with John Doe', time: '3 hours ago', icon: '📅' },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'success' | 'warning' | 'info' | 'neutral' | 'primary', label: string }> = {
      new: { variant: 'info', label: 'New' },
      contacted: { variant: 'primary', label: 'Contacted' },
      qualified: { variant: 'success', label: 'Qualified' },
      proposal: { variant: 'warning', label: 'Proposal' },
      negotiation: { variant: 'warning', label: 'Negotiation' },
    };
    const config = variants[status] || { variant: 'neutral', label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, 'error' | 'warning' | 'info'> = {
      high: 'error',
      medium: 'warning',
      low: 'info',
    };
    return <Badge variant={variants[priority]} size="sm">{priority}</Badge>;
  };

  return (
    <ModernLayout>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Welcome back, John 👋
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Here&apos;s what&apos;s happening with your sales today.
        </p>
      </motion.div>

      {/* Stats Grid with Gradient Cards */}
      <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div variants={listItem}>
          <GradientCard
            gradient="blue"
            title="Total Leads"
            value="1,234"
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            trend={{ value: 12.5, direction: 'up' }}
          />
        </motion.div>
        <motion.div variants={listItem}>
          <GradientCard
            gradient="purple"
            title="Conversion Rate"
            value="24.8%"
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
            trend={{ value: 3.2, direction: 'up' }}
          />
        </motion.div>
        <motion.div variants={listItem}>
          <GradientCard
            gradient="green"
            title="Revenue (MTD)"
            value="$458.2K"
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            trend={{ value: 8.1, direction: 'up' }}
          />
        </motion.div>
        <motion.div variants={listItem}>
          <GradientCard
            gradient="orange"
            title="Active Campaigns"
            value="12"
            icon={
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            }
            trend={{ value: 2.4, direction: 'down' }}
          />
        </motion.div>
      </StaggerList>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Pipeline Chart */}
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                Sales Pipeline
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Overview of leads by stage
              </p>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          <div className="space-y-5">
            {[
              { stage: 'New Leads', count: 45, value: '$234K', color: 'bg-blue-500 dark:bg-blue-600', width: '90%' },
              { stage: 'Contacted', count: 32, value: '$189K', color: 'bg-indigo-500 dark:bg-indigo-600', width: '70%' },
              { stage: 'Qualified', count: 28, value: '$156K', color: 'bg-purple-500 dark:bg-purple-600', width: '60%' },
              { stage: 'Proposal', count: 18, value: '$98K', color: 'bg-pink-500 dark:bg-pink-600', width: '40%' },
              { stage: 'Negotiation', count: 12, value: '$67K', color: 'bg-rose-500 dark:bg-rose-600', width: '25%' },
              { stage: 'Won', count: 8, value: '$45K', color: 'bg-green-500 dark:bg-green-600', width: '15%' },
            ].map((item, index) => (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    {item.stage}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-neutral-500 dark:text-neutral-400">
                      {item.count} leads
                    </span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.value}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.width }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`${item.color} h-3 rounded-full transition-all`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>

        {/* Activity Feed */}
        <GlassCard>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {activityFeed.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-lg flex-shrink-0">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    {activity.message}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <Button variant="ghost" fullWidth className="mt-4">
            View All Activity
          </Button>
        </GlassCard>
      </div>

      {/* Upcoming Tasks */}
      <GlassCard className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Upcoming Tasks
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Your schedule for today
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="p-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-primary-400 dark:hover:border-primary-500 bg-white dark:bg-neutral-800 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
                  {task.title}
                </h4>
                {getPriorityBadge(task.priority)}
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{task.dueDate}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Recent Leads Table */}
      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Recent Leads
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              Latest lead activity
            </p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Company
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Value
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Assigned To
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentLeads.map((lead, index) => (
                <motion.tr
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-semibold">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {lead.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-neutral-700 dark:text-neutral-300">
                    {lead.company}
                  </td>
                  <td className="py-4 px-4">{getStatusBadge(lead.status)}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-green-600 dark:text-green-400">
                      {lead.value}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-neutral-700 dark:text-neutral-300">
                    {lead.assignedTo}
                  </td>
                  <td className="py-4 px-4 text-neutral-500 dark:text-neutral-400">
                    {lead.date}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </ModernLayout>
  );
}
