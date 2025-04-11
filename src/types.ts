import { DatePrecision } from "./enums";

export interface AlbumSearchResult {
  id: string;
  name: string;
  albumUri: string;
  image: string | null;
  releaseDate: string;
  artists: Artist[];
}

export interface FullAlbumResult {
  id: string;
  name: string;
  albumUri: string;
  image: string | null;
  releaseDate: string;
  datePrecision: DatePrecision;
  artists: Artist[];
  tracks: Track[];
}

export interface Track {
  id: string;
  name: string;
  trackNumber: number;
  artists: Artist[];
  duration: number;
  explicit: boolean;
}

export interface Artist {
  name: string;
  uri: string;
  id: string;
}
