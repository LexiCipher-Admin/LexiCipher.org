'use strict';
/**
 * telemetry.test.ts — Unit tests for the shared telemetry utility helpers.
 *
 * Tests:
 *   bucketNormalized()       — boundary conditions for all 4 bucket labels
 *   isOptimizationCompleted() — all 4 combination cases from the QA plan
 *
 * Run: npm test
 */

import { describe, it, expect } from 'vitest';
import { bucketNormalized, isOptimizationCompleted } from '@/lib/utils/telemetry';
import type { OptimizationResult } from '@/lib/types/session';

// ---------------------------------------------------------------------------
// bucketNormalized
// ---------------------------------------------------------------------------

describe('bucketNormalized', () => {
  it('0 → "low"', () => {
    expect(bucketNormalized(0)).toBe('low');
  });

  it('0.25 → "low" (upper boundary inclusive)', () => {
    expect(bucketNormalized(0.25)).toBe('low');
  });

  it('0.251 → "medium-low"', () => {
    expect(bucketNormalized(0.251)).toBe('medium-low');
  });

  it('0.5 → "medium-low" (upper boundary inclusive)', () => {
    expect(bucketNormalized(0.5)).toBe('medium-low');
  });

  it('0.501 → "medium-high"', () => {
    expect(bucketNormalized(0.501)).toBe('medium-high');
  });

  it('0.75 → "medium-high" (upper boundary inclusive)', () => {
    expect(bucketNormalized(0.75)).toBe('medium-high');
  });

  it('0.751 → "high"', () => {
    expect(bucketNormalized(0.751)).toBe('high');
  });

  it('1.0 → "high"', () => {
    expect(bucketNormalized(1.0)).toBe('high');
  });
});

// ---------------------------------------------------------------------------
// isOptimizationCompleted
// ---------------------------------------------------------------------------

describe('isOptimizationCompleted', () => {
  it('skipped=true, trialsRun=5 → false (skipped overrides)', () => {
    const result = { skipped: true, trialsRun: 5 } as OptimizationResult;
    expect(isOptimizationCompleted(result)).toBe(false);
  });

  it('skipped=undefined, trialsRun=0 → false (no trials run)', () => {
    const result = { trialsRun: 0 } as OptimizationResult;
    expect(isOptimizationCompleted(result)).toBe(false);
  });

  it('skipped=undefined, trialsRun=10 → true', () => {
    const result = { trialsRun: 10 } as OptimizationResult;
    expect(isOptimizationCompleted(result)).toBe(true);
  });

  it('optimizationResult=undefined → false', () => {
    expect(isOptimizationCompleted(undefined)).toBe(false);
  });
});
