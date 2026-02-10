'use client';

import { useState } from 'react';
import { SetupData } from '@/lib/types/session';

interface SetupScreenProps {
  onComplete: (setupData: SetupData) => void;
}

export default function SetupScreen({ onComplete }: SetupScreenProps) {
  const [ageGroup, setAgeGroup] = useState<'child' | 'teen' | 'adult' | null>(null);
  const [gradeLevel, setGradeLevel] = useState<'3rd' | '5th' | '8th' | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map age group to default reading level (2 grades below per project plan)
  const getReadingLevel = (age: 'child' | 'teen' | 'adult', grade?: '3rd' | '5th' | '8th'): '3rd' | '5th' | '8th' => {
    if (age === 'child' && grade) {
      return grade; // Use selected grade for children
    }
    if (age === 'teen') return '5th';
    if (age === 'adult') return '8th';
    return '3rd'; // Default
  };

  const handleSubmit = () => {
    setError(null);

    if (!ageGroup) {
      setError('Please select your age group.');
      return;
    }

    if (ageGroup === 'child' && !gradeLevel) {
      setError('Please select your grade level.');
      return;
    }

    if (!consentGiven) {
      setError('Please acknowledge the disclaimer to continue.');
      return;
    }

    const setupData: SetupData = {
      ageGroup,
      gradeLevel: ageGroup === 'child' ? gradeLevel! : undefined,
      consentGiven: true,
      readingLevel: getReadingLevel(ageGroup, gradeLevel ?? undefined),
      completedAt: new Date().toISOString(),
    };

    onComplete(setupData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-dark-blue">Let&apos;s Get Started</h1>
        <p className="text-gray-600">
          We need a few details to personalize your experience.
        </p>
      </div>

      {/* Age Group Selection */}
      <div className="space-y-4">
        <label className="block text-lg font-medium text-dark-blue">
          What is your age group?
        </label>
        <div className="grid grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => setAgeGroup('child')}
            className={`p-4 rounded-lg border-2 transition-all ${
              ageGroup === 'child'
                ? 'border-dark-blue bg-blue-50 text-dark-blue'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">👧</div>
            <div className="font-medium">Child</div>
            <div className="text-sm text-gray-500">Ages 8-12</div>
          </button>
          <button
            type="button"
            onClick={() => setAgeGroup('teen')}
            className={`p-4 rounded-lg border-2 transition-all ${
              ageGroup === 'teen'
                ? 'border-dark-blue bg-blue-50 text-dark-blue'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">🧑</div>
            <div className="font-medium">Teen</div>
            <div className="text-sm text-gray-500">Ages 13-17</div>
          </button>
          <button
            type="button"
            onClick={() => setAgeGroup('adult')}
            className={`p-4 rounded-lg border-2 transition-all ${
              ageGroup === 'adult'
                ? 'border-dark-blue bg-blue-50 text-dark-blue'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-2">👤</div>
            <div className="font-medium">Adult</div>
            <div className="text-sm text-gray-500">Ages 18+</div>
          </button>
        </div>
      </div>

      {/* Grade Level (only for children) */}
      {ageGroup === 'child' && (
        <div className="space-y-4">
          <label className="block text-lg font-medium text-dark-blue">
            What grade are you in?
          </label>
          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => setGradeLevel('3rd')}
              className={`p-4 rounded-lg border-2 transition-all ${
                gradeLevel === '3rd'
                  ? 'border-dark-blue bg-blue-50 text-dark-blue'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">3rd Grade</div>
              <div className="text-sm text-gray-500">or below</div>
            </button>
            <button
              type="button"
              onClick={() => setGradeLevel('5th')}
              className={`p-4 rounded-lg border-2 transition-all ${
                gradeLevel === '5th'
                  ? 'border-dark-blue bg-blue-50 text-dark-blue'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">4th-5th Grade</div>
            </button>
            <button
              type="button"
              onClick={() => setGradeLevel('8th')}
              className={`p-4 rounded-lg border-2 transition-all ${
                gradeLevel === '8th'
                  ? 'border-dark-blue bg-blue-50 text-dark-blue'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">6th+ Grade</div>
            </button>
          </div>
        </div>
      )}

      {/* Consent Section */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-amber-900">Important Information</h3>
        <p className="text-amber-800 text-sm">
          DyslexiaFont.org is <strong>NOT a diagnostic tool</strong> for dyslexia or any 
          reading disorder. Only qualified professionals can diagnose dyslexia. This tool 
          helps you discover typographic preferences that may improve your reading comfort.
        </p>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="mt-1 w-5 h-5 rounded border-gray-300 text-dark-blue focus:ring-dark-blue"
          />
          <span className="text-sm text-amber-800">
            I understand that this tool does not diagnose or treat dyslexia, and I am 
            using it to explore typography preferences only.
          </span>
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-dark-blue text-cream py-4 px-6 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-colors"
      >
        Continue to Calibration →
      </button>

      {/* Time Estimate */}
      <p className="text-center text-sm text-gray-500">
        ⏱️ The full test takes about 35-45 minutes. You can save and continue later.
      </p>
    </div>
  );
}