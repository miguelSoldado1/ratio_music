import React from "react";
import { SearchIcon } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="search"
        placeholder="Search for an album..."
        className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring h-9 w-full rounded-md border px-3 py-1 pl-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      />
      <SearchIcon className="text-muted-foreground absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2" />
    </div>
  );
}
