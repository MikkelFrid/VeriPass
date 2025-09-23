import Link from 'next/link';
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
    <div className="sticky top-0 z-40 flex h-14 shrink-0 items-center border-b px-4 sm:gap-x-6 sm:px-6 lg:px-8 bg-white dark:bg-black dark:text-white">
      {/* Mobile: open sidebar */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-50 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">{t('open-sidebar')}</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="relative flex flex-1" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Profile menu (Radix) */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" className="hidden lg:inline-flex items-center">
                <span className="ml-1 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-50">
                  {user.name}
                </span>
                <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </Button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                align="end"
                sideOffset={8}
                className="z-50 min-w-[10rem] rounded-[calc(var(--radius)*0.75)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] p-2 shadow-md"
              >
                <DropdownMenu.Item asChild>
                  <Link
                    href="/settings/account"
                    className="flex items-center rounded px-2 py-2 text-sm leading-6 text-[rgb(var(--color-foreground))] outline-none data-[highlighted]:bg-[rgb(var(--color-muted))]"
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
                      className="flex cursor-pointer items-center rounded px-2 py-2 text-sm leading-6 text-[rgb(var(--color-foreground))] outline-none data-[highlighted]:bg-[rgb(var(--color-muted))]"
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
                  className="flex cursor-pointer items-center rounded px-2 py-2 text-sm leading-6 text-[rgb(var(--color-foreground))] outline-none data-[highlighted]:bg-[rgb(var(--color-muted))]"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                  {t('logout')}
                </DropdownMenu.Item>

                <DropdownMenu.Arrow className="fill-[rgb(var(--color-background))]" />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
};

export default Header;