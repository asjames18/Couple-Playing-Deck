import { useState, useCallback, useMemo, useEffect } from 'react';
import { allCards, wildCard, type RealTalkCard, type RealTalkCategory } from '@/lib/game-data/real-talk-cards';

export interface RealTalkCardWithKey extends RealTalkCard {
  categoryKey: string;
}

function getCardId(card: RealTalkCardWithKey): string {
  if (card.type === 'wild-card') return 'wild-card';
  return `${card.categoryKey || card.category}-${card.question}`;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useRealTalkCards() {
  const [currentCategory, setCurrentCategory] = useState<RealTalkCategory>('all');
  const [currentDeck, setCurrentDeck] = useState<RealTalkCardWithKey[]>([]);
  const [cardHistory, setCardHistory] = useState<RealTalkCardWithKey[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(-1);
  const [usedCardsSet, setUsedCardsSet] = useState<Set<string>>(new Set());

  // Initialize deck
  const initializeDeck = useCallback(() => {
    const deck: RealTalkCardWithKey[] = [
      { ...wildCard, categoryKey: 'wild' },
    ];
    Object.keys(allCards).forEach((categoryKey) => {
      allCards[categoryKey].forEach((card) => {
        deck.push({ ...card, categoryKey });
      });
    });
    return shuffleArray(deck);
  }, []);

  // Get available cards based on category
  const getAvailableCards = useCallback(
    (deck: RealTalkCardWithKey[]): RealTalkCardWithKey[] => {
      if (currentCategory === 'all') return deck;
      return deck.filter((card) => {
        if (card.type === 'wild-card') return true;
        return card.categoryKey === currentCategory;
      });
    },
    [currentCategory]
  );

  // Reset game
  const resetGame = useCallback(() => {
    const newDeck = initializeDeck();
    setCurrentDeck(newDeck);
    setCardHistory([]);
    setCurrentCardIndex(-1);
    setUsedCardsSet(new Set());
  }, [initializeDeck]);

  // Draw a new card
  const drawCard = useCallback(() => {
    const availableCards = getAvailableCards(currentDeck);
    if (availableCards.length === 0) {
      throw new Error('No more cards available in this category! Try another category or reset the game.');
    }

    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const drawnCard = availableCards[randomIndex];
    const deckIndex = currentDeck.findIndex(
      (card) =>
        card === drawnCard ||
        (card.categoryKey === drawnCard.categoryKey && card.question === drawnCard.question)
    );

    let newDeck = [...currentDeck];
    if (deckIndex !== -1) {
      newDeck.splice(deckIndex, 1);
    }

    // Mark current card as used if there is one
    let newUsedCardsSet = new Set(usedCardsSet);
    if (currentCardIndex >= 0 && cardHistory[currentCardIndex]) {
      newUsedCardsSet.add(getCardId(cardHistory[currentCardIndex]));
    }

    // Update history
    let newHistory = [...cardHistory];
    if (currentCardIndex < newHistory.length - 1) {
      newHistory = newHistory.slice(0, currentCardIndex + 1);
    }
    newHistory.push({ ...drawnCard });
    const newIndex = newHistory.length - 1;

    setCurrentDeck(newDeck);
    setCardHistory(newHistory);
    setCurrentCardIndex(newIndex);
    setUsedCardsSet(newUsedCardsSet);
  }, [currentDeck, currentCategory, cardHistory, currentCardIndex, usedCardsSet, getAvailableCards]);

  // Navigate to next card
  const nextCard = useCallback(() => {
    if (currentCardIndex >= cardHistory.length - 1) {
      drawCard();
    } else {
      // Mark current card as used
      let newUsedCardsSet = new Set(usedCardsSet);
      if (currentCardIndex >= 0 && cardHistory[currentCardIndex]) {
        newUsedCardsSet.add(getCardId(cardHistory[currentCardIndex]));
      }
      setUsedCardsSet(newUsedCardsSet);
      setCurrentCardIndex((prev) => prev + 1);
    }
  }, [currentCardIndex, cardHistory, drawCard, usedCardsSet]);

  // Navigate to previous card
  const previousCard = useCallback(() => {
    if (currentCardIndex > 0) {
      // Mark current card as used
      let newUsedCardsSet = new Set(usedCardsSet);
      if (currentCardIndex >= 0 && cardHistory[currentCardIndex]) {
        newUsedCardsSet.add(getCardId(cardHistory[currentCardIndex]));
      }
      setUsedCardsSet(newUsedCardsSet);
      setCurrentCardIndex((prev) => prev - 1);
    }
  }, [currentCardIndex, cardHistory, usedCardsSet]);

  // Change category
  const changeCategory = useCallback(
    (category: RealTalkCategory) => {
      setCurrentCategory(category);
    },
    []
  );

  // Shuffle deck
  const shuffleDeck = useCallback(() => {
    setCurrentDeck((prev) => shuffleArray(prev));
  }, []);

  // Current card
  const currentCard = useMemo(() => {
    if (currentCardIndex >= 0 && currentCardIndex < cardHistory.length) {
      return cardHistory[currentCardIndex];
    }
    return null;
  }, [currentCardIndex, cardHistory]);

  // Stats
  const stats = useMemo(() => {
    const availableCards = getAvailableCards(currentDeck);
    const remaining = availableCards.length;
    const drawn = cardHistory.length;
    return { remaining, drawn };
  }, [currentDeck, currentCategory, cardHistory, getAvailableCards]);

  // Navigation state
  const canGoBack = currentCardIndex > 0;
  const canGoNext = currentCardIndex < cardHistory.length - 1 || getAvailableCards(currentDeck).length > 0;

  // Initialize on mount
  useEffect(() => {
    if (currentDeck.length === 0) {
      resetGame();
    }
  }, [currentDeck.length, resetGame]);

  return {
    currentCard,
    currentCategory,
    stats,
    canGoBack,
    canGoNext,
    drawCard,
    nextCard,
    previousCard,
    changeCategory,
    shuffleDeck,
    resetGame,
  };
}

