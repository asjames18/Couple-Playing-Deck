import { useState, useCallback, useRef } from 'react';
import { couplesQuestions, type DeckName } from '@/lib/game-data/couples-questions';

interface CardDisplay {
  deckName: string;
  cardText: string;
  isOutOfCards: boolean;
}

const generateDeck = (type: DeckName): string[] => {
  const base = couplesQuestions[type];
  const deck: string[] = [];
  // Repeat the base questions 50 times to create a large deck
  for (let i = 0; i < 50; i++) {
    deck.push(...base);
  }
  return deck;
};

const formatDeckName = (deckName: string): string => {
  return deckName.replace(/([A-Z])/g, ' $1').toUpperCase();
};

export function useCouplesGame() {
  const [currentCard, setCurrentCard] = useState<CardDisplay | null>(null);
  const decksRef = useRef<Record<DeckName, string[]>>({
    warmMeUp: generateDeck('warmMeUp'),
    beneathTheSkin: generateDeck('beneathTheSkin'),
    nakedHours: generateDeck('nakedHours'),
    theLoveLab: generateDeck('theLoveLab'),
    unfilteredLove: generateDeck('unfilteredLove'),
  });
  const usedCardsRef = useRef<Record<DeckName, Set<string>>>({
    warmMeUp: new Set(),
    beneathTheSkin: new Set(),
    nakedHours: new Set(),
    theLoveLab: new Set(),
    unfilteredLove: new Set(),
  });

  const drawCard = useCallback((deckName: DeckName) => {
    const deck = decksRef.current[deckName];
    const used = usedCardsRef.current[deckName];

    if (!deck || deck.length === 0) {
      setCurrentCard({
        deckName: formatDeckName(deckName),
        cardText: 'Error: Deck not found!',
        isOutOfCards: false,
      });
      return;
    }

    // If all cards are used, show out of cards message
    if (used.size >= deck.length) {
      setCurrentCard({
        deckName: formatDeckName(deckName),
        cardText: 'All out of cards—legendary run!',
        isOutOfCards: true,
      });
      return;
    }

    // Find an unused card
    let card: string;
    let attempts = 0;
    do {
      card = deck[Math.floor(Math.random() * deck.length)];
      attempts++;
      // Prevent infinite loop
      if (attempts > 1000) {
        // Reset used cards if we've tried too many times
        used.clear();
        break;
      }
    } while (used.has(card) && used.size < deck.length);

    used.add(card);
    setCurrentCard({
      deckName: formatDeckName(deckName),
      cardText: card,
      isOutOfCards: false,
    });

    // Trigger heart animation (handled by component)
    return card;
  }, []);

  const resetDeck = useCallback((deckName: DeckName) => {
    usedCardsRef.current[deckName].clear();
    setCurrentCard(null);
  }, []);

  return {
    currentCard,
    drawCard,
    resetDeck,
  };
}

