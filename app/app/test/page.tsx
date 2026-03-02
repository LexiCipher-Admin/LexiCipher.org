'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Session,
  SetupData,
  CalibrationData,
  Rating,
  TestResponse,
  DOEResults,
  createNewSession,
  saveSession,
  loadSession,
  clearSession,
  canResumeSession,
  parametersToCSSValues,
} from '@/lib/types/session';
import { generateDesignMatrix, calculateStandardError, getSignificantFactors, getBaselineCSSValues } from '@/lib/doe/designMatrix';
import { calculateFullDOEAnalysis } from '@/lib/doe/effectsAnalysis';
import { getPassagesByLevel, getPassageById, getPassageLevelForGrade, Passage } from '@/lib/passages/passageBank';
import { doeResultsToFontSettings, downloadCSS, generateCustomFont, downloadBlob } from '@/lib/fonts/fontGenerator';
import { saveReadingSettings, normalizedToReadingSettings } from '@/lib/hooks/useReadingSettings';

import SetupScreen from './components/SetupScreen';
import CalibrationScreen from './components/CalibrationScreen';
import ProgressBar from './components/ProgressBar';
import TestPassage from './components/TestPassage';
import RatingInput from './components/RatingInput';
import OptimizationScreen from './components/OptimizationScreen';
import ResultsScreen from './components/ResultsScreen';
import BreakScreen from './components/BreakScreen';

type Phase = 'loading' | 'resume-prompt' | 'setup' | 'calibration' | 'baseline' | 'testing' | 'break' | 'optimization' | 'results';

export default function TestPage() {
  const [phase, setPhase] = useState<Phase>('loading');
  const [session, setSession] = useState<Session | null>(null);
  const [currentPassage, setCurrentPassage] = useState<Passage | null>(null);
  const [showBaseline, setShowBaseline] = useState(true);

  // Initialize session on mount
  useEffect(() => {
    if (canResumeSession()) {
      setPhase('resume-prompt');
    } else {
      startNewSession();
    }
  }, []);

  const startNewSession = () => {
    const newSession = createNewSession();
    setSession(newSession);
    saveSession(newSession);
    setPhase('setup');
  };

  const resumeSession = () => {
    const savedSession = loadSession();
    if (savedSession) {
      setSession(savedSession);
      // Resume at the appropriate phase
      if (!savedSession.setup) {
        setPhase('setup');
      } else if (!savedSession.calibration) {
        setPhase('calibration');
      } else if (savedSession.doeResponses.length < 16) {
        setPhase('testing');
        loadCurrentTest(savedSession);
      } else if (savedSession.phase === 'optimization' && !savedSession.optimizationResult) {
        setPhase('optimization');
      } else {
        setPhase('results');
      }
    } else {
      startNewSession();
    }
  };

  const loadCurrentTest = useCallback((sess: Session) => {
    if (sess.doeMatrix && sess.currentTestIndex < sess.doeMatrix.length) {
      const currentRun = sess.doeMatrix[sess.currentTestIndex];
      const passage = getPassageById(currentRun.passageId);
      setCurrentPassage(passage || null);
      setShowBaseline(true);
    }
  }, []);

  // Setup handlers
  const handleSetupComplete = (setupData: SetupData) => {
    if (!session) return;

    // Get passages for this reading level (with 2-grade offset for fluency)
    const passageLevel = getPassageLevelForGrade(setupData.readingLevel);
    const passages = getPassagesByLevel(passageLevel);
    const passageIds = passages.map((p: Passage) => p.id);

    // Generate DOE matrix with passage assignments
    const doeMatrix = generateDesignMatrix(passageIds);

    const updatedSession: Session = {
      ...session,
      phase: 'calibration',
      setup: setupData,
      doeMatrix,
    };

    setSession(updatedSession);
    saveSession(updatedSession);
    setPhase('calibration');
  };

  // Calibration handlers
  const handleCalibrationComplete = (calibrationData: CalibrationData) => {
    if (!session) return;

    const updatedSession: Session = {
      ...session,
      phase: 'baseline',
      calibration: calibrationData,
    };

    setSession(updatedSession);
    saveSession(updatedSession);
    setPhase('baseline');

    // Load first test passage
    if (updatedSession.doeMatrix && updatedSession.doeMatrix.length > 0) {
      const firstRun = updatedSession.doeMatrix[0];
      const passage = getPassageById(firstRun.passageId);
      setCurrentPassage(passage || null);
    }
  };

  const handleCalibrationSkip = () => {
    // Use default calibration (96 PPI standard)
    const defaultCalibration: CalibrationData = {
      screenDiagonalInches: 15.6,
      ppi: 96,
      screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1920,
      screenHeight: typeof window !== 'undefined' ? window.innerHeight : 1080,
      calibratedAt: new Date().toISOString(),
    };
    handleCalibrationComplete(defaultCalibration);
  };

  // Baseline handler
  const handleBaselineAcknowledged = () => {
    setShowBaseline(false);
    setPhase('testing');
  };

  // Break handler
  const handleBreakComplete = () => {
    setPhase('testing');
    if (session) {
      loadCurrentTest(session);
    }
  };

  // Rating handler
  const handleRating = (rating: Rating) => {
    if (!session || !session.doeMatrix) return;

    const currentRun = session.doeMatrix[session.currentTestIndex];

    const response: TestResponse = {
      runNumber: currentRun.runNumber,
      rating,
      viewDuration: 0, // Could track this with timestamps
      respondedAt: new Date().toISOString(),
    };

    const updatedResponses = [...session.doeResponses, response];
    const nextIndex = session.currentTestIndex + 1;
    const isComplete = nextIndex >= session.doeMatrix.length;

    // Check if we need a break (after test 8)
    const needsBreak = nextIndex === 8 && !isComplete;

    let updatedSession: Session = {
      ...session,
      currentTestIndex: nextIndex,
      doeResponses: updatedResponses,
    };

    if (isComplete) {
      // Calculate results using full DOE analysis (includes interactions)
      const ratingsMap = new Map<number, Rating>();
      for (const resp of updatedResponses) {
        ratingsMap.set(resp.runNumber, resp.rating);
      }

      const { mainEffects, topInteractions } = calculateFullDOEAnalysis(session.doeMatrix, ratingsMap);
      const standardError = calculateStandardError(mainEffects, session.doeMatrix, ratingsMap);
      const significantFactors = getSignificantFactors(mainEffects, standardError);

      const doeResults: DOEResults = {
        effects: mainEffects,
        interactions: topInteractions.map(i => ({ aliasGroup: i.aliasGroup, effect: i.effect })),
        topInteractions: topInteractions.map(i => i.aliasGroup),
        standardError,
        significantFactors,
      };

      updatedSession = {
        ...updatedSession,
        phase: 'optimization',
        doeResults,
      };

      setPhase('optimization');
    } else if (needsBreak) {
      // Trigger break screen
      setPhase('break');
    } else {
      // Load next test
      const nextRun = session.doeMatrix[nextIndex];
      const passage = getPassageById(nextRun.passageId);
      setCurrentPassage(passage || null);
      setShowBaseline(true);
    }

    setSession(updatedSession);
    saveSession(updatedSession);
  };

  // Download handler
  const handleDownloadFont = async () => {
    if (!session?.doeResults) return;

    const settings = doeResultsToFontSettings(
      session.doeResults.effects,
      session.doeResults.significantFactors
    );

    // Download CSS
    downloadCSS(settings);

    // Try to download font
    try {
      const fontBlob = await generateCustomFont(settings);
      downloadBlob(fontBlob, 'OpenDyslexic-Personalized.otf');
    } catch (error) {
      console.warn('Font download failed:', error);
      alert('CSS settings downloaded successfully. Font file could not be generated - please download OpenDyslexic separately from opendyslexic.org');
    }
  };

  // Start over handler
  const handleStartOver = () => {
    clearSession();
    startNewSession();
  };

  // Get current CSS values for test display
  const getCurrentCSSValues = () => {
    if (!session?.doeMatrix || session.currentTestIndex >= session.doeMatrix.length) {
      return getBaselineCSSValues();
    }
    const currentRun = session.doeMatrix[session.currentTestIndex];
    return parametersToCSSValues(currentRun.parameters);
  };

  // Render based on phase
  return (
    <main className="min-h-screen bg-cream py-8">
      <div className="container mx-auto px-4">
        {/* Progress bar (show during active phases) */}
        {['calibration', 'baseline', 'testing'].includes(phase) && session && (
          <div className="mb-8 max-w-2xl mx-auto">
            <ProgressBar
              current={session.currentTestIndex + 1}
              total={16}
              phase={phase === 'baseline' ? 'testing' : phase as 'setup' | 'calibration' | 'testing' | 'results'}
            />
          </div>
        )}

        {/* Loading state */}
        {phase === 'loading' && (
          <div className="text-center py-20">
            <div className="text-2xl text-gray-600">Loading...</div>
          </div>
        )}

        {/* Resume prompt */}
        {phase === 'resume-prompt' && (
          <div className="max-w-md mx-auto text-center space-y-6 py-20">
            <div className="text-6xl mb-4">👋</div>
            <h1 className="text-2xl font-bold text-dark-blue">Welcome Back!</h1>

            {/* Show saved progress */}
            {(() => {
              const saved = loadSession();
              if (saved) {
                const completedTests = saved.doeResponses.length;
                const progressPercent = Math.round((completedTests / 16) * 100);
                return (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                    <p className="text-blue-800 font-medium">
                      Your Progress: {completedTests} of 16 tests ({progressPercent}%)
                    </p>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    {saved.setup && (
                      <p className="text-sm text-blue-600">
                        Reading level: {saved.setup.readingLevel}
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            })()}

            <p className="text-gray-600">
              Would you like to continue where you left off?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={startNewSession}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Start Fresh
              </button>
              <button
                type="button"
                onClick={resumeSession}
                className="px-6 py-3 bg-dark-blue text-cream rounded-lg hover:bg-opacity-90 transition-colors font-medium"
              >
                Continue Test →
              </button>
            </div>
          </div>
        )}

        {/* Setup phase */}
        {phase === 'setup' && (
          <SetupScreen onComplete={handleSetupComplete} />
        )}

        {/* Calibration phase */}
        {phase === 'calibration' && (
          <CalibrationScreen
            onComplete={handleCalibrationComplete}
            onSkip={handleCalibrationSkip}
          />
        )}

        {/* Baseline phase */}
        {phase === 'baseline' && currentPassage && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold text-dark-blue">Your Reference Sample</h1>
              <p className="text-gray-600">
                Read through this passage to establish a baseline. You&apos;ll compare all
                future samples to how this one feels.
              </p>
            </div>

            <TestPassage
              passage={currentPassage}
              cssValues={getBaselineCSSValues()}
              isBaseline={true}
            />

            <button
              type="button"
              onClick={handleBaselineAcknowledged}
              className="w-full bg-dark-blue text-cream py-4 px-6 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              I&apos;ve Read It — Start Testing →
            </button>
          </div>
        )}

        {/* Testing phase */}
        {phase === 'testing' && currentPassage && session && (
          <div className="max-w-2xl mx-auto space-y-8">
            {showBaseline ? (
              <>
                <div className="text-center">
                  <span className="text-sm text-gray-500">
                    Step 1 of 2: Reference sample
                  </span>
                </div>
                <TestPassage
                  passage={currentPassage}
                  cssValues={getBaselineCSSValues()}
                  isBaseline={true}
                />
                <button
                  type="button"
                  onClick={() => setShowBaseline(false)}
                  className="w-full bg-dark-blue text-cream py-4 px-6 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                >
                  Show Test Sample →
                </button>
              </>
            ) : (
              <>
                <div className="text-center">
                  <span className="text-sm text-gray-500">
                    Step 2 of 2: Compare to reference
                  </span>
                </div>
                <TestPassage
                  passage={currentPassage}
                  cssValues={getCurrentCSSValues()}
                />
                <button
                  type="button"
                  onClick={() => setShowBaseline(true)}
                  className="w-full text-sm text-blue-600 hover:text-blue-800 py-2 transition-colors"
                >
                  ← Back to Reference
                </button>
                <RatingInput onRate={handleRating} />
              </>
            )}
          </div>
        )}

        {/* Break phase */}
        {phase === 'break' && session && (
          <BreakScreen
            onComplete={handleBreakComplete}
            testNumber={session.currentTestIndex}
          />
        )}

        {/* Optimization phase */}
        {phase === 'optimization' && session?.doeResults && session.setup && (
          <OptimizationScreen
            session={session}
            onUpdate={(updatedSession) => {
              setSession(updatedSession);
              // Save reading settings when optimization completes
              if (updatedSession.optimizationResult?.optimalValues) {
                const optimalValues = updatedSession.optimizationResult.optimalValues;
                const readingSettings = normalizedToReadingSettings(optimalValues);
                saveReadingSettings({
                  ...readingSettings,
                  source: 'test',
                });
              }
            }}
            onComplete={() => {
              // Also save settings if skipped optimization (use DOE results)
              if (session.doeResults && !session.optimizationResult) {
                const effects = session.doeResults.effects;
                // Convert DOE effects to approximate normalized values
                // Effects are typically -1 to +1, map to 0-1
                const readingSettings = normalizedToReadingSettings({
                  letterSpacing: (effects.letterSpacing + 1) / 2,
                  wordSpacing: (effects.wordSpacing + 1) / 2,
                  lineHeight: (effects.lineHeight + 1) / 2,
                  fontWeight: (effects.fontWeight + 1) / 2,
                  fontSize: (effects.fontSize + 1) / 2,
                  paragraphWidth: (effects.paragraphWidth + 1) / 2,
                  bwgt: (effects.bwgt + 1) / 2,
                });
                saveReadingSettings({
                  ...readingSettings,
                  source: 'test',
                });
              }
              setPhase('results');
            }}
            passages={getPassagesByLevel(getPassageLevelForGrade(session.setup.readingLevel))}
          />
        )}

        {/* Results phase */}
        {phase === 'results' && session?.doeResults && (
          <ResultsScreen
            doeResults={session.doeResults}
            optimizationResult={session.optimizationResult}
            session={session}
            onDownloadFont={handleDownloadFont}
            onStartOver={handleStartOver}
          />
        )}
      </div>
    </main>
  );
}