"use client";

import { usePathname } from "next/navigation";
import { HeartIcon, HomeIcon, StarIcon } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./_ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Top Albums",
    url: "#",
    icon: StarIcon,
  },
  {
    title: "Liked Albums",
    url: "#",
    icon: HeartIcon,
  },
];

export function NavMain() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.url}>
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
