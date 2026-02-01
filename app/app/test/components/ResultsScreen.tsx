'use client';

import { DOEResults, OptimizationResult } from '@/lib/types/session';
import { normalizedToCSS, describeNormalizedParams, NormalizedParams } from '@/lib/doe/bayesianOptimizer';

interface ResultsScreenProps {
  doeResults: DOEResults;
  optimizationResult?: OptimizationResult;
  onDownloadFont: () => void;
  onStartOver: () => void;
}

export default function ResultsScreen({
  doeResults,
  optimizationResult,
  onDownloadFont,
  onStartOver,
}: ResultsScreenProps) {
  const factorLabels: Record<string, { name: string; description: string; icon: string }> = {
    letterSpacing: { name: 'Letter Spacing', description: 'Space between letters', icon: 'Aa' },
    wordSpacing: { name: 'Word Spacing', description: 'Space between words', icon: '⬜' },
    lineHeight: { name: 'Line Height', description: 'Vertical spacing', icon: '↕️' },
    fontWeight: { name: 'Font Weight', description: 'Thickness of letters', icon: '𝐁' },
    fontSize: { name: 'Font Size', description: 'Size of text', icon: '🔤' },
    paragraphWidth: { name: 'Line Width', description: 'Characters per line', icon: '↔️' },
    bwgt: { name: 'Bottom Weight', description: 'Letter bottom thickness', icon: '⬇️' },
  };

  // Convert DOE notation to readable factor names
  const factorCodeToName: Record<string, string> = {
    'A': 'Letter Spacing',
    'B': 'Word Spacing',
    'C': 'Line Height',
    'D': 'Font Weight',
    'E': 'Font Size',
    'F': 'Line Width',
    'G': 'Bottom Weight',
  };

  const translateInteraction = (aliasGroup: string): string => {
    // Parse "AB+CE+DF" into readable form
    const pairs = aliasGroup.split('+');
    const translated = pairs.map(pair => {
      if (pair.length === 2) {
        const f1 = factorCodeToName[pair[0]] || pair[0];
        const f2 = factorCodeToName[pair[1]] || pair[1];
        return `${f1} × ${f2}`;
      }
      return pair;
    });
    return translated.join(' or ');
  };

  const getEffectBar = (effect: number) => {
    const absEffect = Math.abs(effect);
    const maxWidth = 100;
    const width = Math.min(absEffect * 100, maxWidth);
    const isPositive = effect > 0;

    return (
      <div className="flex items-center gap-2">
        <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${isPositive ? 'bg-green-500' : 'bg-red-400'
              }`}
            style={{ width: `${width}%` }}
          />
        </div>
        <span className={`text-sm font-mono ${isPositive ? 'text-green-700' : 'text-red-600'}`}>
          {effect >= 0 ? '+' : ''}{effect.toFixed(2)}
        </span>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="text-5xl">🎉</div>
        <h1 className="text-3xl font-bold text-dark-blue">Your Results Are Ready!</h1>
        <p className="text-gray-600">
          Based on your 16 reading tests, we&apos;ve identified your optimal typography settings.
        </p>
      </div>

      {/* Significant Factors */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-dark-blue mb-4">
          📊 What Matters Most to You
        </h2>

        {doeResults.significantFactors.length > 0 ? (
          <div className="space-y-4">
            {doeResults.significantFactors.map((factor) => (
              <div key={factor} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{factorLabels[factor]?.icon || '📌'}</span>
                  <div>
                    <div className="font-medium text-green-900">
                      {factorLabels[factor]?.name || factor}
                    </div>
                    <div className="text-sm text-green-700">
                      {factorLabels[factor]?.description}
                    </div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">
                  ✓ Significant
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-800">
              Interesting! None of the typography factors showed a strong effect for you.
              This might mean you&apos;re comfortable with a wide range of settings, or that
              other factors (like font choice itself) matter more for your reading experience.
            </p>
          </div>
        )}
      </div>

      {/* All Effects */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-dark-blue mb-4">
          📈 Full Effect Analysis
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Positive values = higher setting improved readability. Negative = lower setting was better.
        </p>

        <div className="space-y-4">
          {Object.entries(doeResults.effects).map(([factor, effect]) => (
            <div key={factor} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{factorLabels[factor]?.icon || '📌'}</span>
                <span className="font-medium">{factorLabels[factor]?.name || factor}</span>
                {doeResults.significantFactors.includes(factor as keyof typeof doeResults.effects) && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                    Significant
                  </span>
                )}
              </div>
              {getEffectBar(effect)}
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
          Standard Error: ±{doeResults.standardError.toFixed(3)}
        </div>
      </div>

      {/* Interaction Effects (if available) */}
      {doeResults.topInteractions && doeResults.topInteractions.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-dark-blue mb-4">
            🔗 Notable Interactions
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            These factor combinations showed notable combined effects on your reading comfort.
          </p>

          <div className="space-y-3">
            {doeResults.interactions?.slice(0, 3).map((interaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex-1">
                  <span className="text-purple-800 font-medium text-sm">
                    {translateInteraction(interaction.aliasGroup)}
                  </span>
                </div>
                <span className={`font-mono text-sm ${interaction.effect >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {interaction.effect >= 0 ? '+' : ''}{interaction.effect.toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Note: With our efficient 16-run design, some interaction effects are aliased together.
            &quot;or&quot; indicates the effect could come from either factor pair.
          </p>
        </div>
      )}

      {/* Optimal Settings (if optimization was done) */}
      {optimizationResult && (() => {
        const desc = describeNormalizedParams(optimizationResult.optimalValues as NormalizedParams);
        const css = normalizedToCSS(optimizationResult.optimalValues as NormalizedParams);
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-dark-blue mb-4">
              ⚙️ Your Optimal Settings
              {optimizationResult.skipped && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (from initial screening)
                </span>
              )}
            </h2>

            {!optimizationResult.skipped && optimizationResult.trialsRun > 0 && (
              <p className="text-sm text-gray-600 mb-4">
                Fine-tuned over {optimizationResult.trialsRun} additional comparisons using Bayesian optimization.
              </p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Letter Spacing</div>
                <div className="font-mono font-medium">{desc.letterSpacing}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Word Spacing</div>
                <div className="font-mono font-medium">{desc.wordSpacing}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Line Height</div>
                <div className="font-mono font-medium">{desc.lineHeight}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Font Weight</div>
                <div className="font-mono font-medium">{desc.fontWeight}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Font Size Boost</div>
                <div className="font-mono font-medium">{desc.fontSize}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Line Width</div>
                <div className="font-mono font-medium">{desc.paragraphWidth}</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                <div className="text-sm text-gray-600">Bottom Weight (Variable Font)</div>
                <div className="font-mono font-medium">{desc.bwgt}</div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Download Section */}
      <div className="bg-gradient-to-r from-dark-blue to-blue-600 rounded-xl p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-3">Get Your Personalized Files</h2>
        <p className="text-blue-100 mb-6">
          Download your custom font and settings in one click. Includes font file,
          CSS stylesheet, and JSON settings for the Chrome extension.
        </p>
        <button
          type="button"
          onClick={onDownloadFont}
          className="bg-cream text-dark-blue px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors shadow-lg"
        >
          ⬇️ Download All Files
        </button>
        <p className="text-xs text-blue-200 mt-4">
          Free for personal use. Based on OpenDyslexic (open source).
        </p>
      </div>

      {/* What's Next Section */}
      <div className="bg-white border-2 border-dark-blue rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-dark-blue mb-3">What&apos;s Next?</h2>
        <p className="text-gray-600 mb-6">
          Learn how to install your font and use your personalized settings everywhere you read.
        </p>
        <a
          href="/next-steps"
          className="inline-block bg-dark-blue text-cream px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          How to Use Your Results →
        </a>
      </div>

      {/* CSS Code Block */}
      {(() => {
        const css = optimizationResult
          ? normalizedToCSS(optimizationResult.optimalValues as NormalizedParams)
          : { letterSpacing: '0.06em', wordSpacing: '0.10em', lineHeight: 1.6, fontWeight: 400, maxWidth: '60ch', fontVariationSettings: "'BWGT' 50" };

        // Extract BWGT value from fontVariationSettings
        const bwgtMatch = css.fontVariationSettings?.match(/'BWGT'\s+(\d+)/);
        const bwgtValue = bwgtMatch ? parseInt(bwgtMatch[1]) : 50;

        const cssCode = `/* Your personalized reading settings */
.dyslexia-optimized {
  font-family: 'Lexisolve', sans-serif;
  letter-spacing: ${css.letterSpacing};
  word-spacing: ${css.wordSpacing};
  line-height: ${css.lineHeight};
  font-weight: ${css.fontWeight};
  max-width: ${css.maxWidth};
  font-variation-settings: ${css.fontVariationSettings || "'BWGT' 50"};
}`;

        const jsonSettings = {
          version: 1,
          generator: "lexisolve.org",
          timestamp: new Date().toISOString(),
          settings: {
            letterSpacing: css.letterSpacing,
            wordSpacing: css.wordSpacing,
            lineHeight: css.lineHeight,
            fontWeight: css.fontWeight,
            maxWidth: css.maxWidth,
            bwgt: bwgtValue,
            fontVariationSettings: css.fontVariationSettings || "'BWGT' 50"
          }
        };

        const downloadJSON = () => {
          const blob = new Blob([JSON.stringify(jsonSettings, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'lexisolve-settings.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        };

        return (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-dark-blue mb-4">
              💻 CSS for Developers
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Apply these styles to any website for your optimized reading experience:
            </p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
              {cssCode}
            </pre>
            <div className="mt-3 flex gap-4">
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(cssCode)}
                className="text-sm text-dark-blue hover:underline"
              >
                📋 Copy to clipboard
              </button>
              <button
                type="button"
                onClick={downloadJSON}
                className="text-sm text-dark-blue hover:underline"
              >
                📥 Download Settings (JSON)
              </button>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Use the JSON file with the LexiPage Chrome extension to apply your settings to any webpage.
            </p>
          </div>
        );
      })()}

      {/* Footer Actions */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          type="button"
          onClick={onStartOver}
          className="text-gray-600 hover:text-dark-blue underline"
        >
          Start a new test
        </button>
      </div>
    </div>
  );
}