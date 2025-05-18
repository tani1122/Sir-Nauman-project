'use client';

import type { ChatMessage } from '@/types';
import { ChatMessageItem } from './chat-message-item';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Added this line
import { Bot } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps): React.JSX.Element {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  // This is a trick to get a reference to the viewport div of ScrollArea
  useEffect(() => {
    const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
    if (viewport) {
      // You could potentially use this viewportRef if needed for more complex scroll management
    }
  }, []);


  return (
    <ScrollArea className="h-full w-full flex-1 p-4" ref={scrollAreaRef}>
      {messages.map((msg) => (
        <ChatMessageItem key={msg.id} message={msg} />
      ))}
      {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
        <div className="flex justify-start items-end gap-2 my-3">
           <Avatar className="h-8 w-8 self-start">
            <AvatarFallback className="bg-accent text-accent-foreground">
              <Bot size={20} />
            </AvatarFallback>
          </Avatar>
          <Card className="max-w-[70%] rounded-xl shadow-md bg-card text-card-foreground rounded-bl-none">
            <CardContent className="p-3">
              <p className="text-sm text-muted-foreground animate-pulse">API Buddy is thinking...</p>
            </CardContent>
          </Card>
        </div>
      )}
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
}
