'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Moon, Sun, Palette, Globe, Bell, Lock, User, Zap, Keyboard } from 'lucide-react';
import { useTheme } from 'next-themes';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  useEffect(() => setMounted(true), []);

  // Close on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const SettingSection = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
        <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );

  const SettingRow = ({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{label}</p>
        {description && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">{description}</p>
        )}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  );

  const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label: string }) => (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
        checked ? 'bg-primary-600' : 'bg-neutral-300 dark:bg-neutral-600'
      }`}
    >
      <motion.span
        layout
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-neutral-900 shadow-2xl z-50 overflow-hidden flex flex-col"
            role="dialog"
            aria-label="Settings panel"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Settings</h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Customize your experience
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 dark:text-neutral-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
                aria-label="Close settings panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Appearance */}
              <SettingSection icon={Palette} title="Appearance">
                <SettingRow label="Theme" description="Choose your interface theme">
                  {mounted && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTheme('light')}
                        className={`p-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
                          theme === 'light'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                        }`}
                        aria-label="Light theme"
                        title="Light"
                      >
                        <Sun className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`p-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
                          theme === 'dark'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                        }`}
                        aria-label="Dark theme"
                        title="Dark"
                      >
                        <Moon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setTheme('system')}
                        className={`p-2 rounded-lg border-2 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 ${
                          theme === 'system'
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                        }`}
                        aria-label="System theme"
                        title="System"
                      >
                        <Monitor className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </SettingRow>

                <SettingRow
                  label="Reduced Motion"
                  description="Minimize animations for accessibility"
                >
                  <Toggle
                    checked={reducedMotion}
                    onChange={setReducedMotion}
                    label="Reduced motion toggle"
                  />
                </SettingRow>
              </SettingSection>

              {/* Notifications */}
              <SettingSection icon={Bell} title="Notifications">
                <SettingRow
                  label="Desktop Notifications"
                  description="Get notified about important updates"
                >
                  <Toggle
                    checked={true}
                    onChange={() => {}}
                    label="Desktop notifications toggle"
                  />
                </SettingRow>

                <SettingRow
                  label="Sound Effects"
                  description="Play sounds for notifications"
                >
                  <Toggle
                    checked={soundEnabled}
                    onChange={setSoundEnabled}
                    label="Sound effects toggle"
                  />
                </SettingRow>

                <SettingRow
                  label="Email Digest"
                  description="Receive daily summary emails"
                >
                  <Toggle
                    checked={true}
                    onChange={() => {}}
                    label="Email digest toggle"
                  />
                </SettingRow>
              </SettingSection>

              {/* Accessibility */}
              <SettingSection icon={Zap} title="Accessibility">
                <SettingRow
                  label="Keyboard Shortcuts"
                  description="Use keyboard shortcuts for quick actions"
                >
                  <button className="px-3 py-1.5 text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 bg-primary-50 dark:bg-primary-900/20 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900">
                    View All
                  </button>
                </SettingRow>

                <SettingRow
                  label="High Contrast"
                  description="Increase color contrast"
                >
                  <Toggle
                    checked={false}
                    onChange={() => {}}
                    label="High contrast toggle"
                  />
                </SettingRow>

                <SettingRow
                  label="Large Text"
                  description="Increase font size"
                >
                  <Toggle
                    checked={false}
                    onChange={() => {}}
                    label="Large text toggle"
                  />
                </SettingRow>
              </SettingSection>

              {/* Language & Region */}
              <SettingSection icon={Globe} title="Language & Region">
                <SettingRow label="Language" description="Interface language">
                  <select className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </SettingRow>

                <SettingRow label="Timezone" description="Your local timezone">
                  <select className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900">
                    <option>UTC-8 (PST)</option>
                    <option>UTC-5 (EST)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (CET)</option>
                  </select>
                </SettingRow>
              </SettingSection>

              {/* Privacy */}
              <SettingSection icon={Lock} title="Privacy & Security">
                <SettingRow
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security"
                >
                  <button className="px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900">
                    Enable
                  </button>
                </SettingRow>

                <SettingRow
                  label="Session Timeout"
                  description="Auto-logout after inactivity"
                >
                  <select className="px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>Never</option>
                  </select>
                </SettingRow>
              </SettingSection>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
              <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>Version 1.0.0</span>
                <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 rounded px-2 py-1">
                  View Changelog
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
