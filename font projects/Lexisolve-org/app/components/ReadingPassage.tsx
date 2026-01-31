'use client';

/**
 * ReadingPassage Component
 * 
 * Displays reading passage text with configurable typography settings
 * including BWGT (Bottom Weight) variable font axis and DOE factors.
 */

import React, { CSSProperties, useMemo } from 'react';

export interface ReadingPassageProps {
    /** The passage text to display */
    text: string;
    /** Passage title (optional) */
    title?: string;
    /** BWGT value (0-100) for bottom-weight axis */
    bwgt?: number;
    /** Letter spacing in em units (e.g., 0.12 for +12%) */
    letterSpacing?: number;
    /** Word spacing in em units (e.g., 0.2 for +20%) */
    wordSpacing?: number;
    /** Line height multiplier (e.g., 1.4 or 1.8) */
    lineHeight?: number;
    /** Font weight (400-600) */
    fontWeight?: number;
    /** Font size in em units (e.g., 1 or 1.15) */
    fontSize?: number;
    /** Max width for paragraph (e.g., '65ch' or '50ch') */
    maxWidth?: string;
    /** Additional CSS class names */
    className?: string;
    /** Additional inline styles */
    style?: CSSProperties;
}

/**
 * ReadingPassage displays text with the Lexisolve BWGT variable font
 * and configurable typography settings for DOE testing.
 * 
 * @example
 * ```tsx
 * <ReadingPassage
 *   text="The quick brown fox..."
 *   bwgt={50}
 *   letterSpacing={0.12}
 *   lineHeight={1.8}
 * />
 * ```
 */
export function ReadingPassage({
    text,
    title,
    bwgt = 0,
    letterSpacing = 0,
    wordSpacing = 0,
    lineHeight = 1.4,
    fontWeight = 400,
    fontSize = 1,
    maxWidth = '65ch',
    className = '',
    style = {},
}: ReadingPassageProps) {
    // Memoize computed styles for performance
    const computedStyles = useMemo<CSSProperties>(() => {
        const clampedBwgt = Math.max(0, Math.min(100, bwgt));

        return {
            fontFamily: '"Lexisolve BWGT", Arial, sans-serif',
            fontVariationSettings: `'BWGT' ${clampedBwgt}`,
            letterSpacing: `${letterSpacing}em`,
            wordSpacing: `${wordSpacing}em`,
            lineHeight,
            fontWeight,
            fontSize: `${fontSize}em`,
            maxWidth,
            ...style,
        };
    }, [bwgt, letterSpacing, wordSpacing, lineHeight, fontWeight, fontSize, maxWidth, style]);

    // Split text into paragraphs
    const paragraphs = text.split('\n\n').filter(p => p.trim());

    return (
        <article
            className={`reading-passage ${className}`}
            style={computedStyles}
        >
            {title && (
                <h2
                    className="text-xl font-semibold mb-4"
                    style={{
                        fontFamily: '"Lexisolve BWGT", Arial, sans-serif',
                        fontVariationSettings: `'BWGT' ${Math.max(0, Math.min(100, bwgt))}`,
                    }}
                >
                    {title}
                </h2>
            )}
            {paragraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                </p>
            ))}
        </article>
    );
}

/**
 * ReadingPassagePreview - Shows a compact preview of font settings
 * Useful for A/B comparison displays
 */
export function ReadingPassagePreview({
    text = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.",
    bwgt = 0,
    letterSpacing = 0,
    wordSpacing = 0,
    lineHeight = 1.4,
    fontWeight = 400,
    fontSize = 1,
    label,
}: Omit<ReadingPassageProps, 'title' | 'maxWidth' | 'className' | 'style'> & { label?: string }) {
    const styles: CSSProperties = {
        fontFamily: '"Lexisolve BWGT", Arial, sans-serif',
        fontVariationSettings: `'BWGT' ${Math.max(0, Math.min(100, bwgt))}`,
        letterSpacing: `${letterSpacing}em`,
        wordSpacing: `${wordSpacing}em`,
        lineHeight,
        fontWeight,
        fontSize: `${fontSize}em`,
    };

    return (
        <div className="reading-passage-preview p-4 border rounded-lg bg-white">
            {label && (
                <div className="text-xs text-gray-500 mb-2 font-sans">
                    {label}
                </div>
            )}
            <p style={styles}>
                {text}
            </p>
        </div>
    );
}

export default ReadingPassage;