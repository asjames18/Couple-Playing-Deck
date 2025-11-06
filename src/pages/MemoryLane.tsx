import { useEffect } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useMemoryLane } from '@/hooks/useMemoryLane';
import BackButton from '@/components/BackButton';
import { Link } from 'react-router-dom';

export default function MemoryLane() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('memory-lane');
  const { currentMemory, drawMemory } = useMemoryLane();

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'memory-lane' });
  }, [trackGamePlay]);

  return (
    <div className="container">
      <BackButton />
      <h1>Memory Lane</h1>
      <p>Walk down memory lane and relive your favorite moments together!</p>

      <button
        onClick={drawMemory}
        data-haptic
        className="btn-gaming-primary"
        style={{ marginBottom: '1rem' }}
      >
        Draw a Memory
      </button>

      {currentMemory && (
        <div
          className="memory-container"
          style={{
            minHeight: '200px',
            padding: '2rem',
            marginTop: '1rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--color-primary)',
            }}
          >
            {currentMemory.date}
          </div>
          <div style={{ fontSize: '1.2rem', lineHeight: '1.8' }}>
            {currentMemory.text}
          </div>
        </div>
      )}

      {!currentMemory && (
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
          Click "Draw a Memory" to start!
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
