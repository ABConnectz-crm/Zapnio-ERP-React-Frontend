'use client';

import React from 'react';
import { ModernLayout } from '@/components/layout/ModernLayout';
import { motion } from 'framer-motion';

export default function DealsPage() {
  return (
    <ModernLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Deals</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-2">Track and close deals</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 shadow-sm">
          <p className="text-neutral-600 dark:text-neutral-400">Demo Deals page</p>
        </div>
      </motion.div>
    </ModernLayout>
  );
}
