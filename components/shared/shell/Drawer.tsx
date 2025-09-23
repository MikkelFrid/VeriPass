'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import TeamDropdown from '../TeamDropdown';
import Brand from './Brand';
import Navigation from './Navigation';

interface DrawerProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Drawer = ({ sidebarOpen, setSidebarOpen }: DrawerProps) => {
  const { t } = useTranslation('common');

  return (
    <>
      {/* Mobile trigger (hamburger) is handled in Header via setSidebarOpen */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side="left"
          className={[
            'flex flex-col gap-y-6 p-6',
            'bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]',
          ].join(' ')}
        >
          <div className="flex items-center justify-between">
            <Brand />
            <Button
              variant="ghost"
              size="icon"
              aria-label={t('close-sidebar')}
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <TeamDropdown />
          <Navigation />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside
        className={[
          'hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col',
          'border-r border-[rgb(var(--color-border))]',
          'bg-[rgb(var(--color-background))] text-[rgb(var(--color-foreground))]',
        ].join(' ')}
      >
        <div className="flex grow flex-col gap-y-6 p-6">
          <Brand />
          <TeamDropdown />
          <Navigation />
        </div>
      </aside>
    </>
  );
};

export default Drawer;
