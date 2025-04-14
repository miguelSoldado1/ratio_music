"use server";

import { DatePrecision } from "@/enums";
import { getAlbum, getAlbumTracks, searchAlbums } from "./spotify";
import type { AlbumSearchResult, FullAlbumResult } from "@/types";

export async function searchSpotifyAlbums(searchTerm: string): Promise<AlbumSearchResult[]> {
  const albums = await searchAlbums(searchTerm);

  return albums.map((album) => ({
    name: album.name,
    albumUri: album.uri,
    artists: album.artists.map(({ name, uri, id }) => ({ name, uri, id })),
    id: album.id,
    releaseDate: album.release_date,
    image: album.images[1]?.url || null,
  }));
}

export async function getFullAlbum(albumId: string): Promise<FullAlbumResult> {
  const [album, tracks] = await Promise.all([getAlbum(albumId), getAlbumTracks(albumId)]);

  return {
    name: album.name,
    albumUri: album.uri,
    artists: album.artists.map(({ name, uri, id }) => ({ name, uri, id })),
    id: album.id,
    releaseDate: album.release_date,
    datePrecision: DatePrecision[album.release_date_precision],
    image: album.images[1]?.url || null,
    tracks: tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      trackNumber: track.track_number,
      artists: track.artists.map(({ name, uri, id }) => ({ name, uri, id })),
      duration: track.duration_ms,
      explicit: track.explicit,
    })),
  };
}
