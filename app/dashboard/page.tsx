'use client';

import React from 'react';
import { ZapnioLayout } from '@/components/layout/ZapnioLayout';
import { ModernStatCard } from '@/components/ui/ModernStatCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const recentLeads = [
    { id: 1, name: 'Sarah Johnson', company: 'TechCorp Inc', status: 'qualified', value: '$45,000', assignedTo: 'John Doe', date: '2024-01-15' },
    { id: 2, name: 'Michael Chen', company: 'Global Solutions', status: 'new', value: '$32,000', assignedTo: 'Jane Smith', date: '2024-01-15' },
    { id: 3, name: 'Emily Davis', company: 'StartupXYZ', status: 'contacted', value: '$18,000', assignedTo: 'John Doe', date: '2024-01-14' },
    { id: 4, name: 'Robert Wilson', company: 'Enterprise Co', status: 'proposal', value: '$95,000', assignedTo: 'Mike Johnson', date: '2024-01-14' },
    { id: 5, name: 'Lisa Anderson', company: 'Innovation Labs', status: 'negotiation', value: '$67,000', assignedTo: 'Jane Smith', date: '2024-01-13' },
  ];

  const activityFeed = [
    { id: 1, message: 'Dinesh Kumar scheduled follow-up for Travel Agency Deal', time: 'Sep 02, 2025 09:46', type: 'info' },
    { id: 2, message: 'New lead Sarah Johnson added', time: '5 minutes ago', type: 'success' },
    { id: 3, message: 'Deal closed: TechCorp Inc - $125K', time: '1 hour ago', type: 'success' },
    { id: 4, message: 'Email campaign "Summer Sale" sent', time: '2 hours ago', type: 'info' },
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

  return (
    <ZapnioLayout>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
          Good Afternoon, Dinesh Kumar
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </motion.div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ModernStatCard
          title="Total Users"
          value="14"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          iconColor="cyan"
          action={{ label: 'Manage Users', onClick: () => {} }}
        />

        <ModernStatCard
          title="Total Leads"
          value="72"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          iconColor="green"
          trend={{ value: 0, direction: 'up' }}
          action={{ label: 'View All Leads', onClick: () => {} }}
        />

        <ModernStatCard
          title="Conversion Ratio"
          value="9 : 72"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
          iconColor="cyan"
          subtitle="1 out of 8 (12.5%)"
          action={{ label: 'View Analysis', onClick: () => {} }}
        />

        <ModernStatCard
          title="Active Campaigns"
          value="13"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          }
          iconColor="orange"
          action={{ label: 'Manage Campaigns', onClick: () => {} }}
        />
      </div>

      {/* Charts & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Lead Generation Chart */}
        <GlassCard padding="md">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Lead Generation & Conversion Trends
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Last 12 months performance
              </p>
            </div>
            <select className="px-3 py-1.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
            </select>
          </div>
          {/* Placeholder for Chart */}
          <div className="h-64 bg-gradient-to-br from-neutral-50 to-lavender-50 dark:from-neutral-800 dark:to-neutral-900 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
            <p className="text-neutral-500 dark:text-neutral-400">Chart Area</p>
          </div>
        </GlassCard>

        {/* Lead Status Distribution */}
        <GlassCard padding="md">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Lead Status Distribution
          </h3>
          {/* Placeholder for Donut Chart */}
          <div className="h-64 bg-gradient-to-br from-neutral-50 to-sky-50 dark:from-neutral-800 dark:to-neutral-900 rounded-lg flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
            <p className="text-neutral-500 dark:text-neutral-400">Donut Chart Area</p>
          </div>
        </GlassCard>
      </div>

      {/* Team Performance & Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <GlassCard padding="md">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Team Performance
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-success-50 to-success-100 dark:from-success-900/20 dark:to-success-800/20 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-success-700 dark:text-success-400 mb-2">100%</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Tasks Completed On Time</p>
            </div>
            <div className="bg-gradient-to-br from-peach-100 to-peach-200 dark:from-peach-400/20 dark:to-peach-300/20 p-6 rounded-xl text-center">
              <p className="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">0</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Overdue Tasks</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard padding="md">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Campaign Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-powder-100 to-sky-100 dark:from-powder-400/20 dark:to-sky-400/20 rounded-lg">
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">Data Analytics & BI</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">9 leads • 1 converted</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-coral-100 to-peach-100 dark:from-coral-400/20 dark:to-peach-400/20 rounded-lg">
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">India Ecommerce</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">0 leads • 0 converted</p>
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">0.0%</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Recent Activities */}
      <GlassCard padding="md" className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
            Recent Activities
          </h3>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        <div className="space-y-3">
          {activityFeed.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            >
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'success' ? 'bg-success-500' : 'bg-primary-500'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-900 dark:text-neutral-100">{activity.message}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{activity.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Recent Leads Table */}
      <GlassCard padding="none">
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Recent Leads
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                Latest lead activity
              </p>
            </div>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
                <th className="text-left py-3 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Name
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Company
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Status
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Value
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  Assigned To
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
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
                  className="border-b border-neutral-100 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-semibold">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">
                        {lead.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-neutral-700 dark:text-neutral-300">
                    {lead.company}
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(lead.status)}</td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                      {lead.value}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-neutral-700 dark:text-neutral-300">
                    {lead.assignedTo}
                  </td>
                  <td className="py-4 px-6 text-neutral-500 dark:text-neutral-400">
                    {lead.date}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </ZapnioLayout>
  );
}
