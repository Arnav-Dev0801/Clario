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
        bg-white border border-border
        text-foreground placeholder-foreground-tertiary
        rounded-lg transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple
        disabled:opacity-50 disabled:cursor-not-allowed
        ${error ? 'border-error focus:ring-error/30 focus:border-error' : ''}
        ${className}
      `}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
