import { motion } from 'framer-motion';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

export default function SessionCard({ 
  id,
  skill, 
  tutor, 
  status, 
  statusVariant = 'default',
  time,
  onJoin,
  onRate,
  isActive = false 
}) {
  const statusVariants = {
    pending: 'outline',
    accepted: 'info',
    in_progress: 'success',
    completed: 'secondary',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border transition-all ${
        isActive 
          ? 'border-purple bg-purple/5 shadow-md' 
          : 'border-border bg-background-secondary hover:bg-background-tertiary'
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground">{skill}</h4>
          <p className="text-xs text-foreground-tertiary mt-1">with {tutor || 'Tutor'}</p>
        </div>
        <Badge variant={statusVariants[status] || 'default'} size="sm">
          {status?.replace('_', ' ')}
        </Badge>
      </div>

      {time && (
        <p className="text-xs text-foreground-tertiary mb-3">
          📅 {new Date(time).toLocaleDateString()} at {new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      )}

      <div className="flex gap-2 pt-3 border-t border-border">
        {status === 'completed' && onRate && (
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onRate?.(id)}
            className="flex-1"
          >
            Rate Session
          </Button>
        )}
        {(status === 'accepted' || status === 'in_progress') && onJoin && (
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => onJoin?.(id)}
            className="flex-1"
          >
            {status === 'in_progress' ? 'Resume' : 'Join'} Session
          </Button>
        )}
      </div>
    </motion.div>
  );
}
