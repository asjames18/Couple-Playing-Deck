import { useDeckGame } from './useDeckGame';
import {
  kidsQuestions,
  type KidsCategory,
} from '@/lib/game-data/kids-questions';

const generateDeck = (type: KidsCategory): string[] => {
  const base = kidsQuestions[type];
  const deck: string[] = [];
  for (let i = 0; i < 50; i++) {
    deck.push(...base);
  }
  return deck;
};

const formatDeckName = (deckName: string): string => {
  return deckName.replace(/([A-Z])/g, ' $1').toUpperCase();
};

export function useKidsGame() {
  const decks = {
    feelings: generateDeck('feelings'),
    dreams: generateDeck('dreams'),
    memories: generateDeck('memories'),
  };

  return useDeckGame({
    decks,
    formatDeckName,
    outOfCardsMessage: () => 'All out of cards—amazing job!',
  });
}
