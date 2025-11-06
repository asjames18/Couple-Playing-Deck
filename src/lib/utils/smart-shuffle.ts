// Smart shuffle with mood weighting and no-repeat support

import { shuffle } from './shuffle';

export interface CardWithMood {
  id: string;
  mood?: 'fun' | 'deep' | 'flirty' | 'faith';
  [key: string]: unknown;
}

export interface ShuffleOptions {
  moodWeights?: {
    fun: number;
    deep: number;
    flirty: number;
    faith: number;
  };
  excludeIds?: string[];
  seed?: number;
}

/**
 * Smart shuffle that weights cards by mood and excludes already-used cards
 */
export function smartShuffle<T extends CardWithMood>(
  cards: T[],
  options: ShuffleOptions = {}
): T[] {
  const { moodWeights, excludeIds = [], seed } = options;

  // Filter out excluded cards
  let availableCards = cards.filter(
    (card) => !excludeIds.includes(card.id)
  );

  // If no mood weights, just shuffle normally
  if (!moodWeights) {
    return shuffle(availableCards, seed);
  }

  // Calculate weights for each card
  const weightedCards = availableCards.map((card) => {
    const cardMood = card.mood || 'fun';
    const weight = moodWeights[cardMood] || 1;
    return { card, weight };
  });

  // Normalize weights
  const totalWeight = weightedCards.reduce((sum, item) => sum + item.weight, 0);
  const normalized = weightedCards.map((item) => ({
    card: item.card,
    weight: item.weight / totalWeight,
  }));

  // Weighted random selection - simpler approach: shuffle by weight
  // Sort by weight (descending) then apply some randomness
  const sorted = normalized.sort((a, b) => b.weight - a.weight);
  
  // Apply weighted shuffle: higher weight cards more likely to appear first
  const shuffled: T[] = [];
  const remaining = [...sorted];

  while (remaining.length > 0) {
    // Calculate cumulative weights
    const totalWeight = remaining.reduce((sum, item) => sum + item.weight, 0);
    let random = Math.random() * totalWeight;
    if (seed !== undefined) {
      // Use seed for deterministic randomness
      random = ((seed + shuffled.length) * 9301 + 49297) % 233280 / 233280 * totalWeight;
    }

    // Find card based on cumulative weight
    let cumulative = 0;
    let selectedIndex = 0;
    for (let i = 0; i < remaining.length; i++) {
      cumulative += remaining[i].weight;
      if (random <= cumulative) {
        selectedIndex = i;
        break;
      }
    }

    shuffled.push(remaining[selectedIndex].card);
    remaining.splice(selectedIndex, 1);
  }

  return shuffled;
}

