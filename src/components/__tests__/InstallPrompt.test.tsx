import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InstallPrompt from '../InstallPrompt';

describe('InstallPrompt', () => {
  beforeEach(() => {
    // Reset window events
    window.removeEventListener = vi.fn();
    window.addEventListener = vi.fn();
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

    // Simulate beforeinstallprompt event
    const event = new Event('beforeinstallprompt');
    Object.assign(event, mockEvent);
    window.dispatchEvent(event);

    await waitFor(() => {
      expect(container.firstChild).not.toBeNull();
    });

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

    // Simulate beforeinstallprompt event
    const event = new Event('beforeinstallprompt');
    Object.assign(event, mockEvent);
    window.dispatchEvent(event);

    await waitFor(() => {
      expect(screen.getByText('Install')).toBeInTheDocument();
    });

    const installButton = screen.getByText('Install');
    await userEvent.click(installButton);

    await waitFor(() => {
      expect(mockPrompt).toHaveBeenCalled();
    });
  });
});

