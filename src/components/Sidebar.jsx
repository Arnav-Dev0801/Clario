import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const MotionLink = motion.create(Link);

const navItems = {
  student: [
    { to: '/student/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/find-skills', label: 'Find Skills', icon: '🔍' },
    { to: '/my-sessions', label: 'Sessions', icon: '📅' },
    { to: '/profile', label: 'Profile', icon: '👤' }
  ],
  tutor: [
    { to: '/tutor/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/tutor/requests', label: 'Requests', icon: '📬' },
    { to: '/tutor/profile', label: 'Public Profile', icon: '🌟' },
    { to: '/profile', label: 'Account Settings', icon: '⚙️' },
  ],
};

export default function Sidebar({ user, userProfile, open = true, onOpenChange }) {
  const location = useLocation();
  const links = userProfile?.role ? navItems[userProfile.role] || [] : [];

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        initial={{ x: -320 }}
        animate={{ x: 0 }}
        exit={{ x: -320 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-border bg-background-secondary/40 backdrop-blur-lg md:translate-x-0"
        style={{ transform: !open ? 'translateX(-100%)' : 'translateX(0)' }}
      >
        {/* Brand Header */}
        <div className="flex h-20 items-center gap-3 px-6 pb-2 pt-6 border-b border-border">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo to-cyan text-lg font-bold text-white">
            C
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Clario</p>
            <p className="text-xs text-foreground-tertiary">EdTech</p>
          </div>
          {/* Close button for mobile */}
          <button
            onClick={() => onOpenChange?.(false)}
            className="md:hidden text-foreground-secondary hover:text-foreground transition-colors p-1"
          >
            ✕
          </button>
        </div>

        {/* Navigation Links */}
        <motion.nav 
          initial="hidden" 
          animate="show" 
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
          }}
          className="mt-6 flex flex-1 flex-col gap-1 px-4 overflow-y-auto"
        >
          {links.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <motion.div 
                key={item.to} 
                variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
              >
                <MotionLink
                  to={item.to}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      onOpenChange?.(false);
                    }
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo/20 text-indigo border-l-2 border-indigo pl-3'
                      : 'text-foreground-secondary hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </MotionLink>
              </motion.div>
            );
          })}
        </motion.nav>

        {/* Footer info */}
        <div className="border-t border-border px-4 py-4 text-xs text-foreground-tertiary">
          <p>© 2024 Clario</p>
        </div>
      </motion.div>

      {/* Mobile hamburger button */}
      <button
        onClick={() => onOpenChange?.(!open)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-surface hover:bg-surface-hover border border-border transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </AnimatePresence>
  );
}
