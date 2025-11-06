import { useState, useCallback, useRef } from 'react';
import {
  gratitudePrompts,
  getGratitudePromptsByCategory,
  getGratitudeCategories,
  type GratitudePrompt,
} from '@/lib/game-data/gratitude-prompts';

export function useGratitude() {
  const [currentPrompt, setCurrentPrompt] = useState<GratitudePrompt | null>(null);
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const usedPromptsRef = useRef<Set<string>>(new Set());

  const getRandomPrompt = useCallback(
    (category: string): GratitudePrompt | null => {
      const prompts = getGratitudePromptsByCategory(category);
      if (!prompts || prompts.length === 0) {
        return null;
      }

      const available = prompts.filter(
        (p) => !usedPromptsRef.current.has(`${p.category}-${p.text}`)
      );

      if (available.length === 0) {
        usedPromptsRef.current.clear();
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const prompt = prompts[randomIndex];
        usedPromptsRef.current.add(`${prompt.category}-${prompt.text}`);
        return prompt;
      }

      const randomIndex = Math.floor(Math.random() * available.length);
      const prompt = available[randomIndex];
      usedPromptsRef.current.add(`${prompt.category}-${prompt.text}`);
      return prompt;
    },
    []
  );

  const drawPrompt = useCallback(() => {
    const prompt = getRandomPrompt(currentCategory);
    setCurrentPrompt(prompt);
  }, [currentCategory, getRandomPrompt]);

  const changeCategory = useCallback(
    (category: string) => {
      setCurrentCategory(category);
      usedPromptsRef.current.clear();
      const prompt = getRandomPrompt(category);
      setCurrentPrompt(prompt);
    },
    [getRandomPrompt]
  );

  const categories = getGratitudeCategories();

  return {
    currentPrompt,
    currentCategory,
    categories,
    drawPrompt,
    changeCategory,
  };
}

