'use client';

import React, { useState } from 'react';
import { ZapnioLayout } from '@/components/layout/ZapnioLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface Lead {
  id: number;
  name: string;
  company: string;
  value: number;
  assignedTo: string;
  tags: string[];
  daysInStage: number;
}

interface PipelineStage {
  id: string;
  name: string;
  color: string;
  leads: Lead[];
  totalValue: number;
}

export default function PipelinePage() {
  const [stages, setStages] = useState<PipelineStage[]>([
    {
      id: 'new',
      name: 'New Leads',
      color: 'bg-blue-500',
      totalValue: 234000,
      leads: [
        { id: 1, name: 'Sarah Johnson', company: 'TechCorp Inc', value: 45000, assignedTo: 'JD', tags: ['enterprise'], daysInStage: 2 },
        { id: 2, name: 'Michael Chen', company: 'Global Solutions', value: 32000, assignedTo: 'JS', tags: ['startup'], daysInStage: 1 },
        { id: 3, name: 'Emily Davis', company: 'StartupXYZ', value: 18000, assignedTo: 'JD', tags: ['tech'], daysInStage: 3 },
      ],
    },
    {
      id: 'contacted',
      name: 'Contacted',
      color: 'bg-indigo-500',
      totalValue: 189000,
      leads: [
        { id: 4, name: 'Robert Wilson', company: 'Enterprise Co', value: 95000, assignedTo: 'MJ', tags: ['enterprise', 'hot'], daysInStage: 4 },
        { id: 5, name: 'Lisa Anderson', company: 'Innovation Labs', value: 67000, assignedTo: 'JS', tags: ['saas'], daysInStage: 2 },
      ],
    },
    {
      id: 'qualified',
      name: 'Qualified',
      color: 'bg-purple-500',
      totalValue: 156000,
      leads: [
        { id: 6, name: 'David Martinez', company: 'Solutions Inc', value: 54000, assignedTo: 'JD', tags: ['consulting'], daysInStage: 7 },
        { id: 7, name: 'Jennifer Lee', company: 'Venture Partners', value: 28000, assignedTo: 'MJ', tags: ['finance'], daysInStage: 5 },
        { id: 8, name: 'James Taylor', company: 'Dynamic Systems', value: 41000, assignedTo: 'JS', tags: ['tech'], daysInStage: 3 },
      ],
    },
    {
      id: 'proposal',
      name: 'Proposal Sent',
      color: 'bg-pink-500',
      totalValue: 98000,
      leads: [
        { id: 9, name: 'Anna White', company: 'Global Tech', value: 62000, assignedTo: 'JD', tags: ['enterprise'], daysInStage: 6 },
        { id: 10, name: 'Tom Brown', company: 'Retail Chain', value: 36000, assignedTo: 'MJ', tags: ['retail'], daysInStage: 4 },
      ],
    },
    {
      id: 'negotiation',
      name: 'Negotiation',
      color: 'bg-rose-500',
      totalValue: 127000,
      leads: [
        { id: 11, name: 'Susan Green', company: 'Manufacturing Ltd', value: 78000, assignedTo: 'JS', tags: ['manufacturing'], daysInStage: 8 },
        { id: 12, name: 'Peter Adams', company: 'Services Corp', value: 49000, assignedTo: 'JD', tags: ['b2b'], daysInStage: 5 },
      ],
    },
    {
      id: 'won',
      name: 'Won',
      color: 'bg-green-500',
      totalValue: 145000,
      leads: [
        { id: 13, name: 'Rachel Cooper', company: 'Digital Agency', value: 87000, assignedTo: 'MJ', tags: ['digital'], daysInStage: 2 },
        { id: 14, name: 'Mark Phillips', company: 'Consulting Group', value: 58000, assignedTo: 'JS', tags: ['consulting'], daysInStage: 1 },
      ],
    },
  ]);

  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const totalPipelineValue = stages.reduce((sum, stage) => sum + stage.totalValue, 0);
  const totalLeads = stages.reduce((sum, stage) => sum + stage.leads.length, 0);

  return (
    <ZapnioLayout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Sales Pipeline</h1>
            <p className="text-neutral-600 mt-1">Track deals through your sales process</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white border border-neutral-200 rounded-md">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-l-md transition-colors ${
                  viewMode === 'kanban'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={() => setViewMode('kanban')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </button>
              <button
                className={`px-4 py-2 text-sm font-medium rounded-r-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-700 hover:bg-neutral-50'
                }`}
                onClick={() => setViewMode('list')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
            <Button>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Deal
            </Button>
          </div>
        </div>

        {/* Pipeline Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Pipeline Value</p>
                <p className="text-2xl font-bold text-neutral-900 mt-1">
                  ${(totalPipelineValue / 1000).toFixed(0)}K
                </p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Active Deals</p>
                <p className="text-2xl font-bold text-neutral-900 mt-1">{totalLeads}</p>
              </div>
              <div className="p-3 bg-success-100 rounded-lg">
                <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Win Rate</p>
                <p className="text-2xl font-bold text-neutral-900 mt-1">32.5%</p>
              </div>
              <div className="p-3 bg-warning-100 rounded-lg">
                <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="inline-flex gap-4 min-w-full">
          {stages.map((stage) => (
            <div key={stage.id} className="flex-shrink-0 w-80">
              {/* Stage Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                    <h3 className="font-semibold text-neutral-900">{stage.name}</h3>
                    <Badge variant="neutral" size="sm">{stage.leads.length}</Badge>
                  </div>
                  <button className="p-1 hover:bg-neutral-100 rounded">
                    <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-neutral-600">
                  ${(stage.totalValue / 1000).toFixed(0)}K total value
                </p>
              </div>

              {/* Stage Cards */}
              <div className="space-y-3 min-h-[400px]">
                {stage.leads.map((lead) => (
                  <Card key={lead.id} className="hover:shadow-md cursor-pointer transition-all" padding="sm">
                    <div className="space-y-3">
                      {/* Lead Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 text-sm">{lead.name}</h4>
                          <p className="text-xs text-neutral-600 mt-0.5">{lead.company}</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-xs font-semibold">
                          {lead.assignedTo}
                        </div>
                      </div>

                      {/* Value */}
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-success-600">
                          ${(lead.value / 1000).toFixed(0)}K
                        </span>
                        <span className="text-xs text-neutral-500">
                          {lead.daysInStage}d in stage
                        </span>
                      </div>

                      {/* Tags */}
                      {lead.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {lead.tags.map((tag, index) => (
                            <Badge key={index} variant="neutral" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-1 pt-2 border-t border-neutral-100">
                        <button className="flex-1 px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded transition-colors">
                          View
                        </button>
                        <button className="flex-1 px-2 py-1 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Add Card */}
                <button className="w-full p-4 border-2 border-dashed border-neutral-200 rounded-lg text-neutral-500 hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/30 transition-all">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm mt-1 block">Add Deal</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ZapnioLayout>
  );
}
