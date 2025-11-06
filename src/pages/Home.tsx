import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { useRecentGames, useAggregatedStats } from '@/hooks/useGameState';
import { getGameMetadata } from '@/lib/game-metadata';

export default function Home() {
  const { toggleTheme } = useTheme();
  const { data: recentGames = [], isLoading: recentGamesLoading } =
    useRecentGames();
  const stats = useAggregatedStats();

  useEffect(() => {
    // Initialize interactive backgrounds if needed
    // This can be done via a hook or component
  }, []);

  const categories = [
    {
      title: 'Relationship Games',
      icon: 'fas fa-heart',
      games: [
        { path: '/couples', name: 'Couples', icon: '💑' },
        { path: '/family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
        { path: '/friends', name: 'Friends', icon: '👥' },
        { path: '/kids', name: 'Kids', icon: '🎮' },
      ],
    },
    {
      title: 'Conversation Starters',
      icon: 'fas fa-comments',
      games: [
        { path: '/truth-or-dare', name: 'Truth or Dare', icon: '🎲' },
        { path: '/would-you-rather', name: 'Would You Rather', icon: '🤔' },
        { path: '/never-have-i-ever', name: 'Never Have I Ever', icon: '🙈' },
        { path: '/two-truths', name: 'Two Truths & a Lie', icon: '🎯' },
      ],
    },
    {
      title: 'Creative Connection',
      icon: 'fas fa-paint-brush',
      games: [
        { path: '/story-time', name: 'Story Time', icon: '📚' },
        { path: '/memory-lane', name: 'Memory Lane', icon: '🏞️' },
        { path: '/gratitude', name: 'Gratitude Journal', icon: '🙏' },
      ],
    },
    {
      title: 'Spiritual Connection',
      icon: 'fas fa-pray',
      games: [
        { path: '/christian', name: 'Christian Games', icon: '✝️' },
        { path: '/real-talk-cards', name: 'Real Talk Cards', icon: '💬' },
      ],
    },
  ];

  return (
    <div className="background-animation">
      <main className="container">
        <nav className="app-bar" role="navigation" aria-label="Global">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem' }}>🎮</span>
            <span>Connecting Games Hub</span>
          </div>
          <div className="app-actions">
            <button
              className="btn-app theme-toggle"
              data-haptic
              onClick={toggleTheme}
            >
              Theme
            </button>
          </div>
        </nav>

        <header className="hero">
          <h1 className="hero-title text-gradient">Connecting Games Hub</h1>
          <p className="subtitle text-fade-in">
            Spark meaningful connections through play
          </p>
          {stats.totalGames > 0 && (
            <div className="hero-stats">
              <span className="stat-badge">🎮 {stats.totalGames} Games</span>
              <span className="stat-badge">🃏 {stats.totalCards} Cards</span>
            </div>
          )}
        </header>

        {/* Recently Played Section */}
        {!recentGamesLoading && recentGames.length > 0 && (
          <section className="recent-games-section">
            <div className="category-header">
              <i className="fas fa-clock"></i>
              <h2>Recently Played</h2>
            </div>
            <div className="games-grid">
              {recentGames.slice(0, 4).map((game) => {
                const gameId = game.url.replace('/', '');
                const metadata = getGameMetadata(gameId);
                return (
                  <Link
                    key={game.url}
                    to={game.url}
                    className="game-card"
                    data-transition="slide"
                  >
                    <span className="emoji">{metadata.icon || game.icon}</span>
                    <span className="title">{metadata.name || game.name}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <div className="categories-grid">
          {categories.map((category) => (
            <section key={category.title} className="category-card">
              <div className="category-header">
                <i className={category.icon}></i>
                <h2>{category.title}</h2>
              </div>
              <div className="games-grid">
                {category.games.map((game) => (
                  <Link
                    key={game.path}
                    to={game.path}
                    className="game-card"
                    data-transition="slide"
                  >
                    <span className="emoji">{game.icon}</span>
                    <span className="title">{game.name}</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
