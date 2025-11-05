'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ModernLayout } from '@/components/layout/ModernLayout';
import { ContentTopBar } from '@/components/layout/ContentTopBar';
import { motion } from 'framer-motion';
import { Plus, Upload, Download, Search } from 'lucide-react';

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const leads = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@techcorp.com', company: 'TechCorp Inc', status: 'qualified', value: '$45,000', assignedTo: 'John Doe' },
    { id: 2, name: 'Michael Chen', email: 'm.chen@global.com', company: 'Global Solutions', status: 'new', value: '$32,000', assignedTo: 'Jane Smith' },
    { id: 3, name: 'Emily Davis', email: 'emily@startupxyz.com', company: 'StartupXYZ', status: 'contacted', value: '$18,000', assignedTo: 'John Doe' },
    { id: 4, name: 'Robert Wilson', email: 'r.wilson@enterprise.com', company: 'Enterprise Co', status: 'proposal', value: '$95,000', assignedTo: 'Mike Johnson' },
    { id: 5, name: 'Lisa Anderson', email: 'l.anderson@innovate.com', company: 'Innovation Labs', status: 'negotiation', value: '$67,000', assignedTo: 'Jane Smith' },
  ];

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      new: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
      contacted: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
      qualified: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      proposal: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
      negotiation: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${colors[status] || colors.new}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <ModernLayout>
      {/* Content Top Bar with Actions */}
      <ContentTopBar
        title="Leads"
        tabs={[
          { id: 'all', name: 'All Leads', href: '/leads' },
          { id: 'my-leads', name: 'My Leads', href: '/leads/my-leads' },
          { id: 'unassigned', name: 'Unassigned', href: '/leads/unassigned' },
        ]}
        actions={[
          {
            id: 'import',
            label: 'Import',
            icon: <Upload className="w-4 h-4" />,
            variant: 'secondary',
          },
          {
            id: 'export',
            label: 'Export',
            icon: <Download className="w-4 h-4" />,
            variant: 'secondary',
          },
          {
            id: 'new',
            label: 'New Lead',
            icon: <Plus className="w-4 h-4" />,
            variant: 'primary',
          },
        ]}
      />

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-6"
      >
        <div className="absolute inset-0 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/50 rounded-2xl shadow-lg" />
        <div className="relative p-4 flex gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search leads by name, company, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-neutral-100/50 dark:bg-neutral-800/50 border border-neutral-200/50 dark:border-neutral-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="negotiation">Negotiation</option>
          </select>
        </div>
      </motion.div>

      {/* Leads Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/50 rounded-2xl shadow-lg" />
        <div className="relative overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200/50 dark:border-neutral-700/50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-50/50 dark:bg-neutral-800/30">
                    Name
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-50/50 dark:bg-neutral-800/30">
                    Company
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-50/50 dark:bg-neutral-800/30">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-50/50 dark:bg-neutral-800/30">
                    Value
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-50/50 dark:bg-neutral-800/30">
                    Assigned To
                  </th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-neutral-700 dark:text-neutral-300 bg-neutral-50/50 dark:bg-neutral-800/30">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <motion.tr
                    key={lead.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    className="border-b border-neutral-100/50 dark:border-neutral-800/50 hover:bg-neutral-50/30 dark:hover:bg-neutral-800/20 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-sm font-semibold">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">
                            {lead.name}
                          </p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {lead.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-700 dark:text-neutral-300">
                      {lead.company}
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-primary-600 dark:text-primary-400">
                        {lead.value}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-neutral-700 dark:text-neutral-300">
                      {lead.assignedTo}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                        View
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </ModernLayout>
  );
}
