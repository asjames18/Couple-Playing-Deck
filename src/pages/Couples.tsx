import { useEffect, useState } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useCouplesGame } from '@/hooks/useCouplesGame';
import BackButton from '@/components/BackButton';
import { HeartAnimation } from '@/components/games/HeartAnimation';
import { Link } from 'react-router-dom';

export default function Couples() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('couples');
  const { currentCard, drawCard } = useCouplesGame();
  const [heartTrigger, setHeartTrigger] = useState(0);

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'couples' });
  }, [trackGamePlay]);

  const handleDrawCard = (deckName: 'warmMeUp' | 'beneathTheSkin' | 'nakedHours' | 'theLoveLab' | 'unfilteredLove') => {
    drawCard(deckName);
    setHeartTrigger((prev) => prev + 1);
    trackGamePlay.mutate({
      gameId: 'couples',
      data: { cardsDrawn: 1 },
    });
  };

  return (
    <div className="container">
      <BackButton />
      <h1>Heart & Hustle</h1>
      <p>Dive deep, laugh hard, and connect like never before!</p>
      <div className="deck-buttons">
        <button onClick={() => handleDrawCard('warmMeUp')} data-haptic>
          🌟 Warm Me Up
        </button>
        <button onClick={() => handleDrawCard('beneathTheSkin')} data-haptic>
          🪞 Beneath the Skin
        </button>
        <button onClick={() => handleDrawCard('nakedHours')} data-haptic>
          🌙 Naked Hours
        </button>
        <button onClick={() => handleDrawCard('theLoveLab')} data-haptic>
          🔬 The Love Lab
        </button>
        <button onClick={() => handleDrawCard('unfilteredLove')} data-haptic>
          💣 Unfiltered Love
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
          'Pick a deck to spark the magic!'
        )}
      </div>
      <HeartAnimation trigger={heartTrigger} />
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

