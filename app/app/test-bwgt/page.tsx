'use client';

/**
 * BWGT Font Test Page
 * 
 * Interactive testing page for the Lexisolve BWGT variable font.
 * Allows real-time adjustment of BWGT axis and other typography settings.
 */

import React from 'react';
import { useBWGT } from '@/lib/hooks/useBWGT';
import { ReadingPassage, ReadingPassagePreview } from '@/components/ReadingPassage';

const SAMPLE_PASSAGE = `The morning sun cast long shadows across the meadow as Maya walked toward the old oak tree. She had been coming to this spot for years, ever since her grandmother first showed her the hidden path through the woods.

Today felt different somehow. The air smelled sweeter, and the birdsong seemed to carry a special melody. Maya settled down among the roots of the great tree and opened her worn leather journal.

"Every journey begins with a single step," her grandmother used to say. Looking back at all the pages filled with her adventures, Maya smiled. This was just the beginning of a new chapter.`;

const PANGRAM = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.";

export default function TestBWGTPage() {
    const { bwgtValue, setBwgtValue, styles } = useBWGT(0);
    const [letterSpacing, setLetterSpacing] = React.useState(0);
    const [wordSpacing, setWordSpacing] = React.useState(0);
    const [lineHeight, setLineHeight] = React.useState(1.5);
    const [fontWeight, setFontWeight] = React.useState(400);
    const [fontSize, setFontSize] = React.useState(1);

    return (
        <div className="min-h-screen bg-[#fdfbf7] p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-[#1e3a5f]">
                    BWGT Font Test Page
                </h1>
                <p className="text-gray-600 mb-8">
                    Test the Lexisolve BWGT (Bottom Weight) variable font with interactive controls.
                </p>

                {/* Controls Panel */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-[#1e3a5f]">
                        Typography Controls
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* BWGT Slider */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                BWGT (Bottom Weight): <span className="font-mono text-blue-600">{bwgtValue}</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={bwgtValue}
                                onChange={(e) => setBwgtValue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0 (Uniform)</span>
                                <span>50</span>
                                <span>100 (Heavy Bottom)</span>
                            </div>
                        </div>

                        {/* Font Size Slider */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Font Size: <span className="font-mono text-blue-600">{fontSize.toFixed(2)}em</span>
                            </label>
                            <input
                                type="range"
                                min="0.8"
                                max="1.5"
                                step="0.05"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0.8em</span>
                                <span>1.15em</span>
                                <span>1.5em</span>
                            </div>
                        </div>

                        {/* Letter Spacing Slider */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Letter Spacing: <span className="font-mono text-blue-600">{letterSpacing.toFixed(2)}em</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="0.2"
                                step="0.01"
                                value={letterSpacing}
                                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0em</span>
                                <span>0.12em (+12%)</span>
                                <span>0.2em</span>
                            </div>
                        </div>

                        {/* Word Spacing Slider */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Word Spacing: <span className="font-mono text-blue-600">{wordSpacing.toFixed(2)}em</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="0.4"
                                step="0.02"
                                value={wordSpacing}
                                onChange={(e) => setWordSpacing(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>0em</span>
                                <span>0.2em (+20%)</span>
                                <span>0.4em</span>
                            </div>
                        </div>

                        {/* Line Height Slider */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Line Height: <span className="font-mono text-blue-600">{lineHeight.toFixed(1)}</span>
                            </label>
                            <input
                                type="range"
                                min="1.2"
                                max="2.2"
                                step="0.1"
                                value={lineHeight}
                                onChange={(e) => setLineHeight(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>1.2</span>
                                <span>1.6</span>
                                <span>2.2</span>
                            </div>
                        </div>

                        {/* Font Weight Slider */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Font Weight: <span className="font-mono text-blue-600">{fontWeight}</span>
                            </label>
                            <input
                                type="range"
                                min="400"
                                max="600"
                                step="50"
                                value={fontWeight}
                                onChange={(e) => setFontWeight(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>400 (Normal)</span>
                                <span>500</span>
                                <span>600 (Semi-bold)</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="mt-6 pt-4 border-t">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Presets</h3>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => {
                                    setBwgtValue(0);
                                    setLetterSpacing(0);
                                    setWordSpacing(0);
                                    setLineHeight(1.5);
                                    setFontWeight(400);
                                    setFontSize(1);
                                }}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
                            >
                                Baseline
                            </button>
                            <button
                                onClick={() => {
                                    setBwgtValue(50);
                                    setLetterSpacing(0.06);
                                    setWordSpacing(0.1);
                                    setLineHeight(1.6);
                                    setFontWeight(400);
                                    setFontSize(1.1);
                                }}
                                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded text-sm"
                            >
                                Moderate Dyslexia
                            </button>
                            <button
                                onClick={() => {
                                    setBwgtValue(100);
                                    setLetterSpacing(0.12);
                                    setWordSpacing(0.2);
                                    setLineHeight(1.8);
                                    setFontWeight(500);
                                    setFontSize(1.15);
                                }}
                                className="px-3 py-1 bg-green-100 hover:bg-green-200 rounded text-sm"
                            >
                                High Accessibility
                            </button>
                        </div>
                    </div>
                </div>

                {/* BWGT Comparison */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-[#1e3a5f]">
                        BWGT Axis Comparison
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ReadingPassagePreview
                            text={PANGRAM}
                            bwgt={0}
                            fontSize={fontSize}
                            letterSpacing={letterSpacing}
                            wordSpacing={wordSpacing}
                            lineHeight={lineHeight}
                            fontWeight={fontWeight}
                            label="BWGT 0 (Uniform)"
                        />
                        <ReadingPassagePreview
                            text={PANGRAM}
                            bwgt={50}
                            fontSize={fontSize}
                            letterSpacing={letterSpacing}
                            wordSpacing={wordSpacing}
                            lineHeight={lineHeight}
                            fontWeight={fontWeight}
                            label="BWGT 50 (Moderate)"
                        />
                        <ReadingPassagePreview
                            text={PANGRAM}
                            bwgt={100}
                            fontSize={fontSize}
                            letterSpacing={letterSpacing}
                            wordSpacing={wordSpacing}
                            lineHeight={lineHeight}
                            fontWeight={fontWeight}
                            label="BWGT 100 (Heavy Bottom)"
                        />
                    </div>
                </div>

                {/* Sample Passage with Current Settings */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-[#1e3a5f]">
                        Sample Passage (Current Settings)
                    </h2>
                    <div className="prose max-w-none">
                        <ReadingPassage
                            title="A Morning Walk"
                            text={SAMPLE_PASSAGE}
                            bwgt={bwgtValue}
                            letterSpacing={letterSpacing}
                            wordSpacing={wordSpacing}
                            lineHeight={lineHeight}
                            fontWeight={fontWeight}
                            fontSize={fontSize}
                            maxWidth="65ch"
                        />
                    </div>
                </div>

                {/* CSS Output */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4 text-[#1e3a5f]">
                        CSS Output
                    </h2>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        {`.reading-passage {
  font-family: "Lexisolve BWGT", Arial, sans-serif;
  font-variation-settings: 'BWGT' ${bwgtValue};
  font-size: ${fontSize}em;
  font-weight: ${fontWeight};
  letter-spacing: ${letterSpacing}em;
  word-spacing: ${wordSpacing}em;
  line-height: ${lineHeight};
}`}
                    </pre>
                </div>

                {/* Back Link */}
                <div className="mt-8 text-center">
                    <a
                        href="/"
                        className="text-blue-600 hover:text-blue-800 underline"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}