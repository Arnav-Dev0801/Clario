import { forwardRef } from 'react';

const Input = forwardRef(({
  type = 'text',
  placeholder = '',
  error = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        w-full px-4 py-2 text-base
        bg-surface border border-border
        text-foreground placeholder-foreground-tertiary
        rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-indigo/50 focus:border-indigo
        disabled:opacity-50 disabled:cursor-not-allowed
        ${error ? 'border-error focus:ring-error/50 focus:border-error' : ''}
        ${className}
      `}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
