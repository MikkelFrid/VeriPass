import Link from 'next/link';
import { type ReactElement } from 'react';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout } from 'types';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import FAQSection from '@/components/defaultLanding/FAQSection';
import HeroSection from '@/components/defaultLanding/HeroSection';
import FeatureSection from '@/components/defaultLanding/FeatureSection';
import PricingSection from '@/components/defaultLanding/PricingSection';
import useTheme from 'hooks/useTheme';
import env from '@/lib/env';
import Head from 'next/head';
import { Button } from '@/components/ui/button';

const Home: NextPageWithLayout = () => {
  const { toggleTheme, selectedTheme } = useTheme();
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>{t('homepage-title')}</title>
      </Head>

      <div className="container mx-auto">
        {/* Header / Navbar (no Daisy) */}
        <header className="flex items-center justify-between py-3 px-0 sm:px-1">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold no-underline">
              VeryPass
            </Link>
          </div>
          <nav className="flex items-center gap-2 sm:gap-4">
            {env.darkModeEnabled && (
              <button
                type="button"
                aria-label="Toggle theme"
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] hover:bg-[rgb(var(--color-muted))]"
                onClick={toggleTheme}
              >
                {selectedTheme?.icon ? (
                  <selectedTheme.icon className="w-5 h-5" />
                ) : null}
              </button>
            )}
            <Button asChild>
              <Link href="/auth/join">{t('sign-up')}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/auth/login">{t('sign-in')}</Link>
            </Button>
          </nav>
        </header>

        <HeroSection />
        <div className="divider"></div>
        <FeatureSection />
        <div className="divider"></div>
        <PricingSection />
        <div className="divider"></div>
        <FAQSection />
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Redirect to login page if landing page is disabled
  if (env.hideLandingPage) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: true,
      },
    };
  }

  const { locale } = context;

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
