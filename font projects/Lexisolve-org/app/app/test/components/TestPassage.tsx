'use client';

import { CSSFontValues } from '@/lib/types/session';
import { Passage } from '@/lib/passages/passageBank';

interface TestPassageProps {
  passage: Passage;
  cssValues: CSSFontValues;
  isBaseline?: boolean;
}

export default function TestPassage({ passage, cssValues, isBaseline = false }: TestPassageProps) {
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
            fontFamily: "'Lexisolve', 'OpenDyslexic', 'Comic Sans MS', sans-serif",
            fontSize: cssValues.fontSize,
            fontWeight: cssValues.fontWeight,
            letterSpacing: cssValues.letterSpacing,
            wordSpacing: cssValues.wordSpacing,
            lineHeight: cssValues.lineHeight,
            fontVariationSettings: cssValues.fontVariationSettings,
          }}
        >
          {passage.text}
        </p>
      </div>

      {/* Passage metadata (hidden from user, useful for debugging) */}
      <div className="mt-4 text-center text-xs text-gray-400">
        {passage.wordCount} words • {passage.readingLevel} grade level
      </div>
    </div>
  );
}