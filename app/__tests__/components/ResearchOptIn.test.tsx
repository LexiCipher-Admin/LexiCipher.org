// @vitest-environment jsdom
/**
 * ResearchOptIn.test.tsx — Component tests for the research opt-in widget.
 *
 * Tests:
 *   - Initial render state
 *   - Checkbox toggle behaviour
 *   - Download without consent (no telemetry)
 *   - Download with consent (telemetry POST fired)
 *   - Post-submission UI (button text, checkbox disabled, no double-POST)
 *   - "Thank you" message visibility
 *
 * Mocks: fetch, window.crypto (getRandomValues + subtle.digest)
 *
 * Run: npm test
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResearchOptIn from '@/components/ResearchOptIn';
import type { Session } from '@/lib/types/session';

// ---------------------------------------------------------------------------
// Crypto mock — deterministic, no real Web Crypto needed in jsdom
// ---------------------------------------------------------------------------
Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: (arr: Uint32Array) => { arr.fill(42); return arr; },
    subtle: {
      digest: vi.fn(() =>
        Promise.resolve(new Uint8Array(32).buffer)
      ),
    },
  },
  configurable: true,
});

// ---------------------------------------------------------------------------
// Fetch mock
// ---------------------------------------------------------------------------
const mockFetch = vi.fn(() => Promise.resolve({ ok: true } as Response));
vi.stubGlobal('fetch', mockFetch);

// ---------------------------------------------------------------------------
// Minimal session fixture
// ---------------------------------------------------------------------------
const MOCK_SESSION: Session = {
  id: 'test-session-id',
  phase: 'results',
  startedAt: new Date(Date.now() - 60_000).toISOString(), // 1 min ago
  setup: {
    ageGroup: 'adult',
    readingLevel: '8th',
    consentGiven: true,
    completedAt: new Date().toISOString(),
  },
  doeMatrix: [],
  responses: [],
  doeResults: {
    effects: {
      letterSpacing: 1.2,
      wordSpacing: 0.0,
      lineHeight: 0.0,
      fontWeight: 0.0,
      fontSize: 0.0,
      paragraphWidth: 0.0,
      bwgt: 0.0,
    },
    standardError: 0.5,
    significantFactors: ['letterSpacing'],
  },
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ResearchOptIn', () => {
  let onDownloadFont: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    onDownloadFont = vi.fn();
  });

  it('renders the download button and an unchecked checkbox', () => {
    render(<ResearchOptIn session={MOCK_SESSION} onDownloadFont={onDownloadFont} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('button', { name: /Download My Custom Font/i })).toBeInTheDocument();
  });

  it('check → uncheck → button text remains "Download My Custom Font"', async () => {
    const user = userEvent.setup();
    render(<ResearchOptIn session={MOCK_SESSION} onDownloadFont={onDownloadFont} />);
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    await user.click(checkbox);
    expect(screen.getByRole('button')).toHaveTextContent('Download My Custom Font');
  });

  it('click with checkbox unchecked → onDownloadFont called, no fetch fired', async () => {
    const user = userEvent.setup();
    render(<ResearchOptIn session={MOCK_SESSION} onDownloadFont={onDownloadFont} />);
    await user.click(screen.getByRole('button'));
    expect(onDownloadFont).toHaveBeenCalledOnce();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('click with checkbox checked → fetch POST /api/telemetry fired + onDownloadFont called', async () => {
    const user = userEvent.setup();
    render(<ResearchOptIn session={MOCK_SESSION} onDownloadFont={onDownloadFont} />);
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button'));
    expect(onDownloadFont).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/telemetry',
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  it('after click with consent: button shows "Downloading...", checkbox is disabled', async () => {
    const user = userEvent.setup();
    render(<ResearchOptIn session={MOCK_SESSION} onDownloadFont={onDownloadFont} />);
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('Downloading...');
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('re-clicking after submission does not fire a second fetch', async () => {
    const user = userEvent.setup();
    render(<ResearchOptIn session={MOCK_SESSION} onDownloadFont={onDownloadFont} />);
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button')); // first click — fires fetch
    await user.click(screen.getByRole('button')); // second click — no second fetch
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  it('"Thank you" message is visible only after opted-in submission', async () => {
    const user = userEvent.setup();
    render(<ResearchOptIn session={MOCK_SESSION} onDownloadFont={onDownloadFont} />);
    expect(screen.queryByText(/Thank you/i)).not.toBeInTheDocument();
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button'));
    expect(screen.getByText(/Thank you/i)).toBeInTheDocument();
  });
});
