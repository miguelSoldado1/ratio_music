export interface AlbumSearchResult {
  name: string;
  album_uri: string;
  artist: Artist[];
  artist_id: string;
  id: string;
  release_date: string;
  image: string | null;
  release_date_precision: string;
}

interface Artist {
  name: string;
  uri: string;
  id: string;
}
