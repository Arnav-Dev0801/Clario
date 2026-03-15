import { forwardRef } from 'react';

const Badge = forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const variants = {
    default: 'bg-indigo/20 text-indigo border border-indigo/30',
    secondary: 'bg-cyan/20 text-cyan border border-cyan/30',
    success: 'bg-green/20 text-green border border-green/30',
    error: 'bg-error/20 text-error border border-error/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
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
