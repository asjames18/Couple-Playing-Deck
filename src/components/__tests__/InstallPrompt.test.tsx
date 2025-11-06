import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstallPrompt from '../InstallPrompt';

// Mock window.gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

describe('InstallPrompt', () => {
  const originalAddEventListener = window.addEventListener;
  const originalRemoveEventListener = window.removeEventListener;

  beforeEach(() => {
    // Restore real event listeners for tests
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
    window.gtag = vi.fn();
  });

  afterEach(() => {
    // Clean up any event listeners
    const events = ['beforeinstallprompt'];
    events.forEach((eventType) => {
      const listeners = (
        window as unknown as { _listeners?: Map<string, Set<EventListener>> }
      )._listeners;
      if (listeners) {
        listeners.delete(eventType);
      }
    });
  });

  it('does not render when prompt is not available', () => {
    const { container } = render(<InstallPrompt />);
    expect(container.firstChild).toBeNull();
  });

  it('renders when beforeinstallprompt event fires', async () => {
    const mockPrompt = vi.fn().mockResolvedValue(undefined);
    const mockUserChoice = Promise.resolve({ outcome: 'accepted' as const });

    const mockEvent = {
      preventDefault: vi.fn(),
      prompt: mockPrompt,
      userChoice: mockUserChoice,
    } as unknown as BeforeInstallPromptEvent;

    const { container } = render(<InstallPrompt />);

    // Wait for component to mount and set up event listener
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Simulate beforeinstallprompt event
    const event = new Event('beforeinstallprompt') as BeforeInstallPromptEvent;
    Object.assign(event, mockEvent);

    await act(async () => {
      window.dispatchEvent(event);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(
      () => {
        expect(container.firstChild).not.toBeNull();
      },
      { timeout: 3000 }
    );

    expect(screen.getByText('Install App')).toBeInTheDocument();
  });

  it('calls prompt when install button is clicked', async () => {
    const mockPrompt = vi.fn().mockResolvedValue(undefined);
    const mockUserChoice = Promise.resolve({ outcome: 'accepted' as const });

    const mockEvent = {
      preventDefault: vi.fn(),
      prompt: mockPrompt,
      userChoice: mockUserChoice,
    } as unknown as BeforeInstallPromptEvent;

    render(<InstallPrompt />);

    // Wait for component to mount
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    // Simulate beforeinstallprompt event
    const event = new Event('beforeinstallprompt') as BeforeInstallPromptEvent;
    Object.assign(event, mockEvent);

    await act(async () => {
      window.dispatchEvent(event);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(
      () => {
        expect(screen.getByText('Install')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const installButton = screen.getByText('Install');
    await userEvent.click(installButton);

    await waitFor(() => {
      expect(mockPrompt).toHaveBeenCalled();
    });
  });
});
