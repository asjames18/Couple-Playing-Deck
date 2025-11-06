import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useCouplesGame } from '@/hooks/useCouplesGame';
import { useGameMode } from '@/hooks/useGameMode';
import { useHaptics } from '@/hooks/useHaptics';
import { useEnergy } from '@/hooks/useEnergy';
import { useStreak } from '@/hooks/useStreak';
import { useXP } from '@/hooks/useXP';
import { useAchievements } from '@/hooks/useAchievements';
import BackButton from '@/components/BackButton';
import GameScreen from '@/components/GameScreen';
import GameModeSelector from '@/components/GameModeSelector';
import { HeartAnimation } from '@/components/games/HeartAnimation';
import { Link } from 'react-router-dom';
import { pageTransition } from '@/lib/motion';

export default function Couples() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('couples');
  const { currentMode, modeConfig, setMode, loadMode } = useGameMode();
  const { currentCard, drawCard } = useCouplesGame(currentMode);
  const { triggerShort } = useHaptics();
  const { useEnergy: consumeEnergy, canPlay } = useEnergy();
  const { recordPlay } = useStreak();
  const { addXP } = useXP();
  const { unlockAchievement } = useAchievements();
  const [heartTrigger, setHeartTrigger] = useState(0);
  const [newAchievement, setNewAchievement] = useState<{ id: string; name: string; icon: string; description: string } | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<
    | 'warmMeUp'
    | 'beneathTheSkin'
    | 'nakedHours'
    | 'theLoveLab'
    | 'unfilteredLove'
    | null
  >(null);
  const [showModeSelector, setShowModeSelector] = useState(false);

  // Load saved mode on mount
  useEffect(() => {
    loadMode();
  }, [loadMode]);

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'couples' });
  }, [trackGamePlay]);

  const handleDrawCard = async (
    deckName:
      | 'warmMeUp'
      | 'beneathTheSkin'
      | 'nakedHours'
      | 'theLoveLab'
      | 'unfilteredLove'
      ) => {
    // Check energy
    if (!canPlay) {
      alert('Not enough energy! Energy recharges over time.');
      return;
    }

    const energyUsed = await consumeEnergy();
    if (!energyUsed) {
      return;
    }

    drawCard(deckName);
    setSelectedDeck(deckName);
    setHeartTrigger((prev) => prev + 1);
    triggerShort();
    
    // Record play for streak
    await recordPlay();
    
    // Add XP
    const { leveledUp, levelName } = await addXP(10);
    if (leveledUp) {
      // Show level up notification
      console.log(`Level Up! You're now ${levelName}!`);
    }
    
    // Check achievements
    const achievement = await unlockAchievement('first_game');
    if (achievement) {
      setNewAchievement({
        id: achievement.id,
        name: achievement.name,
        icon: achievement.icon,
        description: achievement.description,
      });
      // Auto-dismiss after 5 seconds
      setTimeout(() => setNewAchievement(null), 5000);
    }
    
    trackGamePlay.mutate({
      gameId: 'couples',
      data: { cardsDrawn: 1 },
    });
  };

  const handleNextCard = () => {
    if (selectedDeck) {
      handleDrawCard(selectedDeck);
    }
  };

  const decks = [
    { name: 'warmMeUp', label: '🌟 Warm Me Up', icon: '🌟' },
    { name: 'beneathTheSkin', label: '🪞 Beneath the Skin', icon: '🪞' },
    { name: 'nakedHours', label: '🌙 Naked Hours', icon: '🌙' },
    { name: 'theLoveLab', label: '🔬 The Love Lab', icon: '🔬' },
    { name: 'unfilteredLove', label: '💣 Unfiltered Love', icon: '💣' },
  ] as const;

  if (currentCard) {
    return (
      <motion.div {...pageTransition} className="pb-24">
        <AchievementToast
          achievement={newAchievement ? {
            id: newAchievement.id,
            name: newAchievement.name,
            description: newAchievement.description,
            icon: newAchievement.icon,
            category: 'games',
            rarity: 'common',
          } : null}
          onDismiss={() => setNewAchievement(null)}
        />
        <HeartAnimation trigger={heartTrigger} />
        <GameScreen
          prompt={
            <div>
              <div className="text-xs uppercase tracking-widest text-muted mb-3">
                {currentCard.deckName}
              </div>
              <p className="text-base leading-6">{currentCard.cardText}</p>
            </div>
          }
          onNext={handleNextCard}
          canGoNext={!!selectedDeck}
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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[32px] leading-[1.1] font-heading font-bold mb-2">
            Heart & Hustle
          </h1>
          <p className="text-base leading-6 text-muted font-body">
            Dive deep, laugh hard, and connect like never before!
          </p>
        </div>
        <button
          onClick={() => setShowModeSelector(!showModeSelector)}
          className="px-3 py-2 rounded-xl bg-card text-sm font-medium
                   ring-1 ring-white/5 hover:ring-white/10 transition-all
                   tap-target focus-visible-ring"
          data-haptic
          aria-label="Select game mode"
        >
          {modeConfig.icon} {modeConfig.name}
        </button>
      </div>

      {showModeSelector && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mb-6 rounded-xl bg-card shadow-soft p-5 ring-1 ring-white/5"
        >
          <GameModeSelector
            currentMode={currentMode}
            onModeChange={(mode) => {
              setMode(mode);
              setShowModeSelector(false);
            }}
          />
        </motion.div>
      )}

      <div
        className="grid grid-cols-1 gap-4 mb-6"
        role="group"
        aria-label="Deck selection"
      >
        {decks.map((deck) => (
          <motion.button
            key={deck.name}
            onClick={() => handleDrawCard(deck.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDrawCard(deck.name);
              }
            }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Draw card from ${deck.label} deck`}
            data-haptic
            className="w-full rounded-2xl bg-card shadow-soft
                     ring-1 ring-white/5 hover:ring-white/10 transition-all
                     tap-target focus-visible-ring"
            style={{
              backgroundImage: 'radial-gradient(120% 140% at 0% 0%, rgba(255,255,255,.03), transparent 60%)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{deck.icon}</span>
              <span className="text-lg font-semibold">{deck.label}</span>
            </div>
          </motion.button>
        ))}
      </div>

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
