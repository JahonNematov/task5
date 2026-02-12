import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Song, Locale } from '../types';
import { api } from '../services/api';
import { GalleryCard } from './GalleryCard';

interface GalleryViewProps {
  locale: Locale;
  seed: string;
  likesPerSong: number;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  locale,
  seed,
  likesPerSong,
}) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);
  const pageSize = 20;

  // Reset when parameters change
  useEffect(() => {
    setSongs([]);
    setPage(1);
    setHasMore(true);
  }, [locale, seed, likesPerSong]);

  // Load more songs
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await api.getSongs(locale, seed, likesPerSong, page, pageSize);
      setSongs((prev) => [...prev, ...data.songs]);
      setPage((prev) => prev + 1);

      // Check if we've reached the end
      if (data.songs.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false);
    }
  }, [locale, seed, likesPerSong, page, loading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, hasMore, loading]);

  // Initial load
  useEffect(() => {
    if (songs.length === 0 && !loading) {
      loadMore();
    }
  }, [songs.length, loading, loadMore]);

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs.map((song) => (
            <GalleryCard
              key={song.index}
              song={song}
              locale={locale}
              seed={seed}
              likesPerSong={likesPerSong}
            />
          ))}
        </div>

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="text-2xl text-gray-600">Loading...</div>
          </div>
        )}

        {/* Intersection observer target */}
        <div ref={observerTarget} className="h-4" />

        {/* End of list message */}
        {!hasMore && songs.length > 0 && (
          <div className="text-center py-8 text-gray-600">
            No more songs to load
          </div>
        )}
      </div>
    </div>
  );
};
