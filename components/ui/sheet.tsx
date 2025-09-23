'use client';

import { Button } from '@/components/ui/button';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-[rgb(var(--color-background))] p-6 shadow-lg transition ease-in-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b border-[rgb(var(--color-border))]',
        bottom: 'inset-x-0 bottom-0 border-t border-[rgb(var(--color-border))]',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r border-[rgb(var(--color-border))] sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l border-[rgb(var(--color-border))] sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

export const Sheet = DialogPrimitive.Root;

export const SheetTrigger = DialogPrimitive.Trigger;

export const SheetClose = DialogPrimitive.Close;

export interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
    <DialogPrimitive.Content
      ref={ref}
      className={twMerge(sheetVariants({ side }), className)}
      {...props}
    >
      {children as React.ReactNode}
      <DialogPrimitive.Close asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          aria-label="Close"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </Button>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = 'SheetContent';
