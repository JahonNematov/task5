import { Router, Request, Response } from 'express';
import { SongGenerator } from '../services/songGenerator';
import { MusicGenerator } from '../services/musicGenerator';
import { Locale } from '../types';

const router = Router();
const songGenerator = new SongGenerator();
const musicGenerator = new MusicGenerator();

// Helper function to extract string from query parameter
const getStringParam = (param: any): string => {
  if (Array.isArray(param)) return param[0] as string;
  if (typeof param === 'string') return param;
  return '';
};

// Get paginated songs
router.get('/songs', (req: Request, res: Response) => {
  try {
    const locale = (getStringParam(req.query.locale) as Locale) || 'en-US';
    const seed = getStringParam(req.query.seed) || '0';
    const likesPerSong = parseFloat(getStringParam(req.query.likesPerSong)) || 0;
    const page = parseInt(getStringParam(req.query.page)) || 1;
    const pageSize = parseInt(getStringParam(req.query.pageSize)) || 20;

    const songs = songGenerator.generateSongs(locale, seed, likesPerSong, page, pageSize);

    res.json({
      songs,
      total: 1000000, // Virtual total for pagination
      page,
      pageSize
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate songs' });
  }
});

// Get song details
router.get('/songs/:index', (req: Request, res: Response) => {
  try {
    const index = parseInt(getStringParam(req.params.index));
    const locale = (getStringParam(req.query.locale) as Locale) || 'en-US';
    const seed = getStringParam(req.query.seed) || '0';
    const likesPerSong = parseFloat(getStringParam(req.query.likesPerSong)) || 0;

    const songDetail = songGenerator.generateSongDetail(locale, seed, likesPerSong, index);

    res.json(songDetail);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate song detail' });
  }
});

// Get music data for a song
router.get('/music/:index', (req: Request, res: Response) => {
  try {
    const index = parseInt(getStringParam(req.params.index));
    const seed = getStringParam(req.query.seed) || '0';

    const musicData = musicGenerator.generateMusic(seed, index);

    res.json(musicData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate music' });
  }
});

export default router;
