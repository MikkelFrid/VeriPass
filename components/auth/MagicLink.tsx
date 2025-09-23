import { InputWithLabel, Loading } from '@/components/shared';
import { maxLengthPolicies } from '@/lib/common';
import env from '@/lib/env';
import { useFormik } from 'formik';
import useInvitation from 'hooks/useInvitation';
import { signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

interface MagicLinkProps {
  csrfToken: string | undefined;
}

const MagicLink = ({ csrfToken }: MagicLinkProps) => {
  const router = useRouter();
  const { status } = useSession();
  const { t } = useTranslation('common');
  const { invitation } = useInvitation();

  const params = invitation ? `?token=${invitation.token}` : '';

  const callbackUrl = invitation
    ? `/invitations/${invitation.token}`
    : env.redirectIfAuthenticated;

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email().max(maxLengthPolicies.email),
    }),
    onSubmit: async (values) => {
      const response = await signIn('email', {
        email: values.email,
        csrfToken,
        redirect: false,
        callbackUrl,
      });

      formik.resetForm();

      if (response?.error) {
        toast.error(t('email-login-error'));
        return;
      }

      if (response?.status === 200 && response?.ok) {
        toast.success(t('email-login-success'));
        return;
      }
    },
  });

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    router.push(env.redirectIfAuthenticated);
  }

  return (
    <>
      <Head>
        <title>{t('magic-link-title')}</title>
      </Head>
      <div className="rounded p-6 border">
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <InputWithLabel
              type="email"
              label="Email"
              name="email"
              placeholder="jackson@boxyhq.com"
              value={formik.values.email}
              descriptionText="We’ll email you a magic link for a password-free sign in."
              error={formik.touched.email ? formik.errors.email : undefined}
              onChange={formik.handleChange}
            />
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full"
              isLoading={formik.isSubmitting}
            >
              {t('send-magic-link')}
            </Button>
          </div>
        </form>
        <div className="my-4 border-t" />
        <div className="space-y-3">
          <Button asChild variant="outline" size="md" className="w-full">
            <Link href={`/auth/login${params}`}>
              {t('sign-in-with-password')}
            </Link>
          </Button>
          {/* SSO temporarily disabled; route removed in cleanup. Re-enable when SSO is configured. */}
        </div>
      </div>
      <p className="text-center text-sm text-gray-600 mt-3">
        {t('dont-have-an-account')}
        <Link
          href={`/auth/join${params}`}
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          &nbsp;{t('create-a-free-account')}
        </Link>
      </p>
    </>
  );
};

export default MagicLink;
