'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizonal, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps): React.JSX.Element {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    await onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t p-4 bg-background"
    >
      <Input
        type="text"
        placeholder="Type your message..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={isLoading}
        className="flex-1 rounded-full px-4 py-2 focus-visible:ring-primary"
        aria-label="Chat message input"
      />
      <Button
        type="submit"
        size="icon"
        className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isLoading || !inputValue.trim()}
        aria-label="Send message"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <SendHorizonal className="h-5 w-5" />
        )}
      </Button>
    </form>
  );
}
