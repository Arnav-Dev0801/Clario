import { forwardRef } from 'react';

const Card = forwardRef(({ children, className = '', hover = false, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`
        rounded-lg border border-border bg-white shadow-sm
        ${hover ? 'hover:shadow-md hover:border-purple/20 transition-all duration-200' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-border ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-semibold text-foreground ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-foreground-tertiary ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-border flex gap-3 ${className}`}>
    {children}
  </div>
);

export default Card;
export { CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
