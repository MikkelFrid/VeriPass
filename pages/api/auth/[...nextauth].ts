import { getAuthOptions } from '@/lib/nextAuth';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  console.log('[NextAuth API] hit', req.method, req.query);

  const authOptions = getAuthOptions(req, res);

  try {
    const ids = (authOptions.providers || []).map((p: any) => p.id);
    console.log('[NextAuth API] providers:', ids);

    // 👇 prove we’re using the Email provider instance with our override
    const email = (authOptions.providers || []).find(
      (p: any) => p.id === 'email'
    );
    console.log(
      '[NextAuth API] email.sendVerificationRequest exists:',
      typeof email?.options?.sendVerificationRequest === 'function'
    );
  } catch (e) {
    console.error('[NextAuth API] provider introspection error', e);
  }

  return await NextAuth(req, res, authOptions);
}
