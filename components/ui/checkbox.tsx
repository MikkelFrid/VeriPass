import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={twMerge(
        'h-4 w-4 rounded border border-[rgb(var(--color-border))] accent-[rgb(var(--color-brand))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]',
        className
      )}
      {...props}
    />
  )
);
Checkbox.displayName = 'Checkbox';
