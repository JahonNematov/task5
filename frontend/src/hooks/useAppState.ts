import { useState, useCallback } from 'react';
import { AppState, Locale, ViewMode } from '../types';

const generateRandomSeed = (): string => {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();
};

export const useAppState = () => {
  const [state, setState] = useState<AppState>({
    locale: 'en-US',
    seed: generateRandomSeed(),
    likesPerSong: 5,
    viewMode: 'table',
    currentPage: 1,
  });

  const setLocale = useCallback((locale: Locale) => {
    setState((prev) => ({ ...prev, locale, currentPage: 1 }));
  }, []);

  const setSeed = useCallback((seed: string) => {
    setState((prev) => ({ ...prev, seed, currentPage: 1 }));
  }, []);

  const setRandomSeed = useCallback(() => {
    setState((prev) => ({ ...prev, seed: generateRandomSeed(), currentPage: 1 }));
  }, []);

  const setLikesPerSong = useCallback((likesPerSong: number) => {
    setState((prev) => ({ ...prev, likesPerSong }));
  }, []);

  const setViewMode = useCallback((viewMode: ViewMode) => {
    setState((prev) => ({ ...prev, viewMode, currentPage: 1 }));
  }, []);

  const setCurrentPage = useCallback((currentPage: number) => {
    setState((prev) => ({ ...prev, currentPage }));
  }, []);

  return {
    state,
    setLocale,
    setSeed,
    setRandomSeed,
    setLikesPerSong,
    setViewMode,
    setCurrentPage,
  };
};
