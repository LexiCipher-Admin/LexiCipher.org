// @vitest-environment jsdom
/**
 * ResultsScreen.test.tsx — Component tests for the results screen.
 *
 * Tests:
 *   - session prop present → ResearchOptIn rendered, no plain download button
 *   - session prop absent  → plain download button, no ResearchOptIn
 *   - significantFactors=[] → "None" info box text rendered
 *   - optimizationResult present → "Your Optimal Settings" section rendered
 *
 * ResearchOptIn is stubbed to avoid crypto API and fetch dependencies.
 *
 * Run: npm test
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResultsScreen from '@/app/test/components/ResultsScreen';
import type { DOEResults, OptimizationResult, Session } from '@/lib/types/session';

// ---------------------------------------------------------------------------
// Stub ResearchOptIn — keeps component tests focused on ResultsScreen logic
// ---------------------------------------------------------------------------
vi.mock('@/components/ResearchOptIn', () => ({
  default: () => <div data-testid="research-opt-in">ResearchOptIn stub</div>,
}));

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------
const BASE_DOE_RESULTS: DOEResults = {
  effects: {
    letterSpacing: 0,
    wordSpacing: 0,
    lineHeight: 0,
    fontWeight: 0,
    fontSize: 0,
    paragraphWidth: 0,
    bwgt: 0,
  },
  standardError: 0.5,
  significantFactors: [],
};

const MOCK_SESSION: Session = {
  id: 'sess-001',
  phase: 'results',
  startedAt: new Date().toISOString(),
  setup: {
    ageGroup: 'adult',
    readingLevel: '8th',
    consentGiven: true,
    completedAt: new Date().toISOString(),
  },
  doeMatrix: [],
  responses: [],
  doeResults: BASE_DOE_RESULTS,
};

const MOCK_OPT_RESULT: OptimizationResult = {
  optimalValues: {
    letterSpacing: 0.5,
    wordSpacing: 0.5,
    lineHeight: 0.5,
    fontWeight: 0.5,
    fontSize: 0.5,
    paragraphWidth: 0.5,
    bwgt: 0.5,
  },
  bestRating: 1,
  trialsRun: 5,
};

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ResultsScreen', () => {
  it('session prop present → renders ResearchOptIn, not plain download button', () => {
    render(
      <ResultsScreen
        doeResults={BASE_DOE_RESULTS}
        session={MOCK_SESSION}
        onDownloadFont={vi.fn()}
        onStartOver={vi.fn()}
      />
    );
    expect(screen.getByTestId('research-opt-in')).toBeInTheDocument();
    expect(screen.queryByText('⬇️ Download All Files')).not.toBeInTheDocument();
  });

  it('session prop absent → renders plain download button, no ResearchOptIn', () => {
    render(
      <ResultsScreen
        doeResults={BASE_DOE_RESULTS}
        onDownloadFont={vi.fn()}
        onStartOver={vi.fn()}
      />
    );
    expect(screen.getByText('⬇️ Download All Files')).toBeInTheDocument();
    expect(screen.queryByTestId('research-opt-in')).not.toBeInTheDocument();
  });

  it('significantFactors=[] → renders "None" info box, not a factor list', () => {
    render(
      <ResultsScreen
        doeResults={BASE_DOE_RESULTS}
        onDownloadFont={vi.fn()}
        onStartOver={vi.fn()}
      />
    );
    expect(
      screen.getByText(/None of the typography factors/i)
    ).toBeInTheDocument();
  });

  it('optimizationResult present → renders "Your Optimal Settings" section', () => {
    render(
      <ResultsScreen
        doeResults={BASE_DOE_RESULTS}
        optimizationResult={MOCK_OPT_RESULT}
        onDownloadFont={vi.fn()}
        onStartOver={vi.fn()}
      />
    );
    expect(screen.getByText(/Your Optimal Settings/i)).toBeInTheDocument();
  });
});
