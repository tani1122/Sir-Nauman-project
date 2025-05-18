import type React from 'react';
import { AppLogo } from '@/components/icons/logo';

interface ChatLayoutProps {
  chatMessagesSlot: React.ReactNode;
  chatInputSlot: React.ReactNode;
}

export function ChatLayout({ chatMessagesSlot, chatInputSlot }: ChatLayoutProps): React.JSX.Element {
  return (
    <div className="flex flex-col h-screen max-h-screen bg-background overflow-hidden">
      <header className="flex items-center justify-between p-4 border-b shadow-sm">
        <AppLogo />
        {/* Future: User profile / settings icon can go here */}
      </header>
      <main className="flex-1 overflow-y-auto">
        {chatMessagesSlot}
      </main>
      <div className="shrink-0">
       {chatInputSlot}
      </div>
    </div>
  );
}
