// pages/api/debug/send-test-email.ts
import { sendEmail } from '@/lib/email/sendEmail';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  try {
    const to =
      (req.body?.to as string) ||
      (typeof req.body === 'string'
        ? (new URLSearchParams(req.body).get('to') ?? '')
        : '');

    if (!to) return res.status(400).json({ error: '`to` is required' });

    console.log('[DebugEmail] calling sendEmail', { to });

    const result = await sendEmail({
      to,
      subject: 'VeriPass test email',
      text: 'This is a test email from /api/debug/send-test-email.',
    });

    console.log(
      '[DebugEmail] sendEmail result',
      JSON.stringify(result, null, 2)
    );
    return res.status(200).json({ ok: true, result });
  } catch (err: any) {
    console.error(
      '[DebugEmail] sendEmail error',
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
    return res.status(500).json({ error: err?.message || 'Unknown error' });
  }
}
