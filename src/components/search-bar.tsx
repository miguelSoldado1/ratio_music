"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useDebounce from "@/hooks/use-debounce";
import { searchSpotifyAlbums } from "@/server/actions";
import { tryCatch } from "@/try-catch";
import { AlbumSearchResult } from "@/types";
import { SearchIcon } from "lucide-react";
import { Input } from "./_ui/input";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [albums, setAlbums] = useState<AlbumSearchResult[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedTerm = useDebounce(searchTerm, 500);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsFocused(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    async function fetchAlbums() {
      if (debouncedTerm) {
        const { data } = await tryCatch(searchSpotifyAlbums(debouncedTerm));
        if (data) setAlbums(data);
      }
    }

    fetchAlbums();
  }, [debouncedTerm]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value), []);

  const showResults = isFocused && searchTerm.length > 0;

  return (
    <div className="relative w-full max-w-lg" ref={containerRef}>
      <div className="relative">
        <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Search for an album..."
          className="pr-4 pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={searchTerm}
          onChange={onInputChange}
          onFocus={() => setIsFocused(true)}
        />
      </div>
      {showResults && (
        <div className="bg-background absolute z-10 mt-1 w-full rounded-md border shadow-md">
          <div className="p-2">
            <p className="text-muted-foreground mb-2 px-2 text-sm">Showing results for &quot;{searchTerm}&quot;</p>
            <div className="max-h-[300px] overflow-y-auto">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-2"
                  onClick={() => {
                    console.log(`Selected album: ${album.name}`);
                    setIsFocused(false);
                  }}
                >
                  <Image src={album.image || "/placeholder.svg"} alt={album.name} width={40} height={40} />
                  <div className="flex flex-col">
                    <span className="font-medium">{album.name}</span>
                    <span className="text-muted-foreground text-xs">
                      {album.artist.map(({ name }) => name).join(", ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
