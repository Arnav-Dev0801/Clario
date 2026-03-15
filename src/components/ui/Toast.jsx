import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Toast = forwardRef(({
  children,
  variant = 'default',
  isOpen = true,
  onClose,
  className = '',
  ...props
}, ref) => {
  const variants = {
    default: 'bg-white border-border text-foreground shadow-lg',
    success: 'bg-green-50 border-green/30 text-success shadow-lg',
    error: 'bg-red-50 border-error/30 text-error shadow-lg',
    warning: 'bg-orange-50 border-warning/30 text-warning shadow-lg',
    info: 'bg-blue-50 border-info/30 text-info shadow-lg',
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className={`
        fixed bottom-4 right-4 z-50
        px-4 py-3 rounded-lg border
        flex items-center gap-3
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="ml-auto text-current hover:opacity-80 transition-opacity"
        >
          ✕
        </button>
      )}
    </motion.div>
  );
});

Toast.displayName = 'Toast';

export default Toast;
