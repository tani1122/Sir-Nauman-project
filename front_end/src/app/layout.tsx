import type { Metadata } from 'next';
// import { GeistSans } from 'geist/font/sans'; // Removed this line
// import { GeistMono } from 'geist/font/mono'; // Removed this line
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// const geistSans = GeistSans; // Removed this line
// const geistMono = GeistMono; // Removed this line

export const metadata: Metadata = {
  title: 'API Chat Buddy',
  description: 'Chat with an AI assistant powered by an external API.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased font-sans`} suppressHydrationWarning={true}> {/* Removed geistSans.variable */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
