import { useState, useCallback, useRef } from 'react';
import {
  neverHaveIEverStatements,
  type NeverHaveIEverCategory,
} from '@/lib/game-data/never-have-i-ever-statements';

export function useNeverHaveIEver() {
  const [currentStatement, setCurrentStatement] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] =
    useState<NeverHaveIEverCategory>('all');
  const usedStatementsRef = useRef<Set<string>>(new Set());

  const getRandomStatement = useCallback(
    (category: NeverHaveIEverCategory): string | null => {
      const statements = neverHaveIEverStatements[category];
      if (!statements || statements.length === 0) {
        return null;
      }

      // Filter out used statements
      const available = statements.filter(
        (s) => !usedStatementsRef.current.has(s)
      );

      if (available.length === 0) {
        // Reset if all statements used
        usedStatementsRef.current.clear();
        const randomIndex = Math.floor(Math.random() * statements.length);
        const statement = statements[randomIndex];
        usedStatementsRef.current.add(statement);
        return statement;
      }

      const randomIndex = Math.floor(Math.random() * available.length);
      const statement = available[randomIndex];
      usedStatementsRef.current.add(statement);
      return statement;
    },
    []
  );

  const drawStatement = useCallback(() => {
    const statement = getRandomStatement(currentCategory);
    setCurrentStatement(statement);
  }, [currentCategory, getRandomStatement]);

  const changeCategory = useCallback(
    (category: NeverHaveIEverCategory) => {
      setCurrentCategory(category);
      usedStatementsRef.current.clear();
      const statement = getRandomStatement(category);
      setCurrentStatement(statement);
    },
    [getRandomStatement]
  );

  const reset = useCallback(() => {
    usedStatementsRef.current.clear();
    setCurrentStatement(null);
  }, []);

  return {
    currentStatement,
    currentCategory,
    drawStatement,
    changeCategory,
    reset,
  };
}
