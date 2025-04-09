"use client";

import Image from "next/image";
import { NavUser } from "./nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/_ui/sidebar";
import { NavMain } from "./nav-main";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="flex w-full items-center gap-2 overflow-hidden rounded-md my-2 text-left text-sm ">
          <Image src="/ratio-logo.svg" alt="Ratio Logo" width={32} height={32} />
          <span className="text-lg font-bold">Ratio Music</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
