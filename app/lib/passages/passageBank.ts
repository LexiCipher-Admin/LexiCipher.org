/**
 * Passage Bank for DyslexiaFont.org - FK Calibrated
 * Target: 30+ passages per level, 70% fiction / 30% non-fiction
 * 
 * FK Targets (±0.5):
 * - 3rd grade: FK 2.5-3.5
 * - 5th grade: FK 4.5-5.5
 * - 8th grade: FK 7.5-8.5
 */

export interface Passage {
  id: string;
  title: string;
  text: string;
  wordCount: number;
  readingLevel: '3rd' | '5th' | '8th';
  genre: 'fiction' | 'nonfiction';
  topic: string;
}

import { thirdGradePassages } from './passages3rdGrade';
import { fifthGradePassages } from './passages5thGrade';
import { eighthGradePassages } from './passages8thGrade';

// Combined passage array
export const passages: Passage[] = [
  ...thirdGradePassages,
  ...fifthGradePassages,
  ...eighthGradePassages,
];

// Export individual grade arrays for direct access
export { thirdGradePassages, fifthGradePassages, eighthGradePassages };

// Utility functions
export function getPassagesByLevel(level: '3rd' | '5th' | '8th'): Passage[] {
  return passages.filter(p => p.readingLevel === level);
}

export function getPassagesByGenre(genre: 'fiction' | 'nonfiction'): Passage[] {
  return passages.filter(p => p.genre === genre);
}

export function getRandomPassage(level: '3rd' | '5th' | '8th'): Passage {
  const levelPassages = getPassagesByLevel(level);
  return levelPassages[Math.floor(Math.random() * levelPassages.length)];
}

export function getPassageById(id: string): Passage | undefined {
  return passages.find(p => p.id === id);
}

/**
 * Map user's grade level to passage difficulty level.
 * Uses 2-grade offset for reading fluency (standard practice).
 * A 5th grader reads 3rd grade passages for fluent assessment.
 */
export function getPassageLevelForGrade(userGrade: '3rd' | '5th' | '8th'): '3rd' | '5th' | '8th' {
  const mapping: Record<string, '3rd' | '5th' | '8th'> = {
    '3rd': '3rd', // 3rd graders read 3rd grade (no lower available)
    '5th': '3rd', // 5th graders read 3rd grade passages
    '8th': '5th', // 8th graders read 5th grade passages
  };
  return mapping[userGrade] || '3rd';
}

// Log passage counts on load
console.log(`Passage Bank loaded: ${thirdGradePassages.length} 3rd grade, ${fifthGradePassages.length} 5th grade, ${eighthGradePassages.length} 8th grade passages`);