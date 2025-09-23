'use client';

import { useSidebar } from '@/lib/components/ui/sidebar'; // context only
import { cn } from '@/lib/lib/utils';
import * as React from 'react';

type StickySidebarProps = React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
};

/**
 * Sticky, non-overlay desktop sidebar that participates in layout.
 * Uses the same data-* attributes as the lib component so all child
 * building blocks keep working (content/header/footer/rail).
 */
export default function StickySidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: StickySidebarProps) {
  const { state, isMobile } = useSidebar();

  // Mobile: delegate to the stock sidebar via a simple Sheet-like portal.
  // Keep overlay behavior on mobile (unchanged from the lib).
  if (isMobile) {
    // If you prefer, you can import the lib's <Sheet> and render children inside.
    // But simplest is to keep your existing mobile usage of the lib Sidebar.
    // In this project, <AppSidebar> is desktop-only, so we can just hide it on mobile.
    return null;
  }

  return (
    <div
      className="group peer hidden text-sidebar-foreground md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
    >
      {/* Single sticky panel (no fixed/z-index overlay) */}
      <div
        className={cn(
          'sticky top-0 h-svh transition-[width] duration-200 ease-linear',
          'w-[--sidebar-width]',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))] p-2'
            : 'group-data-[collapsible=icon]:w-[--sidebar-width-icon]',
          side === 'left' && variant === 'sidebar' ? 'border-r' : '',
          side === 'right' && variant === 'sidebar' ? 'border-l' : '',
          className
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className={cn(
            'flex h-full w-full flex-col bg-sidebar',
            variant === 'floating' &&
              'rounded-lg border border-sidebar-border shadow'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
