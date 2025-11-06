import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getRecentGames,
  addRecentGame,
  getGameStats,
  updateGameStat,
  RecentGame,
} from '@/lib/db';
import { getGameMetadata, getRelatedGames } from '@/lib/game-metadata';

// Query keys - separate for local (IDB) vs remote data
export const queryKeys = {
  recentGames: ['games', 'recent'] as const,
  gameStats: ['games', 'stats'] as const,
  gameStat: (gameId: string) => ['games', 'stats', gameId] as const,
  // Future: remote queries would use different keys like ['api', 'games']
};

export function useRecentGames() {
  return useQuery({
    queryKey: queryKeys.recentGames,
    queryFn: getRecentGames,
    staleTime: Infinity, // IDB-only data never goes stale
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });
}

export function useGameStats() {
  return useQuery({
    queryKey: queryKeys.gameStats,
    queryFn: getGameStats,
    staleTime: Infinity, // IDB-only data never goes stale
    gcTime: 1000 * 60 * 60, // Keep in cache for 1 hour
  });
}

export function useTrackGamePlay() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      gameId,
      data = {},
    }: {
      gameId: string;
      data?: Record<string, unknown>;
    }) => {
      const metadata = getGameMetadata(gameId);
      const game: Omit<RecentGame, 'id'> = {
        url: `/${gameId}`,
        name: metadata.name,
        icon: metadata.icon,
        category: metadata.category,
        playedAt: Date.now(),
        ...data,
      };

      await addRecentGame(game);

      // Update game stats
      const stats = await getGameStats();
      const gameStats = stats[gameId] || {
        plays: 0,
        cardsDrawn: 0,
        timeSpent: 0,
        lastPlayed: Date.now(),
      };

      gameStats.plays += 1;
      gameStats.lastPlayed = Date.now();

      if (data.cardsDrawn) {
        gameStats.cardsDrawn += data.cardsDrawn as number;
      }
      if (data.timeSpent) {
        gameStats.timeSpent += data.timeSpent as number;
      }

      await updateGameStat(gameId, gameStats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.recentGames });
      queryClient.invalidateQueries({ queryKey: queryKeys.gameStats });
    },
  });
}

export function useAggregatedStats() {
  const { data: stats } = useGameStats();
  const { data: recentGames } = useRecentGames();

  if (!stats || !recentGames) {
    return {
      totalGames: 0,
      totalCards: 0,
      totalTime: 0,
      gamesPlayed: 0,
      favoriteGame: null,
    };
  }

  let totalGames = 0;
  let totalCards = 0;
  let totalTime = 0;
  let maxPlays = 0;
  let favoriteGame = null;

  Object.entries(stats).forEach(([gameId, gameStats]) => {
    // Skip if gameStats is undefined or null
    if (!gameStats) {
      return;
    }

    totalGames += gameStats.plays || 0;
    totalCards += gameStats.cardsDrawn || 0;
    totalTime += gameStats.timeSpent || 0;

    if (gameStats.plays && gameStats.plays > maxPlays) {
      maxPlays = gameStats.plays;
      const metadata = getGameMetadata(gameId);
      favoriteGame = {
        id: gameId,
        name: metadata.name,
        icon: metadata.icon,
        plays: gameStats.plays,
      };
    }
  });

  return {
    totalGames,
    totalCards,
    totalTime: Math.floor(totalTime / 60), // Convert to minutes
    gamesPlayed: recentGames.length,
    favoriteGame,
  };
}

export function useRelatedGames(currentGameId: string) {
  return getRelatedGames(currentGameId);
}
