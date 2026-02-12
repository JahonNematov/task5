export interface Song {
  index: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  likes: number;
}

export interface SongDetail extends Song {
  cover: string;
  review: string;
}

export interface GenerateParams {
  locale: string;
  seed: string;
  likesPerSong: number;
  page: number;
  pageSize?: number;
}

export interface PaginatedResponse {
  songs: Song[];
  total: number;
  page: number;
  pageSize: number;
}

export type Locale = 'en-US' | 'de-DE' | 'uk-UA';

export interface LocaleData {
  songPrefixes: string[];
  songSuffixes: string[];
  artistFirstNames: string[];
  artistLastNames: string[];
  bandPrefixes: string[];
  bandSuffixes: string[];
  albumPrefixes: string[];
  albumSuffixes: string[];
  genres: string[];
}
