import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { Invitation } from '@prisma/client';

interface NotAuthenticatedProps {
  invitation: Invitation;
}

const NotAuthenticated = ({ invitation }: NotAuthenticatedProps) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  return (
    <>
      <h3 className="text-center">{t('invite-create-account')}</h3>
      <Button
        variant="outline"
        onClick={() => {
          router.push(`/auth/join?token=${invitation.token}`);
        }}
        className="w-full"
      >
        {t('create-a-new-account')}
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          router.push(`/auth/login?token=${invitation.token}`);
        }}
        className="w-full"
      >
        {t('login')}
      </Button>
    </>
  );
};

export default NotAuthenticated;
