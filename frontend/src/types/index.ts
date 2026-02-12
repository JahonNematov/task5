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

export interface MusicData {
  notes: number[];
  durations: number[];
  tempo: number;
}

export type Locale = 'en-US' | 'de-DE' | 'uk-UA';

export type ViewMode = 'table' | 'gallery';

export interface AppState {
  locale: Locale;
  seed: string;
  likesPerSong: number;
  viewMode: ViewMode;
  currentPage: number;
}
