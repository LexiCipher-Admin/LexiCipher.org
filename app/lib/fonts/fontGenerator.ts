/**
 * Font Generator Utility
 * 
 * Generates personalized font settings and provides the LexiCipher BWGT variable font
 * for download along with CSS settings.
 * 
 * Note: Some settings like letter-spacing and line-height cannot be baked into
 * the font file itself and are provided as CSS recommendations instead.
 * The BWGT (bottom weight) axis IS embedded in the variable font.
 */

import { OptimizationResult } from '../types/session';

export interface FontSettings {
  letterSpacing: number;    // 0-12 (percentage)
  wordSpacing: number;      // 0-20 (percentage)
  lineHeight: number;       // 1.4-1.8
  fontWeight: number;       // 400-600
  fontSize: number;         // 0-15 (percentage boost)
  paragraphWidth: number;   // 50-65 (characters)
  bwgt: number;             // 0-100 (BWGT variable axis)
}

/**
 * Default font settings (center of ranges)
 */
export const DEFAULT_SETTINGS: FontSettings = {
  letterSpacing: 6,
  wordSpacing: 10,
  lineHeight: 1.6,
  fontWeight: 500,
  fontSize: 7.5,
  paragraphWidth: 57,
  bwgt: 50,
};

/**
 * Convert DOE results to font settings
 * Uses effect directions to set each parameter to its optimal end of range
 */
export function doeResultsToFontSettings(
  effects: Record<string, number>,
  significantFactors: string[]
): FontSettings {
  const settings = { ...DEFAULT_SETTINGS };

  // For significant factors, move toward the preferred direction
  // For non-significant factors, keep at center

  if (significantFactors.includes('letterSpacing')) {
    settings.letterSpacing = effects.letterSpacing > 0 ? 12 : 0;
  }

  if (significantFactors.includes('wordSpacing')) {
    settings.wordSpacing = effects.wordSpacing > 0 ? 20 : 0;
  }

  if (significantFactors.includes('lineHeight')) {
    settings.lineHeight = effects.lineHeight > 0 ? 1.8 : 1.4;
  }

  if (significantFactors.includes('fontWeight')) {
    settings.fontWeight = effects.fontWeight > 0 ? 600 : 400;
  }

  if (significantFactors.includes('fontSize')) {
    settings.fontSize = effects.fontSize > 0 ? 15 : 0;
  }

  if (significantFactors.includes('paragraphWidth')) {
    // Lower is narrower (50ch), higher is wider (65ch)
    settings.paragraphWidth = effects.paragraphWidth > 0 ? 50 : 65;
  }

  if (significantFactors.includes('bwgt')) {
    // BWGT: -1 maps to 0, +1 maps to 100
    settings.bwgt = effects.bwgt > 0 ? 100 : 0;
  }

  return settings;
}

/**
 * Generate CSS styles from font settings
 */
export function settingsToCSS(settings: FontSettings): string {
  return `/* LexiCipher.org - Personalized Typography Settings */
/* Generated: ${new Date().toISOString()} */

.dyslexia-optimized {
  /* Font */
  font-family: 'LexiCipher', 'OpenDyslexic', 'Comic Sans MS', sans-serif;
  font-weight: ${settings.fontWeight};
  font-variation-settings: 'BWGT' ${settings.bwgt};
  
  /* Spacing */
  letter-spacing: ${(settings.letterSpacing / 100).toFixed(2)}em;
  word-spacing: ${(settings.wordSpacing / 100).toFixed(2)}em;
  line-height: ${settings.lineHeight};
  
  /* Size */
  font-size: ${settings.fontSize > 0 ? `${100 + settings.fontSize}%` : '100%'};
  
  /* Layout */
  max-width: ${settings.paragraphWidth}ch;
  margin-left: auto;
  margin-right: auto;
}

/* Apply to all body text */
body.dyslexia-mode {
  font-family: 'LexiCipher', 'OpenDyslexic', 'Comic Sans MS', sans-serif;
  font-variation-settings: 'BWGT' ${settings.bwgt};
  letter-spacing: ${(settings.letterSpacing / 100).toFixed(2)}em;
  word-spacing: ${(settings.wordSpacing / 100).toFixed(2)}em;
  line-height: ${settings.lineHeight};
}

/* Paragraph containers */
body.dyslexia-mode p,
body.dyslexia-mode article,
body.dyslexia-mode .content {
  max-width: ${settings.paragraphWidth}ch;
}`;
}

/**
 * Generate a downloadable font file
 * 
 * Returns the LexiCipher BWGT variable font.
 * The BWGT axis can be adjusted via CSS font-variation-settings.
 */
export async function generateCustomFont(settings: FontSettings): Promise<Blob> {
  try {
    const response = await fetch('/fonts/LexiCipher-BWGT-VF.ttf');
    if (!response.ok) {
      throw new Error('Font file not found');
    }
    return await response.blob();
  } catch (error) {
    console.error('Error loading font:', error);
    throw new Error('Could not generate font file. Please try again.');
  }
}

/**
 * Trigger download of a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Download the CSS file with optimized settings
 */
export function downloadCSS(settings: FontSettings): void {
  const css = settingsToCSS(settings);
  const blob = new Blob([css], { type: 'text/css' });
  downloadBlob(blob, 'lexicipher-settings.css');
}

/**
 * Generate a settings JSON file for programmatic use
 */
export function downloadSettingsJSON(settings: FontSettings, optimizationResult?: OptimizationResult): void {
  const data = {
    version: '1.0',
    generated: new Date().toISOString(),
    source: 'lexicipher.org',
    settings: {
      letterSpacing: `${settings.letterSpacing}%`,
      wordSpacing: `${settings.wordSpacing}%`,
      lineHeight: settings.lineHeight,
      fontWeight: settings.fontWeight,
      fontSizeBoost: `${settings.fontSize}%`,
      maxLineWidth: `${settings.paragraphWidth}ch`,
      bwgt: settings.bwgt,
    },
    cssValues: {
      letterSpacing: `${(settings.letterSpacing / 100).toFixed(2)}em`,
      wordSpacing: `${(settings.wordSpacing / 100).toFixed(2)}em`,
      lineHeight: settings.lineHeight,
      fontWeight: settings.fontWeight,
      fontSize: settings.fontSize > 0 ? `${100 + settings.fontSize}%` : '100%',
      maxWidth: `${settings.paragraphWidth}ch`,
      fontVariationSettings: `'BWGT' ${settings.bwgt}`,
    },
    optimizationData: optimizationResult || null,
  };

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  downloadBlob(blob, 'lexicipher-settings.json');
}

/**
 * Full download package - font + CSS + settings
 */
export async function downloadFullPackage(
  settings: FontSettings,
  optimizationResult?: OptimizationResult
): Promise<void> {
  // Download CSS first (this always works)
  downloadCSS(settings);

  // Try to download the font
  try {
    const fontBlob = await generateCustomFont(settings);
    downloadBlob(fontBlob, 'lexicipher.ttf');
  } catch (error) {
    console.warn('Font download failed, CSS still provided:', error);
  }
}