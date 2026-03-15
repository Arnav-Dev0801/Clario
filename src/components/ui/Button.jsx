import { forwardRef } from 'react';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
  className = '',
  ...props
}, ref) => {
  const variants = {
    primary: 'bg-purple hover:bg-purple-dark text-white shadow-sm hover:shadow-md',
    secondary: 'bg-background-secondary hover:bg-background-tertiary text-foreground border border-border',
    danger: 'bg-error hover:bg-error/90 text-white',
    success: 'bg-success hover:bg-success/90 text-white',
    ghost: 'text-foreground-secondary hover:text-foreground hover:bg-background-secondary',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg font-medium transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
