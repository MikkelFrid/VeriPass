import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { Loader2 } from 'lucide-react';
import { Button, Input } from '@/components/ui';

import type { ApiResponse } from 'types';
import { Card } from '@/components/shared';
import { defaultHeaders } from '@/lib/common';
import type { User } from '@prisma/client';
import { updateAccountSchema } from '@/lib/zod';

interface UpdateEmailProps {
  user: Partial<User>;
  allowEmailChange: boolean;
}

const UpdateEmail = ({ user, allowEmailChange }: UpdateEmailProps) => {
  const { t } = useTranslation('common');

  const formik = useFormik({
    initialValues: {
      email: user.email,
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

      toast.success(t('successfully-updated'));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <Card.Body>
          <Card.Header>
            <Card.Title>{t('email-address')}</Card.Title>
            <Card.Description>
              {t('email-address-description')}
            </Card.Description>
          </Card.Header>
          <Input
            type="email"
            name="email"
            placeholder={t('your-email')}
            value={formik.values.email}
            onChange={formik.handleChange}
            className="w-full max-w-md"
            required
            disabled={!allowEmailChange}
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

export default UpdateEmail;
