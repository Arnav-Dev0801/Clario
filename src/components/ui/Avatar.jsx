import { forwardRef } from 'react';

const Avatar = forwardRef(({
  src,
  alt = 'Avatar',
  initials,
  size = 'md',
  className = '',
  ...props
}, ref) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  return (
    <div
      ref={ref}
      className={`
        flex items-center justify-center
        rounded-full bg-purple/10 text-purple
        font-semibold overflow-hidden
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
