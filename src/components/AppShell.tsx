import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Gamepad2, Clock, Settings } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/games', label: 'Games', icon: Gamepad2 },
    { path: '/recent', label: 'Recent', icon: Clock },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-dvh bg-bg text-fg flex flex-col">
      <header
        className="sticky top-0 z-40 backdrop-blur-md bg-bg/60 border-b border-white/5 px-4 py-3"
        style={{ paddingTop: 'env(safe-area-inset-top, 0)' }}
      >
        <h1 className="text-xl font-semibold">Connecting Games</h1>
      </header>

      <main className="flex-1 px-4 py-4 overflow-y-auto">{children}</main>

      <nav
        className="fixed bottom-0 inset-x-0 z-40 bg-card/80 backdrop-blur-md border-t border-white/5"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
      >
        <div className="grid grid-cols-4 h-16 text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 hover:opacity-90 transition-opacity tap-target ${
                  active ? 'text-primary' : 'text-muted'
                }`}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

