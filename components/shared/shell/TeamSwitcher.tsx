'use client';

import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Building2,
  Check,
  Plus,
  ChevronDown as ChevronDownIcon,
  Command,
  Layers,
  UserRound as UserCircle,
} from 'lucide-react';

import useTeams from 'hooks/useTeams';
import useTeam from 'hooks/useTeam';
import { maxLengthPolicies } from '@/lib/common';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/lib/components/ui/sidebar';

type Team = {
  id: string;
  name: string | null;
  slug: string;
};

export default function TeamSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const { teams, isLoading } = useTeams();
  const { team: current } = useTeam();
  const { state } = useSidebar();

  const items = (teams || []) as Team[];
  const currentTeam =
    items.find((t) => t.slug === (router.query.slug as string)) || (current as Team | undefined);

  const label =
    currentTeam?.name ??
    (router?.query?.slug as string) ??
    ''.substring(0, maxLengthPolicies.nameShortDisplay);

  // Popover width adapts: anchor width when expanded; fixed width when collapsed.
  const contentWidth =
    state === 'collapsed' ? 'w-[22rem]' : 'w-[--radix-popper-anchor-width] max-w-[28rem]';

  // Trigger styles: full button expanded; compact icon when collapsed
  const triggerExpanded =
    'w-full rounded-xl border border-[rgb(var(--sidebar-border))] bg-[rgb(var(--sidebar-background))] px-3 py-2.5 text-left shadow-sm hover:bg-[rgb(var(--sidebar-accent))] transition-colors flex items-center gap-3';
  const triggerCollapsed =
    'size-10 rounded-lg border border-[rgb(var(--sidebar-border))] bg-[rgb(var(--sidebar-background))] grid place-items-center hover:bg-[rgb(var(--sidebar-accent))]';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(state === 'collapsed' ? triggerCollapsed : triggerExpanded, className)}
          aria-label="Select team"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
            <Building2 className="h-4 w-4" />
          </span>

          {state !== 'collapsed' && (
            <>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium">
                  {isLoading ? 'Loading…' : label || 'Select team'}
                </span>
                <span className="block text-xs text-sidebar-foreground/60">Team</span>
              </span>
              <ChevronDownIcon className="h-4 w-4 opacity-60" aria-hidden="true" />
            </>
          )}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={8}
          className={cn(
            'z-50 rounded-2xl border border-[rgb(var(--sidebar-border))] bg-[rgb(var(--sidebar-background))] p-2 shadow-xl',
            contentWidth
          )}
        >
          <div className="px-2 pb-2 pt-1 text-sm font-semibold text-sidebar-foreground">Teams</div>

          <div className="max-h-[60vh] overflow-auto">
            {items.map((t, idx) => {
              const active = t.slug === currentTeam?.slug;
              return (
                <DropdownMenu.Item
                  key={t.id}
                  onSelect={(e) => {
                    e.preventDefault();
                    router.push(`/teams/${t.slug}/settings`);
                  }}
                  className={cn(
                    'group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 outline-none',
                    'hover:bg-[rgb(var(--sidebar-accent))] hover:text-[rgb(var(--sidebar-accent-foreground))]'
                  )}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <Building2 className="h-4 w-4" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{t.name ?? '—'}</div>
                    <div className="truncate text-xs text-sidebar-foreground/60">{t.slug}</div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1 text-xs text-sidebar-foreground/60">
                    <Command className="h-3.5 w-3.5" />
                    <span>{idx + 1}</span>
                  </div>

                  {active && <Check className="h-4 w-4" aria-hidden="true" />}
                </DropdownMenu.Item>
              );
            })}
          </div>

          <DropdownMenu.Separator className="my-2 h-px bg-[rgb(var(--sidebar-border))]" />

          <DropdownMenu.Item asChild>
            <Link
              href="/settings/account"
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 outline-none',
                'hover:bg-[rgb(var(--sidebar-accent))] hover:text-[rgb(var(--sidebar-accent-foreground))]'
              )}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <UserCircle className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium">Account</div>
                <div className="text-xs text-sidebar-foreground/60">Profile &amp; settings</div>
              </div>
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="my-2 h-px bg-[rgb(var(--sidebar-border))]" />

          <DropdownMenu.Item asChild>
            <Link
              href="/teams"
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 outline-none',
                'hover:bg-[rgb(var(--sidebar-accent))] hover:text-[rgb(var(--sidebar-accent-foreground))]'
              )}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                <Layers className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium">All teams</div>
                <div className="text-xs text-sidebar-foreground/60">Browse teams</div>
              </div>
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <Link
              href="/teams?newTeam=true"
              className={cn(
                'mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 outline-none',
                'hover:bg-[rgb(var(--sidebar-accent))] hover:text-[rgb(var(--sidebar-accent-foreground))]'
              )}
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[rgb(var(--sidebar-border))]">
                <Plus className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-medium">Add team</div>
                <div className="text-xs text-sidebar-foreground/60">Create a new workspace</div>
              </div>
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-[rgb(var(--sidebar-background))]" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
