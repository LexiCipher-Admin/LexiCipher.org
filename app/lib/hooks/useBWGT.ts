/**
 * useBWGT Hook
 * 
 * React hook for managing the Bottom-Weight (BWGT) variable font axis.
 * The BWGT axis ranges from 0 (uniform weight) to 100 (heavy bottom).
 */

import { useState, useMemo, CSSProperties } from 'react';

export interface BWGTStyles extends CSSProperties {
    fontFamily: string;
    fontVariationSettings: string;
}

export interface UseBWGTReturn {
    /** Current BWGT value (0-100) */
    bwgtValue: number;
    /** Set BWGT value */
    setBwgtValue: (value: number) => void;
    /** CSS styles to apply to elements using BWGT font */
    styles: BWGTStyles;
}

/**
 * Hook to manage BWGT variable font axis
 * 
 * @param initialValue - Initial BWGT value (0-100), defaults to 0
 * @returns Object with bwgtValue, setBwgtValue, and styles
 * 
 * @example
 * ```tsx
 * const { bwgtValue, setBwgtValue, styles } = useBWGT(50);
 * 
 * return (
 *   <div>
 *     <input
 *       type="range"
 *       min="0"
 *       max="100"
 *       value={bwgtValue}
 *       onChange={(e) => setBwgtValue(Number(e.target.value))}
 *     />
 *     <p style={styles}>Sample text with BWGT {bwgtValue}</p>
 *   </div>
 * );
 * ```
 */
export function useBWGT(initialValue: number = 0): UseBWGTReturn {
    const [bwgtValue, setBwgtValue] = useState<number>(() => {
        // Clamp initial value to valid range
        return Math.max(0, Math.min(100, initialValue));
    });

    // Memoize styles to prevent unnecessary re-renders
    const styles = useMemo<BWGTStyles>(() => ({
        fontFamily: '"Lexisolve BWGT", Arial, sans-serif',
        fontVariationSettings: `'BWGT' ${bwgtValue}`,
    }), [bwgtValue]);

    // Wrapper to clamp values
    const setClampedValue = (value: number) => {
        setBwgtValue(Math.max(0, Math.min(100, value)));
    };

    return {
        bwgtValue,
        setBwgtValue: setClampedValue,
        styles,
    };
}

/**
 * Get BWGT styles without hook state management
 * Useful for server components or static styling
 * 
 * @param bwgtValue - BWGT value (0-100)
 * @returns CSS styles object
 */
export function getBWGTStyles(bwgtValue: number): BWGTStyles {
    const clampedValue = Math.max(0, Math.min(100, bwgtValue));
    return {
        fontFamily: '"Lexisolve BWGT", Arial, sans-serif',
        fontVariationSettings: `'BWGT' ${clampedValue}`,
    };
}

export default useBWGT;