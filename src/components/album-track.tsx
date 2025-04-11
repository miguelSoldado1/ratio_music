import React from "react";
import type { Track } from "@/types";

interface AlbumTrackProps {
  track: Track;
  index: number;
}

export function AlbumTrack({ track, index }: AlbumTrackProps) {
  return (
    <li className="hover:text-muted-foreground flex items-center justify-between px-3 py-1 transition-colors">
      <div className="flex items-center gap-2">
        <div className="text-muted-foreground w-8 text-center">{index}</div>
        <div>
          <div>{track.name}</div>
          <div className="text-muted-foreground text-sm">
            {track.artists.map((artist, index) => (
              <span key={artist.id}>
                <span className="hover:text-primary cursor-pointer hover:underline">{artist.name}</span>
                {index < track.artists.length - 1 && <span>, </span>}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="text-muted-foreground min-w-[50px] text-right">{handleTrackDuration(track.duration)}</div>
    </li>
  );
}
function handleTrackDuration(duration: number) {
  const minutes = Math.floor(duration / 60000);
  const seconds = Math.floor((duration % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
