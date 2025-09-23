// app/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl py-24 px-6 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">
        VeriPass ProductLink
      </h1>
      <p className="mt-3 text-muted-foreground">
        App Router scaffold is ready. We’ll migrate the landing here next.
      </p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button asChild variant="brand" size="md">
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button asChild variant="secondary" size="md">
          <Link href="/auth/login">Sign in</Link>
        </Button>
      </div>
    </main>
  );
}
