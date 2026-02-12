# Music Store Showcase - Task 5

A fullstack single-page application that generates fake song information for a music store showcase.

## Features

- **Multiple Languages**: Support for English (USA), German (Germany), and Ukrainian (Ukraine)
- **Seeded Random Generation**: Reproducible data generation using custom or random 64-bit seeds
- **Dynamic Likes System**: Configure average likes per song (0-10 with fractional values)
- **Two View Modes**:
  - **Table View**: Paginated table with expandable rows showing song details
  - **Gallery View**: Infinite scrolling card layout
- **Music Playback**: Generated music preview using Web Audio API (Tone.js)
- **Album Covers**: Dynamically generated SVG album covers with song and artist names
- **Real-time Updates**: All parameters update dynamically without page reload

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- @faker-js/faker (for locale-specific data)
- seedrandom (for reproducible randomness)
- Canvas (for image generation)

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Tone.js (music generation)
- React Icons

## Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

1. **Clone the repository**
   ```bash
   cd task5
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

### Start Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:3001`

### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:3000`

### Access the Application
Open your browser and navigate to `http://localhost:3000`

## Usage

### Toolbar Controls

1. **Language Selection**: Choose between English, German, or Ukrainian
2. **Seed Input**: Enter a custom seed value or click the random button
3. **Likes Per Song**: Set average likes (0-10, fractional values allowed)
4. **View Mode**: Toggle between Table and Gallery view

### Table View
- Click any row to expand and view:
  - Album cover image
  - Play button for music preview
  - Song review text
- Click again to collapse
- Use pagination controls at the bottom

### Gallery View
- Scroll down to load more songs automatically
- Click any card to view details in a modal
- Play music preview from the modal

## Project Structure

```
task5/
├── backend/
│   ├── src/
│   │   ├── locales/         # Language-specific data (JSON)
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   │   ├── songGenerator.ts
│   │   │   └── musicGenerator.ts
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions
│   │   │   └── seededRandom.ts
│   │   └── index.ts         # Entry point
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Toolbar.tsx
│   │   │   ├── TableView.tsx
│   │   │   ├── GalleryView.tsx
│   │   │   ├── GalleryCard.tsx
│   │   │   ├── SongDetailView.tsx
│   │   │   └── SongDetailModal.tsx
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API and music services
│   │   ├── types/           # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── migrations/              # Database migrations folder (if needed)
```

## API Endpoints

### GET /api/songs
Retrieve paginated songs
- Query params: `locale`, `seed`, `likesPerSong`, `page`, `pageSize`

### GET /api/songs/:index
Get detailed information for a specific song
- Query params: `locale`, `seed`, `likesPerSong`

### GET /api/music/:index
Get music data for playback
- Query params: `seed`

## Key Implementation Details

### Seeded Random Generation
- Uses `seedrandom` library for reproducible randomness
- Combines user seed with record index using MAD operation
- Same seed always produces identical data

### Likes Generation
- Implements probabilistic distribution for fractional values
- Example: 3.7 average = 3 base likes + 70% chance of 1 additional like

### Music Generation
- Uses musical scales (major, minor, pentatonic, blues)
- Implements chord progressions
- Generates MIDI-style note sequences
- Rendered using Tone.js synthesizer

### Localization
- All locale-specific data stored in JSON files
- No hardcoded language strings in source code
- Easy to add new languages without code changes

## Development

### Build Backend
```bash
cd backend
npm run build
npm start
```

### Build Frontend
```bash
cd frontend
npm run build
```

## Notes

- No authentication required
- No database needed (all data generated in-memory)
- Data generation happens server-side
- Frontend receives pre-generated data

## License

ISC
