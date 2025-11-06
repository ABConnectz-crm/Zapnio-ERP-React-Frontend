import React from 'react';
import {
  Users,
  UserPlus,
  Building2,
  Phone,
  TrendingUp,
  DollarSign,
  BarChart3,
  Target,
  Mail,
  MessageSquare,
  Send,
  Briefcase,
  FolderKanban,
  Calendar,
  FileText,
  PieChart,
  LayoutDashboard,
} from 'lucide-react';
import { TabItem } from './ThirdLevelNav';

export interface SubMenuItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  href: string;
  badge?: string;
  hasThirdLevelNav?: boolean;
  thirdLevelNavConfig?: {
    title: string;
    tabs: TabItem[];
  };
}

export const SUBMENU_CONFIG: Record<string, SubMenuItem[]> = {
  dashboard: [
    {
      id: 'overview',
      name: 'Overview',
      icon: <LayoutDashboard className="w-5 h-5" />,
      href: '/dashboard',
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '/dashboard/analytics',
      hasThirdLevelNav: true,
      thirdLevelNavConfig: {
        title: 'Dashboard',
        tabs: [
          {
            id: 'overview',
            name: 'Overview',
            href: '/dashboard'
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
              { id: 'sales-reports', name: 'Sales Reports', href: '/dashboard/reports/sales', description: 'Detailed sales reports' },
              { id: 'lead-reports', name: 'Lead Reports', href: '/dashboard/reports/leads', description: 'Lead generation reports' },
              { id: 'custom-reports', name: 'Custom Reports', href: '/dashboard/reports/custom', description: 'Build custom reports' },
            ]
          },
        ]
      }
    },
  ],
  crm: [
    {
      id: 'leads',
      name: 'Leads',
      icon: <Users className="w-5 h-5" />,
      href: '/leads',
      badge: '72',
      hasThirdLevelNav: true,
      thirdLevelNavConfig: {
        title: 'CRM',
        tabs: [
          {
            id: 'leads',
            name: 'Leads',
            href: '/leads',
            submenu: [
              { id: 'all', name: 'All Leads', href: '/leads', description: 'View all leads' },
              { id: 'my-leads', name: 'My Leads', href: '/leads/my-leads', description: 'Your assigned leads' },
              { id: 'unassigned', name: 'Unassigned', href: '/leads/unassigned', description: 'Unassigned leads' },
            ]
          },
          {
            id: 'contacts',
            name: 'Contacts',
            href: '/contacts'
          },
          {
            id: 'accounts',
            name: 'Accounts',
            href: '/accounts'
          },
        ]
      }
    },
    { id: 'contacts', name: 'Contacts', icon: <UserPlus className="w-5 h-5" />, href: '/contacts' },
    { id: 'accounts', name: 'Accounts', icon: <Building2 className="w-5 h-5" />, href: '/accounts' },
    { id: 'deals', name: 'Deals', icon: <DollarSign className="w-5 h-5" />, href: '/deals' },
    { id: 'activities', name: 'Activities', icon: <Phone className="w-5 h-5" />, href: '/activities' },
  ],
  sales: [
    {
      id: 'pipeline',
      name: 'Pipeline',
      icon: <TrendingUp className="w-5 h-5" />,
      href: '/pipeline',
      hasThirdLevelNav: true,
      thirdLevelNavConfig: {
        title: 'Sales',
        tabs: [
          {
            id: 'pipeline',
            name: 'Pipeline',
            href: '/pipeline',
            submenu: [
              { id: 'all-deals', name: 'All Deals', href: '/pipeline', description: 'View all pipeline deals' },
              { id: 'my-deals', name: 'My Deals', href: '/pipeline/my-deals', description: 'Your deals' },
              { id: 'won', name: 'Won', href: '/pipeline/won', description: 'Closed won deals' },
            ]
          },
          {
            id: 'forecasts',
            name: 'Forecasts',
            href: '/forecasts'
          },
          {
            id: 'quotes',
            name: 'Quotes',
            href: '/quotes'
          },
        ]
      }
    },
    { id: 'forecasts', name: 'Forecasts', icon: <BarChart3 className="w-5 h-5" />, href: '/forecasts' },
    { id: 'quotes', name: 'Quotes', icon: <FileText className="w-5 h-5" />, href: '/quotes' },
    { id: 'orders', name: 'Orders', icon: <DollarSign className="w-5 h-5" />, href: '/orders' },
  ],
  projects: [
    { id: 'all-projects', name: 'All Projects', icon: <Briefcase className="w-5 h-5" />, href: '/projects' },
    { id: 'tasks', name: 'Tasks', icon: <FolderKanban className="w-5 h-5" />, href: '/projects/tasks' },
    { id: 'timeline', name: 'Timeline', icon: <Calendar className="w-5 h-5" />, href: '/projects/timeline' },
  ],
  marketing: [
    { id: 'campaigns', name: 'Campaigns', icon: <Target className="w-5 h-5" />, href: '/marketing/campaigns', badge: '13' },
    { id: 'emails', name: 'Email Marketing', icon: <Mail className="w-5 h-5" />, href: '/marketing/emails' },
    { id: 'social', name: 'Social Media', icon: <MessageSquare className="w-5 h-5" />, href: '/marketing/social' },
    { id: 'automation', name: 'Automation', icon: <Send className="w-5 h-5" />, href: '/marketing/automation' },
  ],
  reports: [
    { id: 'sales-reports', name: 'Sales Reports', icon: <BarChart3 className="w-5 h-5" />, href: '/reports/sales' },
    { id: 'lead-reports', name: 'Lead Reports', icon: <PieChart className="w-5 h-5" />, href: '/reports/leads' },
    { id: 'custom-reports', name: 'Custom Reports', icon: <FileText className="w-5 h-5" />, href: '/reports/custom' },
  ],
};

// Helper function to find active submenu item based on pathname
export function findActiveSubmenuItem(pathname: string): SubMenuItem | null {
  for (const section in SUBMENU_CONFIG) {
    const items = SUBMENU_CONFIG[section];
    for (const item of items) {
      if (pathname === item.href || pathname.startsWith(item.href + '/')) {
        return item;
      }
    }
  }
  return null;
}

// Helper function to get the first navbar tab href for a submenu item
export function getFirstNavTabHref(item: SubMenuItem): string {
  if (item.hasThirdLevelNav && item.thirdLevelNavConfig) {
    const firstTab = item.thirdLevelNavConfig.tabs[0];
    return firstTab?.href || item.href;
  }
  return item.href;
}

