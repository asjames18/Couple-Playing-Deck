import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useWouldYouRather } from '@/hooks/useWouldYouRather';
import { useHaptics } from '@/hooks/useHaptics';
import BackButton from '@/components/BackButton';
import GameScreen from '@/components/GameScreen';
import PrimaryButton from '@/components/PrimaryButton';
import { Link } from 'react-router-dom';
import { pageTransition } from '@/lib/motion';
import type { WouldYouRatherCategory } from '@/lib/game-data/would-you-rather-questions';

export default function WouldYouRather() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('would-you-rather');
  const { currentQuestion, currentCategory, drawQuestion, changeCategory } =
    useWouldYouRather();
  const { triggerShort } = useHaptics();

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'would-you-rather' });
  }, [trackGamePlay]);

  const handleDrawQuestion = () => {
    drawQuestion();
    triggerShort();
    trackGamePlay.mutate({
      gameId: 'would-you-rather',
      data: { cardsDrawn: 1 },
    });
  };

  const categories: WouldYouRatherCategory[] = [
    'all',
    'fun',
    'deep',
    'relationships',
    'lifestyle',
  ];

  if (currentQuestion) {
    return (
      <motion.div {...pageTransition} className="pb-24">
        <GameScreen
          prompt={
            <div className="space-y-4">
              <div className="text-base leading-6 font-semibold mb-4 font-heading">
                {currentQuestion.question}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="px-4 py-6 rounded-xl bg-white/5 text-sm font-medium
                           ring-1 ring-white/10 hover:ring-primary/30 hover:bg-white/10
                           transition-all tap-target focus-visible-ring lighting-3d"
                  data-haptic
                >
                  {currentQuestion.optionA}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  className="px-4 py-6 rounded-xl bg-white/5 text-sm font-medium
                           ring-1 ring-white/10 hover:ring-primary/30 hover:bg-white/10
                           transition-all tap-target focus-visible-ring lighting-3d"
                  data-haptic
                >
                  {currentQuestion.optionB}
                </motion.button>
              </div>
            </div>
          }
          onNext={handleDrawQuestion}
          canGoNext={true}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      {...pageTransition}
      className="container pb-24"
      style={{ paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0))' }}
    >
      <BackButton />
      <h1 className="text-[32px] leading-[1.1] font-heading font-bold mb-2">
        Would You Rather
      </h1>
      <p className="text-base leading-6 text-muted mb-6 font-body">
        Make tough choices and see what your friends choose!
      </p>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            className={`px-4 py-2 rounded-xl font-medium transition-all tap-target focus-visible-ring ${
              currentCategory === cat
                ? 'bg-primary text-white'
                : 'bg-card text-muted hover:bg-card-hover ring-1 ring-white/5'
            }`}
            data-haptic
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <PrimaryButton
        onClick={handleDrawQuestion}
        className="w-full mb-6"
        data-haptic
      >
        Get Question
      </PrimaryButton>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-card shadow-soft p-8 ring-1 ring-white/5 text-center"
      >
        <p className="text-muted">Click "Get Question" to start!</p>
      </motion.div>

      {relatedGames.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <h3 className="text-lg font-semibold mb-4">You might also like:</h3>
          <div className="flex flex-wrap gap-3">
            {relatedGames.map((game) => (
              <Link
                key={game.id}
                to={`/${game.id}`}
                className="px-4 py-2 rounded-xl bg-card text-sm font-medium
                         ring-1 ring-white/5 hover:ring-white/10 transition-all
                         tap-target focus-visible-ring"
                style={{ textDecoration: 'none' }}
              >
                {game.icon} {game.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
