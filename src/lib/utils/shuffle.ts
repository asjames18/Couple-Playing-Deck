// Fisher-Yates shuffle algorithm with optional seed support

export function shuffle<T>(array: T[], seed?: number): T[] {
  const shuffled = [...array];
  let random: () => number;

  if (seed !== undefined) {
    // Seeded random number generator (Linear Congruential Generator)
    let rng = seed;
    random = () => {
      rng = (rng * 1664525 + 1013904223) % 2 ** 32;
      return rng / 2 ** 32;
    };
  } else {
    random = Math.random;
  }

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

// Verify shuffle doesn't produce duplicates (for testing)
export function verifyNoDuplicates<T>(original: T[], shuffled: T[]): boolean {
  if (original.length !== shuffled.length) return false;

  const originalCounts = new Map<T, number>();
  const shuffledCounts = new Map<T, number>();

  for (const item of original) {
    originalCounts.set(item, (originalCounts.get(item) || 0) + 1);
  }

  for (const item of shuffled) {
    shuffledCounts.set(item, (shuffledCounts.get(item) || 0) + 1);
  }

  for (const [item, count] of originalCounts) {
    if (shuffledCounts.get(item) !== count) {
      return false;
    }
  }

  return true;
}
