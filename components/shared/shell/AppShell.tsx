'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/components/shared';

import Header from './Header';
import AppSidebar from './AppSidebar';

import { SidebarProvider, SidebarInset } from '@/lib/components/ui/sidebar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth/login');
  }, [status, router]);

  if (status === 'loading') return <Loading />;
  if (status === 'unauthenticated') return null;

  return (
    <SidebarProvider defaultOpen>
      {/* Push-style sidebar */}
      <AppSidebar />
      {/* This region auto-adds the correct left offset based on sidebar state */}
      <div data-probe="inside-provider" />
      <SidebarInset>
        <Header />
        <main className="py-5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
