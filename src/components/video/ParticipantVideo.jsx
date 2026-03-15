import { motion } from 'framer-motion';
import Avatar from '../ui/Avatar';

export default function ParticipantVideo({ 
  id,
  name, 
  initials,
  videoStream,
  isMuted = false,
  isScreenSharing = false,
  isMainFocus = false,
  quality = 'HD'
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`relative bg-background-secondary rounded-lg overflow-hidden border transition-all duration-300 ${
        isMainFocus 
          ? 'border-indigo ring-2 ring-indigo/50' 
          : 'border-border hover:border-indigo/50'
      }`}
    >
      {/* Video or Avatar */}
      <div className="w-full h-full bg-black/80 flex items-center justify-center relative">
        {videoStream ? (
          <video
            id={id}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Avatar 
              initials={initials} 
              size="lg"
              className="w-20 h-20 text-2xl bg-indigo/30"
            />
          </div>
        )}

        {/* Screen Share Indicator */}
        {isScreenSharing && (
          <div className="absolute top-3 right-3 bg-green/90 px-2 py-1 rounded-md flex items-center gap-1">
            <span className="text-xs font-medium text-white">🖥️ Screen</span>
          </div>
        )}

        {/* Mute Indicator */}
        {isMuted && (
          <div className="absolute bottom-3 left-3 bg-error/90 px-2 py-1 rounded-md flex items-center gap-1">
            <span className="text-xs font-medium text-white">🔇 Muted</span>
          </div>
        )}

        {/* Quality Badge */}
        <div className="absolute bottom-3 right-3 bg-foreground/20 backdrop-blur px-2 py-1 rounded-md">
          <p className="text-xs text-foreground-secondary font-medium">{quality}</p>
        </div>
      </div>

      {/* Name */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <p className="text-sm font-medium text-white">{name}</p>
      </div>
    </motion.div>
  );
}
