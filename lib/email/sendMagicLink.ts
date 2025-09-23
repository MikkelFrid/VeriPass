// lib/email/sendMagicLink.ts
import { sendEmail } from './sendEmail';
import app from '../app';
import MagicLink from '@/components/emailTemplates/MagicLink';

export const sendMagicLink = async (email: string, url: string) => {
  const subject = `Sign in to ${app.name}`;
  await sendEmail({
    to: email,
    subject,
    react: MagicLink({ url, subject }), // Resend will render this
  });
};
