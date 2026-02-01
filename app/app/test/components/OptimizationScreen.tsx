'use client';

import { useState, useEffect } from 'react';
import { Session, BayesianRun, Rating, saveSession } from '@/lib/types/session';
import { Passage } from '@/lib/passages/passageBank';
import {
  BayesianState,
  NormalizedParams,
  initializeBayesianState,
  addObservation,
  getNextPoint,
  shouldContinueOptimization,
  getFinalParams,
  normalizedToCSS,
  describeNormalizedParams
} from '@/lib/doe/bayesianOptimizer';
import ProgressBar from './ProgressBar';
import RatingInput from './RatingInput';

interface OptimizationScreenProps {
  session: Session;
  onUpdate: (session: Session) => void;
  onComplete: () => void;
  passages: Passage[];
}

const MAX_OPTIMIZATION_RUNS = 10;

// Neutral reference settings for comparison
const REFERENCE_CSS = {
  fontSize: '18px',
  letterSpacing: '0em',
  wordSpacing: '0em',
  lineHeight: '1.5',
  fontWeight: 400,
  fontVariationSettings: '"BWGT" 50',
  maxWidth: '65ch',
};

export default function OptimizationScreen({
  session,
  onUpdate,
  onComplete,
  passages
}: OptimizationScreenProps) {
  const [bayesianState, setBayesianState] = useState<BayesianState | null>(null);
  const [currentParams, setCurrentParams] = useState<NormalizedParams | null>(null);
  const [currentPassage, setCurrentPassage] = useState<Passage | null>(null);
  const [viewStartTime, setViewStartTime] = useState<number>(Date.now());
  const [showIntro, setShowIntro] = useState(true);

  // Initialize Bayesian state on mount
  useEffect(() => {
    if (!session.doeResults) return;

    // Initialize from existing bayesian runs if resuming
    if (session.bayesianRuns && session.bayesianRuns.length > 0) {
      const state = initializeBayesianState(
        session.doeResults.significantFactors,
        session.doeResults.effects,
        MAX_OPTIMIZATION_RUNS
      );

      // Replay observations
      let updatedState = state;
      for (const run of session.bayesianRuns) {
        if (run.rating !== undefined) {
          updatedState = addObservation(updatedState, run.params, run.rating);
        }
      }

      setBayesianState(updatedState);

      // If there are incomplete runs, continue from there
      if (shouldContinueOptimization(updatedState)) {
        const nextParams = getNextPoint(updatedState);
        setCurrentParams(nextParams);
        selectRandomPassage();
      }
      setShowIntro(false);
    } else {
      // Fresh start
      const state = initializeBayesianState(
        session.doeResults.significantFactors,
        session.doeResults.effects,
        MAX_OPTIMIZATION_RUNS
      );
      setBayesianState(state);
    }
  }, [session.doeResults]);

  const selectRandomPassage = () => {
    const usedIds = session.bayesianRuns?.map(r => r.passageId) || [];
    const available = passages.filter(p => !usedIds.includes(p.id));
    const pool = available.length > 0 ? available : passages;
    const passage = pool[Math.floor(Math.random() * pool.length)];
    setCurrentPassage(passage);
    setViewStartTime(Date.now());
  };

  const handleStartOptimization = () => {
    if (!bayesianState) return;

    setShowIntro(false);
    const nextParams = getNextPoint(bayesianState);
    setCurrentParams(nextParams);
    selectRandomPassage();
  };

  const handleSkipOptimization = () => {
    if (!session.doeResults) return;

    // Create optimization result from DOE effects only
    const optimalValues: NormalizedParams = {
      letterSpacing: session.doeResults.effects.letterSpacing > 0 ? 1 : 0,
      wordSpacing: session.doeResults.effects.wordSpacing > 0 ? 1 : 0,
      lineHeight: session.doeResults.effects.lineHeight > 0 ? 1 : 0,
      fontWeight: session.doeResults.effects.fontWeight > 0 ? 1 : 0,
      fontSize: session.doeResults.effects.fontSize > 0 ? 1 : 0,
      paragraphWidth: session.doeResults.effects.paragraphWidth > 0 ? 1 : 0,
      bwgt: session.doeResults.effects.bwgt > 0 ? 1 : 0,
    };

    const updatedSession: Session = {
      ...session,
      optimizationResult: {
        optimalValues,
        bestRating: 0,
        trialsRun: 0,
        skipped: true,
      },
      phase: 'results',
    };

    saveSession(updatedSession);
    onUpdate(updatedSession);
    onComplete();
  };

  const handleRating = (rating: Rating) => {
    if (!bayesianState || !currentParams || !currentPassage) return;

    // Record the run
    const run: BayesianRun = {
      index: bayesianState.currentIteration,
      params: currentParams,
      rating,
      passageId: currentPassage.id,
      respondedAt: new Date().toISOString(),
    };

    // Update Bayesian state
    const newState = addObservation(bayesianState, currentParams, rating);
    setBayesianState(newState);

    // Update session
    const updatedRuns = [...(session.bayesianRuns || []), run];
    const updatedSession: Session = {
      ...session,
      bayesianRuns: updatedRuns,
      bayesianIndex: newState.currentIteration,
    };

    // Check if optimization is complete
    if (!shouldContinueOptimization(newState)) {
      const finalParams = getFinalParams(newState);
      updatedSession.optimizationResult = {
        optimalValues: finalParams,
        bestRating: newState.bestRating,
        trialsRun: newState.currentIteration,
      };
      updatedSession.phase = 'results';
      saveSession(updatedSession);
      onUpdate(updatedSession);
      onComplete();
    } else {
      // Continue with next point
      saveSession(updatedSession);
      onUpdate(updatedSession);

      const nextParams = getNextPoint(newState);
      setCurrentParams(nextParams);
      selectRandomPassage();
    }
  };

  if (!session.doeResults) {
    return <div className="text-center p-8">Loading...</div>;
  }

  const significantCount = session.doeResults.significantFactors.length;

  // Show intro screen
  if (showIntro) {
    return (
      <div className="min-h-screen bg-stone-100 p-4 flex items-center justify-center">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">
            Fine-Tune Your Settings
          </h1>

          <div className="space-y-4 text-slate-600 mb-8">
            <p>
              Great job! We found <strong>{significantCount} factor{significantCount !== 1 ? 's' : ''}</strong> that
              significantly affect your reading comfort:
            </p>

            <ul className="list-disc list-inside pl-4 space-y-1">
              {session.doeResults.significantFactors.map(factor => (
                <li key={factor} className="font-medium text-slate-800">
                  {formatFactorName(factor)}
                </li>
              ))}
            </ul>

            {significantCount > 0 ? (
              <>
                <p>
                  Now we can fine-tune these settings to find your <em>optimal</em> values,
                  not just whether you prefer high or low.
                </p>
                <p>
                  This takes about <strong>10 more comparisons</strong> (~3-5 minutes).
                </p>
              </>
            ) : (
              <p>
                Since no factors showed significant effects, we'll use neutral settings.
                You can skip to your results.
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {significantCount > 0 && (
              <button
                onClick={handleStartOptimization}
                className="flex-1 bg-slate-700 text-white py-4 px-6 rounded-xl font-bold 
                         hover:bg-slate-800 transition-colors text-lg"
              >
                Fine-Tune Settings
              </button>
            )}
            <button
              onClick={handleSkipOptimization}
              className={`flex-1 py-4 px-6 rounded-xl font-bold transition-colors text-lg
                        ${significantCount > 0
                  ? 'bg-stone-200 text-slate-600 hover:bg-stone-300'
                  : 'bg-slate-700 text-white hover:bg-slate-800'}`}
            >
              {significantCount > 0 ? 'Skip to Results' : 'View Results'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show optimization testing screen
  if (!currentParams || !currentPassage) {
    return <div className="text-center p-8">Loading next test...</div>;
  }

  const cssValues = normalizedToCSS(currentParams);
  const iteration = bayesianState?.currentIteration || 0;

  return (
    <div className="min-h-screen bg-stone-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <ProgressBar
            current={iteration + 1}
            total={MAX_OPTIMIZATION_RUNS}
            phase="optimization"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-slate-600">
            Testing optimized settings ({iteration + 1}/{MAX_OPTIMIZATION_RUNS})
          </p>
        </div>

        {/* Parameter display */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-800 font-medium mb-2">Current settings:</p>
          <div className="flex flex-wrap gap-2 text-xs text-blue-700">
            {session.doeResults.significantFactors.map(factor => {
              const desc = describeNormalizedParams(currentParams);
              return (
                <span key={factor} className="bg-blue-100 px-2 py-1 rounded">
                  {formatFactorName(factor)}: {desc[factor]}
                </span>
              );
            })}
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Reference (baseline) */}
          <div>
            <div className="text-center mb-2">
              <span className="inline-block bg-slate-200 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">
                Reference (baseline)
              </span>
            </div>
            <div
              className="bg-white rounded-xl shadow-lg p-6 h-full border-2 border-slate-200"
              style={{
                fontSize: REFERENCE_CSS.fontSize,
                letterSpacing: REFERENCE_CSS.letterSpacing,
                wordSpacing: REFERENCE_CSS.wordSpacing,
                lineHeight: REFERENCE_CSS.lineHeight,
                fontWeight: REFERENCE_CSS.fontWeight,
                fontVariationSettings: REFERENCE_CSS.fontVariationSettings,
              }}
            >
              <div style={{ maxWidth: REFERENCE_CSS.maxWidth }} className="mx-auto">
                <p className="text-slate-800 font-['Lexisolve']">
                  {currentPassage.text}
                </p>
              </div>
            </div>
          </div>

          {/* Test settings */}
          <div>
            <div className="text-center mb-2">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                Test Settings
              </span>
            </div>
            <div
              className="bg-white rounded-xl shadow-lg p-6 h-full border-2 border-blue-300"
              style={{
                fontSize: cssValues.fontSize,
                letterSpacing: cssValues.letterSpacing,
                wordSpacing: cssValues.wordSpacing,
                lineHeight: cssValues.lineHeight,
                fontWeight: cssValues.fontWeight,
                fontVariationSettings: cssValues.fontVariationSettings,
              }}
            >
              <div style={{ maxWidth: cssValues.maxWidth }} className="mx-auto">
                <p className="text-slate-800 font-['Lexisolve']">
                  {currentPassage.text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Word count */}
        <div className="text-center text-sm text-slate-500 mb-4">
          {currentPassage.wordCount} words • {currentPassage.readingLevel} grade level
        </div>

        {/* Rating prompt */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 text-center">
          <p className="text-amber-800 font-medium">
            Compared to the Reference, how do the Test Settings feel?
          </p>
        </div>

        {/* Rating input */}
        <RatingInput onRate={handleRating} />
      </div>
    </div>
  );
}

function formatFactorName(factor: string): string {
  const names: Record<string, string> = {
    letterSpacing: 'Letter Spacing',
    wordSpacing: 'Word Spacing',
    lineHeight: 'Line Height',
    fontWeight: 'Font Weight',
    fontSize: 'Font Size',
    paragraphWidth: 'Line Width',
    bwgt: 'Bottom Weight',
  };
  return names[factor] || factor;
}
