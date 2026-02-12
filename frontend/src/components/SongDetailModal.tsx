import { useState, useEffect, useRef } from 'react';
import type { SongDetail } from '../types';
import { api } from '../services/api';
import { MusicPlayer } from '../services/musicPlayer';
import { FaPlay, FaStop, FaTimes } from 'react-icons/fa';

interface SongDetailModalProps {
  songDetail: SongDetail | null;
  loading: boolean;
  seed: string;
  onClose: () => void;
}

export const SongDetailModal = ({
  songDetail,
  loading,
  seed,
  onClose,
}: SongDetailModalProps) => {
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
    if (!musicPlayerRef.current || !songDetail) return;

    if (isPlaying) {
      musicPlayerRef.current.stop();
      setIsPlaying(false);
    } else {
      try {
        const musicData = await api.getMusicData(songDetail.index, seed);
        await musicPlayerRef.current.play(musicData);
        setIsPlaying(true);

        setTimeout(() => {
          setIsPlaying(false);
        }, 10000);
      } catch (error) {
        console.error('Error playing music:', error);
      }
    }
  };

  const renderHearts = (likes: number) => {
    return '❤️'.repeat(likes);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Song Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-2xl text-gray-600">Loading...</div>
          </div>
        ) : songDetail ? (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Album Cover */}
              <div className="flex-shrink-0">
                <img
                  src={songDetail.cover}
                  alt={`${songDetail.title} cover`}
                  className="w-full md:w-64 h-auto md:h-64 object-cover rounded-lg shadow-lg"
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
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{songDetail.title}</h3>
                <p className="text-xl text-gray-700 mb-1">{songDetail.artist}</p>
                <p className="text-lg text-gray-600 mb-1">{songDetail.album}</p>
                <p className="text-md text-gray-500 mb-4">{songDetail.genre}</p>
                <div className="text-2xl mb-4">{renderHearts(songDetail.likes)}</div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Review</h4>
                  <p className="text-gray-700 leading-relaxed">{songDetail.review}</p>
                </div>

                <div className="mt-6 text-sm text-gray-500">
                  Track #{songDetail.index}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
