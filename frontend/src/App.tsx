import { Toolbar } from './components/Toolbar';
import { TableView } from './components/TableView';
import { GalleryView } from './components/GalleryView';
import { useAppState } from './hooks/useAppState';

function App() {
  const {
    state,
    setLocale,
    setSeed,
    setRandomSeed,
    setLikesPerSong,
    setViewMode,
    setCurrentPage,
  } = useAppState();

  return (
    <div className="min-h-screen bg-gray-100">
      <Toolbar
        locale={state.locale}
        seed={state.seed}
        likesPerSong={state.likesPerSong}
        viewMode={state.viewMode}
        onLocaleChange={setLocale}
        onSeedChange={setSeed}
        onRandomSeed={setRandomSeed}
        onLikesPerSongChange={setLikesPerSong}
        onViewModeChange={setViewMode}
      />

      {state.viewMode === 'table' ? (
        <TableView
          locale={state.locale}
          seed={state.seed}
          likesPerSong={state.likesPerSong}
          currentPage={state.currentPage}
          onPageChange={setCurrentPage}
        />
      ) : (
        <GalleryView
          locale={state.locale}
          seed={state.seed}
          likesPerSong={state.likesPerSong}
        />
      )}
    </div>
  );
}

export default App;
