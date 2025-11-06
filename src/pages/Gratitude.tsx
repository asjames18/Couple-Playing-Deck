import { useEffect } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useGratitude } from '@/hooks/useGratitude';
import BackButton from '@/components/BackButton';
import { Link } from 'react-router-dom';

export default function Gratitude() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('gratitude');
  const {
    currentPrompt,
    currentCategory,
    categories,
    drawPrompt,
    changeCategory,
  } = useGratitude();

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'gratitude' });
  }, [trackGamePlay]);

  return (
    <div className="container">
      <BackButton />
      <h1>Gratitude Journal</h1>
      <p>Express your gratitude and reflect on what you're thankful for!</p>

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
        <button
          onClick={() => changeCategory('all')}
          className={`category-btn ${currentCategory === 'all' ? 'active' : ''}`}
          data-haptic
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            background:
              currentCategory === 'all'
                ? 'var(--color-primary)'
                : 'transparent',
            color: 'var(--color-text)',
            cursor: 'pointer',
          }}
        >
          All
        </button>
        {categories.slice(0, 5).map((cat) => (
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
            {cat}
          </button>
        ))}
      </div>

      <button
        onClick={drawPrompt}
        data-haptic
        className="btn-gaming-primary"
        style={{ marginBottom: '1rem' }}
      >
        Get Gratitude Prompt
      </button>

      {currentPrompt && (
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
          }}
        >
          <div
            style={{ fontSize: '0.9rem', opacity: 0.7, marginBottom: '0.5rem' }}
          >
            {currentPrompt.category}
          </div>
          <div
            style={{ fontSize: '1.3rem', fontWeight: '600', lineHeight: '1.8' }}
          >
            {currentPrompt.text}
          </div>
        </div>
      )}

      {!currentPrompt && (
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
          Click "Get Gratitude Prompt" to start!
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
