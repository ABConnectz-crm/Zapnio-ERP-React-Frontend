'use client';

import { motion } from 'framer-motion';

interface ModernStatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor?: 'cyan' | 'red' | 'green' | 'orange' | 'purple';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const iconColorClasses = {
  cyan: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
  red: 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400',
  green: 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400',
  orange: 'bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400',
  purple: 'bg-lavender-100 dark:bg-lavender-900/30 text-lavender-600 dark:text-lavender-400',
};

export function ModernStatCard({
  title,
  value,
  icon,
  iconColor = 'cyan',
  trend,
  subtitle,
  action,
}: ModernStatCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="relative bg-gradient-to-br from-white via-white to-lavender-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 rounded-xl p-6 shadow-soft hover:shadow-elegant border border-neutral-100 dark:border-neutral-800"
    >
      {/* Icon Badge */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-1">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${iconColorClasses[iconColor]} shadow-sm`}>
          {icon}
        </div>
      </div>

      {/* Trend or Subtitle */}
      {trend && (
        <div className="flex items-center gap-1 mt-3">
          {trend.direction === 'up' ? (
            <svg className="w-4 h-4 text-success-600 dark:text-success-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-accent-600 dark:text-accent-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
          <span className={`text-sm font-semibold ${
            trend.direction === 'up'
              ? 'text-success-600 dark:text-success-400'
              : 'text-accent-600 dark:text-accent-400'
          }`}>
            {Math.abs(trend.value)}%
          </span>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            vs last month
          </span>
        </div>
      )}

      {subtitle && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
          {subtitle}
        </p>
      )}

      {/* Action Link */}
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium mt-4 flex items-center gap-1 group"
        >
          {action.label}
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </motion.div>
  );
}
