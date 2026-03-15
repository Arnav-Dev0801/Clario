import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import Button from '../ui/Button';
import Card from '../ui/Card';

export default function ChatWindow({ 
  messages = [],
  currentUserInitials = 'U',
  currentUserId = 'self',
  isOpen = true,
  onClose,
  onSendMessage,
  isMinimized = false,
  participantName = 'Participant'
}) {
  const [localMessages, setLocalMessages] = useState(messages);
  const messagesEndRef = useRef(null);
  const [typingUsers, setTypingUsers] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [localMessages]);

  const handleSendMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      author: 'You',
      authorInitials: currentUserInitials,
      message,
      timestamp: new Date(),
      isOwn: true,
      isSending: true,
    };

    setLocalMessages([...localMessages, newMessage]);
    
    // Simulate message sent
    setTimeout(() => {
      setLocalMessages(prev =>
        prev.map(m =>
          m.id === newMessage.id ? { ...m, isSending: false } : m
        )
      );
    }, 500);

    onSendMessage?.(message);
  };

  if (!isOpen && !isMinimized) {
    return null;
  }

  const variant = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.95 }
  };

  return (
    <AnimatePresence mode="wait">
      {isMinimized ? (
        <motion.button
          key="minimized"
          variants={variant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-20 right-6 p-3 rounded-full bg-purple hover:bg-purple-dark text-white shadow-lg flex items-center justify-center w-14 h-14 z-40"
          onClick={onClose}
        >
          <span className="text-xl">💬</span>
        </motion.button>
      ) : (
        <motion.div
          key="chat-window"
          variants={variant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-32px)] rounded-lg border border-border bg-white shadow-xl overflow-hidden z-40 flex flex-col max-h-[600px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white shrink-0">
            <div>
              <h3 className="font-semibold text-foreground text-sm">{participantName}</h3>
              <p className="text-xs text-foreground-tertiary">Session chat</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="text-foreground-secondary hover:text-foreground p-1"
            >
              ✕
            </motion.button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
            {localMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <p className="text-lg mb-2">👋</p>
                  <p className="text-sm text-foreground-secondary">No messages yet. Start the conversation!</p>
                </div>
              </div>
            ) : (
              <>
                {localMessages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    id={msg.id}
                    author={msg.author}
                    authorInitials={msg.authorInitials}
                    message={msg.message}
                    timestamp={msg.timestamp}
                    isOwn={msg.isOwn}
                    isSending={msg.isSending}
                    hasError={msg.hasError}
                    showAvatar={true}
                    showTimestamp={localMessages.indexOf(msg) === 0 || 
                      (localMessages[localMessages.indexOf(msg) - 1]?.author !== msg.author)}
                  />
                ))}

                {/* Typing indicator */}
                {typingUsers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-1 text-foreground-tertiary text-sm pt-2"
                  >
                    <span>{typingUsers[0]} is typing</span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity }}
                    >
                      •
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    >
                      •
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    >
                      •
                    </motion.span>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          <ChatInput 
            onSendMessage={handleSendMessage}
            placeholder="Type a message..."
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
