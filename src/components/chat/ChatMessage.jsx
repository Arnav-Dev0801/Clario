import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar';

export default function ChatMessage({ 
  id,
  author, 
  authorInitials,
  message, 
  timestamp,
  isOwn = false,
  isSending = false,
  hasError = false,
  showAvatar = true,
  showTimestamp = true
}) {
  const formatTime = (date) => {
    if (!date) return '';
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex gap-3 mb-4 ${isOwn ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      {showAvatar && (
        <div className={`flex-shrink-0 ${isOwn ? 'hidden md:block' : ''}`}>
          <Avatar 
            initials={authorInitials} 
            size="sm"
            className="bg-indigo/20"
          />
        </div>
      )}

      {/* Message Bubble */}
      <div className={`flex flex-col gap-1 flex-1 max-w-xs ${isOwn ? 'items-end' : ''}`}>
        {/* Author Name */}
        {!isOwn && <p className="text-xs text-foreground-tertiary px-3">{author}</p>}

        {/* Message */}
        <div
          className={`px-4 py-2 rounded-lg break-words ${
            isOwn
              ? 'bg-indigo/80 text-white rounded-br-none'
              : 'bg-surface border border-border rounded-bl-none'
          } ${hasError ? 'opacity-60' : ''}`}
        >
          <p className="text-sm leading-relaxed">{message}</p>
        </div>

        {/* Timestamp */}
        {showTimestamp && (
          <p className={`text-xs text-foreground-tertiary px-3 ${isOwn ? 'text-right' : ''}`}>
            {formatTime(timestamp)}
            {isSending && !isOwn && ' • sending'}
            {hasError && ' • failed'}
          </p>
        )}
      </div>
    </motion.div>
  );
}
