import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui';

const HeroSection = () => {
  const { t } = useTranslation('common');

  return (
    <section
      className={[
        'relative isolate',
        'bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]',
      ].join(' ')}
    >
      <div className="mx-auto max-w-7xl px-6 py-28 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t('enterprise-saas-kit')}
          </h1>
          <p className="mt-6 text-lg leading-8 opacity-80">
            {t('kickstart-your-enterprise')}
          </p>

          <div className="mt-10 flex items-center justify-center gap-3">
            <Button asChild className="px-8" variant="brand">
              <Link href="/auth/join">{t('get-started')}</Link>
            </Button>
            <Button asChild variant="outline" className="px-8">
              <Link href="https://github.com/boxyhq/saas-starter-kit" target="_blank" rel="noreferrer">
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Subtle top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[rgb(var(--color-border))]" />
    </section>
  );
};

export default HeroSection;