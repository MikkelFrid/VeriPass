// components/shared/Alert.tsx
import * as React from 'react';
import clsx from 'clsx';
import type { Status } from '@/components/ui/types';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  status?: Status; // 'success' | 'error' | 'warning' | 'info'
}

const tone = {
  success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
  error:
    'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200',
  warning:
    'bg-yellow-50 border-yellow-200 text-yellow-900 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-100',
  info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
};

export function Alert({ status = 'info', className, children, ...rest }: AlertProps) {
  return (
    <div
      role="alert"
      className={clsx(
        'w-full rounded-[calc(var(--radius)*0.75)] border px-3 py-2 text-sm',
        tone[status],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Alert;
