import Link from 'next/link';

export const metadata = {
    title: 'LexiView | Lexisolve',
    description: 'Read anything with your optimized settings using LexiView.',
};

export default function LexiViewNextStepsPage() {
    return (
        <main className="min-h-screen bg-cream py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <Link href="/next-steps" className="text-blue-600 hover:underline">
                        ← Back to Next Steps
                    </Link>
                </nav>

                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-4xl mx-auto">
                        📱
                    </div>
                    <h1 className="text-4xl font-bold text-dark-blue">
                        LexiView
                    </h1>
                    <p className="text-xl text-gray-600">
                        Read anything right now with your optimized settings
                    </p>
                </div>

                {/* Main CTA */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8 mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">
                        Start Reading Now
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Your personalized settings are automatically applied. Just paste text or use your camera.
                    </p>
                    <Link
                        href="/lexiview"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                    >
                        Open LexiView
                    </Link>
                </div>

                {/* Features */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-6">
                        What You Can Do
                    </h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
                                📷
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">Scan Physical Text</h3>
                                <p className="text-gray-600">
                                    Use your device&apos;s camera to capture text from books, papers, signs, or any printed material.
                                    The text is automatically converted and displayed with your settings.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
                                📋
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">Paste Any Text</h3>
                                <p className="text-gray-600">
                                    Copy text from emails, documents, articles, or anywhere else and paste it into LexiView
                                    to read with your optimized typography.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
                                ⚙️
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">Fine-Tune On the Fly</h3>
                                <p className="text-gray-600">
                                    Adjust settings in real-time while reading. Perfect for finding what works best
                                    for different content or lighting conditions.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
                                📱
                            </div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">Works Offline</h3>
                                <p className="text-gray-600">
                                    Add LexiView to your home screen for quick access. It works even without
                                    an internet connection.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Use Cases */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-6">
                        Perfect For
                    </h2>
                    <ul className="grid sm:grid-cols-2 gap-4">
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-500">✓</span> Reading textbooks
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-500">✓</span> Restaurant menus
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-500">✓</span> Medication labels
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-500">✓</span> Forms and documents
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-500">✓</span> Recipe cards
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-500">✓</span> Long emails
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-500">✓</span> News articles
                        </li>
                        <li className="flex items-center gap-2 text-gray-700">
                            <span className="text-green-500">✓</span> Study materials
                        </li>
                    </ul>
                </section>

                {/* Second CTA */}
                <div className="text-center">
                    <Link
                        href="/lexiview"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                    >
                        Open LexiView
                    </Link>
                </div>
            </div>
        </main>
    );
}