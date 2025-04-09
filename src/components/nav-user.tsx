import { Avatar, AvatarFallback, AvatarImage } from "@/components/_ui/avatar";
import { SidebarMenu, SidebarMenuItem } from "@/components/_ui/sidebar";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left text-sm">
            <span className="truncate font-semibold">{user.name}</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
