'use client';

import type { ChatMessage } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

interface ChatMessageItemProps {
  message: ChatMessage;
}

export function ChatMessageItem({ message }: ChatMessageItemProps): React.JSX.Element {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex items-end gap-2 my-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarFallback className="bg-accent text-accent-foreground">
            <Bot size={20} />
          </AvatarFallback>
        </Avatar>
      )}
      <Card
        className={cn(
          'max-w-[70%] rounded-xl shadow-md',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-card text-card-foreground rounded-bl-none'
        )}
      >
        <CardContent className="p-3">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <p className={cn("text-xs mt-1", isUser ? "text-primary-foreground/70 text-right" : "text-muted-foreground/80 text-left")}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </CardContent>
      </Card>
      {isUser && (
         <Avatar className="h-8 w-8 self-start">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User size={20} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
