import { useEffect, useState } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useKidsGame } from '@/hooks/useKidsGame';
import BackButton from '@/components/BackButton';
import { StarAnimation } from '@/components/games/StarAnimation';
import { Link } from 'react-router-dom';

export default function Kids() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('kids');
  const { currentCard, drawCard } = useKidsGame();
  const [starTrigger, setStarTrigger] = useState(0);

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'kids' });
  }, [trackGamePlay]);

  const handleDrawCard = (deckName: 'feelings' | 'dreams' | 'memories') => {
    drawCard(deckName);
    setStarTrigger((prev) => prev + 1);
    trackGamePlay.mutate({
      gameId: 'kids',
      data: { cardsDrawn: 1 },
    });
  };

  return (
    <div className="container">
      <BackButton />
      <h1>Kids Connections</h1>
      <p>Fun questions to help kids express themselves and connect!</p>
      <div className="deck-buttons">
        <button onClick={() => handleDrawCard('feelings')} data-haptic>
          😊 Feelings
        </button>
        <button onClick={() => handleDrawCard('dreams')} data-haptic>
          ✨ Dreams
        </button>
        <button onClick={() => handleDrawCard('memories')} data-haptic>
          🌟 Memories
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
          'Pick a deck to start the conversation!'
        )}
      </div>
      <StarAnimation trigger={starTrigger} />
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

