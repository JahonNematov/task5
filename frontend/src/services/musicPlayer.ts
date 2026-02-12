import * as Tone from 'tone';
import { MusicData } from '../types';

export class MusicPlayer {
  private synth: Tone.PolySynth | null = null;
  private isPlaying = false;
  private sequence: Tone.Part<[number, number]> | null = null;

  async initialize() {
    await Tone.start();
    this.synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: 'triangle',
      },
      envelope: {
        attack: 0.01,
        decay: 0.1,
        sustain: 0.3,
        release: 1,
      },
    }).toDestination();
  }

  async play(musicData: MusicData) {
    if (!this.synth) {
      await this.initialize();
    }

    if (this.isPlaying) {
      this.stop();
    }

    Tone.getTransport().bpm.value = musicData.tempo;

    const events: [number, number][] = [];
    let currentTime = 0;

    for (let i = 0; i < musicData.notes.length; i++) {
      const note = musicData.notes[i];
      const duration = musicData.durations[i];

      if (note !== -1) {
        // Not a rest
        events.push([currentTime, note]);
      }

      currentTime += duration;
    }

    this.sequence = new Tone.Part((time, note) => {
      const frequency = this.midiToFrequency(note);
      this.synth?.triggerAttackRelease(frequency, '8n', time);
    }, events).start(0);

    Tone.getTransport().start();
    this.isPlaying = true;

    // Stop after the sequence is done
    setTimeout(() => {
      this.stop();
    }, (currentTime * 60000) / musicData.tempo);
  }

  stop() {
    if (this.sequence) {
      this.sequence.stop();
      this.sequence.dispose();
      this.sequence = null;
    }
    Tone.getTransport().stop();
    Tone.getTransport().cancel();
    this.isPlaying = false;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private midiToFrequency(midi: number): number {
    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  dispose() {
    this.stop();
    if (this.synth) {
      this.synth.dispose();
      this.synth = null;
    }
  }
}
