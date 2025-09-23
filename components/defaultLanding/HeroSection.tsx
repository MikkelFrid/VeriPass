import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui';

const HeroSection = () => {
  const { t } = useTranslation('common');
  return (
    <div className="hero py-52">
      <div className="hero-content text-center">
        <div className="max-w-7xl">
          <h1 className="text-5xl font-bold"> {t('enterprise-saas-kit')}</h1>
          <p className="py-6 text-2xl font-normal">
            {t('kickstart-your-enterprise')}
          </p>
          <div className="flex items-center justify-center gap-2 ">
            <Button asChild className="px-8">
              <Link href="/auth/join">{t('get-started')}</Link>
            </Button>
            <Button asChild variant="outline" className="px-8">
              <Link href="https://github.com/boxyhq/saas-starter-kit">GitHub</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;