import React, { useState } from 'react';
import { Song, SongDetail, Locale } from '../types';
import { api } from '../services/api';
import { SongDetailModal } from './SongDetailModal';

interface GalleryCardProps {
  song: Song;
  locale: Locale;
  seed: string;
  likesPerSong: number;
}

export const GalleryCard: React.FC<GalleryCardProps> = ({
  song,
  locale,
  seed,
  likesPerSong,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [songDetail, setSongDetail] = useState<SongDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCardClick = async () => {
    setShowModal(true);
    if (!songDetail) {
      setLoading(true);
      try {
        const detail = await api.getSongDetail(song.index, locale, seed, likesPerSong);
        setSongDetail(detail);
      } catch (error) {
        console.error('Error fetching song detail:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderHearts = (likes: number) => {
    return '❤️'.repeat(likes);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-xl"
      >
        <div className="p-4">
          <div className="text-sm text-gray-500 mb-2">#{song.index}</div>
          <h3 className="text-lg font-bold text-gray-900 mb-1 truncate" title={song.title}>
            {song.title}
          </h3>
          <p className="text-md text-gray-700 mb-1 truncate" title={song.artist}>
            {song.artist}
          </p>
          <p className="text-sm text-gray-600 mb-1 truncate" title={song.album}>
            {song.album}
          </p>
          <p className="text-sm text-gray-500 mb-2">{song.genre}</p>
          <div className="text-lg">{renderHearts(song.likes)}</div>
        </div>
      </div>

      {showModal && (
        <SongDetailModal
          songDetail={songDetail}
          loading={loading}
          seed={seed}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
    </>
  );
};
