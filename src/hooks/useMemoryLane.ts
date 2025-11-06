import { useState, useCallback, useRef } from 'react';
import { memories, type Memory } from '@/lib/game-data/memories';

export function useMemoryLane() {
  const [currentMemory, setCurrentMemory] = useState<Memory | null>(null);
  const usedMemoriesRef = useRef<Set<string>>(new Set());

  const getRandomMemory = useCallback((): Memory | null => {
    const available = memories.filter(
      (m) => !usedMemoriesRef.current.has(m.date)
    );

    if (available.length === 0) {
      usedMemoriesRef.current.clear();
      const randomIndex = Math.floor(Math.random() * memories.length);
      const memory = memories[randomIndex];
      usedMemoriesRef.current.add(memory.date);
      return memory;
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    const memory = available[randomIndex];
    usedMemoriesRef.current.add(memory.date);
    return memory;
  }, []);

  const drawMemory = useCallback(() => {
    const memory = getRandomMemory();
    setCurrentMemory(memory);
  }, [getRandomMemory]);

  const reset = useCallback(() => {
    usedMemoriesRef.current.clear();
    setCurrentMemory(null);
  }, []);

  return {
    currentMemory,
    drawMemory,
    reset,
  };
}
