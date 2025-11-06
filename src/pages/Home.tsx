import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRecentGames, useAggregatedStats } from '@/hooks/useGameState';
import { getGameMetadata } from '@/lib/game-metadata';
import GameCard from '@/components/GameCard';
import { pageTransition } from '@/lib/motion';

export default function Home() {
  const navigate = useNavigate();
  const { data: recentGames = [], isLoading: recentGamesLoading } =
    useRecentGames();
  const stats = useAggregatedStats();

  useEffect(() => {
    // Initialize interactive backgrounds if needed
    // This can be done via a hook or component
  }, []);

  const categories = [
    {
      title: 'Relationship Games',
      icon: 'fas fa-heart',
      games: [
        { path: '/couples', name: 'Couples', icon: '💑' },
        { path: '/family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
        { path: '/friends', name: 'Friends', icon: '👥' },
        { path: '/kids', name: 'Kids', icon: '🎮' },
      ],
    },
    {
      title: 'Conversation Starters',
      icon: 'fas fa-comments',
      games: [
        { path: '/truth-or-dare', name: 'Truth or Dare', icon: '🎲' },
        { path: '/would-you-rather', name: 'Would You Rather', icon: '🤔' },
        { path: '/never-have-i-ever', name: 'Never Have I Ever', icon: '🙈' },
        { path: '/two-truths', name: 'Two Truths & a Lie', icon: '🎯' },
      ],
    },
    {
      title: 'Creative Connection',
      icon: 'fas fa-paint-brush',
      games: [
        { path: '/story-time', name: 'Story Time', icon: '📚' },
        { path: '/memory-lane', name: 'Memory Lane', icon: '🏞️' },
        { path: '/gratitude', name: 'Gratitude Journal', icon: '🙏' },
      ],
    },
    {
      title: 'Spiritual Connection',
      icon: 'fas fa-pray',
      games: [
        { path: '/christian', name: 'Christian Games', icon: '✝️' },
        { path: '/real-talk-cards', name: 'Real Talk Cards', icon: '💬' },
      ],
    },
  ];

  const allGames = categories.flatMap((category) => category.games);

  return (
    <motion.div
      {...pageTransition}
      className="pb-24"
      style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0))' }}
    >
      {/* Hero Section */}
      <header className="text-center py-8 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[32px] leading-[1.1] font-heading font-bold mb-2"
        >
          Connecting Games Hub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="text-base leading-6 text-muted"
        >
          Spark meaningful connections through play
        </motion.p>
        {stats.totalGames > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center gap-3 mt-4"
          >
            <span className="px-3 py-1 rounded-full bg-card text-sm text-muted">
              🎮 {stats.totalGames} Games
            </span>
            <span className="px-3 py-1 rounded-full bg-card text-sm text-muted">
              🃏 {stats.totalCards} Cards
            </span>
          </motion.div>
        )}
      </header>

      {/* Resume Game Chip */}
      {!recentGamesLoading && recentGames.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="px-4 mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-lg font-semibold">Resume Game</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {recentGames.slice(0, 2).map((game) => {
              const gameId = game.url.replace('/', '');
              const metadata = getGameMetadata(gameId);
              return (
                <GameCard
                  key={game.url}
                  title={metadata.name || game.name}
                  icon={metadata.icon || game.icon}
                  onTap={() => navigate(game.url)}
                  description="Continue"
                />
              );
            })}
          </div>
        </motion.section>
      )}

      {/* All Games Grid */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="px-4"
      >
        <h2 className="text-lg font-semibold mb-4">All Games</h2>
        <div className="grid grid-cols-2 gap-4">
              {allGames.map((game) => (
                <GameCard
                  key={game.path}
                  title={game.name}
                  icon={game.icon}
                  onTap={() => navigate(game.path)}
                  showHeartRipple={true}
                />
              ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
