import { useEffect } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useTruthOrDare } from '@/hooks/useTruthOrDare';
import BackButton from '@/components/BackButton';
import { Link } from 'react-router-dom';
import type { ChallengeCategory } from '@/lib/game-data/challenges';

export default function TruthOrDare() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('truth-or-dare');
  const {
    currentChallenge,
    currentCategory,
    timeLeft,
    getTruth,
    getDare,
    nextChallenge,
    changeCategory,
  } = useTruthOrDare();

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'truth-or-dare' });
  }, [trackGamePlay]);

  const categories: ChallengeCategory[] = [
    'all',
    'fun',
    'deep',
    'relationships',
    'lifestyle',
  ];

  return (
    <div className="container">
      <BackButton />
      <h1>Truth or Dare</h1>
      <p>Choose truth or dare and reveal your secrets!</p>

      <div
        className="category-selector"
        style={{
          marginBottom: '1rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            className={`category-btn ${currentCategory === cat ? 'active' : ''}`}
            data-haptic
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background:
                currentCategory === cat
                  ? 'var(--color-primary)'
                  : 'transparent',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          marginBottom: '1rem',
        }}
      >
        <button onClick={getTruth} data-haptic className="btn-gaming-primary">
          🔍 Truth
        </button>
        <button onClick={getDare} data-haptic className="btn-gaming-primary">
          ⚡ Dare
        </button>
      </div>

      {currentChallenge && (
        <div
          className="card-display"
          style={{
            minHeight: '150px',
            padding: '1.5rem',
            marginTop: '1rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: `2px solid ${currentChallenge.type === 'truth' ? '#4CAF50' : '#FF9800'}`,
            textAlign: 'center',
          }}
        >
          <div
            className="challenge-type"
            style={{
              fontSize: '0.9rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: currentChallenge.type === 'truth' ? '#4CAF50' : '#FF9800',
            }}
          >
            {currentChallenge.type.toUpperCase()}
          </div>
          <div
            className="challenge-text"
            style={{ fontSize: '1.2rem', marginBottom: '1rem' }}
          >
            {currentChallenge.text}
          </div>
          {timeLeft !== null && (
            <div className="timer" style={{ fontSize: '0.9rem', opacity: 0.7 }}>
              {timeLeft > 0 ? `Time remaining: ${timeLeft}s` : "Time's up!"}
            </div>
          )}
          <button
            onClick={nextChallenge}
            data-haptic
            style={{ marginTop: '1rem' }}
            className="btn-gaming-secondary"
          >
            Next Challenge
          </button>
        </div>
      )}

      {!currentChallenge && (
        <div
          id="card-display"
          className="card-display"
          style={{
            minHeight: '150px',
            padding: '1.5rem',
            marginTop: '1rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Choose Truth or Dare to start!
        </div>
      )}

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
