'use client';

import { useState, useEffect } from 'react';

interface BreakScreenProps {
    onComplete: () => void;
    testNumber: number;
}

export default function BreakScreen({ onComplete, testNumber }: BreakScreenProps) {
    const BREAK_DURATION = 120; // 2 minutes in seconds
    const [secondsRemaining, setSecondsRemaining] = useState(BREAK_DURATION);
    const [canSkip, setCanSkip] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Allow skip after 30 seconds
        const skipTimer = setTimeout(() => {
            setCanSkip(true);
        }, 30000);

        return () => {
            clearInterval(timer);
            clearTimeout(skipTimer);
        };
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progressPercent = ((BREAK_DURATION - secondsRemaining) / BREAK_DURATION) * 100;

    return (
        <div className="max-w-lg mx-auto text-center space-y-8 py-12">
            <div className="space-y-2">
                <span className="text-6xl">☕</span>
                <h1 className="text-2xl font-bold text-dark-blue">Halfway There!</h1>
                <p className="text-gray-600">
                    You&apos;ve completed {testNumber} of 16 tests. Great work!
                </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-4">
                <h2 className="text-lg font-semibold text-blue-800">Take a Quick Break</h2>
                <p className="text-blue-700">
                    Rest your eyes and stretch. This helps maintain accurate results.
                </p>

                <div className="space-y-2">
                    <div className="text-4xl font-mono font-bold text-blue-600">
                        {formatTime(secondsRemaining)}
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-800 mb-2">💡 Break Tips</h3>
                <ul className="text-sm text-green-700 space-y-1 text-left">
                    <li>• Look at something 20 feet away for 20 seconds</li>
                    <li>• Roll your shoulders and stretch your neck</li>
                    <li>• Blink several times to refresh your eyes</li>
                    <li>• Take a few deep breaths</li>
                </ul>
            </div>

            {secondsRemaining === 0 ? (
                <button
                    type="button"
                    onClick={onComplete}
                    className="w-full bg-dark-blue text-cream py-4 px-6 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-colors"
                >
                    Continue Testing →
                </button>
            ) : canSkip ? (
                <button
                    type="button"
                    onClick={onComplete}
                    className="text-gray-500 hover:text-gray-700 underline text-sm"
                >
                    Skip break (not recommended)
                </button>
            ) : (
                <p className="text-sm text-gray-400">
                    Break will end automatically...
                </p>
            )}
        </div>
    );
}