import { forwardRef } from 'react';

const Badge = forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const variants = {
    default: 'bg-purple/10 text-purple border border-purple/20',
    secondary: 'bg-blue-100 text-blue-700 border border-blue-200',
    success: 'bg-green-100 text-success border border-green/20',
    error: 'bg-red-100 text-error border border-error/20',
    warning: 'bg-orange-100 text-warning border border-warning/20',
    outline: 'border border-border text-foreground-secondary',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      ref={ref}
      className={`
        inline-flex items-center gap-2
        rounded-full font-medium
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
