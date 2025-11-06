import { useState, useCallback, useRef, useEffect } from 'react';
import {
  challenges,
  type ChallengeCategory,
  type ChallengeType,
} from '@/lib/game-data/challenges';

interface Challenge {
  type: ChallengeType;
  text: string;
}

export function useTruthOrDare() {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(
    null
  );
  const [currentCategory, setCurrentCategory] =
    useState<ChallengeCategory>('all');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const getRandomChallenge = useCallback(
    (type: ChallengeType, category: ChallengeCategory): string => {
      const categoryChallenges = challenges[category][type];
      if (!categoryChallenges || categoryChallenges.length === 0) {
        return 'No challenges available in this category!';
      }
      const randomIndex = Math.floor(Math.random() * categoryChallenges.length);
      return categoryChallenges[randomIndex];
    },
    []
  );

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setTimeLeft(30);
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const getTruth = useCallback(() => {
    const challenge = getRandomChallenge('truth', currentCategory);
    setCurrentChallenge({ type: 'truth', text: challenge });
    startTimer();
  }, [currentCategory, getRandomChallenge, startTimer]);

  const getDare = useCallback(() => {
    const challenge = getRandomChallenge('dare', currentCategory);
    setCurrentChallenge({ type: 'dare', text: challenge });
    startTimer();
  }, [currentCategory, getRandomChallenge, startTimer]);

  const nextChallenge = useCallback(() => {
    if (currentChallenge) {
      const challenge = getRandomChallenge(
        currentChallenge.type,
        currentCategory
      );
      setCurrentChallenge({ type: currentChallenge.type, text: challenge });
      startTimer();
    }
  }, [currentChallenge, currentCategory, getRandomChallenge, startTimer]);

  const changeCategory = useCallback(
    (category: ChallengeCategory) => {
      setCurrentCategory(category);
      if (currentChallenge) {
        const challenge = getRandomChallenge(currentChallenge.type, category);
        setCurrentChallenge({ type: currentChallenge.type, text: challenge });
        startTimer();
      }
    },
    [currentChallenge, getRandomChallenge, startTimer]
  );

  return {
    currentChallenge,
    currentCategory,
    timeLeft,
    getTruth,
    getDare,
    nextChallenge,
    changeCategory,
  };
}
