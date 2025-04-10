import { Separator } from "@/components/_ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/_ui/sidebar";
import { SearchBar } from "@/components/search-bar";
import { AppSidebar } from "../components/app-sidebar";

export default async function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex w-full items-center gap-1 px-4 md:gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 md:mr-2" />
            <SearchBar />
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}
