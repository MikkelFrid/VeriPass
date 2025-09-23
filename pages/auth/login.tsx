import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Status } from '@/components/ui/types';
import { useFormik } from 'formik';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { type ReactElement, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

import AgreeMessage from '@/components/auth/AgreeMessage';
import GithubButton from '@/components/auth/GithubButton';
import GoogleButton from '@/components/auth/GoogleButton';
import { AuthLayout } from '@/components/layouts';
import { Alert, Loading } from '@/components/shared';
import GoogleReCAPTCHA from '@/components/shared/GoogleReCAPTCHA';
import TogglePasswordVisibility from '@/components/shared/TogglePasswordVisibility';
import { authProviderEnabled } from '@/lib/auth';
import { maxLengthPolicies } from '@/lib/common';
import env from '@/lib/env';
import Head from 'next/head';
import ReCAPTCHA from 'react-google-recaptcha';
import type { NextPageWithLayout } from 'types';

interface Message {
  text: string | null;
  status: Status | null;
}

const FieldError: React.FC<{ error?: string }> = ({ error }) =>
  error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null;

const Divider: React.FC<{ label?: string }> = ({ label }) => (
  <div className="relative my-6">
    <div className="h-px w-full bg-border" />
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="rounded bg-background px-2 text-xs text-muted-foreground">
        {label}
      </span>
    </div>
  </div>
);

const Login: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ csrfToken, authProviders, recaptchaSiteKey }) => {
  const router = useRouter();
  const { status } = useSession();
  const { t } = useTranslation('common');
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [message, setMessage] = useState<Message>({ text: null, status: null });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const { error, success, token } = router.query as {
    error?: string;
    success?: string;
    token?: string;
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    if (error) setMessage({ text: error, status: 'error' });
    if (success) setMessage({ text: success, status: 'success' });
  }, [error, success]);

  const redirectUrl = token
    ? `/invitations/${token}`
    : env.redirectIfAuthenticated;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email().max(maxLengthPolicies.email),
      password: Yup.string().required().max(maxLengthPolicies.password),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      setMessage({ text: null, status: null });

      const response = await signIn('credentials', {
        email,
        password,
        csrfToken,
        redirect: false,
        callbackUrl: redirectUrl,
        recaptchaToken,
      });

      formik.setSubmitting(false);
      recaptchaRef.current?.reset();

      if (response && !response.ok) {
        setMessage({
          text: response.error ?? 'unknown-error',
          status: 'error',
        });
        return;
      }
    },
  });

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'authenticated') {
    void router.push(redirectUrl);
  }

  const params = token ? `?token=${token}` : '';

  return (
    <>
      <Head>
        <title>{t('login-title')}</title>
      </Head>

      {message.text && message.status && (
        <Alert status={message.status} className="mb-5">
          {t(message.text)}
        </Alert>
      )}

      <div className="mx-auto w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        {/* OAuth providers */}
        {(authProviders.github || authProviders.google) && (
          <div className="flex flex-col gap-2 sm:flex-row">
            {authProviders.github && <GithubButton className="flex-1" />}
            {authProviders.google && <GoogleButton className="flex-1" />}
          </div>
        )}

        {(authProviders.github || authProviders.google) &&
          authProviders.credentials && <Divider label={t('or')} />}

        {/* Credentials form */}
        {authProviders.credentials && (
          <form onSubmit={formik.handleSubmit} noValidate>
            <div className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={t('email')}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={
                    formik.touched.email && formik.errors.email
                      ? 'true'
                      : 'false'
                  }
                  aria-describedby={
                    formik.touched.email && formik.errors.email
                      ? 'email-error'
                      : undefined
                  }
                />
                <FieldError
                  error={
                    formik.touched.email
                      ? (formik.errors.email as string)
                      : undefined
                  }
                />
              </div>

              {/* Password + forgot */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <Label htmlFor="password">{t('password')}</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-brand hover:underline"
                  >
                    {t('forgot-password')}
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    name="password"
                    placeholder={t('password')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    aria-invalid={
                      formik.touched.password && formik.errors.password
                        ? 'true'
                        : 'false'
                    }
                    aria-describedby={
                      formik.touched.password && formik.errors.password
                        ? 'password-error'
                        : undefined
                    }
                  />
                  <TogglePasswordVisibility
                    isPasswordVisible={isPasswordVisible}
                    handlePasswordVisibility={handlePasswordVisibility}
                  />
                </div>

                <FieldError
                  error={
                    formik.touched.password
                      ? (formik.errors.password as string)
                      : undefined
                  }
                />
              </div>

              {/* reCAPTCHA */}
              <GoogleReCAPTCHA
                recaptchaRef={recaptchaRef}
                onChange={setRecaptchaToken}
                siteKey={recaptchaSiteKey}
              />
            </div>

            <div className="mt-4 space-y-3">
              <Button
                type="submit"
                className="w-full"
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
              >
                {t('sign-in')}
              </Button>
              <AgreeMessage text={t('sign-in')} />
            </div>
          </form>
        )}

        {(authProviders.email || authProviders.saml) && (
          <Divider label={t('or')} />
        )}

        {/* Magic link & SAML */}
        <div className="space-y-2">
          {authProviders.email && (
            <Button asChild variant="outline" className="w-full">
              <Link href={`/auth/magic-link${params}`}>
                {t('sign-in-with-email')}
              </Link>
            </Button>
          )}
          {authProviders.saml && (
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/sso">{t('continue-with-saml-sso')}</Link>
            </Button>
          )}
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-muted-foreground">
        {t('dont-have-an-account')}
        <Link
          href={`/auth/join${params}`}
          className="font-medium text-brand hover:underline"
        >
          &nbsp;{t('create-a-free-account')}
        </Link>
      </p>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout heading="welcome-back" description="log-in-to-account">
      {page}
    </AuthLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      csrfToken: await getCsrfToken(context),
      authProviders: authProviderEnabled(),
      recaptchaSiteKey: env.recaptcha.siteKey,
    },
  };
};

export default Login;
