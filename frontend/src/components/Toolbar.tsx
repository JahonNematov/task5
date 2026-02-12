import type { Locale, ViewMode } from '../types';
import { FaTable, FaTh, FaRandom } from 'react-icons/fa';

interface ToolbarProps {
  locale: Locale;
  seed: string;
  likesPerSong: number;
  viewMode: ViewMode;
  onLocaleChange: (locale: Locale) => void;
  onSeedChange: (seed: string) => void;
  onRandomSeed: () => void;
  onLikesPerSongChange: (likes: number) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

export const Toolbar = ({
  locale,
  seed,
  likesPerSong,
  viewMode,
  onLocaleChange,
  onSeedChange,
  onRandomSeed,
  onLikesPerSongChange,
  onViewModeChange,
}: ToolbarProps) => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
        {/* Language Selection */}
        <div className="flex items-center gap-2">
          <label className="text-white font-medium text-sm">Language:</label>
          <select
            value={locale}
            onChange={(e) => onLocaleChange(e.target.value as Locale)}
            className="px-3 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white focus:outline-none focus:border-white/40 cursor-pointer"
          >
            <option value="en-US" className="text-gray-900">English (USA)</option>
            <option value="de-DE" className="text-gray-900">Deutsch (Deutschland)</option>
            <option value="uk-UA" className="text-gray-900">Українська (Україна)</option>
          </select>
        </div>

        {/* Seed Configuration */}
        <div className="flex items-center gap-2 flex-1 min-w-[250px]">
          <label className="text-white font-medium text-sm">Seed:</label>
          <input
            type="text"
            value={seed}
            onChange={(e) => onSeedChange(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
            placeholder="Enter seed value"
          />
          <button
            onClick={onRandomSeed}
            className="px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors flex items-center gap-2"
            title="Generate random seed"
          >
            <FaRandom />
          </button>
        </div>

        {/* Likes Per Song */}
        <div className="flex items-center gap-2">
          <label className="text-white font-medium text-sm">Likes:</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={likesPerSong}
            onChange={(e) => onLikesPerSongChange(parseFloat(e.target.value) || 0)}
            className="w-20 px-3 py-2 rounded-lg border-2 border-white/20 bg-white/10 text-white focus:outline-none focus:border-white/40"
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => onViewModeChange('table')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              viewMode === 'table'
                ? 'bg-white text-purple-600 font-semibold'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <FaTable /> Table
          </button>
          <button
            onClick={() => onViewModeChange('gallery')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              viewMode === 'gallery'
                ? 'bg-white text-purple-600 font-semibold'
                : 'bg-white/20 hover:bg-white/30 text-white'
            }`}
          >
            <FaTh /> Gallery
          </button>
        </div>
      </div>
    </div>
  );
};
