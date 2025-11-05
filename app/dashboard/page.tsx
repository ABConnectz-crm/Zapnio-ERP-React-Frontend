'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/ui/StatCard';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';

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
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-1">Welcome back! Here&apos;s what&apos;s happening with your sales today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Leads"
          value="1,234"
          change={{ value: 12.5, trend: 'up' }}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
          color="primary"
        />
        <StatCard
          title="Conversion Rate"
          value="24.8%"
          change={{ value: 3.2, trend: 'up' }}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
          color="success"
        />
        <StatCard
          title="Revenue (MTD)"
          value="$458.2K"
          change={{ value: 8.1, trend: 'up' }}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          color="success"
        />
        <StatCard
          title="Active Campaigns"
          value="12"
          change={{ value: 2.4, trend: 'down' }}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          }
          color="warning"
        />
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sales Pipeline Chart */}
        <Card className="lg:col-span-2" padding="none">
          <div className="p-6 border-b border-neutral-200">
            <CardHeader
              title="Sales Pipeline"
              subtitle="Overview of leads by stage"
              action={
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              }
            />
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { stage: 'New Leads', count: 45, value: '$234K', color: 'bg-blue-500', width: '90%' },
                { stage: 'Contacted', count: 32, value: '$189K', color: 'bg-indigo-500', width: '70%' },
                { stage: 'Qualified', count: 28, value: '$156K', color: 'bg-purple-500', width: '60%' },
                { stage: 'Proposal', count: 18, value: '$98K', color: 'bg-pink-500', width: '40%' },
                { stage: 'Negotiation', count: 12, value: '$67K', color: 'bg-rose-500', width: '25%' },
                { stage: 'Won', count: 8, value: '$45K', color: 'bg-green-500', width: '15%' },
              ].map((item) => (
                <div key={item.stage}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-neutral-700">{item.stage}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-neutral-500">{item.count} leads</span>
                      <span className="text-sm font-semibold text-neutral-900">{item.value}</span>
                    </div>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2.5">
                    <div className={`${item.color} h-2.5 rounded-full transition-all`} style={{ width: item.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Upcoming Tasks */}
        <Card padding="none">
          <div className="p-6 border-b border-neutral-200">
            <CardHeader title="Upcoming Tasks" subtitle="Your schedule for today" />
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="p-3 rounded-lg border border-neutral-200 hover:border-primary-300 hover:bg-primary-50/30 transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-neutral-900">{task.title}</h4>
                    {getPriorityBadge(task.priority)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{task.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" fullWidth className="mt-4">
              View All Tasks
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Leads Table */}
      <Card padding="none">
        <div className="p-6 border-b border-neutral-200">
          <CardHeader
            title="Recent Leads"
            subtitle="Latest lead activity"
            action={
              <Button variant="outline" size="sm">
                View All
              </Button>
            }
          />
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Company</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Value</TableHeaderCell>
              <TableHeaderCell>Assigned To</TableHeaderCell>
              <TableHeaderCell>Date</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentLeads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-semibold">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium">{lead.name}</span>
                  </div>
                </TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>{getStatusBadge(lead.status)}</TableCell>
                <TableCell><span className="font-semibold text-success-600">{lead.value}</span></TableCell>
                <TableCell>{lead.assignedTo}</TableCell>
                <TableCell className="text-neutral-500">{lead.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </DashboardLayout>
  );
}
