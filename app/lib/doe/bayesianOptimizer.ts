/**
 * Bayesian Optimization for Font Parameters
 * 
 * Uses Gaussian Process regression with Expected Improvement (EI)
 * acquisition function to fine-tune font parameters after initial DOE.
 * 
 * Only optimizes factors that were found significant in the DOE phase.
 */

import { FontParameters } from '../types/session';

// Type for continuous parameter values (0 to 1 normalized scale)
// EXTREME RANGES (updated based on alpha test feedback):
export interface NormalizedParams {
  letterSpacing: number;  // 0 = 0%, 1 = 25% (was 12%)
  wordSpacing: number;    // 0 = 0%, 1 = 40% (was 20%)
  lineHeight: number;     // 0 = 1.3, 1 = 2.0 (was 1.4-1.8)
  fontWeight: number;     // 0 = 300, 1 = 700 (was 400-600)
  fontSize: number;       // 0 = -10%, 1 = 25% (was 0-15%)
  paragraphWidth: number; // 0 = 80ch, 1 = 40ch (was 65-50ch)
  bwgt: number;           // 0 = 0, 1 = 100 (BWGT axis)
}

export interface BayesianDataPoint {
  params: NormalizedParams;
  rating: number; // User preference rating (-1, 0, 1)
}

export interface BayesianState {
  observations: BayesianDataPoint[];
  significantFactors: (keyof FontParameters)[];
  currentIteration: number;
  maxIterations: number;
  bestParams: NormalizedParams | null;
  bestRating: number;
}

/**
 * Squared Exponential (RBF) kernel for Gaussian Process
 */
function rbfKernel(
  x1: number[],
  x2: number[],
  lengthScale: number = 0.3,
  variance: number = 1.0
): number {
  let squaredDist = 0;
  for (let i = 0; i < x1.length; i++) {
    squaredDist += Math.pow(x1[i] - x2[i], 2);
  }
  return variance * Math.exp(-squaredDist / (2 * lengthScale * lengthScale));
}

/**
 * Build covariance matrix for Gaussian Process
 */
function buildCovarianceMatrix(
  X: number[][],
  lengthScale: number = 0.3,
  noise: number = 0.1
): number[][] {
  const n = X.length;
  const K: number[][] = [];

  for (let i = 0; i < n; i++) {
    K[i] = [];
    for (let j = 0; j < n; j++) {
      K[i][j] = rbfKernel(X[i], X[j], lengthScale);
      if (i === j) {
        K[i][j] += noise; // Add noise on diagonal
      }
    }
  }

  return K;
}

/**
 * Simple matrix inversion using Gauss-Jordan elimination
 * For small matrices used in our GP
 */
function invertMatrix(matrix: number[][]): number[][] {
  const n = matrix.length;
  const augmented: number[][] = matrix.map((row, i) => [
    ...row,
    ...Array(n).fill(0).map((_, j) => (i === j ? 1 : 0))
  ]);

  // Forward elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
        maxRow = k;
      }
    }
    [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

    // Check for singular matrix
    if (Math.abs(augmented[i][i]) < 1e-10) {
      // Add small regularization
      augmented[i][i] = 1e-6;
    }

    // Scale row
    const scale = augmented[i][i];
    for (let j = 0; j < 2 * n; j++) {
      augmented[i][j] /= scale;
    }

    // Eliminate column
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = augmented[k][i];
        for (let j = 0; j < 2 * n; j++) {
          augmented[k][j] -= factor * augmented[i][j];
        }
      }
    }
  }

  // Extract inverse
  return augmented.map(row => row.slice(n));
}

/**
 * Matrix-vector multiplication
 */
function matVecMul(matrix: number[][], vec: number[]): number[] {
  return matrix.map(row =>
    row.reduce((sum, val, i) => sum + val * vec[i], 0)
  );
}

/**
 * Gaussian Process prediction at a new point
 */
function gpPredict(
  xNew: number[],
  X: number[][],
  y: number[],
  lengthScale: number = 0.3,
  noise: number = 0.1
): { mean: number; variance: number } {
  if (X.length === 0) {
    return { mean: 0, variance: 1 };
  }

  // Build covariance matrix and its inverse
  const K = buildCovarianceMatrix(X, lengthScale, noise);
  const Kinv = invertMatrix(K);

  // Covariance between new point and training points
  const kStar = X.map(x => rbfKernel(xNew, x, lengthScale));

  // Prior variance at new point
  const kStarStar = rbfKernel(xNew, xNew, lengthScale) + noise;

  // Posterior mean: k* @ K^-1 @ y
  const alpha = matVecMul(Kinv, y);
  const mean = kStar.reduce((sum, k, i) => sum + k * alpha[i], 0);

  // Posterior variance: k** - k* @ K^-1 @ k*
  const v = matVecMul(Kinv, kStar);
  const variance = kStarStar - kStar.reduce((sum, k, i) => sum + k * v[i], 0);

  return { mean, variance: Math.max(variance, 1e-6) };
}

/**
 * Expected Improvement acquisition function
 */
function expectedImprovement(
  mean: number,
  variance: number,
  bestSoFar: number,
  xi: number = 0.01
): number {
  const std = Math.sqrt(variance);
  if (std < 1e-6) return 0;

  const z = (mean - bestSoFar - xi) / std;
  const cdf = normalCDF(z);
  const pdf = normalPDF(z);

  return (mean - bestSoFar - xi) * cdf + std * pdf;
}

/**
 * Standard normal CDF approximation
 */
function normalCDF(x: number): number {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1.0 + sign * y);
}

/**
 * Standard normal PDF
 */
function normalPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

/**
 * Extract feature vector for significant factors only
 */
function extractFeatures(
  params: NormalizedParams,
  significantFactors: (keyof FontParameters)[]
): number[] {
  return significantFactors.map(f => params[f]);
}

/**
 * Initialize Bayesian optimization state
 */
export function initializeBayesianState(
  significantFactors: (keyof FontParameters)[],
  doeEffects: Record<keyof FontParameters, number>,
  maxIterations: number = 10
): BayesianState {
  // Start with the DOE recommendation as initial best guess
  const initialParams: NormalizedParams = {
    letterSpacing: doeEffects.letterSpacing > 0 ? 0.75 : 0.25,
    wordSpacing: doeEffects.wordSpacing > 0 ? 0.75 : 0.25,
    lineHeight: doeEffects.lineHeight > 0 ? 0.75 : 0.25,
    fontWeight: doeEffects.fontWeight > 0 ? 0.75 : 0.25,
    fontSize: doeEffects.fontSize > 0 ? 0.75 : 0.25,
    paragraphWidth: doeEffects.paragraphWidth > 0 ? 0.75 : 0.25,
    bwgt: doeEffects.bwgt > 0 ? 0.75 : 0.25,
  };

  return {
    observations: [],
    significantFactors,
    currentIteration: 0,
    maxIterations,
    bestParams: initialParams,
    bestRating: -Infinity,
  };
}

/**
 * Add an observation to the Bayesian state
 */
export function addObservation(
  state: BayesianState,
  params: NormalizedParams,
  rating: number
): BayesianState {
  const newObservations = [...state.observations, { params, rating }];

  // Update best if this rating is better
  const isBetter = rating > state.bestRating;

  return {
    ...state,
    observations: newObservations,
    currentIteration: state.currentIteration + 1,
    bestParams: isBetter ? params : state.bestParams,
    bestRating: isBetter ? rating : state.bestRating,
  };
}

/**
 * Generate the next point to evaluate using Expected Improvement
 */
export function getNextPoint(state: BayesianState): NormalizedParams {
  const { observations, significantFactors, bestRating } = state;

  // If no observations yet, return a random point
  if (observations.length === 0) {
    return generateRandomPoint(significantFactors);
  }

  // Extract training data
  const X = observations.map(o => extractFeatures(o.params, significantFactors));
  const y = observations.map(o => o.rating);

  // Grid search for maximum EI (simple but effective for low dimensions)
  const gridSize = 10;
  let bestEI = -Infinity;
  let bestPoint: number[] = significantFactors.map(() => 0.5);

  // Generate grid points
  const dims = significantFactors.length;
  const gridPoints = generateGrid(dims, gridSize);

  for (const point of gridPoints) {
    const { mean, variance } = gpPredict(point, X, y);
    const ei = expectedImprovement(mean, variance, bestRating);

    if (ei > bestEI) {
      bestEI = ei;
      bestPoint = point;
    }
  }

  // Convert back to NormalizedParams
  return featuresToParams(bestPoint, significantFactors);
}

/**
 * Generate random point for initial exploration
 */
function generateRandomPoint(significantFactors: (keyof FontParameters)[]): NormalizedParams {
  const params: NormalizedParams = {
    letterSpacing: 0.5,
    wordSpacing: 0.5,
    lineHeight: 0.5,
    fontWeight: 0.5,
    fontSize: 0.5,
    paragraphWidth: 0.5,
    bwgt: 0.5,
  };

  // Randomize only significant factors
  for (const factor of significantFactors) {
    params[factor] = Math.random();
  }

  return params;
}

/**
 * Generate grid points for optimization
 */
function generateGrid(dims: number, gridSize: number): number[][] {
  if (dims === 0) return [[]];

  const points: number[][] = [];
  const step = 1 / (gridSize - 1);

  function recurse(current: number[], dim: number) {
    if (dim === dims) {
      points.push([...current]);
      return;
    }

    for (let i = 0; i < gridSize; i++) {
      current.push(i * step);
      recurse(current, dim + 1);
      current.pop();
    }
  }

  recurse([], 0);
  return points;
}

/**
 * Convert feature vector back to NormalizedParams
 */
function featuresToParams(
  features: number[],
  significantFactors: (keyof FontParameters)[]
): NormalizedParams {
  const params: NormalizedParams = {
    letterSpacing: 0.5,
    wordSpacing: 0.5,
    lineHeight: 0.5,
    fontWeight: 0.5,
    fontSize: 0.5,
    paragraphWidth: 0.5,
    bwgt: 0.5,
  };

  significantFactors.forEach((factor, i) => {
    params[factor] = features[i];
  });

  return params;
}

/**
 * Convert normalized params (0-1) to actual CSS values
 * 
 * EXTREME RANGES (updated based on alpha test feedback):
 * - Letter spacing: 0% → +25%
 * - Word spacing: 0% → +40%
 * - Line height: 1.3 → 2.0
 * - Font weight: 300 → 700
 * - Font size: -10% → +25% (0.9em → 1.25em)
 * - Line width: 80ch → 40ch
 */
export function normalizedToCSS(params: NormalizedParams): {
  fontSize: string;
  letterSpacing: string;
  wordSpacing: string;
  lineHeight: number;
  fontWeight: number;
  maxWidth: string;
  fontVariationSettings: string;
} {
  // BWGT: 0-1 maps to 0-100
  const bwgtValue = Math.round(params.bwgt * 100);

  // Font size: 0 = 0.9em (-10%), 1 = 1.25em (+25%)
  const fontSizeValue = 0.9 + params.fontSize * 0.35;

  return {
    fontSize: `${fontSizeValue.toFixed(2)}em`,                         // -10% to +25%
    letterSpacing: `${(params.letterSpacing * 0.25).toFixed(3)}em`,    // 0-25%
    wordSpacing: `${(params.wordSpacing * 0.4).toFixed(2)}em`,         // 0-40%
    lineHeight: 1.3 + params.lineHeight * 0.7,                         // 1.3-2.0
    fontWeight: 300 + Math.round(params.fontWeight * 400),             // 300-700
    maxWidth: `${80 - params.paragraphWidth * 40}ch`,                  // 80ch-40ch
    fontVariationSettings: `'BWGT' ${bwgtValue}`,
  };
}

/**
 * Convert normalized params to human-readable descriptions
 * Uses EXTREME RANGES
 */
export function describeNormalizedParams(params: NormalizedParams): Record<string, string> {
  const css = normalizedToCSS(params);

  // Font size: 0 = -10%, 1 = +25%
  const fontSizePercent = -10 + params.fontSize * 35;

  return {
    letterSpacing: `${(params.letterSpacing * 25).toFixed(1)}%`,       // 0-25%
    wordSpacing: `${(params.wordSpacing * 40).toFixed(1)}%`,           // 0-40%
    lineHeight: css.lineHeight.toFixed(2),
    fontWeight: css.fontWeight.toString(),
    fontSize: `${fontSizePercent >= 0 ? '+' : ''}${fontSizePercent.toFixed(1)}%`,
    paragraphWidth: css.maxWidth,
    bwgt: `${Math.round(params.bwgt * 100)}`,
  };
}

/**
 * Check if optimization should continue
 */
export function shouldContinueOptimization(state: BayesianState): boolean {
  return state.currentIteration < state.maxIterations;
}

/**
 * Get the final optimized parameters
 */
export function getFinalParams(state: BayesianState): NormalizedParams {
  return state.bestParams || {
    letterSpacing: 0.5,
    wordSpacing: 0.5,
    lineHeight: 0.5,
    fontWeight: 0.5,
    fontSize: 0.5,
    paragraphWidth: 0.5,
    bwgt: 0.5,
  };
}
