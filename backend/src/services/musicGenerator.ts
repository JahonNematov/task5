import { SeededRandom } from '../utils/seededRandom';

export class MusicGenerator {
  // Musical scales
  private static readonly SCALES = {
    major: [0, 2, 4, 5, 7, 9, 11],
    minor: [0, 2, 3, 5, 7, 8, 10],
    pentatonic: [0, 2, 4, 7, 9],
    blues: [0, 3, 5, 6, 7, 10]
  };

  // Common chord progressions
  private static readonly PROGRESSIONS = [
    [0, 3, 4, 0], // I-IV-V-I
    [0, 5, 3, 4], // I-vi-IV-V
    [0, 4, 5, 3], // I-V-vi-IV
    [0, 3, 0, 4], // I-IV-I-V
  ];

  generateMusic(seed: string, index: number): { notes: number[]; durations: number[]; tempo: number } {
    const rng = new SeededRandom(seed, index);

    // Select random scale
    const scaleNames = Object.keys(MusicGenerator.SCALES);
    const scaleName = rng.choice(scaleNames) as keyof typeof MusicGenerator.SCALES;
    const scale = MusicGenerator.SCALES[scaleName];

    // Select random base note (C4 = 60)
    const baseNote = rng.nextInt(48, 72); // C3 to B4

    // Select tempo
    const tempo = rng.nextInt(80, 140);

    // Generate notes based on chord progression
    const progression = rng.choice(MusicGenerator.PROGRESSIONS);
    const notes: number[] = [];
    const durations: number[] = [];

    // Generate 16 measures with 4 beats each
    for (let measure = 0; measure < 16; measure++) {
      const chordIndex = progression[measure % progression.length];
      const chordRoot = baseNote + scale[chordIndex % scale.length];

      // Generate 4 beats
      for (let beat = 0; beat < 4; beat++) {
        if (rng.next() < 0.7) { // 70% chance to play a note
          // Pick a note from the scale near the chord root
          const scaleNote = rng.choice(scale);
          const octaveOffset = rng.nextInt(-1, 2) * 12;
          const note = chordRoot + scaleNote + octaveOffset;

          notes.push(note);

          // Random duration (quarter, eighth, or half note)
          const durationChoice = rng.next();
          if (durationChoice < 0.5) {
            durations.push(0.25); // quarter note
          } else if (durationChoice < 0.8) {
            durations.push(0.125); // eighth note
          } else {
            durations.push(0.5); // half note
          }
        } else {
          // Rest
          notes.push(-1);
          durations.push(0.25);
        }
      }
    }

    return { notes, durations, tempo };
  }

  // Convert MIDI note to frequency
  midiToFrequency(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }
}
