import { Song, SongDetail, Locale, LocaleData } from '../types';
import { SeededRandom } from '../utils/seededRandom';
import * as fs from 'fs';
import * as path from 'path';

export class SongGenerator {
  private localeData: Map<Locale, LocaleData> = new Map();

  constructor() {
    this.loadLocaleData();
  }

  private loadLocaleData() {
    const locales: Locale[] = ['en-US', 'de-DE', 'uk-UA'];

    for (const locale of locales) {
      const filePath = path.join(__dirname, '..', 'locales', `${locale}.json`);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      this.localeData.set(locale, data);
    }
  }

  generateSongs(
    locale: Locale,
    seed: string,
    likesPerSong: number,
    page: number,
    pageSize: number = 20
  ): Song[] {
    const songs: Song[] = [];
    const data = this.localeData.get(locale);

    if (!data) {
      throw new Error(`Locale ${locale} not found`);
    }

    const startIndex = (page - 1) * pageSize;

    for (let i = 0; i < pageSize; i++) {
      const index = startIndex + i + 1;
      const rng = new SeededRandom(seed, index);

      const song: Song = {
        index,
        title: this.generateTitle(data, rng),
        artist: this.generateArtist(data, rng),
        album: this.generateAlbum(data, rng),
        genre: rng.choice(data.genres),
        likes: rng.generateLikes(likesPerSong)
      };

      songs.push(song);
    }

    return songs;
  }

  generateSongDetail(
    locale: Locale,
    seed: string,
    likesPerSong: number,
    index: number
  ): SongDetail {
    const data = this.localeData.get(locale);

    if (!data) {
      throw new Error(`Locale ${locale} not found`);
    }

    const rng = new SeededRandom(seed, index);

    const title = this.generateTitle(data, rng);
    const artist = this.generateArtist(data, rng);
    const album = this.generateAlbum(data, rng);

    return {
      index,
      title,
      artist,
      album,
      genre: rng.choice(data.genres),
      likes: rng.generateLikes(likesPerSong),
      cover: this.generateCover(title, artist, rng),
      review: this.generateReview(data, rng)
    };
  }

  private generateTitle(data: LocaleData, rng: SeededRandom): string {
    const prefix = rng.choice(data.songPrefixes);
    const suffix = rng.choice(data.songSuffixes);
    return `${prefix} ${suffix}`;
  }

  private generateArtist(data: LocaleData, rng: SeededRandom): string {
    // 50% chance for band name, 50% for personal name
    if (rng.next() < 0.5) {
      // Band name
      const prefix = rng.choice(data.bandPrefixes);
      const suffix = rng.choice(data.bandSuffixes);
      return `${prefix} ${suffix}`;
    } else {
      // Personal name
      const firstName = rng.choice(data.artistFirstNames);
      const lastName = rng.choice(data.artistLastNames);
      return `${firstName} ${lastName}`;
    }
  }

  private generateAlbum(data: LocaleData, rng: SeededRandom): string {
    // 30% chance for "Single"
    if (rng.next() < 0.3) {
      return 'Single';
    }

    const prefix = rng.choice(data.albumPrefixes);
    const suffix = rng.choice(data.albumSuffixes);
    return `${prefix} ${suffix}`;
  }

  private generateCover(title: string, artist: string, rng: SeededRandom): string {
    // Generate a simple SVG cover
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];
    const bgColor = rng.choice(colors);
    const textColor = '#FFFFFF';

    const svg = `
      <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="300" fill="${bgColor}"/>
        <text x="150" y="120" font-family="Arial, sans-serif" font-size="20" font-weight="bold"
              fill="${textColor}" text-anchor="middle">${this.escapeXml(title)}</text>
        <text x="150" y="180" font-family="Arial, sans-serif" font-size="16"
              fill="${textColor}" text-anchor="middle">${this.escapeXml(artist)}</text>
      </svg>
    `;

    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  }

  private generateReview(data: LocaleData, rng: SeededRandom): string {
    const templates = [
      `A masterpiece of ${data.genres[rng.nextInt(0, data.genres.length)]} music. The artist's unique style shines through every note.`,
      `This track showcases exceptional talent and creativity. A must-listen for fans of ${data.genres[rng.nextInt(0, data.genres.length)]}.`,
      `An incredible blend of melody and rhythm. This song captures the essence of modern ${data.genres[rng.nextInt(0, data.genres.length)]}.`,
      `Outstanding composition with powerful lyrics and unforgettable hooks. Definitely worth adding to your playlist.`,
      `A fresh take on ${data.genres[rng.nextInt(0, data.genres.length)]} that pushes boundaries while staying true to its roots.`
    ];

    return rng.choice(templates);
  }

  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
