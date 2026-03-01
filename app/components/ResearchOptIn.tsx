'use client';

import { useState } from 'react';
import { Session } from '@/lib/types/session';
import { bucketNormalized, isOptimizationCompleted } from '@/lib/utils/telemetry';

interface ResearchOptInProps {
  session: Session;
  onDownloadFont: () => void;
}

function getEnvironment(): { os_family: string; device_type: string } {
  const ua = window.navigator.userAgent;
  let os_family = 'Other';
  let device_type = 'Desktop';

  if (/Windows/i.test(ua)) os_family = 'Windows';
  else if (/Mac/i.test(ua)) os_family = 'macOS';
  else if (/Linux/i.test(ua)) os_family = 'Linux';
  else if (/Android/i.test(ua)) { os_family = 'Android'; device_type = 'Mobile'; }
  else if (/iPad/i.test(ua)) { os_family = 'iOS'; device_type = 'Tablet'; }
  else if (/iPhone|iPod/i.test(ua)) { os_family = 'iOS'; device_type = 'Mobile'; }

  return { os_family, device_type };
}

async function generateSessionHash(): Promise<string> {
  const array = new Uint32Array(4);
  window.crypto.getRandomValues(array);
  const bytes = new TextEncoder().encode(array.join('-'));
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function ResearchOptIn({ session, onDownloadFont }: ResearchOptInProps) {
  const [isOptedIn, setIsOptedIn] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAction = async () => {
    if (isOptedIn && !submitted && session.doeResults && session.setup) {
      setSubmitted(true);

      const optimalValues = session.optimizationResult?.optimalValues ?? {
        letterSpacing: session.doeResults.effects.letterSpacing > 0 ? 1 : 0,
        wordSpacing:   session.doeResults.effects.wordSpacing   > 0 ? 1 : 0,
        lineHeight:    session.doeResults.effects.lineHeight    > 0 ? 1 : 0,
        fontWeight:    session.doeResults.effects.fontWeight    > 0 ? 1 : 0,
        fontSize:      session.doeResults.effects.fontSize      > 0 ? 1 : 0,
        paragraphWidth: session.doeResults.effects.paragraphWidth > 0 ? 1 : 0,
        bwgt:          session.doeResults.effects.bwgt          > 0 ? 1 : 0,
      };

      const completionTimeSecs = Math.min(
        Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 1000),
        3600
      );

      generateSessionHash().then(session_hash => {
        const payload = {
          session_hash,
          environment: getEnvironment(),
          session_meta: {
            age_group: session.setup!.ageGroup,
            reading_level: session.setup!.readingLevel,
            completion_time_seconds: completionTimeSecs,
          },
          doe_results: {
            significant_factors_count: session.doeResults!.significantFactors.length,
            significant_factors: session.doeResults!.significantFactors.join(','),
            optimization_completed: isOptimizationCompleted(session.optimizationResult),
            letter_spacing_bucket:  bucketNormalized(optimalValues.letterSpacing),
            word_spacing_bucket:    bucketNormalized(optimalValues.wordSpacing),
            line_height_bucket:     bucketNormalized(optimalValues.lineHeight),
            font_weight_bucket:     bucketNormalized(optimalValues.fontWeight),
            font_size_bucket:       bucketNormalized(optimalValues.fontSize),
            paragraph_width_bucket: bucketNormalized(optimalValues.paragraphWidth),
            bwgt_bucket:            bucketNormalized(optimalValues.bwgt),
          },
        };

        // Fire-and-forget — never block the download
        fetch('/api/telemetry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(err => console.error('Telemetry submission failed silently:', err));
      }).catch(err => console.error('Session hash generation failed:', err));
    }

    onDownloadFont();
  };

  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 mt-6">
      <h3 className="text-xl font-bold text-slate-800 mb-3">
        Contribute to Dyslexia Research
        <span className="ml-2 text-sm font-normal text-slate-500">(Optional)</span>
      </h3>

      <p className="text-slate-600 mb-4 leading-relaxed">
        Help the research community understand how typography affects reading for people with dyslexia.
        Your anonymized results will be added to a public open-source dataset.
      </p>

      <div className="bg-white rounded-lg border border-slate-200 p-4 mb-5 text-sm text-slate-600 space-y-1">
        <p className="font-semibold text-slate-700 mb-2">Privacy guarantee:</p>
        <p>• No names, emails, or IP addresses are collected.</p>
        <p>• Exact values are grouped into broad categories to prevent identification.</p>
        <p>• A random one-time identifier is generated in your browser using the Web Crypto API.</p>
      </div>

      <label className="flex items-start gap-3 cursor-pointer mb-5">
        <input
          type="checkbox"
          className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
          checked={isOptedIn}
          onChange={e => setIsOptedIn(e.target.checked)}
          disabled={submitted}
        />
        <span className="text-slate-700 leading-snug">
          Yes, anonymously share my reading configuration to help advance dyslexia research.
        </span>
      </label>

      <button
        onClick={handleAction}
        className="w-full py-4 px-6 rounded-lg text-lg font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors shadow-md"
      >
        {submitted ? 'Downloading...' : 'Download My Custom Font'}
      </button>

      {submitted && isOptedIn && (
        <p className="text-center text-sm text-slate-500 mt-3">
          Thank you for contributing to the research dataset.
        </p>
      )}
    </div>
  );
}
