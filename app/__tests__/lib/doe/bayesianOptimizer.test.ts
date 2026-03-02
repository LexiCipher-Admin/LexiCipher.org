'use strict';
/**
 * bayesianOptimizer.test.ts — Unit tests for normalizedToCSS and describeNormalizedParams.
 *
 * Tests the two pure output functions from lib/doe/bayesianOptimizer.ts.
 * Both functions map a NormalizedParams object (values 0–1) to human-readable
 * or CSS-ready representations.
 *
 * Run: npm test
 */

import { describe, it, expect } from 'vitest';
import {
  normalizedToCSS,
  describeNormalizedParams,
  type NormalizedParams,
} from '@/lib/doe/bayesianOptimizer';

const ALL_ZERO: NormalizedParams = {
  letterSpacing: 0,
  wordSpacing: 0,
  lineHeight: 0,
  fontWeight: 0,
  fontSize: 0,
  paragraphWidth: 0,
  bwgt: 0,
};

const ALL_ONE: NormalizedParams = {
  letterSpacing: 1,
  wordSpacing: 1,
  lineHeight: 1,
  fontWeight: 1,
  fontSize: 1,
  paragraphWidth: 1,
  bwgt: 1,
};

// ---------------------------------------------------------------------------
// normalizedToCSS
// ---------------------------------------------------------------------------

describe('normalizedToCSS', () => {
  describe('at all-0.0 (minimum values)', () => {
    it('fontSize → "0.90em" (-10%)', () => {
      expect(normalizedToCSS(ALL_ZERO).fontSize).toBe('0.90em');
    });

    it('letterSpacing → "0.000em" (0%)', () => {
      expect(normalizedToCSS(ALL_ZERO).letterSpacing).toBe('0.000em');
    });

    it('wordSpacing → "0.00em" (0%)', () => {
      expect(normalizedToCSS(ALL_ZERO).wordSpacing).toBe('0.00em');
    });

    it('lineHeight → 1.3', () => {
      expect(normalizedToCSS(ALL_ZERO).lineHeight).toBeCloseTo(1.3, 5);
    });

    it('fontWeight → 300', () => {
      expect(normalizedToCSS(ALL_ZERO).fontWeight).toBe(300);
    });

    it('maxWidth → "80ch"', () => {
      expect(normalizedToCSS(ALL_ZERO).maxWidth).toBe('80ch');
    });

    it("fontVariationSettings → \"'BWGT' 0\"", () => {
      expect(normalizedToCSS(ALL_ZERO).fontVariationSettings).toBe("'BWGT' 0");
    });
  });

  describe('at all-1.0 (maximum values)', () => {
    it('fontSize → "1.25em" (+25%)', () => {
      expect(normalizedToCSS(ALL_ONE).fontSize).toBe('1.25em');
    });

    it('letterSpacing → "0.250em" (+25%)', () => {
      expect(normalizedToCSS(ALL_ONE).letterSpacing).toBe('0.250em');
    });

    it('wordSpacing → "0.40em" (+40%)', () => {
      expect(normalizedToCSS(ALL_ONE).wordSpacing).toBe('0.40em');
    });

    it('lineHeight → 2.0', () => {
      expect(normalizedToCSS(ALL_ONE).lineHeight).toBeCloseTo(2.0, 5);
    });

    it('fontWeight → 700', () => {
      expect(normalizedToCSS(ALL_ONE).fontWeight).toBe(700);
    });

    it('maxWidth → "40ch"', () => {
      expect(normalizedToCSS(ALL_ONE).maxWidth).toBe('40ch');
    });

    it("fontVariationSettings → \"'BWGT' 100\"", () => {
      expect(normalizedToCSS(ALL_ONE).fontVariationSettings).toBe("'BWGT' 100");
    });
  });

  it('midpoint (0.5) produces values in the middle of each range', () => {
    const MID: NormalizedParams = {
      letterSpacing: 0.5, wordSpacing: 0.5, lineHeight: 0.5,
      fontWeight: 0.5, fontSize: 0.5, paragraphWidth: 0.5, bwgt: 0.5,
    };
    const css = normalizedToCSS(MID);
    // 0.9 + 0.5*0.35 = 1.075, but toFixed(2) rounds to "1.07" (JS float edge case)
    expect(css.fontSize).toBe('1.07em');
    expect(css.lineHeight).toBeCloseTo(1.65, 5);            // 1.3 + 0.5*0.7
    expect(css.fontWeight).toBe(500);                        // 300 + round(0.5*400)
  });
});

// ---------------------------------------------------------------------------
// describeNormalizedParams
// ---------------------------------------------------------------------------

describe('describeNormalizedParams', () => {
  describe('at all-0.0', () => {
    it('letterSpacing → "0.0%"', () => {
      expect(describeNormalizedParams(ALL_ZERO).letterSpacing).toBe('0.0%');
    });

    it('wordSpacing → "0.0%"', () => {
      expect(describeNormalizedParams(ALL_ZERO).wordSpacing).toBe('0.0%');
    });

    it('fontWeight → "300"', () => {
      expect(describeNormalizedParams(ALL_ZERO).fontWeight).toBe('300');
    });

    it('bwgt → "0"', () => {
      expect(describeNormalizedParams(ALL_ZERO).bwgt).toBe('0');
    });

    it('fontSize → "-10.0%"', () => {
      expect(describeNormalizedParams(ALL_ZERO).fontSize).toBe('-10.0%');
    });
  });

  describe('at all-1.0', () => {
    it('letterSpacing → "25.0%"', () => {
      expect(describeNormalizedParams(ALL_ONE).letterSpacing).toBe('25.0%');
    });

    it('wordSpacing → "40.0%"', () => {
      expect(describeNormalizedParams(ALL_ONE).wordSpacing).toBe('40.0%');
    });

    it('fontWeight → "700"', () => {
      expect(describeNormalizedParams(ALL_ONE).fontWeight).toBe('700');
    });

    it('bwgt → "100"', () => {
      expect(describeNormalizedParams(ALL_ONE).bwgt).toBe('100');
    });

    it('fontSize → "+25.0%"', () => {
      expect(describeNormalizedParams(ALL_ONE).fontSize).toBe('+25.0%');
    });
  });
});
