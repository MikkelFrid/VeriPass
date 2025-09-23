// pages/_app.tsx
import app from '@/lib/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import type { AppPropsWithLayout } from 'types';
import mixpanel from 'mixpanel-browser';

import '../styles/globals.css';
import { useEffect } from 'react';
import env from '@/lib/env';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { session, ...props } = pageProps;

  useEffect(() => {
    if (env.mixpanel.token) {
      mixpanel.init(env.mixpanel.token, {
        debug: true,
        ignore_dnt: true,
        track_pageview: true,
      });
    }

    if (env.darkModeEnabled) {
      const stored = localStorage.getItem('theme');
      const isDark = stored === 'dark';

      const html = document.documentElement;
      html.classList.toggle('dark', isDark); // still useful for Tailwind's `dark:` variants
    }
  }, []);

  const getLayout =
    Component.getLayout || ((page) => <>{page}</>);

  return (
    <>
      <Head>
        <title>{app.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Toaster toastOptions={{ duration: 4000 }} />
        {getLayout(<Component {...props} />)}
      </SessionProvider>
    </>
  );
}

export default appWithTranslation<never>(MyApp);