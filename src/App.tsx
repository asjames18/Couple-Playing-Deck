import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { trackPageView } from './lib/analytics';
import { useTheme } from './hooks/useTheme';
import Home from './pages/Home';
import Couples from './pages/Couples';
import Family from './pages/Family';
import Friends from './pages/Friends';
import Kids from './pages/Kids';
import TruthOrDare from './pages/TruthOrDare';
import WouldYouRather from './pages/WouldYouRather';
import NeverHaveIEver from './pages/NeverHaveIEver';
import TwoTruths from './pages/TwoTruths';
import StoryTime from './pages/StoryTime';
import MemoryLane from './pages/MemoryLane';
import Gratitude from './pages/Gratitude';
import Christian from './pages/Christian';
import RealTalkCards from './pages/RealTalkCards';
import LoveEscape from './pages/LoveEscape';
import BottomNavigation from './components/BottomNavigation';
import InstallPrompt from './components/InstallPrompt';
import OfflineBanner from './components/OfflineBanner';

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
        <Routes>
          <Route path="/" element={<Home />} />
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
        </Routes>
        <BottomNavigation />
      </div>
    </BrowserRouter>
  );
}

export default App;

