'use client';

import { CSSFontValues } from '@/lib/types/session';
import { Passage } from '@/lib/passages/passageBank';

interface TestPassageProps {
  passage: Passage;
  cssValues: CSSFontValues;
  isBaseline?: boolean;
}

/**
 * TestPassage Component
 * 
 * BASELINE vs TEST FONT:
 * - Baseline uses Roboto (neutral font) for objective comparison
 * - Test samples use Lexisolve/OpenDyslexic to test typography changes
 * 
 * This ensures comparisons aren't biased by OpenDyslexic's built-in features.
 */
export default function TestPassage({ passage, cssValues, isBaseline = false }: TestPassageProps) {
  // Baseline uses neutral Roboto font; test samples use Lexisolve/OpenDyslexic
  const fontFamily = isBaseline
    ? "'Roboto', 'Arial', sans-serif"
    : "'Lexisolve', 'OpenDyslexic', 'Comic Sans MS', sans-serif";

  return (
    <div className="w-full">
      {/* Baseline indicator */}
      {isBaseline && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <span className="text-blue-800 text-sm font-medium">
            📌 This is your reference sample. Remember how this feels.
          </span>
        </div>
      )}

      {/* Reading passage container */}
      <div
        className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm"
        style={{
          maxWidth: cssValues.maxWidth,
          margin: '0 auto',
        }}
      >
        <p
          className="text-dark-blue leading-relaxed"
          style={{
            fontFamily: fontFamily,
            fontSize: cssValues.fontSize,
            fontWeight: cssValues.fontWeight,
            letterSpacing: cssValues.letterSpacing,
            wordSpacing: cssValues.wordSpacing,
            lineHeight: cssValues.lineHeight,
            fontVariationSettings: isBaseline ? undefined : cssValues.fontVariationSettings,
          }}
        >
          {passage.text}
        </p>
      </div>

      {/* Passage metadata (hidden from user, useful for debugging) */}
      <div className="mt-4 text-center text-xs text-gray-400">
        {passage.wordCount} words • {passage.readingLevel} grade level
        {isBaseline && ' • Baseline (Roboto)'}
      </div>
    </div>
  );
}
