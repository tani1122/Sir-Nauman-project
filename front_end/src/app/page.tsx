'use client';

import { useState } from 'react';
import type { ChatMessage } from '@/types';
import { sendMessageToServerAction } from './actions';
import { ChatLayout } from '@/components/chat/chat-layout';
import { ChatMessages } from '@/components/chat/chat-messages';
import { ChatInput } from '@/components/chat/chat-input';
import { useToast } from '@/hooks/use-toast';

export default function HomePage(): React.JSX.Element {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (userInput: string): Promise<void> => {
    if (!userInput.trim()) return;

    const newUserMessage: ChatMessage = {
      id: String(Date.now()),
      role: 'user',
      content: userInput,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      const result = await sendMessageToServerAction(userInput);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
        // Optionally remove the user's message or add an error message from assistant
        const assistantErrorMessage: ChatMessage = {
          id: String(Date.now() + 1),
          role: 'assistant',
          content: `Sorry, I couldn't process that: ${result.error}`,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, assistantErrorMessage]);

      } else if (result.data) {
        const assistantMessage: ChatMessage = {
          id: String(Date.now() + 1),
          role: 'assistant',
          content: result.data,
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
      });
       const assistantErrorMessage: ChatMessage = {
          id: String(Date.now() + 1),
          role: 'assistant',
          content: "I'm having trouble connecting. Please try again later.",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, assistantErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatLayout
      chatMessagesSlot={<ChatMessages messages={messages} isLoading={isLoading} />}
      chatInputSlot={<ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />}
    />
  );
}
