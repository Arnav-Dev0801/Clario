import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function VideoCallHeader({ 
  sessionTitle,
  skill,
  tutorName,
  participantCount = 2,
  duration = 0,
  recordingActive = false
}) {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (duration === 0) return;
    
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 bg-gradient-to-b from-background via-background/95 to-background/0 border-b border-border backdrop-blur-lg z-30"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Session Info */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">{skill}</h2>
          <p className="text-sm text-foreground-secondary">with {tutorName}</p>
        </div>

        {/* Center: Session Status */}
        <div className="flex items-center gap-6">
          {/* Participant Count */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
            <span className="text-sm text-foreground">{participantCount} participants</span>
          </div>

          {/* Timer */}
          {duration > 0 && (
            <div className="text-sm text-foreground-secondary font-mono">
              {formatTime(elapsedTime)}
            </div>
          )}

          {/* Recording Indicator */}
          {recordingActive && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="flex items-center gap-2 text-error"
            >
              <span className="w-2 h-2 rounded-full bg-error" />
              <span className="text-xs font-medium">Recording</span>
            </motion.div>
          )}
        </div>

        {/* Right: End Session Button */}
        <div className="flex-1 text-right">
          <button className="text-sm text-error hover:text-error/80 transition-colors font-medium">
            End Session
          </button>
        </div>
      </div>
    </motion.div>
  );
}
