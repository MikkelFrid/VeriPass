// lib/email/sendEmail.ts
import env from '@/lib/env';
import type { ReactElement } from 'react';
import { Resend } from 'resend';

type SendEmailArgs = {
  to: string | string[];
  subject: string;
  from?: string;
  react?: ReactElement;
  html?: string;
  text?: string;
};

export async function sendEmail({
  to,
  subject,
  from,
  react,
  html,
  text,
}: SendEmailArgs) {
  console.log('[sendEmail] called', {
    to,
    subject,
    from,
    nodeEnv: process.env.NODE_ENV,
    EMAIL_FROM: env.email.from,
    EMAIL_FROM_DEV: process.env.EMAIL_FROM_DEV,
  });
  if (!env.resend.apiKey) throw new Error('RESEND_API_KEY is not set');

  const isProd = process.env.NODE_ENV === 'production';
  const devSender =
    process.env.EMAIL_FROM_DEV || 'VeriPass <onboarding@resend.dev>';
  const sender = from || (isProd ? env.email.from : devSender);
  if (!sender) throw new Error('EMAIL_FROM is not set');

  // Optional ultra-verbose HTTP logging (see step 2)
  const debugHttp = process.env.RESEND_DEBUG === '1';
  const resend = new Resend(
    env.resend.apiKey,
    debugHttp
      ? {
          fetch: async (url, options) => {
            // Very noisy but useful when debugging
            console.log('[Resend] → Request', url, {
              method: options?.method,
              headers: options?.headers,
              body: options?.body,
            });
            const res = await fetch(url, options);
            const text = await res.text();
            console.log('[Resend] ← Response', res.status, text);
            return new Response(text, { status: res.status });
          },
        }
      : undefined
  );

  try {
    if (!isProd) {
      console.log('[Resend] Sending email', {
        from: sender,
        to,
        subject,
        kind: react ? 'react' : html ? 'html' : text ? 'text' : 'unknown',
      });
    }

    let result;
    if (react) {
      result = await resend.emails.send({
        from: sender,
        to,
        subject,
        react,
      } as any);
    } else if (html || text) {
      result = await resend.emails.send({
        from: sender,
        to,
        subject,
        ...(html ? { html } : {}),
        ...(text ? { text } : {}),
      } as any);
    } else {
      throw new Error(
        'sendEmail requires either `react` or `html`/`text` content'
      );
    }

    if ((result as any)?.error) {
      const message = (result as any).error?.message || 'Unknown Resend error';
      throw new Error(`Resend error: ${message}`);
    }

    if (!isProd) {
      console.log('[Resend] Success', JSON.stringify(result, null, 2));
    }
    return result;
  } catch (err: any) {
    console.error(
      '[Resend] Error',
      JSON.stringify(
        {
          name: err?.name,
          message: err?.message,
          statusCode: err?.statusCode,
          cause: err?.cause,
          stack: err?.stack,
        },
        null,
        2
      )
    );
    throw err;
  }
}
