import { MessageSquare } from 'lucide-react';
import type React from 'react';

export function AppLogo({ className }: { className?: string }): React.JSX.Element {
  return (
    <div className={`flex items-center gap-2 text-xl font-semibold text-primary ${className}`}>
      <MessageSquare className="h-7 w-7" />
      <span>API Chat Buddy</span>
    </div>
  );
}
