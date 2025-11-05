'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModernLayout } from '@/components/layout/ModernLayout';
import { Card, CardHeader, CardBody } from '@/components/ui/Card';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function CreateLeadPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    source: '',
    status: 'new',
    priority: 'medium',
    value: '',
    assignedTo: '',
    notes: '',
    tags: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    router.push('/leads');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ModernLayout>
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-bold text-neutral-900">Create New Lead</h1>
        </div>
        <p className="text-neutral-600">Add a new lead to your sales pipeline</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader title="Basic Information" subtitle="Primary contact details" />
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@company.com"
                    required
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    }
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    leftIcon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    }
                  />
                  <Input
                    label="Company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Corporation"
                    required
                  />
                  <Input
                    label="Job Title"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Marketing Director"
                  />
                </div>
              </CardBody>
            </Card>

            {/* Lead Details */}
            <Card>
              <CardHeader title="Lead Details" subtitle="Classification and tracking information" />
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Lead Source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    options={[
                      { value: '', label: 'Select source...' },
                      { value: 'website', label: 'Website' },
                      { value: 'referral', label: 'Referral' },
                      { value: 'social_media', label: 'Social Media' },
                      { value: 'email_campaign', label: 'Email Campaign' },
                      { value: 'cold_call', label: 'Cold Call' },
                      { value: 'trade_show', label: 'Trade Show' },
                      { value: 'advertisement', label: 'Advertisement' },
                      { value: 'other', label: 'Other' },
                    ]}
                    required
                  />
                  <Select
                    label="Status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={[
                      { value: 'new', label: 'New' },
                      { value: 'contacted', label: 'Contacted' },
                      { value: 'qualified', label: 'Qualified' },
                      { value: 'proposal', label: 'Proposal' },
                      { value: 'negotiation', label: 'Negotiation' },
                      { value: 'won', label: 'Won' },
                      { value: 'lost', label: 'Lost' },
                      { value: 'unqualified', label: 'Unqualified' },
                    ]}
                    required
                  />
                  <Select
                    label="Priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                      { value: 'urgent', label: 'Urgent' },
                    ]}
                  />
                  <Input
                    label="Estimated Value"
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleChange}
                    placeholder="50000"
                    leftIcon={
                      <span className="text-neutral-500">$</span>
                    }
                  />
                  <div className="md:col-span-2">
                    <Select
                      label="Assign To"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleChange}
                      options={[
                        { value: '', label: 'Select team member...' },
                        { value: 'john_doe', label: 'John Doe' },
                        { value: 'jane_smith', label: 'Jane Smith' },
                        { value: 'mike_johnson', label: 'Mike Johnson' },
                      ]}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader title="Additional Information" subtitle="Notes and tags" />
              <CardBody>
                <div className="space-y-4">
                  <Textarea
                    label="Notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add any additional notes or context about this lead..."
                    rows={4}
                  />
                  <Input
                    label="Tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="enterprise, tech, high-priority (comma separated)"
                    helperText="Enter tags separated by commas"
                  />
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader title="Actions" />
              <CardBody>
                <div className="space-y-3">
                  <Button type="submit" fullWidth loading={isSubmitting}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Create Lead
                  </Button>
                  <Button type="button" variant="outline" fullWidth onClick={() => router.back()}>
                    Cancel
                  </Button>
                </div>
              </CardBody>
            </Card>

            {/* Tips */}
            <Card className="bg-primary-50 border-primary-200">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-900 mb-2">Pro Tips</h3>
                  <ul className="text-sm text-primary-800 space-y-1.5">
                    <li>• Add detailed notes to track context</li>
                    <li>• Set realistic estimated values</li>
                    <li>• Assign leads to right team members</li>
                    <li>• Use tags for easy filtering</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader title="Lead Statistics" />
              <CardBody>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Total Leads</span>
                    <span className="text-lg font-semibold text-neutral-900">1,234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Qualified</span>
                    <span className="text-lg font-semibold text-success-600">28%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-600">Avg. Value</span>
                    <span className="text-lg font-semibold text-neutral-900">$42.5K</span>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </form>
    </ModernLayout>
  );
}
