import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { trackPageView } from './lib/analytics';
import { useTheme } from './hooks/useTheme';
import Home from './pages/Home';
import BottomNavigation from './components/BottomNavigation';
import InstallPrompt from './components/InstallPrompt';
import OfflineBanner from './components/OfflineBanner';
import UpdatePrompt from './components/UpdatePrompt';

// Lazy load game pages for code splitting
const Couples = lazy(() => import('./pages/Couples'));
const Family = lazy(() => import('./pages/Family'));
const Friends = lazy(() => import('./pages/Friends'));
const Kids = lazy(() => import('./pages/Kids'));
const TruthOrDare = lazy(() => import('./pages/TruthOrDare'));
const WouldYouRather = lazy(() => import('./pages/WouldYouRather'));
const NeverHaveIEver = lazy(() => import('./pages/NeverHaveIEver'));
const TwoTruths = lazy(() => import('./pages/TwoTruths'));
const StoryTime = lazy(() => import('./pages/StoryTime'));
const MemoryLane = lazy(() => import('./pages/MemoryLane'));
const Gratitude = lazy(() => import('./pages/Gratitude'));
const Christian = lazy(() => import('./pages/Christian'));
const RealTalkCards = lazy(() => import('./pages/RealTalkCards'));
const LoveEscape = lazy(() => import('./pages/LoveEscape'));
const Settings = lazy(() => import('./pages/Settings'));

// Loading component
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-2xl mb-4">🎮</div>
        <div>Loading...</div>
      </div>
    </div>
  );
}

function App() {
  const { loading } = useTheme();

  useEffect(() => {
    // Track page views
    const handleLocationChange = () => {
      trackPageView(window.location.pathname);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl mb-4">🎮</div>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-primary">
        <OfflineBanner />
        <InstallPrompt />
        <UpdatePrompt />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* New /games/ routes */}
            <Route path="/games/couples" element={<Couples />} />
            <Route path="/games/family" element={<Family />} />
            <Route path="/games/friends" element={<Friends />} />
            <Route path="/games/kids" element={<Kids />} />
            <Route path="/games/truth-dare" element={<TruthOrDare />} />
            <Route path="/games/wyr" element={<WouldYouRather />} />
            <Route
              path="/games/never-have-i-ever"
              element={<NeverHaveIEver />}
            />
            <Route path="/games/two-truths" element={<TwoTruths />} />
            <Route path="/games/story-time" element={<StoryTime />} />
            <Route path="/games/memory-lane" element={<MemoryLane />} />
            <Route path="/games/gratitude" element={<Gratitude />} />
            <Route path="/games/christian" element={<Christian />} />
            <Route path="/games/real-talk" element={<RealTalkCards />} />
            <Route path="/games/love-escape" element={<LoveEscape />} />
            {/* Backward compatibility - redirect old routes */}
            <Route path="/couples" element={<Couples />} />
            <Route path="/family" element={<Family />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/truth-or-dare" element={<TruthOrDare />} />
            <Route path="/would-you-rather" element={<WouldYouRather />} />
            <Route path="/never-have-i-ever" element={<NeverHaveIEver />} />
            <Route path="/two-truths" element={<TwoTruths />} />
            <Route path="/story-time" element={<StoryTime />} />
            <Route path="/memory-lane" element={<MemoryLane />} />
            <Route path="/gratitude" element={<Gratitude />} />
            <Route path="/christian" element={<Christian />} />
            <Route path="/real-talk-cards" element={<RealTalkCards />} />
            <Route path="/loveescape" element={<LoveEscape />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
        <BottomNavigation />
      </div>
    </BrowserRouter>
  );
}

export default App;
