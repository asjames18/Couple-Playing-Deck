import { useState, useEffect, useRef, useCallback } from 'react';

export interface TwoTruthsState {
  statements: string[];
  lieIndex: number | null;
  timeLeft: number;
  gameStarted: boolean;
  gameEnded: boolean;
  selectedIndex: number | null;
  isCorrect: boolean | null;
}

const INITIAL_TIME = 30;

export function useTwoTruths() {
  const [state, setState] = useState<TwoTruthsState>({
    statements: ['', '', ''],
    lieIndex: null,
    timeLeft: INITIAL_TIME,
    gameStarted: false,
    gameEnded: false,
    selectedIndex: null,
    isCorrect: null,
  });

  const timerIntervalRef = useRef<number | null>(null);

  const startGame = useCallback((statements: [string, string, string]) => {
    if (statements.some((s) => !s.trim())) {
      throw new Error('Please fill in all statements!');
    }

    const lieIndex = Math.floor(Math.random() * 3);
    setState({
      statements,
      lieIndex,
      timeLeft: INITIAL_TIME,
      gameStarted: true,
      gameEnded: false,
      selectedIndex: null,
      isCorrect: null,
    });
  }, []);

  const makeGuess = useCallback(
    (index: number) => {
      if (state.gameEnded || !state.gameStarted || state.lieIndex === null) {
        return;
      }

      const isCorrect = index === state.lieIndex;
      setState((prev) => ({
        ...prev,
        gameEnded: true,
        selectedIndex: index,
        isCorrect,
      }));

      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    },
    [state.gameEnded, state.gameStarted, state.lieIndex]
  );

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setState({
      statements: ['', '', ''],
      lieIndex: null,
      timeLeft: INITIAL_TIME,
      gameStarted: false,
      gameEnded: false,
      selectedIndex: null,
      isCorrect: null,
    });
  }, []);

  // Timer effect
  useEffect(() => {
    if (!state.gameStarted || state.gameEnded) {
      return;
    }

    timerIntervalRef.current = window.setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          // Time's up - auto-guess with -1 (invalid index = wrong)
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          return {
            ...prev,
            gameEnded: true,
            selectedIndex: -1,
            isCorrect: false,
          };
        }
        return {
          ...prev,
          timeLeft: prev.timeLeft - 1,
        };
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [state.gameStarted, state.gameEnded]);

  return {
    ...state,
    startGame,
    makeGuess,
    resetGame,
  };
}
