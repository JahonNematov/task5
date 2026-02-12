import { Song, SongDetail, MusicData, Locale } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  async getSongs(
    locale: Locale,
    seed: string,
    likesPerSong: number,
    page: number,
    pageSize: number = 20
  ): Promise<{ songs: Song[]; total: number; page: number; pageSize: number }> {
    const params = new URLSearchParams({
      locale,
      seed,
      likesPerSong: likesPerSong.toString(),
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/songs?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }
    return response.json();
  },

  async getSongDetail(
    index: number,
    locale: Locale,
    seed: string,
    likesPerSong: number
  ): Promise<SongDetail> {
    const params = new URLSearchParams({
      locale,
      seed,
      likesPerSong: likesPerSong.toString(),
    });

    const response = await fetch(`${API_BASE_URL}/songs/${index}?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch song detail');
    }
    return response.json();
  },

  async getMusicData(index: number, seed: string): Promise<MusicData> {
    const params = new URLSearchParams({ seed });

    const response = await fetch(`${API_BASE_URL}/music/${index}?${params}`);
    if (!response.ok) {
      throw new Error('Failed to fetch music data');
    }
    return response.json();
  },
};
