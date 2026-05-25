import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, AlertTriangle, DollarSign, UserPlus, BrainCircuit, Mic } from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'finance' | 'registration' | 'ai' | 'announcement';
  title: string;
  description: string;
  time: string;
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'ai',
    title: 'AI Insight',
    description: 'Attendance in CS101 dropped 15% below predicted levels.',
    time: '2m ago',
    unread: true,
  },
  {
    id: '2',
    type: 'finance',
    title: 'Payment Received',
    description: '$12,500 collected from 3rd Year term fees.',
    time: '1h ago',
    unread: true,
  },
  {
    id: '3',
    type: 'registration',
    title: 'New Registrations',
    description: '14 new students added to the portal.',
    time: '3h ago',
    unread: false,
  },
  {
    id: '4',
    type: 'alert',
    title: 'System Alert',
    description: 'Database backup completed successfully.',
    time: '5h ago',
    unread: false,
  }
];

const getIcon = (type: string) => {
  switch(type) {
    case 'ai': return <BrainCircuit className="w-4 h-4 text-primary" />;
    case 'finance': return <DollarSign className="w-4 h-4 text-green-400" />;
    case 'registration': return <UserPlus className="w-4 h-4 text-accent" />;
    case 'alert': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    default: return <Bell className="w-4 h-4 text-primary" />;
  }
};

export function NotificationsDropdown({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-14 right-0 w-80 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50 backdrop-blur-xl"
          >
            <div className="p-4 border-b border-[var(--border-subtle)] bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[var(--text-main)] tracking-wide">Notifications</h3>
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                  2 New
                </span>
              </div>
            </div>

            <div className="max-h-[360px] overflow-y-auto">
              {mockNotifications.map((notification, i) => (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  key={notification.id}
                  className={`p-4 border-b border-[var(--border-subtle)] hover:bg-primary/5 transition-colors cursor-pointer relative ${
                    notification.unread ? 'bg-primary/5' : ''
                  }`}
                >
                  {notification.unread && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-1.5 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--border-glow)]" />
                  )}
                  <div className="flex gap-3 pl-2">
                    <div className={`p-2 rounded-xl border border-[var(--border-subtle)] h-fit ${notification.unread ? 'bg-primary/10 border-primary/20' : 'bg-[var(--bg-main)]'}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-sm font-semibold text-[var(--text-main)]">{notification.title}</h4>
                        <span className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wider">{notification.time}</span>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{notification.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-3 border-t border-[var(--border-subtle)] text-center bg-[var(--bg-main)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer">
              <span className="text-xs font-bold text-primary tracking-wide uppercase">Mark all as read</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
