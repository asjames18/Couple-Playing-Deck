import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { questions, type DifficultyLevel, type Stage, type LoveEscapeQuestion } from '@/lib/game-data/love-escape-questions';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function selectQuestions(difficulty: DifficultyLevel): LoveEscapeQuestion[] {
  const stages: Stage[] = ['easy', 'normal', 'hard'];
  const selected: LoveEscapeQuestion[] = [];
  
  stages.forEach((stage) => {
    const available = [...questions[stage]];
    const shuffled = shuffleArray(available);
    // Select 5 questions from each stage
    selected.push(...shuffled.slice(0, 5));
  });
  
  return selected;
}

const TIME_LIMITS: Record<DifficultyLevel, number> = {
  easy: 20 * 60, // 20 minutes
  normal: 15 * 60, // 15 minutes
  hard: 10 * 60, // 10 minutes
};

const HINT_LIMITS: Record<DifficultyLevel, number> = {
  easy: 4,
  normal: 3,
  hard: 2,
};

export function useLoveEscape() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hintsLeft, setHintsLeft] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [score, setScore] = useState(0);
  const [currentStage, setCurrentStage] = useState<Stage>('easy');
  const [currentQuestions, setCurrentQuestions] = useState<LoveEscapeQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameFailed, setGameFailed] = useState(false);

  const timerIntervalRef = useRef<number | null>(null);

  const currentQuestion = useMemo(() => {
    if (currentQuestions.length > 0 && currentQuestionIndex < currentQuestions.length) {
      return currentQuestions[currentQuestionIndex];
    }
    return null;
  }, [currentQuestions, currentQuestionIndex]);

  const progress = useMemo(() => {
    return Math.min(100, Math.round((questionsAnswered / 15) * 100));
  }, [questionsAnswered]);

  const startGame = useCallback(
    (level: DifficultyLevel) => {
      const selectedQuestions = selectQuestions(level);
      setDifficulty(level);
      setTimeLeft(TIME_LIMITS[level]);
      setHintsLeft(HINT_LIMITS[level]);
      setCurrentQuestions(selectedQuestions);
      setCurrentQuestionIndex(0);
      setCurrentStage('easy');
      setQuestionsAnswered(0);
      setScore(0);
      setUserAnswer('');
      setShowHint(false);
      setAchievements([]);
      setGameCompleted(false);
      setGameFailed(false);
      setGameStarted(true);
      setIsPaused(false);

      // Add achievement for quick completion
      if (TIME_LIMITS[level] <= 600) {
        setAchievements((prev) => [...prev, 'Quick Hearts']);
      }
    },
    []
  );

  const checkAnswer = useCallback(() => {
    if (!currentQuestion) return false;

    const normalizedAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrect = currentQuestion.answer.toLowerCase();

    if (normalizedAnswer === normalizedCorrect) {
      setScore((prev) => prev + 10);
      setQuestionsAnswered((prev) => prev + 1);
      setUserAnswer('');
      setShowHint(false);

      // Move to next question
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        
        // Update stage based on progress
        const newIndex = currentQuestionIndex + 1;
        if (newIndex < 5) {
          setCurrentStage('easy');
        } else if (newIndex < 10) {
          setCurrentStage('normal');
        } else {
          setCurrentStage('hard');
        }
      } else {
        // Game completed!
        setGameCompleted(true);
        setAchievements((prev) => [...prev, 'Love Master']);
        if (timerIntervalRef.current) {
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
      }
      return true;
    }
    return false;
  }, [currentQuestion, userAnswer, currentQuestionIndex, currentQuestions]);

  const useHint = useCallback(() => {
    if (hintsLeft > 0 && currentQuestion) {
      setHintsLeft((prev) => prev - 1);
      setShowHint(true);
    }
  }, [hintsLeft, currentQuestion]);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const resetGame = useCallback(() => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setGameStarted(false);
    setDifficulty(null);
    setTimeLeft(0);
    setIsPaused(false);
    setHintsLeft(0);
    setQuestionsAnswered(0);
    setScore(0);
    setCurrentStage('easy');
    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setShowHint(false);
    setAchievements([]);
    setGameCompleted(false);
    setGameFailed(false);
  }, []);

  // Timer effect
  useEffect(() => {
    if (!gameStarted || isPaused || gameCompleted || gameFailed) {
      return;
    }

    timerIntervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up
          setGameFailed(true);
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [gameStarted, isPaused, gameCompleted, gameFailed]);

  const stageTitle = useMemo(() => {
    const titles: Record<Stage, string> = {
      easy: 'Stage 1: Flirty & Fun',
      normal: 'Stage 2: Deep & Meaningful',
      hard: 'Stage 3: Ultimate Connection',
    };
    return titles[currentStage];
  }, [currentStage]);

  const timeDisplay = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }, [timeLeft]);

  return {
    // Player info
    player1,
    player2,
    setPlayer1,
    setPlayer2,
    
    // Game state
    difficulty,
    gameStarted,
    gameCompleted,
    gameFailed,
    timeLeft,
    timeDisplay,
    isPaused,
    hintsLeft,
    questionsAnswered,
    score,
    progress,
    currentStage,
    stageTitle,
    currentQuestion,
    userAnswer,
    setUserAnswer,
    showHint,
    achievements,
    
    // Actions
    startGame,
    checkAnswer,
    useHint,
    togglePause,
    resetGame,
  };
}

