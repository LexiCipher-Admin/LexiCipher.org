import Link from 'next/link';

export const metadata = {
    title: 'LexiPage Chrome Extension | LexiCipher',
    description: 'Apply your reading settings to any website with LexiPage.',
};

export default function LexiPageNextStepsPage() {
    return (
        <main className="min-h-screen bg-cream py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <nav className="mb-8">
                    <Link href="/next-steps" className="text-green-600 hover:underline">
                        ← Back to Next Steps
                    </Link>
                </nav>

                <div className="text-center space-y-4 mb-12">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto">
                        🌐
                    </div>
                    <h1 className="text-4xl font-bold text-dark-blue">LexiPage</h1>
                    <p className="text-xl text-gray-600">
                        Apply your settings to any website automatically
                    </p>
                </div>

                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8 mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">Install the Extension</h2>
                    <p className="text-gray-600 mb-6">
                        LexiPage is currently available for manual installation. Chrome Web Store coming soon!
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        Download from our GitHub or contact us for beta access.
                    </p>
                </div>

                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-6">How It Works</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">Install the Extension</h3>
                                <p className="text-gray-600">Add LexiPage to Chrome from Settings → Extensions → Load Unpacked.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">Import Your Settings</h3>
                                <p className="text-gray-600">Export your settings JSON from test results and import into the extension.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                            <div>
                                <h3 className="font-semibold text-dark-blue">Browse the Web</h3>
                                <p className="text-gray-600">Toggle LexiPage on any site to apply your optimized typography settings.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">Features</h2>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2"><span className="text-green-500">✓</span> One-click toggle on/off</li>
                        <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Remembers settings per site</li>
                        <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Works on articles, emails, social media</li>
                        <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Preserves page layout</li>
                        <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Privacy-focused - settings stay local</li>
                    </ul>
                </section>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <h3 className="font-semibold text-amber-900 mb-2">📍 Coming Soon</h3>
                    <p className="text-amber-800">Chrome Web Store listing, Firefox support, and Safari extension are in development.</p>
                </div>
            </div>
        </main>
    );
}