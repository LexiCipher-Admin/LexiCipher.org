'use client';

import { useState, useEffect, useCallback } from 'react';

// localStorage key
const SETTINGS_KEY = 'lexicipher-reading-settings';

export interface ReadingSettings {
  // Typography settings (CSS values)
  letterSpacing: number;    // in em (0-0.25)
  wordSpacing: number;      // in em (0-0.40)
  lineHeight: number;       // 1.3-2.0
  fontWeight: number;       // 300-700
  fontSize: number;         // in px (14-32)
  paragraphWidth: number;   // in ch (40-80)
  bwgt: number;             // 0-100 (BWGT variable font axis)
  
  // Metadata
  source: 'test' | 'manual' | 'default';
  savedAt?: string;
}

// Default settings (neutral values)
export const DEFAULT_SETTINGS: ReadingSettings = {
  letterSpacing: 0.05,
  wordSpacing: 0.10,
  lineHeight: 1.6,
  fontWeight: 400,
  fontSize: 18,
  paragraphWidth: 60,
  bwgt: 50,
  source: 'default',
};

/**
 * Load settings from localStorage
 */
export function loadReadingSettings(): ReadingSettings | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate the structure has required fields
      if (
        typeof parsed.letterSpacing === 'number' &&
        typeof parsed.lineHeight === 'number' &&
        typeof parsed.bwgt === 'number'
      ) {
        return parsed as ReadingSettings;
      }
    }
  } catch (error) {
    console.warn('Failed to load reading settings:', error);
  }
  return null;
}

/**
 * Save settings to localStorage
 */
export function saveReadingSettings(settings: ReadingSettings): void {
  if (typeof window === 'undefined') return;
  
  try {
    const toSave = {
      ...settings,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.warn('Failed to save reading settings:', error);
  }
}

/**
 * Clear saved settings
 */
export function clearReadingSettings(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SETTINGS_KEY);
}

/**
 * Check if user has completed the test (has saved settings from test)
 */
export function hasCompletedTest(): boolean {
  const settings = loadReadingSettings();
  return settings?.source === 'test';
}

/**
 * React hook for managing reading settings
 */
export function useReadingSettings() {
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fromTest, setFromTest] = useState(false);

  // Load settings on mount
  useEffect(() => {
    const saved = loadReadingSettings();
    if (saved) {
      setSettings(saved);
      setFromTest(saved.source === 'test');
    }
    setIsLoaded(true);
  }, []);

  // Update a single setting
  const updateSetting = useCallback(<K extends keyof ReadingSettings>(
    key: K,
    value: ReadingSettings[K]
  ) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        [key]: value,
        source: 'manual' as const, // Mark as manually adjusted
      };
      saveReadingSettings(updated);
      return updated;
    });
  }, []);

  // Save all settings at once (e.g., from test results)
  const saveSettings = useCallback((newSettings: Partial<ReadingSettings> & { source: 'test' | 'manual' }) => {
    const merged = {
      ...DEFAULT_SETTINGS,
      ...newSettings,
    };
    setSettings(merged);
    setFromTest(merged.source === 'test');
    saveReadingSettings(merged);
  }, []);

  // Reset to defaults
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    setFromTest(false);
    clearReadingSettings();
  }, []);

  return {
    settings,
    isLoaded,
    fromTest,
    updateSetting,
    saveSettings,
    resetSettings,
  };
}

/**
 * Convert normalized optimization values (0-1) to CSS-ready ReadingSettings
 * This matches the ranges defined in bayesianOptimizer.ts
 */
export function normalizedToReadingSettings(normalized: {
  letterSpacing: number;
  wordSpacing: number;
  lineHeight: number;
  fontWeight: number;
  fontSize: number;
  paragraphWidth: number;
  bwgt: number;
}): Omit<ReadingSettings, 'source' | 'savedAt'> {
  return {
    // Letter spacing: 0-1 → 0-0.25em
    letterSpacing: normalized.letterSpacing * 0.25,
    // Word spacing: 0-1 → 0-0.40em
    wordSpacing: normalized.wordSpacing * 0.40,
    // Line height: 0-1 → 1.3-2.0
    lineHeight: 1.3 + normalized.lineHeight * 0.7,
    // Font weight: 0-1 → 300-700
    fontWeight: Math.round(300 + normalized.fontWeight * 400),
    // Font size: keep as px (user can adjust)
    fontSize: 18 + normalized.fontSize * 6, // 18-24px based on preference
    // Paragraph width: 0-1 → 80-40ch (inverted - 0 is wide, 1 is narrow)
    paragraphWidth: Math.round(80 - normalized.paragraphWidth * 40),
    // BWGT: 0-1 → 0-100
    bwgt: Math.round(normalized.bwgt * 100),
  };
}
