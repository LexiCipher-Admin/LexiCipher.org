/**
 * 2^(7-3) Fractional Factorial Design Matrix Generator
 * 
 * Generates a 16-run design for 7 factors (Resolution IV).
 * Main effects are clean; 2-factor interactions alias with other 2FIs.
 * 
 * The 7 factors are:
 * - A: Letter Spacing (0% vs +12%)
 * - B: Word Spacing (0% vs +20%)
 * - C: Line Height (1.4 vs 1.8)
 * - D: Font Weight (400 vs 600)
 * - E: Font Size (+0% vs +15%)     = ABC (generator)
 * - F: Paragraph Width (65ch vs 50ch) = ABD (generator)
 * - G: BWGT (0 vs 100)             = ACD (generator)
 * 
 * Defining relation: I = ABCE = ABDF = ACDG = CDEF = BDEG = BCFG = AEFG
 */

import { DOERow, FontParameters, CSSFontValues, Rating, parametersToCSSValues } from '../types/session';

// 2^(7-3) fractional factorial design = 16 runs
// Base design: 2^4 full factorial for factors A, B, C, D
// Generators: E = ABC, F = ABD, G = ACD
// Values are coded: 0 = low level (-1), 1 = high level (+1)
// Columns: [A, B, C, D, E=ABC, F=ABD, G=ACD]
const FACTORIAL_DESIGN: number[][] = [
  // Run 1-8
  [0, 0, 0, 0, 0, 0, 0],  // A=0,B=0,C=0,D=0 → E=0,F=0,G=0
  [1, 0, 0, 0, 0, 0, 0],  // A=1,B=0,C=0,D=0 → E=0,F=0,G=0
  [0, 1, 0, 0, 0, 0, 0],  // A=0,B=1,C=0,D=0 → E=0,F=0,G=0
  [1, 1, 0, 0, 1, 1, 0],  // A=1,B=1,C=0,D=0 → E=1,F=1,G=0
  [0, 0, 1, 0, 0, 0, 0],  // A=0,B=0,C=1,D=0 → E=0,F=0,G=0
  [1, 0, 1, 0, 1, 0, 1],  // A=1,B=0,C=1,D=0 → E=1,F=0,G=1
  [0, 1, 1, 0, 1, 0, 0],  // A=0,B=1,C=1,D=0 → E=1,F=0,G=0
  [1, 1, 1, 0, 0, 0, 1],  // A=1,B=1,C=1,D=0 → E=0,F=0,G=1
  // Run 9-16
  [0, 0, 0, 1, 0, 0, 0],  // A=0,B=0,C=0,D=1 → E=0,F=0,G=0
  [1, 0, 0, 1, 0, 1, 1],  // A=1,B=0,C=0,D=1 → E=0,F=1,G=1
  [0, 1, 0, 1, 0, 1, 0],  // A=0,B=1,C=0,D=1 → E=0,F=1,G=0
  [1, 1, 0, 1, 1, 0, 0],  // A=1,B=1,C=0,D=1 → E=1,F=0,G=0
  [0, 0, 1, 1, 0, 0, 1],  // A=0,B=0,C=1,D=1 → E=0,F=0,G=1
  [1, 0, 1, 1, 1, 1, 0],  // A=1,B=0,C=1,D=1 → E=1,F=1,G=0
  [0, 1, 1, 1, 1, 1, 1],  // A=0,B=1,C=1,D=1 → E=1,F=1,G=1
  [1, 1, 1, 1, 0, 0, 0],  // A=1,B=1,C=1,D=1 → E=0,F=0,G=0
];

/**
 * Generates the complete DOE design matrix with randomized run order
 * 16 runs for 2^(7-3) fractional factorial design
 */
export function generateDesignMatrix(passageIds: string[]): DOERow[] {
  // Shuffle passage IDs to randomize assignment
  const shuffledPassages = shuffleArray([...passageIds]);

  const runs: DOERow[] = FACTORIAL_DESIGN.map((row, index) => {
    const [A, B, C, D, E, F, G] = row;

    // Convert coded values (0/1) to factor levels (-1/+1)
    const parameters: FontParameters = {
      letterSpacing: A === 0 ? -1 : 1,
      wordSpacing: B === 0 ? -1 : 1,
      lineHeight: C === 0 ? -1 : 1,
      fontWeight: D === 0 ? -1 : 1,
      fontSize: E === 0 ? -1 : 1,
      paragraphWidth: F === 0 ? -1 : 1,
      bwgt: G === 0 ? -1 : 1,
    };

    return {
      runNumber: index + 1,
      parameters,
      passageId: shuffledPassages[index % shuffledPassages.length],
    };
  });

  // Randomize the run order (Fisher-Yates shuffle)
  return shuffleArray(runs);
}

/**
 * Fisher-Yates shuffle for randomizing run order
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Converts coded factor levels (-1/+1) to CSS-ready values
 * Re-exports from session.ts for convenience
 */
export function factorsToCSSValues(params: FontParameters): CSSFontValues {
  return parametersToCSSValues(params);
}

/**
 * Gets baseline CSS values (all factors at low level)
 */
export function getBaselineCSSValues(): CSSFontValues {
  return {
    fontSize: '1em',
    letterSpacing: '0em',
    wordSpacing: '0em',
    lineHeight: 1.4,
    fontWeight: 400,
    maxWidth: '65ch',
    fontVariationSettings: "'BWGT' 0",
  };
}

/**
 * Calculate main effects from completed DOE responses
 * Uses contrast method for 2^(7-3) factorial design
 * 
 * For Resolution IV design, main effects are unaliased with each other
 * and with 2-factor interactions.
 */
export function calculateMainEffects(
  doeMatrix: DOERow[],
  ratings: Map<number, Rating>
): Record<keyof FontParameters, number> {
  // Initialize effect accumulators for 7 factors
  const effects: Record<keyof FontParameters, { sum: number; count: number }> = {
    letterSpacing: { sum: 0, count: 0 },
    wordSpacing: { sum: 0, count: 0 },
    lineHeight: { sum: 0, count: 0 },
    fontWeight: { sum: 0, count: 0 },
    fontSize: { sum: 0, count: 0 },
    paragraphWidth: { sum: 0, count: 0 },
    bwgt: { sum: 0, count: 0 },
  };

  // Calculate effect for each factor
  // Effect = (average response at high level) - (average response at low level)
  for (const row of doeMatrix) {
    const rating = ratings.get(row.runNumber);
    if (rating === undefined) continue;

    const factors = Object.keys(effects) as (keyof FontParameters)[];
    for (const factor of factors) {
      const level = row.parameters[factor];
      effects[factor].sum += level * rating;
      effects[factor].count += 1;
    }
  }

  // Calculate final effects (divide by n/2 for proper scaling)
  // For 16-run design: Effect = 2 * (sum of level*response) / 16
  const result: Record<keyof FontParameters, number> = {
    letterSpacing: 0,
    wordSpacing: 0,
    lineHeight: 0,
    fontWeight: 0,
    fontSize: 0,
    paragraphWidth: 0,
    bwgt: 0,
  };

  const factors = Object.keys(effects) as (keyof FontParameters)[];
  for (const factor of factors) {
    const { sum, count } = effects[factor];
    // Effect = 2 * (sum of level*response) / n
    result[factor] = count > 0 ? (2 * sum) / count : 0;
  }

  return result;
}

/**
 * Calculate standard error for effect significance testing
 */
export function calculateStandardError(
  effects: Record<keyof FontParameters, number>,
  doeMatrix: DOERow[],
  ratings: Map<number, Rating>
): number {
  // Pool variance estimate from three-factor and higher interactions
  // For Resolution III design, these are assumed negligible
  const n = ratings.size;
  if (n < 4) return 1; // Not enough data

  // Calculate residual sum of squares
  let sumSquaredResiduals = 0;
  for (const row of doeMatrix) {
    const rating = ratings.get(row.runNumber);
    if (rating === undefined) continue;

    // Predicted value from main effects
    let predicted = 0;
    const factors = Object.keys(effects) as (keyof FontParameters)[];
    for (const factor of factors) {
      predicted += (effects[factor] / 2) * row.parameters[factor];
    }

    const residual = rating - predicted;
    sumSquaredResiduals += residual * residual;
  }

  // Standard error of effects
  // SE = sqrt(4 * MSE / n) where MSE = SSE / (n - p)
  const degreesOfFreedom = n - Object.keys(effects).length - 1;
  if (degreesOfFreedom <= 0) return 1;

  const mse = sumSquaredResiduals / degreesOfFreedom;
  return Math.sqrt(4 * mse / n);
}

/**
 * Determine which factors are statistically significant
 * Uses t-test with alpha = 0.05
 */
export function getSignificantFactors(
  effects: Record<keyof FontParameters, number>,
  standardError: number,
  alpha: number = 0.05
): (keyof FontParameters)[] {
  // Critical t-value for alpha = 0.05, two-tailed, ~25 df ≈ 2.06
  const tCritical = 2.06;

  const significant: (keyof FontParameters)[] = [];
  const factors = Object.keys(effects) as (keyof FontParameters)[];

  for (const factor of factors) {
    const tValue = Math.abs(effects[factor]) / standardError;
    if (tValue > tCritical) {
      significant.push(factor);
    }
  }

  return significant;
}

/**
 * Converts a design run to human-readable factor descriptions
 */
export function describeRun(params: FontParameters): string[] {
  const descriptions: string[] = [];

  if (params.letterSpacing === 1) descriptions.push('Wider letter spacing (+12%)');
  if (params.wordSpacing === 1) descriptions.push('Wider word spacing (+20%)');
  if (params.lineHeight === 1) descriptions.push('Increased line height (1.8)');
  if (params.fontWeight === 1) descriptions.push('Heavier weight (600)');
  if (params.fontSize === 1) descriptions.push('Larger text (+15%)');
  if (params.paragraphWidth === 1) descriptions.push('Narrower lines (50ch)');
  if (params.bwgt === 1) descriptions.push('Heavy bottom weight (BWGT 100)');

  if (descriptions.length === 0) descriptions.push('Baseline settings');

  return descriptions;
}

/**
 * Two-factor interaction alias groups for 2^(7-3) Resolution IV design
 * 
 * With generators E=ABC, F=ABD, G=ACD:
 * - AB + CE + DF
 * - AC + BE + DG
 * - AD + BF + CG
 * - AE + BC + FG
 * - AF + BD + EG
 * - AG + CD + EF
 * - BG + DE + CF
 * 
 * Note: In Resolution IV, main effects are clean but 2FIs alias with other 2FIs.
 * The effects analysis module (effectsAnalysis.ts) handles 2FI calculations.
 */
