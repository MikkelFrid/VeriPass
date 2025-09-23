// components/shared/Badge.tsx
import * as React from 'react';
import clsx from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
}

export function Badge({
  variant = 'secondary',
  className,
  children,
  ...rest
}: BadgeProps) {
  const styles: Record<Required<BadgeProps>['variant'], string> = {
    default: 'bg-[rgb(var(--color-foreground))] text-white dark:text-black',
    secondary:
      'bg-[rgb(var(--color-muted))] text-[rgb(var(--color-foreground))]',
    outline:
      'border border-[rgb(var(--color-border))] text-[rgb(var(--color-foreground))] bg-transparent',
    destructive: 'bg-red-600 text-white',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        styles[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export default Badge;
