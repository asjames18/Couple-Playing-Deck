import { useState, useCallback, useRef } from 'react';
import {
  couplesQuestions,
  type DeckName,
} from '@/lib/game-data/couples-questions';
import { smartShuffle } from '@/lib/utils/smart-shuffle';
import { getCardMood } from '@/lib/game-data/couples-mood-map';
import type { GameMode } from '@/lib/game-modes';
import { getModeConfig } from '@/lib/game-modes';

interface CardDisplay {
  deckName: string;
  cardText: string;
  isOutOfCards: boolean;
  cardId?: string;
}

interface CardWithId {
  id: string;
  text: string;
  mood?: 'fun' | 'deep' | 'flirty' | 'faith';
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

export function useCouplesGame(gameMode: GameMode = 'normal') {
  const [currentCard, setCurrentCard] = useState<CardDisplay | null>(null);
  const modeConfig = getModeConfig(gameMode);
  
  // Convert string arrays to card objects with IDs and moods
  const generateCardDeck = (type: DeckName): CardWithId[] => {
    const base = couplesQuestions[type];
    const deck: CardWithId[] = [];
    const mood = getCardMood(type);
    
    // Repeat the base questions 50 times to create a large deck
    for (let i = 0; i < 50; i++) {
      base.forEach((text, idx) => {
        deck.push({
          id: `${type}-${i}-${idx}`,
          text,
          mood,
        });
      });
    }
    return deck;
  };

  const decksRef = useRef<Record<DeckName, CardWithId[]>>({
    warmMeUp: generateCardDeck('warmMeUp'),
    beneathTheSkin: generateCardDeck('beneathTheSkin'),
    nakedHours: generateCardDeck('nakedHours'),
    theLoveLab: generateCardDeck('theLoveLab'),
    unfilteredLove: generateCardDeck('unfilteredLove'),
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

    // Filter out used cards
    const availableCards = deck.filter((card) => !used.has(card.id));

    // If all cards are used, show out of cards message
    if (availableCards.length === 0) {
      // If mode doesn't allow repeats, show message
      if (!modeConfig.allowRepeats) {
        setCurrentCard({
          deckName: formatDeckName(deckName),
          cardText: 'All out of cards—legendary run!',
          isOutOfCards: true,
        });
        return;
      }
      // Otherwise, reset used cards
      used.clear();
      const allCards = deck.filter((card) => !used.has(card.id));
      if (allCards.length === 0) {
        setCurrentCard({
          deckName: formatDeckName(deckName),
          cardText: 'All out of cards—legendary run!',
          isOutOfCards: true,
        });
        return;
      }
    }

    // Use smart shuffle with mood weights if mode doesn't allow repeats
    const cardsToShuffle = availableCards.length > 0 
      ? availableCards 
      : deck.filter((card) => !used.has(card.id));

    const shuffled = modeConfig.allowRepeats
      ? cardsToShuffle // Simple shuffle for normal mode
      : smartShuffle(cardsToShuffle, {
          moodWeights: modeConfig.moodWeights,
          excludeIds: Array.from(used),
        });

    if (shuffled.length === 0) {
      setCurrentCard({
        deckName: formatDeckName(deckName),
        cardText: 'All out of cards—legendary run!',
        isOutOfCards: true,
      });
      return;
    }

    const selectedCard = shuffled[0];
    used.add(selectedCard.id);

    setCurrentCard({
      deckName: formatDeckName(deckName),
      cardText: selectedCard.text,
      isOutOfCards: false,
      cardId: selectedCard.id,
    });

    // Trigger heart animation (handled by component)
    return selectedCard.text;
  }, [modeConfig]);

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
