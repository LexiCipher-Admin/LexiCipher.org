/**
 * Flesch-Kincaid Validation Script for Passage Bank
 * 
 * Calculates FK Grade Level for each passage and identifies outliers.
 * Target ranges:
 * - 3rd grade: FK 2.5-3.5
 * - 5th grade: FK 4.5-5.5
 * - 8th grade: FK 7.5-8.5
 */

import { passages, Passage } from './passageBank';

// Syllable counting helper - counts syllables in a word
function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  
  // Remove silent e at end
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

// Count sentences in text
function countSentences(text: string): number {
  const sentences = text.match(/[.!?]+/g);
  return sentences ? sentences.length : 1;
}

// Count words in text
function countWords(text: string): number {
  const words = text.trim().split(/\s+/);
  return words.length;
}

// Count total syllables in text
function countTotalSyllables(text: string): number {
  const words = text.trim().split(/\s+/);
  return words.reduce((total, word) => total + countSyllables(word), 0);
}

// Calculate Flesch-Kincaid Grade Level
function calculateFKGrade(text: string): number {
  const words = countWords(text);
  const sentences = countSentences(text);
  const syllables = countTotalSyllables(text);
  
  const avgWordsPerSentence = words / sentences;
  const avgSyllablesPerWord = syllables / words;
  
  const fkGrade = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
  return Math.round(fkGrade * 10) / 10; // Round to 1 decimal
}

// Target FK ranges
const targetRanges: Record<string, { min: number; max: number }> = {
  '3rd': { min: 2.5, max: 3.5 },
  '5th': { min: 4.5, max: 5.5 },
  '8th': { min: 7.5, max: 8.5 },
};

// Validate all passages
interface ValidationResult {
  passage: Passage;
  fkScore: number;
  targetMin: number;
  targetMax: number;
  status: 'pass' | 'low' | 'high';
  deviation: number;
}

function validateAllPassages(): ValidationResult[] {
  return passages.map(passage => {
    const fkScore = calculateFKGrade(passage.text);
    const range = targetRanges[passage.readingLevel];
    
    let status: 'pass' | 'low' | 'high' = 'pass';
    let deviation = 0;
    
    if (fkScore < range.min) {
      status = 'low';
      deviation = range.min - fkScore;
    } else if (fkScore > range.max) {
      status = 'high';
      deviation = fkScore - range.max;
    }
    
    return {
      passage,
      fkScore,
      targetMin: range.min,
      targetMax: range.max,
      status,
      deviation: Math.round(deviation * 10) / 10,
    };
  });
}

// Run validation and print results
const results = validateAllPassages();

// Group by level
const byLevel: Record<string, ValidationResult[]> = {
  '3rd': [],
  '5th': [],
  '8th': [],
};

results.forEach(r => {
  byLevel[r.passage.readingLevel].push(r);
});

// Print summary
console.log('\n=== PASSAGE VALIDATION RESULTS ===\n');

for (const level of ['3rd', '5th', '8th']) {
  const levelResults = byLevel[level];
  const passing = levelResults.filter(r => r.status === 'pass').length;
  const low = levelResults.filter(r => r.status === 'low').length;
  const high = levelResults.filter(r => r.status === 'high').length;
  
  const fkScores = levelResults.map(r => r.fkScore);
  const avgFK = fkScores.reduce((a, b) => a + b, 0) / fkScores.length;
  const minFK = Math.min(...fkScores);
  const maxFK = Math.max(...fkScores);
  
  console.log(`${level.toUpperCase()} GRADE (Target: ${targetRanges[level].min}-${targetRanges[level].max})`);
  console.log(`  Total: ${levelResults.length} | Pass: ${passing} | Too Low: ${low} | Too High: ${high}`);
  console.log(`  FK Range: ${minFK} - ${maxFK} | Average: ${Math.round(avgFK * 10) / 10}`);
  console.log('');
  
  // List outliers
  const outliers = levelResults.filter(r => r.status !== 'pass');
  if (outliers.length > 0) {
    console.log(`  Outliers:`);
    outliers.forEach(o => {
      console.log(`    - ${o.passage.id}: FK ${o.fkScore} (${o.status}, ${o.deviation} off)`);
    });
    console.log('');
  }
}

// Genre balance check
console.log('=== GENRE BALANCE ===\n');
for (const level of ['3rd', '5th', '8th']) {
  const levelPassages = passages.filter(p => p.readingLevel === level);
  const fiction = levelPassages.filter(p => p.genre === 'fiction').length;
  const nonfiction = levelPassages.filter(p => p.genre === 'nonfiction').length;
  const total = levelPassages.length;
  const fictionPct = Math.round((fiction / total) * 100);
  
  const target = '70% fiction / 30% non-fiction';
  const status = fictionPct >= 65 && fictionPct <= 75 ? '✓' : '⚠';
  
  console.log(`${level.toUpperCase()} GRADE: ${fiction} fiction / ${nonfiction} non-fiction (${fictionPct}% fiction) ${status}`);
}

console.log('\nTarget: ' + '70% fiction / 30% non-fiction');

// Export for use elsewhere
export { validateAllPassages, calculateFKGrade, countSyllables, countWords, countSentences };