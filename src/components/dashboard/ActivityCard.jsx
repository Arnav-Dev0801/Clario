import Badge from '../ui/Badge';

export default function ActivityCard({ 
  title, 
  description, 
  status, 
  statusVariant = 'default', 
  time,
  action,
  onActionClick 
}) {
  return (
    <div className="p-4 rounded-lg border border-border bg-background-secondary hover:bg-background-tertiary transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground truncate">{title}</h4>
          <p className="text-xs text-foreground-tertiary mt-1">{description}</p>
          {time && <p className="text-xs text-foreground-tertiary mt-2">{time}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {status && <Badge variant={statusVariant} size="sm">{status}</Badge>}
          {action && (
            <button
              onClick={onActionClick}
              className="text-xs px-3 py-1.5 rounded-lg bg-purple/10 text-purple hover:bg-purple/20 transition-colors font-medium"
            >
              {action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
