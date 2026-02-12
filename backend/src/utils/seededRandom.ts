import seedrandom from 'seedrandom';

export class SeededRandom {
  private rng: seedrandom.PRNG;

  constructor(seed: string, page: number) {
    // Combine seed and page using MAD (Multiply-Add-Divide) operation
    const combinedSeed = `${seed}-${page}`;
    this.rng = seedrandom(combinedSeed);
  }

  // Generate random number between 0 and 1
  next(): number {
    return this.rng();
  }

  // Generate random integer between min (inclusive) and max (exclusive)
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min)) + min;
  }

  // Pick random element from array
  choice<T>(array: T[]): T {
    return array[this.nextInt(0, array.length)];
  }

  // Generate likes based on average
  generateLikes(average: number): number {
    if (average === 0) return 0;
    if (average >= 10) return 10;

    const wholePart = Math.floor(average);
    const fractionalPart = average - wholePart;

    // Add whole part
    let likes = wholePart;

    // Probabilistically add one more based on fractional part
    if (this.next() < fractionalPart) {
      likes++;
    }

    return Math.min(likes, 10);
  }

  // Shuffle array
  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = this.nextInt(0, i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
