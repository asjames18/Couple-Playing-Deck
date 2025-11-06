import { useDeckGame } from './useDeckGame';
import {
  familyQuestions,
  type FamilyDeckName,
} from '@/lib/game-data/family-questions';

const generateDeck = (type: FamilyDeckName): string[] => {
  const base = familyQuestions[type];
  const deck: string[] = [];
  for (let i = 0; i < 50; i++) {
    deck.push(...base);
  }
  return deck;
};

const formatDeckName = (deckName: string): string => {
  return deckName.replace(/([A-Z])/g, ' $1').toUpperCase();
};

export function useFamilyGame() {
  const decks = {
    rootsAndBranches: generateDeck('rootsAndBranches'),
    insideOut: generateDeck('insideOut'),
    usTime: generateDeck('usTime'),
    realTalk: generateDeck('realTalk'),
  };

  return useDeckGame({
    decks,
    formatDeckName,
    outOfCardsMessage: () => 'All out of cards—family legend status!',
  });
}
