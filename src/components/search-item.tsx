import Image from "next/image";
import Link from "next/link";
import type { AlbumSearchResult } from "@/types";

interface SearchItemProps {
  album: AlbumSearchResult;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

export function SearchItem({ album, onClick }: SearchItemProps) {
  return (
    <Link
      onClick={onClick}
      href={`/album/${album.id}`}
      className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md p-2"
    >
      <Image src={album.image || "/placeholder.svg"} alt={album.name} width={40} height={40} />
      <div className="flex flex-col">
        <span className="font-medium">{album.name}</span>
        <span className="text-muted-foreground text-xs">{album.artists.map(({ name }) => name).join(", ")}</span>
      </div>
    </Link>
  );
}
