import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useSession } from 'next-auth/react';
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  SunIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import useTheme from 'hooks/useTheme';
import env from '@/lib/env';
import { useTranslation } from 'next-i18next';
import { useCustomSignOut } from 'hooks/useCustomSignout';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui';

interface HeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setSidebarOpen }: HeaderProps) => {
  const { toggleTheme } = useTheme();
  const { status, data } = useSession();
  const { t } = useTranslation('common');
  const signOut = useCustomSignOut();

  if (status === 'loading' || !data) {
    return null;
  }

  const { user } = data;

  return (
    <header
      className={[
        'sticky top-0 z-40 flex h-14 shrink-0 items-center',
        'border-b border-[rgb(var(--color-border))]',
        'bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]',
        'px-4 sm:gap-x-6 sm:px-6 lg:px-8',
      ].join(' ')}
    >
      {/* Mobile: open sidebar */}
      <button
        type="button"
        className="-m-2.5 p-2.5 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">{t('open-sidebar')}</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Brand */}
      <div className="flex items-center gap-2">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/brand/veripass-wordmark.svg"
            alt="VeriPass"
            width={112}
            height={20}
            priority
            className="h-5 w-auto"
          />
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-x-3 lg:gap-x-6">
        {/* Profile menu (Radix) */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" className="hidden lg:inline-flex items-center">
              <span className="ml-1 text-sm font-semibold leading-6">
                {user.name}
              </span>
              <ChevronDownIcon className="ml-2 h-5 w-5 opacity-60" aria-hidden="true" />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className={[
                'z-50 min-w-[12rem] rounded-[calc(var(--radius)*0.75)]',
                'border border-[rgb(var(--color-border))]',
                'bg-[rgb(var(--color-background))] p-2 shadow-md',
              ].join(' ')}
            >
              <DropdownMenu.Item asChild>
                <Link
                  href="/settings/account"
                  className={[
                    'flex items-center rounded px-2 py-2 text-sm leading-6',
                    'outline-none data-[highlighted]:bg-[rgb(var(--color-panel))]',
                  ].join(' ')}
                >
                  <UserCircleIcon className="w-5 h-5 mr-2" />
                  {t('account')}
                </Link>
              </DropdownMenu.Item>

              {env.darkModeEnabled && (
                <>
                  <DropdownMenu.Separator className="my-2 h-px bg-[rgb(var(--color-border))]" />
                  <DropdownMenu.Item
                    onSelect={(e) => {
                      e.preventDefault();
                      toggleTheme();
                    }}
                    className={[
                      'flex cursor-pointer items-center rounded px-2 py-2 text-sm leading-6',
                      'outline-none data-[highlighted]:bg-[rgb(var(--color-panel))]',
                    ].join(' ')}
                  >
                    <SunIcon className="w-5 h-5 mr-2" />
                    {t('switch-theme')}
                  </DropdownMenu.Item>
                </>
              )}

              <DropdownMenu.Separator className="my-2 h-px bg-[rgb(var(--color-border))]" />

              <DropdownMenu.Item
                onSelect={(e) => {
                  e.preventDefault();
                  signOut();
                }}
                className={[
                  'flex cursor-pointer items-center rounded px-2 py-2 text-sm leading-6',
                  'outline-none data-[highlighted]:bg-[rgb(var(--color-panel))]',
                ].join(' ')}
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                {t('logout')}
              </DropdownMenu.Item>

              <DropdownMenu.Arrow className="fill-[rgb(var(--color-background))]" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
};

export default Header;