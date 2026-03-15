import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function ControlsBar({
  isMuted = false,
  isVideoOff = false,
  isScreenSharing = false,
  onToggleMute,
  onToggleVideo,
  onToggleScreenShare,
  onLeaveSession,
  onChat,
  onParticipants,
  unreadMessages = 0
}) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/98 to-white/0 border-t border-border shadow-lg"
    >
      <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-center gap-3 flex-wrap">
        {/* Microphone Control */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleMute}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isMuted
              ? 'bg-red-100 text-error hover:bg-red-200'
              : 'bg-background-secondary text-foreground hover:bg-background-tertiary'
          }`}
        >
          <span className="text-lg">{isMuted ? '🔇' : '🎤'}</span>
          <span className="hidden sm:inline">{isMuted ? 'Unmute' : 'Mute'}</span>
        </motion.button>

        {/* Camera Control */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleVideo}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isVideoOff
              ? 'bg-error/20 text-error hover:bg-error/30'
              : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
          }`}
        >
          <span className="text-lg">{isVideoOff ? '📹' : '📺'}</span>
          <span className="hidden sm:inline">{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
        </motion.button>

        {/* Screen Share Control */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleScreenShare}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isScreenSharing
              ? 'bg-green/20 text-green hover:bg-green/30'
              : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
          }`}
        >
          <span className="text-lg">🖥️</span>
          <span className="hidden sm:inline">{isScreenSharing ? 'Stop Share' : 'Share Screen'}</span>
        </motion.button>

        <div className="h-8 w-px bg-border" />

        {/* Chat Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onChat}
          className="relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-foreground/10 text-foreground hover:bg-foreground/20 transition-all"
        >
          <span className="text-lg">💬</span>
          <span className="hidden sm:inline">Chat</span>
          {unreadMessages > 0 && (
            <span className="absolute top-0 right-0 w-5 h-5 bg-green rounded-full flex items-center justify-center text-xs text-white font-bold">
              {unreadMessages > 9 ? '9+' : unreadMessages}
            </span>
          )}
        </motion.button>

        {/* Participants */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onParticipants}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-foreground/10 text-foreground hover:bg-foreground/20 transition-all"
        >
          <span className="text-lg">👥</span>
          <span className="hidden sm:inline">Participants</span>
        </motion.button>

        <div className="h-8 w-px bg-border" />

        {/* Leave Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLeaveSession}
          className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium bg-error/20 text-error hover:bg-error/30 transition-all"
        >
          <span className="text-lg">📞</span>
          <span className="hidden sm:inline">Leave Session</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
