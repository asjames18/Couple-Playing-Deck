import { useEffect } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useNeverHaveIEver } from '@/hooks/useNeverHaveIEver';
import BackButton from '@/components/BackButton';
import { Link } from 'react-router-dom';
import type { NeverHaveIEverCategory } from '@/lib/game-data/never-have-i-ever-statements';

export default function NeverHaveIEver() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('never-have-i-ever');
  const { currentStatement, currentCategory, drawStatement, changeCategory } =
    useNeverHaveIEver();

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'never-have-i-ever' });
  }, [trackGamePlay]);

  const categories: NeverHaveIEverCategory[] = [
    'all',
    'fun',
    'wild',
    'relationships',
    'travel',
  ];

  return (
    <div className="container">
      <BackButton />
      <h1>Never Have I Ever</h1>
      <p>Reveal your secrets and see who's done what!</p>

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

      <button
        onClick={drawStatement}
        data-haptic
        className="btn-gaming-primary"
        style={{ marginBottom: '1rem' }}
      >
        Draw Statement
      </button>

      {currentStatement && (
        <div
          className="card-display"
          style={{
            minHeight: '150px',
            padding: '2rem',
            marginTop: '1rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Never have I ever... {currentStatement}
        </div>
      )}

      {!currentStatement && (
        <div
          id="card-display"
          className="card-display"
          style={{
            minHeight: '150px',
            padding: '2rem',
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
          Click "Draw Statement" to start!
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
