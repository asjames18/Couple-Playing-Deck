import { useState, useCallback, useRef } from 'react';

interface CardDisplay {
  deckName: string;
  cardText: string;
  isOutOfCards: boolean;
}

interface DeckGameOptions {
  decks: Record<string, string[]>;
  formatDeckName: (name: string) => string;
  outOfCardsMessage: (deckName: string) => string;
}

export function useDeckGame({ decks, formatDeckName, outOfCardsMessage }: DeckGameOptions) {
  const [currentCard, setCurrentCard] = useState<CardDisplay | null>(null);
  const decksRef = useRef(decks);
  const usedCardsRef = useRef<Record<string, Set<string>>>(() => {
    const used: Record<string, Set<string>> = {};
    Object.keys(decks).forEach((deckName) => {
      used[deckName] = new Set();
    });
    return used;
  });

  const drawCard = useCallback(
    (deckName: string) => {
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

      if (used.size >= deck.length) {
        setCurrentCard({
          deckName: formatDeckName(deckName),
          cardText: outOfCardsMessage(deckName),
          isOutOfCards: true,
        });
        return;
      }

      let card: string;
      let attempts = 0;
      do {
        card = deck[Math.floor(Math.random() * deck.length)];
        attempts++;
        if (attempts > 1000) {
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

      return card;
    },
    [formatDeckName, outOfCardsMessage]
  );

  const resetDeck = useCallback((deckName: string) => {
    usedCardsRef.current[deckName].clear();
    setCurrentCard(null);
  }, []);

  return {
    currentCard,
    drawCard,
    resetDeck,
  };
}

