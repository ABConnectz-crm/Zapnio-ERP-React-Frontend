'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ZapnioLayout } from '@/components/layout/ZapnioLayout';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '@/components/ui/Table';
import { Card } from '@/components/ui/Card';

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);

  const leads = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@techcorp.com', company: 'TechCorp Inc', phone: '+1 (555) 123-4567', status: 'qualified', source: 'website', value: 45000, assignedTo: 'John Doe', createdAt: '2024-01-15', lastContact: '2024-01-16' },
    { id: 2, name: 'Michael Chen', email: 'm.chen@global.com', company: 'Global Solutions', phone: '+1 (555) 234-5678', status: 'new', source: 'referral', value: 32000, assignedTo: 'Jane Smith', createdAt: '2024-01-15', lastContact: null },
    { id: 3, name: 'Emily Davis', email: 'emily@startupxyz.com', company: 'StartupXYZ', phone: '+1 (555) 345-6789', status: 'contacted', source: 'cold_call', value: 18000, assignedTo: 'John Doe', createdAt: '2024-01-14', lastContact: '2024-01-15' },
    { id: 4, name: 'Robert Wilson', email: 'r.wilson@enterprise.com', company: 'Enterprise Co', phone: '+1 (555) 456-7890', status: 'proposal', source: 'email_campaign', value: 95000, assignedTo: 'Mike Johnson', createdAt: '2024-01-14', lastContact: '2024-01-16' },
    { id: 5, name: 'Lisa Anderson', email: 'l.anderson@innovate.com', company: 'Innovation Labs', phone: '+1 (555) 567-8901', status: 'negotiation', source: 'trade_show', value: 67000, assignedTo: 'Jane Smith', createdAt: '2024-01-13', lastContact: '2024-01-16' },
    { id: 6, name: 'David Martinez', email: 'david.m@solutions.com', company: 'Solutions Inc', phone: '+1 (555) 678-9012', status: 'won', source: 'website', value: 54000, assignedTo: 'John Doe', createdAt: '2024-01-12', lastContact: '2024-01-15' },
    { id: 7, name: 'Jennifer Lee', email: 'j.lee@ventures.com', company: 'Venture Partners', phone: '+1 (555) 789-0123', status: 'lost', source: 'social_media', value: 28000, assignedTo: 'Mike Johnson', createdAt: '2024-01-12', lastContact: '2024-01-14' },
    { id: 8, name: 'James Taylor', email: 'james@dynamic.com', company: 'Dynamic Systems', phone: '+1 (555) 890-1234', status: 'qualified', source: 'referral', value: 41000, assignedTo: 'Jane Smith', createdAt: '2024-01-11', lastContact: '2024-01-15' },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'primary', label: string }> = {
      new: { variant: 'info', label: 'New' },
      contacted: { variant: 'primary', label: 'Contacted' },
      qualified: { variant: 'success', label: 'Qualified' },
      proposal: { variant: 'warning', label: 'Proposal' },
      negotiation: { variant: 'warning', label: 'Negotiation' },
      won: { variant: 'success', label: 'Won' },
      lost: { variant: 'error', label: 'Lost' },
      unqualified: { variant: 'neutral', label: 'Unqualified' },
    };
    const config = variants[status] || { variant: 'neutral', label: status };
    return <Badge variant={config.variant} dot>{config.label}</Badge>;
  };

  const toggleLeadSelection = (id: number) => {
    setSelectedLeads(prev =>
      prev.includes(id) ? prev.filter(leadId => leadId !== id) : [...prev, id]
    );
  };

  const toggleAllLeads = () => {
    if (selectedLeads.length === leads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(leads.map(lead => lead.id));
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <ZapnioLayout>
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Leads</h1>
          <p className="text-neutral-600 mt-1">Manage and track your sales leads</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export
          </Button>
          <Link href="/leads/create">
            <Button>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Lead
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name, company, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
          </div>
          <div className="w-full lg:w-48">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'new', label: 'New' },
                { value: 'contacted', label: 'Contacted' },
                { value: 'qualified', label: 'Qualified' },
                { value: 'proposal', label: 'Proposal' },
                { value: 'negotiation', label: 'Negotiation' },
                { value: 'won', label: 'Won' },
                { value: 'lost', label: 'Lost' },
              ]}
            />
          </div>
          <Button variant="outline">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            More Filters
          </Button>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedLeads.length > 0 && (
        <Card className="mb-6 bg-primary-50 border-primary-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-900">
              {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Assign
              </Button>
              <Button variant="outline" size="sm">
                Change Status
              </Button>
              <Button variant="outline" size="sm">
                Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedLeads([])}>
                Clear
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Leads Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <Table>
            <TableHead>
              <TableRow>
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={selectedLeads.length === leads.length}
                    onChange={toggleAllLeads}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                </th>
                <TableHeaderCell sortable>Name</TableHeaderCell>
                <TableHeaderCell>Company</TableHeaderCell>
                <TableHeaderCell>Contact</TableHeaderCell>
                <TableHeaderCell sortable>Status</TableHeaderCell>
                <TableHeaderCell sortable>Value</TableHeaderCell>
                <TableHeaderCell>Assigned To</TableHeaderCell>
                <TableHeaderCell sortable>Created</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => toggleLeadSelection(lead.id)}
                      className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-semibold">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <Link href={`/leads/${lead.id}`} className="font-medium text-neutral-900 hover:text-primary-600">
                          {lead.name}
                        </Link>
                        <p className="text-xs text-neutral-500">{lead.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.company}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="text-neutral-900">{lead.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell>
                    <span className="font-semibold text-success-600">
                      ${lead.value.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-xs font-semibold">
                        {lead.assignedTo.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm">{lead.assignedTo}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-neutral-500">{lead.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-neutral-100 rounded transition-colors" title="View">
                        <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-1.5 hover:bg-neutral-100 rounded transition-colors" title="Edit">
                        <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button className="p-1.5 hover:bg-neutral-100 rounded transition-colors" title="Delete">
                        <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
          <p className="text-sm text-neutral-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredLeads.length}</span> of{' '}
            <span className="font-medium">{leads.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="primary" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </ZapnioLayout>
  );
}
