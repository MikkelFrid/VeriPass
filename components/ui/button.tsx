'use client';

import { cn } from '@/lib/lib/utils'; // adjust path if needed
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium shadow-sm ring-1 ring-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:pointer-events-none active:translate-y-px data-[state=open]:bg-muted [&_*]:text-inherit',
  {
    variants: {
      variant: {
        brand: 'bg-brand text-white hover:bg-brand/90 focus-visible:ring-brand',
        primary:
          'bg-brand text-white hover:bg-brand/90 focus-visible:ring-brand',
        secondary:
          'bg-muted text-muted-foreground hover:bg-muted/80 focus-visible:ring-muted',
        outline:
          'bg-transparent text-foreground border border-border hover:bg-muted/60',
        ghost: 'bg-transparent text-foreground hover:bg-muted/60',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive',
        link: 'bg-transparent underline underline-offset-4 text-foreground hover:no-underline',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4 py-2 text-sm',
        lg: 'h-11 px-6 text-base',
        icon: 'h-10 w-10',
      },
      block: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [{ variant: 'outline', size: 'icon', class: 'p-0' }],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      block: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      block,
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...rest
    },
    ref
  ) => {
    const merged = cn(buttonVariants({ variant, size, block }), className);

    // If asChild and we have exactly one valid React element, clone it.
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn((children as any).props?.className, merged),
        'data-variant': variant,
        'data-size': size,
        'aria-busy': isLoading ? 'true' : undefined,
        'aria-disabled': disabled || isLoading ? true : undefined,
        'data-loading': isLoading ? '' : undefined,
        // Merge onClick behaviour safely
        onClick: (e: any) => {
          if (disabled || isLoading) {
            e.preventDefault();
            return;
          }
          (children as any).props?.onClick?.(e);
          (rest as any).onClick?.(e);
        },
        // Keep child ref if present; React will warn if incompatible types; acceptable for anchors/links.
        ref: (children as any).ref ?? (ref as any),
        // Prepend loader to child content
        children: (
          <>
            {isLoading && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin text-current"
                aria-hidden="true"
              />
            )}
            {(children as any).props?.children ?? null}
          </>
        ),
        ...rest,
      });
    }

    // Fallback: render a real <button>
    return (
      <button
        ref={ref}
        className={merged}
        data-variant={variant}
        data-size={size}
        aria-busy={isLoading ? 'true' : undefined}
        aria-disabled={disabled || isLoading || undefined}
        data-loading={isLoading ? '' : undefined}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading && (
          <Loader2
            className="mr-2 h-4 w-4 animate-spin text-current"
            aria-hidden="true"
          />
        )}
        {children as React.ReactNode}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
export default Button;
