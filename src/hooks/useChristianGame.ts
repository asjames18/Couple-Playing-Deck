import { useState, useCallback, useRef } from 'react';
import {
  spiritualPaths,
  type SpiritualPathName,
  type SpiritualPrompt,
} from '@/lib/game-data/spiritual-content';

export function useChristianGame() {
  const [currentPrompt, setCurrentPrompt] = useState<SpiritualPrompt | null>(null);
  const [currentPath, setCurrentPath] = useState<SpiritualPathName>('reflect');
  const usedPromptsRef = useRef<Set<string>>(new Set());

  const getRandomPrompt = useCallback(
    (path: SpiritualPathName): SpiritualPrompt | null => {
      const pathData = spiritualPaths[path];
      if (!pathData || !pathData.prompts || pathData.prompts.length === 0) {
        return null;
      }

      const available = pathData.prompts.filter(
        (p) => !usedPromptsRef.current.has(`${path}-${p.text}`)
      );

      if (available.length === 0) {
        usedPromptsRef.current.clear();
        const randomIndex = Math.floor(Math.random() * pathData.prompts.length);
        const prompt = pathData.prompts[randomIndex];
        usedPromptsRef.current.add(`${path}-${prompt.text}`);
        return prompt;
      }

      const randomIndex = Math.floor(Math.random() * available.length);
      const prompt = available[randomIndex];
      usedPromptsRef.current.add(`${path}-${prompt.text}`);
      return prompt;
    },
    []
  );

  const drawPrompt = useCallback(() => {
    const prompt = getRandomPrompt(currentPath);
    setCurrentPrompt(prompt);
  }, [currentPath, getRandomPrompt]);

  const changePath = useCallback(
    (path: SpiritualPathName) => {
      setCurrentPath(path);
      usedPromptsRef.current.clear();
      const prompt = getRandomPrompt(path);
      setCurrentPrompt(prompt);
    },
    [getRandomPrompt]
  );

  const paths = Object.keys(spiritualPaths) as SpiritualPathName[];

  return {
    currentPrompt,
    currentPath,
    paths,
    drawPrompt,
    changePath,
  };
}

