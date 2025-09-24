import MagicLink from '@/components/emailTemplates/MagicLink';
import app from '../app';
import { sendEmail } from './sendEmail';

export const sendMagicLink = async (email: string, url: string) => {
  const subject = `Sign in to ${app.name}`;

  console.log('[MagicLink] Preparing email', { to: email, subject, url });

  try {
    const res = await sendEmail({
      to: email,
      subject,
      react: MagicLink({ url, subject }),
    });
    console.log('[MagicLink] sendEmail success', JSON.stringify(res, null, 2));
    return res;
  } catch (err: any) {
    console.error(
      '[MagicLink] sendEmail error',
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
};
