import { useEffect } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useWouldYouRather } from '@/hooks/useWouldYouRather';
import BackButton from '@/components/BackButton';
import { Link } from 'react-router-dom';
import type { WouldYouRatherCategory } from '@/lib/game-data/would-you-rather-questions';

export default function WouldYouRather() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('would-you-rather');
  const { currentQuestion, currentCategory, drawQuestion, changeCategory } = useWouldYouRather();

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'would-you-rather' });
  }, [trackGamePlay]);

  const categories: WouldYouRatherCategory[] = ['all', 'fun', 'deep', 'relationships', 'lifestyle'];

  return (
    <div className="container">
      <BackButton />
      <h1>Would You Rather</h1>
      <p>Make tough choices and see what your friends choose!</p>

      <div className="category-selector" style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
              background: currentCategory === cat ? 'var(--color-primary)' : 'transparent',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <button onClick={drawQuestion} data-haptic className="btn-gaming-primary" style={{ marginBottom: '1rem' }}>
        Get Question
      </button>

      {currentQuestion && (
        <div
          className="question-container"
          style={{
            minHeight: '200px',
            padding: '2rem',
            marginTop: '1rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="question-text" style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '2rem' }}>
            {currentQuestion.question}
          </div>
          <div className="options-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <button
              className="option-card btn-gaming-secondary"
              data-haptic
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '1.1rem',
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              {currentQuestion.optionA}
            </button>
            <button
              className="option-card btn-gaming-secondary"
              data-haptic
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '1.1rem',
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              {currentQuestion.optionB}
            </button>
          </div>
        </div>
      )}

      {!currentQuestion && (
        <div
          id="card-display"
          className="card-display"
          style={{
            minHeight: '200px',
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
          Click "Get Question" to start!
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

