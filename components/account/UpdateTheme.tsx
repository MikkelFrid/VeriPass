import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Card } from '@/components/shared';
import { Button } from '@/components/ui';
import useTheme from 'hooks/useTheme';
import { useTranslation } from 'next-i18next';
import { Check } from 'lucide-react';

const UpdateTheme = () => {
  const { setTheme, themes, selectedTheme, applyTheme } = useTheme();
  const { t } = useTranslation('common');

  const isSelected = (id: string) => selectedTheme?.id === id;

  return (
    <Card>
      <Card.Body>
        <Card.Header>
          <Card.Title>{t('theme')}</Card.Title>
          <Card.Description>{t('change-theme')}</Card.Description>
        </Card.Header>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="outline"
              className="w-60 justify-between font-semibold"
            >
              <span className="flex items-center gap-2">
                {/* selectedTheme.icon is a component */}
                {selectedTheme?.icon ? (
                  <selectedTheme.icon className="w-5 h-5" />
                ) : null}
                {selectedTheme?.name}
              </span>
              <ChevronUpDownIcon className="w-5 h-5 opacity-60" />
            </Button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="start"
              sideOffset={8}
              className="z-50 min-w-[15rem] rounded-[calc(var(--radius)*0.75)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] p-2 shadow-md"
            >
              {themes.map((theme: any) => (
                <DropdownMenu.Item
                  key={theme.id}
                  onSelect={() => {
                    applyTheme(theme.id);
                    setTheme(theme.id);
                  }}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm leading-6 text-[rgb(var(--color-foreground))] outline-none data-[highlighted]:bg-[rgb(var(--color-muted))]"
                >
                  {theme.icon ? <theme.icon className="w-4 h-4" /> : null}
                  <span className="flex-1">{theme.name}</span>
                  {isSelected(theme.id) && <Check className="h-4 w-4" aria-hidden="true" />}
                </DropdownMenu.Item>
              ))}

              <DropdownMenu.Arrow className="fill-[rgb(var(--color-background))]" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </Card.Body>
    </Card>
  );
};

export default UpdateTheme;