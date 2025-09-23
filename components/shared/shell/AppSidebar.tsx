'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Sidebar from '@/components/shared/shell/StickySidebar';

import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/lib/components/ui/sidebar';

import { LayoutDashboard, Settings } from 'lucide-react';
import TeamSwitcher from './TeamSwitcher';

const nav = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Settings', href: '/settings', icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar
      variant="sidebar"        // <— PUSHES content instead of overlay
      collapsible="icon"       // icon-only when collapsed
      className="border-r border-[rgb(var(--sidebar-border))]"
    >
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => {
                const active =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname?.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={!!active}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>{/* optional footer */}</SidebarFooter>

      {/* Thin clickable rail shown when collapsed */}
      <SidebarRail />
    </Sidebar>
  );
}