import React, { useState, useEffect, useRef } from 'react';
import { SongDetail } from '../types';
import { api } from '../services/api';
import { MusicPlayer } from '../services/musicPlayer';
import { FaPlay, FaStop } from 'react-icons/fa';

interface SongDetailViewProps {
  songDetail: SongDetail;
  seed: string;
  onClose: () => void;
}

export const SongDetailView: React.FC<SongDetailViewProps> = ({
  songDetail,
  seed,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const musicPlayerRef = useRef<MusicPlayer | null>(null);

  useEffect(() => {
    musicPlayerRef.current = new MusicPlayer();

    return () => {
      if (musicPlayerRef.current) {
        musicPlayerRef.current.dispose();
      }
    };
  }, []);

  const handlePlayStop = async () => {
    if (!musicPlayerRef.current) return;

    if (isPlaying) {
      musicPlayerRef.current.stop();
      setIsPlaying(false);
    } else {
      try {
        const musicData = await api.getMusicData(songDetail.index, seed);
        await musicPlayerRef.current.play(musicData);
        setIsPlaying(true);

        // Auto-stop after playing
        setTimeout(() => {
          setIsPlaying(false);
        }, 10000); // Approximate duration
      } catch (error) {
        console.error('Error playing music:', error);
      }
    }
  };

  const renderHearts = (likes: number) => {
    return '❤️'.repeat(likes);
  };

  return (
    <div className="p-6">
      <div className="flex gap-6">
        {/* Album Cover */}
        <div className="flex-shrink-0">
          <img
            src={songDetail.cover}
            alt={`${songDetail.title} cover`}
            className="w-64 h-64 object-cover rounded-lg shadow-lg"
          />
          <button
            onClick={handlePlayStop}
            className={`mt-4 w-full px-4 py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-colors ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isPlaying ? (
              <>
                <FaStop /> Stop Preview
              </>
            ) : (
              <>
                <FaPlay /> Play Preview
              </>
            )}
          </button>
        </div>

        {/* Song Info */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{songDetail.title}</h2>
          <p className="text-xl text-gray-700 mb-1">{songDetail.artist}</p>
          <p className="text-lg text-gray-600 mb-1">{songDetail.album}</p>
          <p className="text-md text-gray-500 mb-4">{songDetail.genre}</p>
          <div className="text-2xl mb-4">{renderHearts(songDetail.likes)}</div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Review</h3>
            <p className="text-gray-700 leading-relaxed">{songDetail.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
