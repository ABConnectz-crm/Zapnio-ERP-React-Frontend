'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function GlassCard({
  children,
  className,
  hover = true,
  padding = 'md'
}: GlassCardProps) {
  const Component = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { y: -4 },
    transition: { duration: 0.2 }
  } : {};

  return (
    <Component
      {...motionProps}
      className={clsx(
        'glass-card rounded-lg border border-neutral-200/50 dark:border-neutral-700/50',
        'bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl',
        'shadow-lg hover:shadow-xl transition-all duration-300',
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </Component>
  );
}
