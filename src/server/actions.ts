"use server";

import { searchAlbums } from "./spotify";

export async function searchSpotifyAlbums(searchTerm: string) {
  const albums = await searchAlbums(searchTerm);

  return albums.map((album) => ({
    name: album.name,
    album_uri: album.uri,
    artist: album.artists.map(({ name, uri, id }) => ({ name, uri, id })),
    artist_id: album.artists[0].id ?? "",
    id: album.id,
    release_date: album.release_date,
    image: album.images[1]?.url || null,
    release_date_precision: album.release_date_precision,
  }));
}
