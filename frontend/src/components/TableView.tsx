import { useState, useEffect, Fragment } from 'react';
import type { Song, SongDetail, Locale } from '../types';
import { api } from '../services/api';
import { SongDetailView } from './SongDetailView';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface TableViewProps {
  locale: Locale;
  seed: string;
  likesPerSong: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const TableView = ({
  locale,
  seed,
  likesPerSong,
  currentPage,
  onPageChange,
}: TableViewProps) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [songDetail, setSongDetail] = useState<SongDetail | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    const fetchSongs = async () => {
      setLoading(true);
      try {
        const data = await api.getSongs(locale, seed, likesPerSong, currentPage, pageSize);
        setSongs(data.songs);
        setTotalPages(Math.ceil(data.total / pageSize));
      } catch (error) {
        console.error('Error fetching songs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
    setExpandedRow(null);
    setSongDetail(null);
  }, [locale, seed, likesPerSong, currentPage]);

  const handleRowClick = async (song: Song) => {
    if (expandedRow === song.index) {
      setExpandedRow(null);
      setSongDetail(null);
    } else {
      setExpandedRow(song.index);
      try {
        const detail = await api.getSongDetail(song.index, locale, seed, likesPerSong);
        setSongDetail(detail);
      } catch (error) {
        console.error('Error fetching song detail:', error);
      }
    }
  };

  const renderHearts = (likes: number) => {
    return '❤️'.repeat(likes);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Artist</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Album</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Genre</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Likes</th>
                <th className="px-6 py-4 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <Fragment key={song.index}>
                  <tr
                    onClick={() => handleRowClick(song)}
                    className="border-b border-gray-200 hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{song.index}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{song.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{song.artist}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{song.album}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{song.genre}</td>
                    <td className="px-6 py-4 text-sm">{renderHearts(song.likes)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {expandedRow === song.index ? <FaChevronUp /> : <FaChevronDown />}
                    </td>
                  </tr>
                  {expandedRow === song.index && songDetail && (
                    <tr>
                      <td colSpan={7} className="bg-gray-50">
                        <SongDetailView
                          songDetail={songDetail}
                          seed={seed}
                        />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
