import { useState, useCallback, useRef } from 'react';
import {
  wouldYouRatherQuestions,
  type WouldYouRatherCategory,
  type WouldYouRatherQuestion,
} from '@/lib/game-data/would-you-rather-questions';

export function useWouldYouRather() {
  const [currentQuestion, setCurrentQuestion] = useState<WouldYouRatherQuestion | null>(null);
  const [currentCategory, setCurrentCategory] = useState<WouldYouRatherCategory>('all');
  const usedQuestionsRef = useRef<Set<string>>(new Set());

  const getRandomQuestion = useCallback(
    (category: WouldYouRatherCategory): WouldYouRatherQuestion | null => {
      const questions = wouldYouRatherQuestions[category];
      if (!questions || questions.length === 0) {
        return null;
      }

      // Filter out used questions
      const available = questions.filter(
        (q) => !usedQuestionsRef.current.has(`${q.optionA}||${q.optionB}`)
      );

      if (available.length === 0) {
        // Reset if all questions used
        usedQuestionsRef.current.clear();
        const randomIndex = Math.floor(Math.random() * questions.length);
        const question = questions[randomIndex];
        usedQuestionsRef.current.add(`${question.optionA}||${question.optionB}`);
        return question;
      }

      const randomIndex = Math.floor(Math.random() * available.length);
      const question = available[randomIndex];
      usedQuestionsRef.current.add(`${question.optionA}||${question.optionB}`);
      return question;
    },
    []
  );

  const drawQuestion = useCallback(() => {
    const question = getRandomQuestion(currentCategory);
    setCurrentQuestion(question);
  }, [currentCategory, getRandomQuestion]);

  const changeCategory = useCallback(
    (category: WouldYouRatherCategory) => {
      setCurrentCategory(category);
      usedQuestionsRef.current.clear();
      const question = getRandomQuestion(category);
      setCurrentQuestion(question);
    },
    [getRandomQuestion]
  );

  const reset = useCallback(() => {
    usedQuestionsRef.current.clear();
    setCurrentQuestion(null);
  }, []);

  return {
    currentQuestion,
    currentCategory,
    drawQuestion,
    changeCategory,
    reset,
  };
}

