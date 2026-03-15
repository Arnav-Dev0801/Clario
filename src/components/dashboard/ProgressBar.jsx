export default function ProgressBar({ 
  label, 
  value = 0, 
  max = 100, 
  color = 'indigo',
  showLabel = true 
}) {
  const percentage = (value / max) * 100;

  const colors = {
    indigo: 'bg-indigo',
    cyan: 'bg-cyan',
    green: 'bg-green',
    coral: 'bg-coral',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground-secondary">{label}</span>
          <span className="text-sm font-semibold text-foreground">{value}/{max}</span>
        </div>
      )}
      <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
        <div
          className={`h-full ${colors[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
