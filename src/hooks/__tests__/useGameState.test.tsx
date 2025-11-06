import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useRecentGames } from '../useGameState';
import * as db from '@/lib/db';

// Mock the db module
vi.mock('@/lib/db', () => ({
  getRecentGames: vi.fn(),
  getGameStats: vi.fn(),
  addRecentGame: vi.fn(),
  updateGameStat: vi.fn(),
}));

describe('useGameState', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it('fetches recent games', async () => {
    const mockGames = [
      {
        id: 1,
        url: '/couples',
        name: 'Couples',
        icon: '💑',
        category: 'relationship',
        playedAt: Date.now(),
      },
    ];

    vi.mocked(db.getRecentGames).mockResolvedValue(mockGames);

    const { result } = renderHook(() => useRecentGames(), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockGames);
    expect(db.getRecentGames).toHaveBeenCalled();
  });
});
