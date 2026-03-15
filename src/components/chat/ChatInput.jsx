import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

export default function ChatInput({ 
  onSendMessage,
  isDisabled = false,
  placeholder = 'Type a message...'
}) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="border-t border-border bg-background-secondary/40 backdrop-blur p-4"
    >
      <div className="flex items-end gap-3">
        {/* Input */}
        <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-surface focus-within:border-indigo focus-within:ring-1 focus-within:ring-indigo/50 transition-all">
          <textarea
            ref={inputRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setIsTyping(e.target.value.length > 0);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isDisabled}
            rows="1"
            className="flex-1 bg-transparent text-foreground placeholder-foreground-tertiary focus:outline-none resize-none"
            style={{ maxHeight: '100px' }}
          />
          
          {/* Emoji button */}
          <button
            className="text-lg hover:scale-110 transition-transform disabled:opacity-50"
            disabled={isDisabled}
          >
            😊
          </button>
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim() || isDisabled}
          variant={message.trim() ? 'primary' : 'secondary'}
          size="md"
          className="shrink-0"
        >
          <motion.span
            animate={{ rotate: message.trim() ? 0 : -45 }}
            transition={{ duration: 0.2 }}
          >
            {message.trim() ? '📤' : '📎'}
          </motion.span>
        </Button>
      </div>

      {/* Character count */}
      {message.length > 0 && (
        <p className="text-xs text-foreground-tertiary mt-2 px-4">
          {message.length} character{message.length !== 1 ? 's' : ''}
        </p>
      )}
    </motion.div>
  );
}
