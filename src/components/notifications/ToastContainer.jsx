import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'default', duration = 5000) => {
    const id = Date.now();
    const toast = {
      id,
      message,
      type, // 'default', 'success', 'error', 'warning', 'info'
    };

    setToasts(prev => [...prev, toast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}

const toastVariants = {
  default: 'bg-white border-border text-foreground shadow-lg',
  success: 'bg-green-50 border-green/30 text-success shadow-lg',
  error: 'bg-error/10 border-error/30 text-error',
  warning: 'bg-warning/10 border-warning/30 text-warning',
  info: 'bg-info/10 border-info/30 text-info',
};

const toastIcons = {
  default: '📢',
  success: '✅',
  error: '❌',
  warning: '⚠️',
  info: 'ℹ️',
};

export default function ToastContainer({ toasts = [], onRemove }) {
  return (
    <div className="fixed top-20 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, x: 100 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 100 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm pointer-events-auto max-w-sm ${
              toastVariants[toast.type]
            }`}
          >
            <span className="text-lg shrink-0">{toastIcons[toast.type]}</span>
            <p className="text-sm flex-1">{toast.message}</p>
            <button
              onClick={() => onRemove?.(toast.id)}
              className="text-current hover:opacity-70 transition-opacity"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
