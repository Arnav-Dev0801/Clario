import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Badge from '../ui/Badge';

const notificationIcons = {
  message: '💬',
  session: '📅',
  rating: '⭐',
  payment: '💳',
  achievement: '🏆',
  system: '📢',
};

export default function NotificationCenter({
  notifications = [],
  onMarkAsRead,
  onClear,
  isOpen = true,
}) {
  const [selectedId, setSelectedId] = useState(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute right-0 mt-2 w-96 max-w-[calc(100vw-24px)] bg-white border border-border rounded-xl shadow-xl overflow-hidden z-50"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-border bg-background-secondary flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-foreground-tertiary">
                  {unreadCount} unread
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-indigo hover:text-indigo/80 transition-colors font-medium"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-foreground-secondary">
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="divide-y divide-border"
              >
                {notifications.map((notif) => (
                  <motion.div
                    key={notif.id}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      show: { opacity: 1, x: 0 },
                    }}
                    onClick={() => {
                      setSelectedId(notif.id);
                      onMarkAsRead?.(notif.id);
                    }}
                    className={`px-4 py-3 cursor-pointer transition-colors border-l-2 ${
                      notif.read
                        ? 'hover:bg-white/5 border-l-transparent'
                        : 'bg-indigo/5 hover:bg-indigo/10 border-l-indigo'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-lg shrink-0 pt-0.5">
                        {notificationIcons[notif.type] || '📌'}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {notif.title}
                        </p>
                        <p className="text-xs text-foreground-tertiary mt-1">
                          {notif.message}
                        </p>
                        <p className="text-xs text-foreground-tertiary/60 mt-1">
                          {notif.timestamp}
                        </p>
                      </div>

                      {!notif.read && (
                        <div className="shrink-0 w-2 h-2 rounded-full bg-indigo mt-1.5" />
                      )}
                    </div>

                    {notif.action && (
                      <button className="mt-2 text-xs text-indigo hover:text-indigo/80 transition-colors font-medium">
                        {notif.action}
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-border bg-surface/50 text-center">
              <button className="text-xs text-foreground-secondary hover:text-foreground transition-colors">
                View all notifications
              </button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
