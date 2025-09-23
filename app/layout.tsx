// app/layout.tsx
import '../styles/globals.css'; // keep using your Tailwind v4 tokens
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'VeriPass ProductLink',
  description: 'Digital Product Passport for SMEs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
