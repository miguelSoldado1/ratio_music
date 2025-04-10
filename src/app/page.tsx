import { AppSidebar } from "../components/app-sidebar";
import { Separator } from "@/components/_ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/_ui/sidebar";
import { SearchBar } from "@/components/search-bar";

export default async function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex w-full items-center gap-1 md:gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className=" md:mr-2 h-4" />
            <SearchBar />
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
