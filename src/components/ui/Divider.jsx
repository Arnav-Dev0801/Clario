export default function Divider({ className = '', text = '' }) {
  if (!text) {
    return <div className={`border-t border-border ${className}`} />;
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 border-t border-border" />
      <span className="text-sm text-foreground-tertiary px-2">{text}</span>
      <div className="flex-1 border-t border-border" />
    </div>
  );
}
