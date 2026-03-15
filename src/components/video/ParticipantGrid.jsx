import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ParticipantVideo from './ParticipantVideo';

export default function ParticipantGrid({ participants = [], mainParticipantId = null }) {
  const [focusedId, setFocusedId] = useState(mainParticipantId || (participants[0]?.id));

  const mainParticipant = participants.find(p => p.id === focusedId);
  const otherParticipants = participants.filter(p => p.id !== focusedId);

  if (participants.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-foreground-secondary mb-2">Waiting for participants...</p>
          <p className="text-sm text-foreground-tertiary">They'll appear here when they join</p>
        </div>
      </div>
    );
  }

  if (participants.length === 1) {
    return (
      <div className="w-full h-full">
        <ParticipantVideo
          key={mainParticipant.id}
          id={mainParticipant.id}
          name={mainParticipant.name}
          initials={mainParticipant.initials}
          videoStream={mainParticipant.videoStream}
          isMuted={mainParticipant.isMuted}
          isScreenSharing={mainParticipant.isScreenSharing}
          isMainFocus={true}
        />
      </div>
    );
  }

  if (participants.length === 2) {
    return (
      <div className="w-full h-full grid grid-cols-2 gap-4 p-4">
        <AnimatePresence>
          {participants.map((p) => (
            <div
              key={p.id}
              onClick={() => setFocusedId(p.id)}
              className="cursor-pointer"
            >
              <ParticipantVideo
                id={p.id}
                name={p.name}
                initials={p.initials}
                videoStream={p.videoStream}
                isMuted={p.isMuted}
                isScreenSharing={p.isScreenSharing}
                isMainFocus={p.id === focusedId}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  // For 3+ participants
  return (
    <div className="w-full h-full flex gap-4 p-4">
      {/* Main video */}
      <div className="flex-1">
        <ParticipantVideo
          key={mainParticipant.id}
          id={mainParticipant.id}
          name={mainParticipant.name}
          initials={mainParticipant.initials}
          videoStream={mainParticipant.videoStream}
          isMuted={mainParticipant.isMuted}
          isScreenSharing={mainParticipant.isScreenSharing}
          isMainFocus={true}
        />
      </div>

      {/* Sidebar with other participants */}
      <div className="w-64 flex flex-col gap-3 overflow-y-auto">
        <AnimatePresence>
          {otherParticipants.map((p) => (
            <div
              key={p.id}
              onClick={() => setFocusedId(p.id)}
              className="cursor-pointer flex-shrink-0 h-36"
            >
              <ParticipantVideo
                id={p.id}
                name={p.name}
                initials={p.initials}
                videoStream={p.videoStream}
                isMuted={p.isMuted}
                isScreenSharing={p.isScreenSharing}
                isMainFocus={false}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
