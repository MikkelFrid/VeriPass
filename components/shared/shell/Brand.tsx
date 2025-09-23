'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSidebar } from '@/lib/components/ui/sidebar';

export default function Brand() {
  const { open } = useSidebar();

  return (
    <Link href="/" className="inline-flex items-center justify-center">
      {open ? (
        <Image
          src="/brand/veripass-wordmark.svg"
          alt="VeriPass"
          width={112}
          height={20}
          priority
          className="h-5 w-auto"
        />
      ) : (
        <Image
          src="/brand/veripass-mark.svg"
          alt="VeriPass"
          width={28}
          height={28}
          priority
          className="h-7 w-7"
        />
      )}
    </Link>
  );
}