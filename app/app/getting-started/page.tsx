import Link from 'next/link';

export const metadata = {
    title: 'Getting Started | Lexisolve',
    description: 'Learn how Lexisolve can help you find your optimal reading settings for dyslexia.',
};

export default function GettingStartedPage() {
    return (
        <main className="min-h-screen bg-cream py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Hero */}
                <div className="text-center space-y-6 mb-12">
                    <h1 className="text-4xl font-bold text-dark-blue">
                        Welcome to Lexisolve
                    </h1>
                    <p className="text-xl text-gray-600">
                        Discover the typography settings that work best for your brain.
                    </p>
                </div>

                {/* What is Lexisolve */}
                <section className="bg-white rounded-xl p-8 shadow-sm mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">
                        📖 What is Lexisolve?
                    </h2>
                    <p className="text-gray-700 mb-4">
                        Lexisolve is a free, science-based tool that helps you find your optimal reading settings.
                        Instead of guessing which font or spacing works best, our test uses Design of Experiments
                        (DOE) methodology to systematically identify what actually helps <em>you</em> read more comfortably.
                    </p>
                    <p className="text-gray-700">
                        Every person&apos;s brain is different. What works for one reader may not work for another.
                        That&apos;s why we test 7 different typography factors to find your unique combination.
                    </p>
                    <Link
                        href="/about/research"
                        className="inline-block mt-4 text-blue-600 hover:text-blue-800 hover:underline text-sm"
                    >
                        📚 View the research citations →
                    </Link>
                </section>

                {/* How It Works */}
                <section className="bg-white rounded-xl p-8 shadow-sm mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">
                        🔬 How the Test Works
                    </h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-dark-blue text-cream rounded-full flex items-center justify-center font-bold">
                                1
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">Quick Setup</h3>
                                <p className="text-gray-600">
                                    Tell us your reading level and optionally calibrate for your screen size.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-dark-blue text-cream rounded-full flex items-center justify-center font-bold">
                                2
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">16 Reading Comparisons</h3>
                                <p className="text-gray-600">
                                    Read short passages and rate each one compared to a reference. Takes about 10-15 minutes.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-dark-blue text-cream rounded-full flex items-center justify-center font-bold">
                                3
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">Statistical Analysis</h3>
                                <p className="text-gray-600">
                                    We analyze your responses to identify which factors significantly affect your reading comfort.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-dark-blue text-cream rounded-full flex items-center justify-center font-bold">
                                4
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">Get Your Settings</h3>
                                <p className="text-gray-600">
                                    Download a personalized font file and CSS settings to use everywhere you read.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* What We Test */}
                <section className="bg-white rounded-xl p-8 shadow-sm mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">
                        🎛️ What We Test
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium">Aa Letter Spacing</div>
                            <div className="text-sm text-gray-600">Space between letters</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium">⬜ Word Spacing</div>
                            <div className="text-sm text-gray-600">Space between words</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium">↕️ Line Height</div>
                            <div className="text-sm text-gray-600">Vertical spacing between lines</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium">𝐁 Font Weight</div>
                            <div className="text-sm text-gray-600">Thickness of letters</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium">🔤 Font Size</div>
                            <div className="text-sm text-gray-600">Size of text</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="font-medium">↔️ Line Width</div>
                            <div className="text-sm text-gray-600">Characters per line</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg md:col-span-2">
                            <div className="font-medium">⬇️ Bottom Weight</div>
                            <div className="text-sm text-gray-600">Extra thickness at letter bottoms (variable font feature)</div>
                        </div>
                    </div>
                </section>

                {/* Calibrated Passages */}
                <section className="bg-white rounded-xl p-8 shadow-sm mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">
                        📏 Calibrated Reading Passages
                    </h2>
                    <p className="text-gray-700 mb-4">
                        All test passages are <strong>professionally calibrated</strong> using the Flesch-Kincaid
                        readability formula to ensure consistent difficulty across the test.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-dark-blue">3rd</div>
                            <div className="text-sm text-gray-600">Grade passages</div>
                            <div className="text-xs text-gray-400">FK 2.5-3.5</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-dark-blue">5th</div>
                            <div className="text-sm text-gray-600">Grade passages</div>
                            <div className="text-xs text-gray-400">FK 4.5-5.5</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-2xl font-bold text-dark-blue">8th</div>
                            <div className="text-sm text-gray-600">Grade passages</div>
                            <div className="text-xs text-gray-400">FK 7.5-8.5</div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-4">
                        You&apos;ll read passages 2 grade levels below your selected level for comfortable, focused testing.
                    </p>
                </section>

                {/* Privacy Note */}
                <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-semibold text-blue-900 mb-2">
                        🔒 Your Privacy
                    </h2>
                    <p className="text-blue-800">
                        All data stays on your device. We don&apos;t collect, store, or transmit any personal information.
                        Your reading preferences are saved in your browser&apos;s local storage and can be deleted anytime.
                    </p>
                </section>

                {/* CTA */}
                <div className="text-center space-y-4">
                    <Link
                        href="/test"
                        className="inline-block bg-dark-blue text-cream px-10 py-5 rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-colors"
                    >
                        Start Your Test →
                    </Link>
                    <p className="text-gray-500">
                        Free • 10-15 minutes • No account required
                    </p>
                </div>
            </div>
        </main>
    );
}