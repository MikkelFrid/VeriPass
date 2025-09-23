import app from '@/lib/app';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  heading?: string;
  description?: string;
}

export default function AuthLayout({
  children,
  heading,
  description,
}: AuthLayoutProps) {
  const { t } = useTranslation('common');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Logo + Title */}
        <div className="flex flex-col items-center text-center space-y-2">
          <Image
            src={app.logoUrl}
            alt={app.name}
            width={56}
            height={56}
            className="h-14 w-14"
            priority
          />
          {heading && (
            <h2 className="text-2xl font-semibold tracking-tight">
              {t(heading)}
            </h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground max-w-sm">
              {t(description)}
            </p>
          )}
        </div>

        {/* Auth Card */}
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
