import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getRecentGames,
  addRecentGame,
  getGameStats,
  updateGameStat,
  RecentGame,
  GameStats,
} from '@/lib/db';
import { getGameMetadata, getRelatedGames } from '@/lib/game-metadata';

export function useRecentGames() {
  return useQuery({
    queryKey: ['recentGames'],
    queryFn: getRecentGames,
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useGameStats() {
  return useQuery({
    queryKey: ['gameStats'],
    queryFn: getGameStats,
    staleTime: 1000 * 60, // 1 minute
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
      queryClient.invalidateQueries({ queryKey: ['recentGames'] });
      queryClient.invalidateQueries({ queryKey: ['gameStats'] });
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
    totalGames += gameStats.plays || 0;
    totalCards += gameStats.cardsDrawn || 0;
    totalTime += gameStats.timeSpent || 0;

    if (gameStats.plays > maxPlays) {
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

