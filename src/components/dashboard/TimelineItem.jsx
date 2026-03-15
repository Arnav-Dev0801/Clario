export default function TimelineItem({ 
  icon, 
  title, 
  description, 
  time, 
  variant = 'default' 
}) {
  const variants = {
    default: 'bg-indigo/20 text-indigo',
    success: 'bg-green/20 text-green',
    warning: 'bg-warning/20 text-warning',
    error: 'bg-error/20 text-error',
  };

  return (
    <div className="flex gap-4">
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${variants[variant]} mb-2 text-lg`}>
          {icon}
        </div>
        <div className="w-0.5 h-12 bg-border" />
      </div>

      {/* Content */}
      <div className="pb-8 flex-1">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <p className="text-xs text-foreground-tertiary mt-1">{description}</p>
        {time && <p className="text-xs text-foreground-tertiary/60 mt-2">{time}</p>}
      </div>
    </div>
  );
}
