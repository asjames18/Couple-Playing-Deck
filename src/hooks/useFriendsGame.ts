import { useDeckGame } from './useDeckGame';
import { friendsQuestions, type FriendsDeckName } from '@/lib/game-data/friends-questions';

const generateDeck = (type: FriendsDeckName): string[] => {
  const base = friendsQuestions[type];
  const deck: string[] = [];
  for (let i = 0; i < 50; i++) {
    deck.push(...base);
  }
  return deck;
};

const formatDeckName = (deckName: string): string => {
  return deckName.replace(/([A-Z])/g, ' $1').toUpperCase();
};

export function useFriendsGame() {
  const decks = {
    mindMeld: generateDeck('mindMeld'),
    realOnesOnly: generateDeck('realOnesOnly'),
    vibesAndChaos: generateDeck('vibesAndChaos'),
    circleTight: generateDeck('circleTight'),
  };

  return useDeckGame({
    decks,
    formatDeckName,
    outOfCardsMessage: () => 'All out of cards—squad goals achieved!',
  });
}

