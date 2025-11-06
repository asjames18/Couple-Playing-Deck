import { useEffect, useState } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useFamilyGame } from '@/hooks/useFamilyGame';
import BackButton from '@/components/BackButton';
import { StarAnimation } from '@/components/games/StarAnimation';
import { Link } from 'react-router-dom';

export default function Family() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('family');
  const { currentCard, drawCard } = useFamilyGame();
  const [starTrigger, setStarTrigger] = useState(0);

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'family' });
  }, [trackGamePlay]);

  const handleDrawCard = (
    deckName: 'rootsAndBranches' | 'insideOut' | 'usTime' | 'realTalk'
  ) => {
    drawCard(deckName);
    setStarTrigger((prev) => prev + 1);
    trackGamePlay.mutate({
      gameId: 'family',
      data: { cardsDrawn: 1 },
    });
  };

  return (
    <div className="container">
      <BackButton />
      <h1>Family Connections</h1>
      <p>Strengthen bonds, share stories, and create lasting memories!</p>
      <div className="deck-buttons">
        <button onClick={() => handleDrawCard('rootsAndBranches')} data-haptic>
          👨‍👩‍👧‍👦 Roots & Branches
        </button>
        <button onClick={() => handleDrawCard('insideOut')} data-haptic>
          ❤️ Inside Out
        </button>
        <button onClick={() => handleDrawCard('usTime')} data-haptic>
          🎉 Us Time
        </button>
        <button onClick={() => handleDrawCard('realTalk')} data-haptic>
          ⚡ Real Talk
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
          'Pick a deck to bring the family closer!'
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

