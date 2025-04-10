"use client";

import Image from "next/image";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/_ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <div className="my-2 flex w-full justify-center">
          <Image src="/ratio-logo.svg" alt="Ratio Logo" width={32} height={32} />
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
