import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import {
  saveSession,
  getSession,
  saveGameState,
  getGameState,
  type GameSession,
} from '@/lib/db';

export function useGameSession(deckId: string) {
  const location = useLocation();
  const [session, setSession] = useState<GameSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session on mount
  useEffect(() => {
    async function loadSession() {
      try {
        // Try to get last session for this deck
        const lastSessionKey = `lastSession_${deckId}`;
        const lastSessionId = (await getGameState(lastSessionKey)) as
          | string
          | null;

        if (lastSessionId && typeof lastSessionId === 'string') {
          const loadedSession = await getSession(lastSessionId);
          if (loadedSession && !loadedSession.endedAt) {
            setSession(loadedSession);
          }
        }
      } catch (error) {
        console.warn('Failed to load session:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadSession();
  }, [deckId]);

  // Save session on visibility change or before unload
  useEffect(() => {
    if (!session) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && session) {
        saveSession(session).catch(console.error);
        // Also save to gameState for quick resume
        saveGameState(`lastSession_${deckId}`, session.sessionId).catch(
          console.error
        );
        // Save current URL for offline resume
        saveGameState('lastSession', {
          url: location.pathname,
          sessionId: session.sessionId,
        }).catch(console.error);
      }
    };

    const handleBeforeUnload = () => {
      if (session) {
        // Use sendBeacon for reliable save on page unload
        const data = JSON.stringify(session);
        navigator.sendBeacon?.(
          '/api/save-session',
          new Blob([data], { type: 'application/json' })
        );
        // Fallback to sync save
        saveSession(session).catch(console.error);
        saveGameState(`lastSession_${deckId}`, session.sessionId).catch(
          console.error
        );
        saveGameState('lastSession', {
          url: location.pathname,
          sessionId: session.sessionId,
        }).catch(console.error);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [session, deckId, location.pathname]);

  const createSession = useCallback(
    (initialData: Omit<GameSession, 'sessionId' | 'startedAt'>) => {
      const newSession: GameSession = {
        ...initialData,
        sessionId: `${deckId}_${Date.now()}`,
        startedAt: Date.now(),
      };
      setSession(newSession);
      saveSession(newSession).catch(console.error);
      return newSession;
    },
    [deckId]
  );

  const updateSession = useCallback(
    (updates: Partial<GameSession>) => {
      if (!session) return;
      const updated = { ...session, ...updates };
      setSession(updated);
      saveSession(updated).catch(console.error);
    },
    [session]
  );

  const endSession = useCallback(() => {
    if (!session) return;
    const ended = { ...session, endedAt: Date.now() };
    setSession(null);
    saveSession(ended).catch(console.error);
  }, [session]);

  return {
    session,
    isLoading,
    createSession,
    updateSession,
    endSession,
  };
}
