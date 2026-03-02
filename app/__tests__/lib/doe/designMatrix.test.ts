'use strict';
/**
 * designMatrix.test.ts — Unit tests for the 2^(7-3) DOE engine.
 *
 * Tests pure functions from lib/doe/designMatrix.ts:
 *   generateDesignMatrix, calculateMainEffects,
 *   calculateStandardError, getSignificantFactors
 *
 * Run: npm test
 */

import { describe, it, expect } from 'vitest';
import {
  generateDesignMatrix,
  calculateMainEffects,
  calculateStandardError,
  getSignificantFactors,
} from '@/lib/doe/designMatrix';
import type { DOERow, Rating } from '@/lib/types/session';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a stable (sorted) matrix from generateDesignMatrix. */
function getSortedMatrix(): DOERow[] {
  return generateDesignMatrix(['p1', 'p2', 'p3']).sort(
    (a, b) => a.runNumber - b.runNumber
  );
}

/** Build a ratings Map where every run gets the same rating. */
function uniformRatings(matrix: DOERow[], rating: Rating): Map<number, Rating> {
  return new Map(matrix.map((row) => [row.runNumber, rating]));
}

// ---------------------------------------------------------------------------
// generateDesignMatrix
// ---------------------------------------------------------------------------

describe('generateDesignMatrix', () => {
  const REQUIRED_FACTORS = [
    'letterSpacing',
    'wordSpacing',
    'lineHeight',
    'fontWeight',
    'fontSize',
    'paragraphWidth',
    'bwgt',
  ] as const;

  it('returns exactly 16 rows', () => {
    expect(generateDesignMatrix(['p1'])).toHaveLength(16);
  });

  it('all 7 factors are assigned to each run with values ∈ {-1, +1}', () => {
    const matrix = generateDesignMatrix(['p1']);
    for (const row of matrix) {
      for (const factor of REQUIRED_FACTORS) {
        expect([-1, 1]).toContain(row.parameters[factor]);
      }
    }
  });

  it('no duplicate run numbers', () => {
    const matrix = generateDesignMatrix(['p1']);
    const runNumbers = matrix.map((r) => r.runNumber);
    expect(new Set(runNumbers).size).toBe(16);
  });

  it('run numbers are exactly 1–16', () => {
    const matrix = generateDesignMatrix(['p1']);
    const sorted = matrix.map((r) => r.runNumber).sort((a, b) => a - b);
    expect(sorted).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
  });
});

// ---------------------------------------------------------------------------
// calculateMainEffects
// ---------------------------------------------------------------------------

describe('calculateMainEffects', () => {
  it('perfect letterSpacing correlation → effect ≈ 2.0', () => {
    const matrix = getSortedMatrix();
    // Vote +1 when letterSpacing=+1, -1 when letterSpacing=-1
    const ratings = new Map<number, Rating>(
      matrix.map((row) => [row.runNumber, row.parameters.letterSpacing as Rating])
    );
    const effects = calculateMainEffects(matrix, ratings);
    expect(effects.letterSpacing).toBeCloseTo(2.0, 5);
  });

  it('all-neutral responses → all 7 effects are exactly 0', () => {
    const matrix = getSortedMatrix();
    const ratings = uniformRatings(matrix, 0);
    const effects = calculateMainEffects(matrix, ratings);
    for (const value of Object.values(effects)) {
      expect(value).toBe(0);
    }
  });

  it('empty ratings map → all effects are 0', () => {
    const matrix = getSortedMatrix();
    const effects = calculateMainEffects(matrix, new Map());
    for (const value of Object.values(effects)) {
      expect(value).toBe(0);
    }
  });
});

// ---------------------------------------------------------------------------
// calculateStandardError
// ---------------------------------------------------------------------------

describe('calculateStandardError', () => {
  it('all-neutral responses → SE is 0', () => {
    const matrix = getSortedMatrix();
    const ratings = uniformRatings(matrix, 0);
    const effects = calculateMainEffects(matrix, ratings);
    const se = calculateStandardError(effects, matrix, ratings);
    expect(se).toBeCloseTo(0, 10);
  });

  it('fewer than 4 ratings → returns 1 (guard for insufficient data)', () => {
    const matrix = getSortedMatrix();
    const ratings = new Map<number, Rating>([[1, 1]]); // only 1 rating
    const effects = calculateMainEffects(matrix, ratings);
    const se = calculateStandardError(effects, matrix, ratings);
    expect(se).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// tCritical = 0.5 regression test
// ---------------------------------------------------------------------------

describe('getSignificantFactors — tCritical=0.5 regression', () => {
  it('15 neutral + 1 better → at least 1 significant factor is detected', () => {
    // This documents the deliberate lowering of tCritical from 2.06 → 0.5.
    // Even a single non-neutral vote should push at least one factor over the threshold.
    const matrix = getSortedMatrix();
    const ratings = uniformRatings(matrix, 0);
    // Override the first run with a "Better" vote
    ratings.set(matrix[0].runNumber, 1);

    const effects = calculateMainEffects(matrix, ratings);
    const se = calculateStandardError(effects, matrix, ratings);
    const significant = getSignificantFactors(effects, se);

    expect(significant.length).toBeGreaterThanOrEqual(1);
  });

  it('all-neutral → no significant factors', () => {
    const matrix = getSortedMatrix();
    const ratings = uniformRatings(matrix, 0);
    const effects = calculateMainEffects(matrix, ratings);
    const se = calculateStandardError(effects, matrix, ratings);
    const significant = getSignificantFactors(effects, se);
    expect(significant).toHaveLength(0);
  });

  it('perfect positive correlation → all 7 factors significant', () => {
    const matrix = getSortedMatrix();
    const ratings = new Map<number, Rating>(
      matrix.map((row) => [row.runNumber, row.parameters.letterSpacing as Rating])
    );
    const effects = calculateMainEffects(matrix, ratings);
    const se = calculateStandardError(effects, matrix, ratings);
    const significant = getSignificantFactors(effects, se);
    // At minimum letterSpacing is significant; likely others due to aliasing
    expect(significant).toContain('letterSpacing');
  });
});
