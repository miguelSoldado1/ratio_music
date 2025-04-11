import type { Metadata } from "next";

import "./globals.css";

import { Separator } from "@/components/_ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/_ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SearchBar } from "@/components/search-bar";

export const metadata: Metadata = {
  title: "Ratio",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
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
            {children}
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
