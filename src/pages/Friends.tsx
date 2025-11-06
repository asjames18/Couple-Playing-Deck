import { useEffect, useState } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useFriendsGame } from '@/hooks/useFriendsGame';
import BackButton from '@/components/BackButton';
import { BubbleAnimation } from '@/components/games/BubbleAnimation';
import { Link } from 'react-router-dom';

export default function Friends() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('friends');
  const { currentCard, drawCard } = useFriendsGame();
  const [bubbleTrigger, setBubbleTrigger] = useState(0);

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'friends' });
  }, [trackGamePlay]);

  const handleDrawCard = (
    deckName: 'mindMeld' | 'realOnesOnly' | 'vibesAndChaos' | 'circleTight'
  ) => {
    drawCard(deckName);
    setBubbleTrigger((prev) => prev + 1);
    trackGamePlay.mutate({
      gameId: 'friends',
      data: { cardsDrawn: 1 },
    });
  };

  return (
    <div className="container">
      <BackButton />
      <h1>Friend Connections</h1>
      <p>Deepen bonds, share laughs, and build unbreakable friendships!</p>
      <div className="deck-buttons">
        <button onClick={() => handleDrawCard('mindMeld')} data-haptic>
          🧠 Mind Meld
        </button>
        <button onClick={() => handleDrawCard('realOnesOnly')} data-haptic>
          💎 Real Ones Only
        </button>
        <button onClick={() => handleDrawCard('vibesAndChaos')} data-haptic>
          🎉 Vibes & Chaos
        </button>
        <button onClick={() => handleDrawCard('circleTight')} data-haptic>
          🔒 Circle Tight
        </button>
      </div>
      <div
        id="card-display"
        className="card-display"
        style={{
          minHeight: '100px',
          padding: '1rem',
          marginTop: '1rem',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--color-bg-card)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {currentCard ? (
          <div>
            <strong>{currentCard.deckName}:</strong> {currentCard.cardText}
          </div>
        ) : (
          'Pick a deck to spark the connection!'
        )}
      </div>
      <BubbleAnimation trigger={bubbleTrigger} />
      {relatedGames.length > 0 && (
        <div className="related-games-section" style={{ marginTop: '2rem' }}>
          <h3>You might also like:</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {relatedGames.map((game) => (
              <Link
                key={game.id}
                to={`/${game.id}`}
                className="btn-gaming-secondary"
                style={{ textDecoration: 'none' }}
              >
                {game.icon} {game.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
