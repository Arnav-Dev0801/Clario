import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import Avatar from './ui/Avatar';
import Input from './ui/Input';

export default function Header({ user, userProfile, onLogout }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifications = [
    { id: 1, message: 'New message from John', time: '2 min ago', read: false },
    { id: 2, message: 'Session scheduled', time: '1 hour ago', read: true },
    { id: 3, message: 'Payment received', time: '3 hours ago', read: true },
  ];

  const messages = [
    { id: 1, name: 'John Doe', preview: 'Hey, are you available...', unread: true },
    { id: 2, name: 'Sarah Smith', preview: 'Thanks for the session!', unread: false },
  ];

  const userInitials = userProfile?.displayName?.split(' ').map(n => n[0]).join('') || 'U';

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md relative">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
            searchOpen ? 'bg-background-secondary border-purple' : 'bg-background-secondary border-border hover:bg-background-tertiary'
          }`}>
            <span className="text-foreground-tertiary">🔍</span>
            <Input
              type="text"
              placeholder="Search skills, sessions, tutors..."
              className="bg-transparent border-0 text-sm focus:ring-0"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Notifications */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg hover:bg-surface transition-colors"
            >
              🔔
              {notifications.some(n => !n.read) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-indigo rounded-full" />
              )}
            </motion.button>

            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="border-b border-border px-4 py-3">
                    <p className="text-sm font-semibold text-foreground">Notifications</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`px-4 py-3 border-b border-border/50 hover:bg-white/5 transition-colors cursor-pointer ${
                          !notif.read ? 'bg-indigo/10' : ''
                        }`}
                      >
                        <p className="text-sm text-foreground">{notif.message}</p>
                        <p className="text-xs text-foreground-tertiary mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Messages */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMessagesOpen(!messagesOpen)}
              className="relative p-2 rounded-lg hover:bg-surface transition-colors"
            >
              💬
              {messages.some(m => m.unread) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-green rounded-full" />
              )}
            </motion.button>

            <AnimatePresence>
              {messagesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="border-b border-border px-4 py-3">
                    <p className="text-sm font-semibold text-foreground">Messages</p>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`px-4 py-3 border-b border-border/50 hover:bg-white/5 transition-colors cursor-pointer ${
                          msg.unread ? 'bg-green/10' : ''
                        }`}
                      >
                        <p className="text-sm font-medium text-foreground">{msg.name}</p>
                        <p className="text-xs text-foreground-tertiary mt-1">{msg.preview}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-surface transition-colors"
            >
              <Avatar
                initials={userInitials}
                size="sm"
                className="bg-indigo/20"
              />
              <span className="text-sm text-foreground hidden md:block">{userProfile?.displayName || 'User'}</span>
            </motion.button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-semibold text-foreground">{userProfile?.displayName}</p>
                    <p className="text-xs text-foreground-tertiary">{userProfile?.role}</p>
                  </div>
                  
                  <button className="w-full px-4 py-2 text-sm text-left text-foreground hover:bg-white/5 transition-colors border-b border-border/50">
                    👤 Profile Settings
                  </button>
                  <button className="w-full px-4 py-2 text-sm text-left text-foreground hover:bg-white/5 transition-colors border-b border-border/50">
                    ⚙️ Account Settings
                  </button>
                  <button className="w-full px-4 py-2 text-sm text-left text-foreground hover:bg-white/5 transition-colors border-b border-border/50">
                    ❓ Help & Support
                  </button>

                  <button
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-sm text-left text-error hover:bg-error/10 transition-colors"
                  >
                    🚪 Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
