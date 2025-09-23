import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  ChevronUpDownIcon,
  FolderIcon,
  FolderPlusIcon,
  RectangleStackIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import useTeams from "hooks/useTeams";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { maxLengthPolicies } from "@/lib/common";
import { Button } from "@/components/ui";

type MenuItem = {
  id: string | number;
  name?: string | null;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const TeamDropdown = () => {
  const router = useRouter();
  const { teams } = useTeams();
  const { data } = useSession();
  const { t } = useTranslation("common");

  const currentTeam = (teams || []).find(
    (team) => team.slug === router.query.slug
  );

  const groups: Array<{ id: number; name?: string; items: MenuItem[] }> = [
    {
      id: 2,
      name: t("teams"),
      items: (teams || []).map((team) => ({
        id: team.id,
        name: team.name,
        href: `/teams/${team.slug}/settings`,
        icon: FolderIcon,
      })),
    },
    {
      id: 1,
      name: t("profile"),
      items: [
        {
          id: data?.user.id || "me",
          name: data?.user?.name || "—",
          href: "/settings/account",
          icon: UserCircleIcon,
        },
      ],
    },
    {
      id: 3,
      items: [
        {
          id: "all-teams",
          name: t("all-teams"),
          href: "/teams",
          icon: RectangleStackIcon,
        },
        {
          id: "new-team",
          name: t("new-team"),
          href: "/teams?newTeam=true",
          icon: FolderPlusIcon,
        },
      ],
    },
  ];

  const label =
    currentTeam?.name ??
    data?.user?.name?.substring(0, maxLengthPolicies.nameShortDisplay) ??
    "";

  return (
    <div className="w-full">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" className="w-full h-10 justify-between font-bold">
            <span className="truncate">{label}</span>
            <ChevronUpDownIcon className="h-5 w-5 shrink-0" />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={6}
            align="start"
            className="z-50 w-[var(--dd-width,calc(100%))] min-w-[16rem] rounded-[var(--radius)] border border-[rgb(var(--color-border))] bg-[rgb(var(--color-background))] p-2 shadow outline-none data-[side=bottom]:animate-in data-[side=top]:animate-in"
          >
            {groups.map(({ id, name, items }, gi) => (
              <React.Fragment key={id}>
                {name && (
                  <DropdownMenu.Label className="px-2 pb-1 pt-1 text-xs text-gray-500">
                    {name}
                  </DropdownMenu.Label>
                )}
                {items.map((item) => (
                  <DropdownMenu.Item
                    key={`${id}-${item.id}`}
                    className="rounded px-2 py-2 outline-none data-[highlighted]:bg-[rgb(var(--color-muted))]"
                    asChild
                  >
                    <Link href={item.href} className="flex items-center gap-2 text-sm">
                      <item.icon className="h-5 w-5" />
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </DropdownMenu.Item>
                ))}
                {gi < groups.length - 1 && (
                  <DropdownMenu.Separator className="my-2 h-px bg-[rgb(var(--color-border))]" />
                )}
              </React.Fragment>
            ))}
            <DropdownMenu.Arrow className="fill-[rgb(var(--color-background))]" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default TeamDropdown;