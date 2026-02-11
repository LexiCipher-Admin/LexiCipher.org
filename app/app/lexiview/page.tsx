'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useOCR } from '@/lib/hooks/useOCR';
import { useReadingSettings, DEFAULT_SETTINGS } from '@/lib/hooks/useReadingSettings';

export default function LexiViewPage() {
    const { processImage, clearResult, terminateWorker, isProcessing, progress, result, error } = useOCR();
    const { settings, isLoaded, fromTest, updateSetting, resetSettings } = useReadingSettings();
    
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [showAllSettings, setShowAllSettings] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    // Cleanup worker on unmount
    useEffect(() => {
        return () => {
            terminateWorker();
        };
    }, [terminateWorker]);

    const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create preview
        const reader = new FileReader();
        reader.onload = (event) => {
            setImagePreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Process OCR
        await processImage(file);
    }, [processImage]);

    const handleClear = useCallback(() => {
        setImagePreview(null);
        clearResult();
        if (fileInputRef.current) fileInputRef.current.value = '';
        if (cameraInputRef.current) cameraInputRef.current.value = '';
    }, [clearResult]);

    const handleCopyText = useCallback(async () => {
        if (!result?.text) return;
        try {
            await navigator.clipboard.writeText(result.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }, [result?.text]);

    // Don't render controls until settings are loaded
    if (!isLoaded) {
        return (
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-gray-600 dark:text-gray-400">Loading settings...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        LexiView
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        See text your way — transform any image into readable text
                    </p>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                {/* Settings Applied Banner */}
                {fromTest && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">✅</span>
                            <div>
                                <p className="font-medium text-green-800 dark:text-green-200">
                                    Your personalized settings have been applied
                                </p>
                                <p className="text-sm text-green-600 dark:text-green-400">
                                    Based on your reading test results. Adjust below if needed.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Input Section */}
                {!imagePreview && !result && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Camera Button */}
                            <button
                                onClick={() => cameraInputRef.current?.click()}
                                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            >
                                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Take Photo</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Use camera</span>
                            </button>
                            <input
                                ref={cameraInputRef}
                                type="file"
                                accept="image/*"
                                capture="environment"
                                onChange={handleFileSelect}
                                className="hidden"
                            />

                            {/* Upload Button */}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            >
                                <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Upload Image</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">From device</span>
                            </button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>

                        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                            Supported formats: JPG, PNG, GIF, BMP, WebP
                        </p>
                    </div>
                )}

                {/* Processing State */}
                {isProcessing && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="flex flex-col items-center">
                            {imagePreview && (
                                <img
                                    src={imagePreview}
                                    alt="Processing"
                                    className="max-h-48 rounded-lg mb-4 opacity-50"
                                />
                            )}
                            <div className="w-full max-w-xs">
                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    <span>{progress.status}</span>
                                    <span>{progress.progress}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-blue-500 transition-all duration-300"
                                        style={{ width: `${progress.progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-red-700 dark:text-red-300">{error}</span>
                        </div>
                        <button
                            onClick={handleClear}
                            className="mt-3 text-sm text-red-600 dark:text-red-400 underline"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Results */}
                {result && !isProcessing && (
                    <>
                        {/* Controls */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                            <div className="flex flex-wrap gap-4 items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleClear}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        <span className="text-sm font-medium">New Scan</span>
                                    </button>

                                    <button
                                        onClick={handleCopyText}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        {copied ? (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-medium">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-sm font-medium">Copy Text</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <span>Confidence:</span>
                                    <span className={`font-medium ${result.confidence >= 80 ? 'text-green-600 dark:text-green-400' :
                                        result.confidence >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
                                            'text-red-600 dark:text-red-400'
                                        }`}>
                                        {Math.round(result.confidence)}%
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Text Display Settings */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Display Settings
                                    {fromTest && (
                                        <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                                            (from your test)
                                        </span>
                                    )}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowAllSettings(!showAllSettings)}
                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                    >
                                        {showAllSettings ? 'Show Less' : 'Show All Settings'}
                                    </button>
                                    <button
                                        onClick={resetSettings}
                                        className="text-xs text-gray-500 dark:text-gray-400 hover:underline"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                            
                            {/* Primary Controls (always visible) */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        Font Size: {settings.fontSize}px
                                    </label>
                                    <input
                                        type="range"
                                        min="14"
                                        max="32"
                                        value={settings.fontSize}
                                        onChange={(e) => updateSetting('fontSize', Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        Line Height: {settings.lineHeight.toFixed(1)}
                                    </label>
                                    <input
                                        type="range"
                                        min="1.3"
                                        max="2.5"
                                        step="0.1"
                                        value={settings.lineHeight}
                                        onChange={(e) => updateSetting('lineHeight', Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        Letter Spacing: {settings.letterSpacing.toFixed(2)}em
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="0.25"
                                        step="0.01"
                                        value={settings.letterSpacing}
                                        onChange={(e) => updateSetting('letterSpacing', Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Extended Controls (toggleable) */}
                            {showAllSettings && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div>
                                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            Word Spacing: {settings.wordSpacing.toFixed(2)}em
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="0.40"
                                            step="0.01"
                                            value={settings.wordSpacing}
                                            onChange={(e) => updateSetting('wordSpacing', Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            Font Weight: {settings.fontWeight}
                                        </label>
                                        <input
                                            type="range"
                                            min="300"
                                            max="700"
                                            step="100"
                                            value={settings.fontWeight}
                                            onChange={(e) => updateSetting('fontWeight', Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            Bottom Weight: {settings.bwgt}
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={settings.bwgt}
                                            onChange={(e) => updateSetting('bwgt', Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                                            Line Width: {settings.paragraphWidth}ch
                                        </label>
                                        <input
                                            type="range"
                                            min="40"
                                            max="80"
                                            value={settings.paragraphWidth}
                                            onChange={(e) => updateSetting('paragraphWidth', Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Extracted Text */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                            <div
                                className="prose dark:prose-invert max-w-none text-gray-900 dark:text-gray-100"
                                style={{
                                    fontSize: `${settings.fontSize}px`,
                                    lineHeight: settings.lineHeight,
                                    letterSpacing: `${settings.letterSpacing}em`,
                                    wordSpacing: `${settings.wordSpacing}em`,
                                    fontWeight: settings.fontWeight,
                                    fontVariationSettings: `'BWGT' ${settings.bwgt}`,
                                    maxWidth: `${settings.paragraphWidth}ch`,
                                    margin: '0 auto',
                                    fontFamily: "'LexiCipher BWGT', 'OpenDyslexic', system-ui, sans-serif"
                                }}
                            >
                                {result.text.split('\n').map((paragraph, i) => (
                                    <p key={i} className="mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>

                        {/* Original Image (collapsible) */}
                        {imagePreview && (
                            <details className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                                <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
                                    View Original Image
                                </summary>
                                <div className="px-4 pb-4">
                                    <img
                                        src={imagePreview}
                                        alt="Original"
                                        className="max-w-full rounded-lg"
                                    />
                                </div>
                            </details>
                        )}
                    </>
                )}

                {/* Take the Test CTA (if no test results) */}
                {!fromTest && !result && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
                        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                            Get Personalized Settings
                        </h3>
                        <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                            Take a 10-minute reading test to discover your optimal typography settings.
                            Your results will be automatically applied here.
                        </p>
                        <a
                            href="/test"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Take the Test →
                        </a>
                    </div>
                )}

                {/* Info Footer */}
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                    <p>All processing happens locally on your device.</p>
                    <p>No images are uploaded to any server.</p>
                </div>
            </div>
        </main>
    );
}
