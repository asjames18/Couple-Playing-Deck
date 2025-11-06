import { useEffect } from 'react';
import { useTrackGamePlay, useRelatedGames } from '@/hooks/useGameState';
import { useStoryTime } from '@/hooks/useStoryTime';
import BackButton from '@/components/BackButton';
import { Link } from 'react-router-dom';
import type { StoryCategory } from '@/lib/game-data/stories';

export default function StoryTime() {
  const trackGamePlay = useTrackGamePlay();
  const relatedGames = useRelatedGames('story-time');
  const { currentStory, currentCategory, timeLeft, drawStory, changeCategory } =
    useStoryTime();

  useEffect(() => {
    trackGamePlay.mutate({ gameId: 'story-time' });
  }, [trackGamePlay]);

  const categories: StoryCategory[] = [
    'all',
    'funny',
    'romantic',
    'adventure',
    'embarrassing',
  ];

  return (
    <div className="container">
      <BackButton />
      <h1>Story Time</h1>
      <p>Create stories together and share your adventures!</p>

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
        onClick={drawStory}
        data-haptic
        className="btn-gaming-primary"
        style={{ marginBottom: '1rem' }}
      >
        Get Story Prompt
      </button>

      {currentStory && (
        <div
          className="card-display"
          style={{
            minHeight: '200px',
            padding: '2rem',
            marginTop: '1rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-bg-card)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            fontSize: '1.2rem',
            lineHeight: '1.8',
          }}
        >
          <div style={{ marginBottom: '1rem' }}>{currentStory}</div>
          {timeLeft !== null && (
            <div
              className="timer"
              style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '1rem' }}
            >
              {timeLeft > 0 ? `Time remaining: ${timeLeft}s` : "Time's up!"}
            </div>
          )}
        </div>
      )}

      {!currentStory && (
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
          Click "Get Story Prompt" to start!
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
