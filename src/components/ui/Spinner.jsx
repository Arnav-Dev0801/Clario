export default function Spinner({ size = 'md', color = 'indigo' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colors = {
    indigo: 'border-indigo/30 border-t-indigo',
    cyan: 'border-cyan/30 border-t-cyan',
    green: 'border-green/30 border-t-green',
    white: 'border-white/30 border-t-white',
  };

  return (
    <div className={`
      ${sizes[size]}
      border-2 rounded-full animate-spin
      ${colors[color]}
    `} />
  );
}
