import { InputWithLabel, Loading } from '@/components/shared';
import { Button } from '@/components/ui/button';
import { maxLengthPolicies } from '@/lib/common';
import env from '@/lib/env';
import { useFormik } from 'formik';
import useInvitation from 'hooks/useInvitation';
import { signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    initialValues: { email: '' },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email().max(maxLengthPolicies.email),
    }),
    onSubmit: async (values) => {
      try {
        // 1) Pre-check: does the user exist?
        const existsRes = await fetch(
          `/api/users?exists=1&email=${encodeURIComponent(values.email)}`,
          { method: 'GET', headers: { 'Content-Type': 'application/json' } }
        );

        if (!existsRes.ok) {
          console.log(
            '[MagicLink:UI] /api/users?exists failed',
            existsRes.status
          );
          toast.error(t('email-login-error'));
          return;
        }

        const { exists } = await existsRes.json();

        if (!exists) {
          toast.error(
            t('email-login-no-user') ||
              'No account found for this email. Please sign up first.'
          );
          return;
        }

        // 2) If user exists, proceed with NextAuth magic link
        const response = await signIn('email', {
          email: values.email,
          csrfToken,
          redirect: false,
          callbackUrl,
        });

        console.log('[MagicLink:UI] signIn response', response);

        if (response?.error) {
          switch (response.error) {
            case 'Configuration':
              toast.error(
                t('email-login-config') ||
                  'Email auth is not configured correctly.'
              );
              break;
            case 'AccessDenied':
              toast.error(
                t('email-login-access-denied') ||
                  'Access denied for this email.'
              );
              break;
            default:
              console.log(
                '[MagicLink:UI] unhandled signIn error',
                response.error,
                response
              );
              toast.error(t('email-login-error'));
              break;
          }
          return;
        }

        if (response?.ok) {
          toast.success(
            t('email-login-success') || 'Check your inbox for the sign-in link.'
          );
          return;
        }

        toast.error(t('email-login-error'));
      } finally {
        formik.resetForm();
      }
    },
  });

  if (status === 'loading') return <Loading />;
  if (status === 'authenticated') router.push(env.redirectIfAuthenticated);

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
