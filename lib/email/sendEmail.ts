// lib/email/sendEmail.ts
import { Resend } from 'resend';
import type { ReactElement } from 'react';
import env from '@/lib/env';

type SendEmailArgs = {
  to: string | string[];
  subject: string;
  from?: string;            // optional override
  react?: ReactElement;     // send as React email template
  html?: string;            // or send raw html/text
  text?: string;
};

export async function sendEmail({ to, subject, from, react, html, text }: SendEmailArgs) {
  if (!env.resend.apiKey) throw new Error('RESEND_API_KEY is not set');

  const sender = from || env.email.from;
  if (!sender) throw new Error('EMAIL_FROM is not set');

  const resend = new Resend(env.resend.apiKey);

  let result;

  if (react) {
    // Branch 1: React template
    result = await resend.emails.send({
      from: sender,
      to,
      subject,
      react, // <- satisfies the "react" branch of the union
    } as any);
  } else if (html || text) {
    // Branch 2: html/text body
    result = await resend.emails.send({
      from: sender,
      to,
      subject,
      ...(html ? { html } : {}),
      ...(text ? { text } : {}),
    } as any);
  } else {
    throw new Error('sendEmail requires either `react` or `html`/`text` content');
  }

  if ((result as any)?.error) {
    const message = (result as any).error?.message || 'Unknown Resend error';
    throw new Error(`Resend error: ${message}`);
  }

  return result;
}