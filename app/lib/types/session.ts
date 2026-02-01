/**
 * Session Types for DyslexiaFont.org
 * 
 * Defines all TypeScript interfaces for the font optimization testing session.
 */

// ============================================================================
// CALIBRATION TYPES
// ============================================================================

export interface CalibrationData {
  /** Screen diagonal in inches, measured via credit card calibration */
  screenDiagonalInches: number;
  /** Calculated pixels per inch */
  ppi: number;
  /** Screen width in pixels */
  screenWidth: number;
  /** Screen height in pixels */
  screenHeight: number;
  /** Timestamp of calibration */
  calibratedAt: string;
}

// ============================================================================
// FONT PARAMETER TYPES
// ============================================================================

/**
 * The 7 typographic factors being tested in the DOE
 * All values are coded as -1 (low) or +1 (high) for the DOE matrix
 * 
 * 2^(7-3) fractional factorial design with 16 runs
 * Generators: E=ABC, F=ABD, G=ACD (Resolution IV)
 * 
 * EXTREME RANGES (updated based on alpha test feedback):
 * Using wider ranges to detect effects that might be masked by conservative values
 */
export interface FontParameters {
  /** Letter spacing: -1 = 0%, +1 = +25% (was +12%) */
  letterSpacing: -1 | 1;
  /** Word spacing: -1 = 0%, +1 = +40% (was +20%) */
  wordSpacing: -1 | 1;
  /** Line height: -1 = 1.3, +1 = 2.0 (was 1.4-1.8) */
  lineHeight: -1 | 1;
  /** Font weight: -1 = 300, +1 = 700 (was 400-600) */
  fontWeight: -1 | 1;
  /** Font size adjustment: -1 = -10%, +1 = +25% (was 0-15%) */
  fontSize: -1 | 1;
  /** Paragraph width: -1 = 80ch, +1 = 40ch (was 65ch-50ch) */
  paragraphWidth: -1 | 1;
  /** Bottom weight (BWGT axis): -1 = 0, +1 = 100 */
  bwgt: -1 | 1;
}

/**
 * Actual CSS values derived from FontParameters
 */
export interface CSSFontValues {
  letterSpacing: string;         // e.g., "0em" or "0.12em"
  wordSpacing: string;           // e.g., "0em" or "0.2em"
  lineHeight: number;            // e.g., 1.4 or 1.8
  fontWeight: number;            // e.g., 400 or 600
  fontSize: string;              // e.g., "1em" or "1.15em"
  maxWidth: string;              // e.g., "65ch" or "50ch"
  fontVariationSettings: string; // e.g., "'BWGT' 0" or "'BWGT' 100"
}

// ============================================================================
// DOE DESIGN MATRIX
// ============================================================================

/**
 * A single row in the DOE design matrix
 * 2^(7-3) = 16 runs for fractional factorial design (Resolution IV)
 */
export interface DOERow {
  /** Run number (1-32) */
  runNumber: number;
  /** The factor settings for this run */
  parameters: FontParameters;
  /** The passage ID assigned to this run */
  passageId: string;
}

// ============================================================================
// TEST RESPONSE TYPES
// ============================================================================

/** 3-point preference scale */
export type Rating = -1 | 0 | 1;  // Worse | Same | Better

export interface TestResponse {
  /** The DOE run number */
  runNumber: number;
  /** The user's rating compared to baseline */
  rating: Rating;
  /** Time spent viewing the passage (ms) */
  viewDuration: number;
  /** Timestamp of response */
  respondedAt: string;
}

// ============================================================================
// SESSION STATE TYPES
// ============================================================================

export type SessionPhase =
  | 'setup'          // Collecting age/grade, consent
  | 'calibration'    // Screen calibration via credit card
  | 'baseline'       // Showing reference passage
  | 'doe-testing'    // 32 DOE trials
  | 'optimization'   // Box-Behnken or grid search on significant factors
  | 'results'        // Showing final recommendations
  | 'complete';      // Session finished

export interface SetupData {
  /** User's age group for reading level selection */
  ageGroup: 'child' | 'teen' | 'adult';
  /** Self-reported grade level (for children) */
  gradeLevel?: '3rd' | '5th' | '8th';
  /** Consent checkbox acknowledged */
  consentGiven: boolean;
  /** Preferred reading level for passages */
  readingLevel: '3rd' | '5th' | '8th';
  /** Timestamp of setup completion */
  completedAt: string;
}

export interface DOEResults {
  /** Effect sizes for each factor */
  effects: {
    letterSpacing: number;
    wordSpacing: number;
    lineHeight: number;
    fontWeight: number;
    fontSize: number;
    paragraphWidth: number;
    bwgt: number;
  };
  /** Two-factor interaction effects (aliased groups in Resolution IV design) */
  interactions?: {
    /** Interaction alias group name (e.g., "AB+CE+FG") */
    aliasGroup: string;
    /** Combined effect magnitude */
    effect: number;
  }[];
  /** Standard error for significance testing */
  standardError: number;
  /** Factors that exceeded significance threshold */
  significantFactors: (keyof FontParameters)[];
  /** Top 3 interaction alias groups by magnitude */
  topInteractions?: string[];
}

export interface OptimizationResult {
  /** Best found values for each factor (normalized 0-1 scale) */
  optimalValues: {
    letterSpacing: number;    // 0-1 (maps to 0-12%)
    wordSpacing: number;      // 0-1 (maps to 0-20%)
    lineHeight: number;       // 0-1 (maps to 1.4-1.8)
    fontWeight: number;       // 0-1 (maps to 400-600)
    fontSize: number;         // 0-1 (maps to 0-15%)
    paragraphWidth: number;   // 0-1 (maps to 65ch-50ch)
    bwgt: number;             // 0-1 (maps to 0-100 BWGT axis)
  };
  /** Best rating found during optimization */
  bestRating: number;
  /** Number of optimization trials run */
  trialsRun: number;
  /** Whether user chose to skip optimization */
  skipped?: boolean;
}

/** Bayesian optimization run data */
export interface BayesianRun {
  /** Run index (0-based) */
  index: number;
  /** Parameter values being tested (normalized 0-1) */
  params: {
    letterSpacing: number;
    wordSpacing: number;
    lineHeight: number;
    fontWeight: number;
    fontSize: number;
    paragraphWidth: number;
    bwgt: number;
  };
  /** User rating (-1, 0, 1) */
  rating?: -1 | 0 | 1;
  /** Passage ID shown */
  passageId: string;
  /** Timestamp of response */
  respondedAt?: string;
}

export interface Session {
  /** Unique session ID */
  id: string;
  /** Current phase of the session */
  phase: SessionPhase;
  /** When the session started */
  startedAt: string;
  /** When the session was last updated */
  updatedAt: string;
  /** Setup data (after setup phase) */
  setup?: SetupData;
  /** Calibration data (after calibration phase) */
  calibration?: CalibrationData;
  /** The 32-row DOE design matrix with passage assignments */
  doeMatrix?: DOERow[];
  /** Current test index (0-31 for DOE, 0-n for optimization) */
  currentTestIndex: number;
  /** All test responses from DOE phase */
  doeResponses: TestResponse[];
  /** Calculated DOE results (after DOE phase) */
  doeResults?: DOEResults;
  /** Bayesian optimization runs */
  bayesianRuns?: BayesianRun[];
  /** Current Bayesian optimization index */
  bayesianIndex?: number;
  /** Optimization test responses (legacy) */
  optimizationResponses: TestResponse[];
  /** Final optimization results */
  optimizationResult?: OptimizationResult;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Convert coded DOE parameters (-1/+1) to actual CSS values
 * 
 * EXTREME RANGES (updated based on alpha test feedback):
 * - Letter spacing: 0% → +25% (was +12%)
 * - Word spacing: 0% → +40% (was +20%)
 * - Line height: 1.3 → 2.0 (was 1.4-1.8)
 * - Font weight: 300 → 700 (was 400-600)
 * - Font size: -10% → +25% (was 0-15%)
 * - Line width: 80ch → 40ch (was 65ch-50ch)
 */
export function parametersToCSSValues(params: FontParameters): CSSFontValues {
  // BWGT: -1 = 0, +1 = 100
  const bwgtValue = params.bwgt === 1 ? 100 : 0;

  return {
    letterSpacing: params.letterSpacing === 1 ? '0.25em' : '0em',      // +25% (was +12%)
    wordSpacing: params.wordSpacing === 1 ? '0.4em' : '0em',           // +40% (was +20%)
    lineHeight: params.lineHeight === 1 ? 2.0 : 1.3,                   // 1.3-2.0 (was 1.4-1.8)
    fontWeight: params.fontWeight === 1 ? 700 : 300,                   // 300-700 (was 400-600)
    fontSize: params.fontSize === 1 ? '1.25em' : '0.9em',              // -10% to +25% (was 0-15%)
    maxWidth: params.paragraphWidth === 1 ? '40ch' : '80ch',           // 40-80ch (was 50-65ch)
    fontVariationSettings: `'BWGT' ${bwgtValue}`,
  };
}

/**
 * Create a new empty session
 */
export function createNewSession(): Session {
  return {
    id: generateSessionId(),
    phase: 'setup',
    startedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    currentTestIndex: 0,
    doeResponses: [],
    optimizationResponses: [],
  };
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// ============================================================================
// LOCAL STORAGE UTILITIES
// ============================================================================

const STORAGE_KEY = 'lexisolve_session';

/**
 * Save session to localStorage
 */
export function saveSession(session: Session): void {
  if (typeof window !== 'undefined') {
    session.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }
}

/**
 * Load session from localStorage
 */
export function loadSession(): Session | null {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as Session;
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * Clear session from localStorage
 */
export function clearSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/**
 * Check if there's an existing session that can be resumed
 */
export function canResumeSession(): boolean {
  const session = loadSession();
  if (!session) return false;

  // Can resume if not complete and not expired (24 hours)
  const startedAt = new Date(session.startedAt).getTime();
  const now = Date.now();
  const twentyFourHours = 24 * 60 * 60 * 1000;

  return session.phase !== 'complete' && (now - startedAt) < twentyFourHours;
}