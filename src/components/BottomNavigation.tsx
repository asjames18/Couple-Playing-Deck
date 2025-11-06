import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useRecentGames } from '@/hooks/useGameState';
import { getGameMetadata } from '@/lib/game-metadata';

export default function BottomNavigation() {
  const location = useLocation();
  const [showGamesMenu, setShowGamesMenu] = useState(false);
  const [showRecentGames, setShowRecentGames] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { data: recentGames = [] } = useRecentGames();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isGamePage = () => {
    const gamePaths = [
      '/couples',
      '/family',
      '/friends',
      '/kids',
      '/truth-or-dare',
      '/would-you-rather',
      '/never-have-i-ever',
      '/two-truths',
      '/story-time',
      '/memory-lane',
      '/gratitude',
      '/christian',
      '/real-talk-cards',
      '/loveescape',
    ];
    return gamePaths.some((path) => location.pathname.startsWith(path));
  };

  const handleGamesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowGamesMenu(!showGamesMenu);
    setShowRecentGames(false);
    setShowStats(false);
  };

  const handleRecentClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRecentGames(!showRecentGames);
    setShowGamesMenu(false);
    setShowStats(false);
  };

  const handleStatsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowStats(!showStats);
    setShowGamesMenu(false);
    setShowRecentGames(false);
  };

  const closeOverlays = () => {
    setShowGamesMenu(false);
    setShowRecentGames(false);
    setShowStats(false);
  };

  const games = [
    { path: '/couples', name: 'Couples', icon: '💑' },
    { path: '/family', name: 'Family', icon: '👨‍👩‍👧‍👦' },
    { path: '/friends', name: 'Friends', icon: '👥' },
    { path: '/kids', name: 'Kids', icon: '🎮' },
    { path: '/truth-or-dare', name: 'Truth or Dare', icon: '🎲' },
    { path: '/would-you-rather', name: 'Would You Rather', icon: '🤔' },
    { path: '/never-have-i-ever', name: 'Never Have I Ever', icon: '🙈' },
    { path: '/two-truths', name: 'Two Truths & a Lie', icon: '🎯' },
    { path: '/story-time', name: 'Story Time', icon: '📚' },
    { path: '/memory-lane', name: 'Memory Lane', icon: '🏞️' },
    { path: '/gratitude', name: 'Gratitude Journal', icon: '🙏' },
    { path: '/christian', name: 'Christian Games', icon: '✝️' },
    { path: '/real-talk-cards', name: 'Real Talk Cards', icon: '💬' },
    { path: '/loveescape', name: 'Love Escape', icon: '💕' },
  ];

  return (
    <>
      <nav
        className="bottom-nav"
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          to="/"
          className={`bottom-nav-item ${isActive('/') ? 'active' : ''}`}
        >
          <span className="bottom-nav-item-icon" aria-hidden="true">
            🏠
          </span>
          <span className="bottom-nav-item-label">Home</span>
        </Link>

        <a
          href="#"
          className={`bottom-nav-item ${isGamePage() ? 'active' : ''}`}
          onClick={handleGamesClick}
        >
          <span className="bottom-nav-item-icon" aria-hidden="true">
            🎮
          </span>
          <span className="bottom-nav-item-label">Games</span>
        </a>

        <a href="#" className="bottom-nav-item" onClick={handleRecentClick}>
          <span className="bottom-nav-item-icon" aria-hidden="true">
            ⭐
          </span>
          <span className="bottom-nav-item-label">Recent</span>
          {recentGames.length > 0 && (
            <span className="bottom-nav-badge">{recentGames.length}</span>
          )}
        </a>

        <a href="#" className="bottom-nav-item" onClick={handleStatsClick}>
          <span className="bottom-nav-item-icon" aria-hidden="true">
            📊
          </span>
          <span className="bottom-nav-item-label">Stats</span>
        </a>
      </nav>

      {/* Games Overlay */}
      {showGamesMenu && (
        <div className="games-overlay" onClick={closeOverlays}>
          <div
            className="games-overlay-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="games-overlay-header">
              <h2>All Games</h2>
              <button className="games-overlay-close" onClick={closeOverlays}>
                ×
              </button>
            </div>
            <div className="games-overlay-grid">
              {games.map((game) => (
                <Link
                  key={game.path}
                  to={game.path}
                  className="game-link"
                  onClick={closeOverlays}
                >
                  <span className="game-link-icon">{game.icon}</span>
                  <span className="game-link-name">{game.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Games Overlay */}
      {showRecentGames && (
        <div className="games-overlay" onClick={closeOverlays}>
          <div
            className="games-overlay-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="games-overlay-header">
              <h2>Recently Played</h2>
              <button className="games-overlay-close" onClick={closeOverlays}>
                ×
              </button>
            </div>
            <div className="games-overlay-grid">
              {recentGames.length === 0 ? (
                <p className="text-center text-text-secondary p-4">
                  No recent games yet. Start playing!
                </p>
              ) : (
                recentGames.map((game) => {
                  const gameId = game.url.replace('/', '');
                  const metadata = getGameMetadata(gameId);
                  return (
                    <Link
                      key={game.url}
                      to={game.url}
                      className="game-link"
                      onClick={closeOverlays}
                    >
                      <span className="game-link-icon">
                        {metadata.icon || game.icon}
                      </span>
                      <span className="game-link-name">
                        {metadata.name || game.name}
                      </span>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats Overlay */}
      {showStats && (
        <div className="games-overlay" onClick={closeOverlays}>
          <div
            className="games-overlay-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="games-overlay-header">
              <h2>Statistics</h2>
              <button className="games-overlay-close" onClick={closeOverlays}>
                ×
              </button>
            </div>
            <div className="p-4">
              <p className="text-text-secondary">
                Statistics feature coming soon!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
