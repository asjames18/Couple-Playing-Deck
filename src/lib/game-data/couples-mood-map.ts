// Mood mapping for couples game decks
// Since cards are strings, we infer mood from deck names

import type { DeckName } from './couples-questions';
import type { GameMood } from '../game-modes';

export const deckMoodMap: Record<DeckName, GameMood> = {
  warmMeUp: 'fun', // Light, fun questions
  beneathTheSkin: 'deep', // Deep, emotional questions
  nakedHours: 'flirty', // Intimate, flirty questions
  theLoveLab: 'fun', // Experimental, playful questions
  unfilteredLove: 'deep', // Raw, honest questions
};

/**
 * Get the mood for a specific card based on its deck
 */
export function getCardMood(deckName: DeckName): GameMood {
  return deckMoodMap[deckName] || 'fun';
}

/**
 * Filter cards by mood (for smart shuffle)
 */
export function filterCardsByMood<T extends { id: string }>(
  cards: T[],
  mood: GameMood,
  deckName: DeckName
): T[] {
  if (mood === 'all') {
    return cards;
  }

  const deckMood = getCardMood(deckName);
  // For now, we filter by deck mood since cards don't have individual mood tags
  // In the future, cards could have explicit mood tags
  if (mood === deckMood) {
    return cards;
  }

  // Return empty if mood doesn't match deck
  return [];
}

