import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { Loader2 } from 'lucide-react';
import { Button, Input } from '@/components/ui';

import type { ApiResponse } from 'types';
import { Card } from '@/components/shared';
import { defaultHeaders } from '@/lib/common';
import { User } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { updateAccountSchema } from '@/lib/zod';

const UpdateName = ({ user }: { user: Partial<User> }) => {
  const { t } = useTranslation('common');
  const { update } = useSession();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: user.name,
    },
    validateOnBlur: false,
    enableReinitialize: true,
    validate: (values) => {
      try {
        updateAccountSchema.parse(values);
      } catch (error: any) {
        return error.formErrors.fieldErrors;
      }
    },
    onSubmit: async (values) => {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const json = (await response.json()) as ApiResponse;
        toast.error(json.error.message);
        return;
      }

      await update({
        name: values.name,
      });

      router.replace('/settings/account');
      toast.success(t('successfully-updated'));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <Card.Body>
          <Card.Header>
            <Card.Title>{t('name')}</Card.Title>
            <Card.Description>{t('name-appearance')}</Card.Description>
          </Card.Header>
          <Input
            type="text"
            name="name"
            placeholder={t('your-name')}
            value={formik.values.name}
            onChange={formik.handleChange}
            className="w-full max-w-md"
            required
          />
        </Card.Body>
        <Card.Footer>
          <Button
            type="submit"
            disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
            size="default"
          >
            {formik.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {t('save-changes')}
          </Button>
        </Card.Footer>
      </Card>
    </form>
  );
};

export default UpdateName;
