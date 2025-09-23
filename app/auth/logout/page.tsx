'use client';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function LogoutPage() {
  useEffect(() => {
    signOut({ callbackUrl: '/auth/login' });
  }, []);
  return (
    <div className="mx-auto max-w-sm pt-20 text-center">
      <p className="text-sm text-muted-foreground">Signing you out…</p>
    </div>
  );
}
