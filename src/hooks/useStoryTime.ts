import { useState, useCallback, useRef, useEffect } from 'react';
import { stories, type StoryCategory } from '@/lib/game-data/stories';

export function useStoryTime() {
  const [currentStory, setCurrentStory] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<StoryCategory>('all');
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const usedStoriesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    setTimeLeft(60);
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

  const getRandomStory = useCallback(
    (category: StoryCategory): string | null => {
      const categoryStories = stories[category];
      if (!categoryStories || categoryStories.length === 0) {
        return null;
      }

      const available = categoryStories.filter(
        (s) => !usedStoriesRef.current.has(s)
      );

      if (available.length === 0) {
        usedStoriesRef.current.clear();
        const randomIndex = Math.floor(Math.random() * categoryStories.length);
        const story = categoryStories[randomIndex];
        usedStoriesRef.current.add(story);
        return story;
      }

      const randomIndex = Math.floor(Math.random() * available.length);
      const story = available[randomIndex];
      usedStoriesRef.current.add(story);
      return story;
    },
    []
  );

  const drawStory = useCallback(() => {
    const story = getRandomStory(currentCategory);
    setCurrentStory(story);
    startTimer();
  }, [currentCategory, getRandomStory, startTimer]);

  const changeCategory = useCallback(
    (category: StoryCategory) => {
      setCurrentCategory(category);
      usedStoriesRef.current.clear();
      const story = getRandomStory(category);
      setCurrentStory(story);
      startTimer();
    },
    [getRandomStory, startTimer]
  );

  return {
    currentStory,
    currentCategory,
    timeLeft,
    drawStory,
    changeCategory,
  };
}
