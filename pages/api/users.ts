import { isEmailAllowed } from '@/lib/email/utils';
import env from '@/lib/env';
import { ApiError } from '@/lib/errors';
import { recordMetric } from '@/lib/metrics';
import { updateAccountSchema, validateWithSchema } from '@/lib/zod';
import { getUser, updateUser } from 'models/user';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET': {
        // Pre-check: /api/users?exists=1&email=foo@bar.com
        if ('exists' in req.query) {
          const email = String(req.query.email || '').trim();

          if (!email) {
            return res
              .status(400)
              .json({ error: { message: 'email is required' } });
          }

          const user = await getUser({ email });

          // No caching; we want fresh truth
          res.setHeader('Cache-Control', 'no-store');
          return res.status(200).json({ ok: true, exists: Boolean(user) });
        }

        // Unknown GET mode
        res.setHeader('Allow', 'GET, PUT');
        return res
          .status(400)
          .json({ error: { message: 'Unsupported GET query' } });
      }

      case 'PUT': {
        await handlePUT(req, res);
        break;
      }

      default:
        res.setHeader('Allow', 'GET, PUT');
        res
          .status(405)
          .json({ error: { message: `Method ${req.method} Not Allowed` } });
    }
  } catch (error: any) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;
    res.status(status).json({ error: { message } });
  }
}

import { getSession } from '@/lib/session';

const handlePUT = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = validateWithSchema(updateAccountSchema, req.body);

  const session = await getSession(req, res);

  if ('email' in data) {
    const allowEmailChange = env.confirmEmail === false;

    if (!allowEmailChange) {
      throw new ApiError(400, 'Email change is not allowed.');
    }

    if (!isEmailAllowed(data.email)) {
      throw new ApiError(400, 'Please use your work email.');
    }

    const user = await getUser({ email: data.email });

    if (user && user.id !== session?.user.id) {
      throw new ApiError(400, 'Email already in use.');
    }
  }

  await updateUser({
    where: { id: session?.user.id },
    data,
  });

  recordMetric('user.updated');

  res.status(204).end();
};
