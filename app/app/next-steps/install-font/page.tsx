import Link from 'next/link';

export const metadata = {
    title: 'Install Lexisolve Font | Lexisolve',
    description: 'Install the Lexisolve font on your devices including Kindle, Windows, Mac, and iOS.',
};

export default function InstallFontPage() {
    return (
        <main className="min-h-screen bg-cream py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <nav className="mb-8">
                    <Link href="/next-steps" className="text-purple-600 hover:underline">
                        ← Back to Next Steps
                    </Link>
                </nav>

                <div className="text-center space-y-4 mb-12">
                    <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-4xl mx-auto">
                        📄
                    </div>
                    <h1 className="text-4xl font-bold text-dark-blue">Install the Font</h1>
                    <p className="text-xl text-gray-600">
                        Use Lexisolve in any application that supports custom fonts
                    </p>
                </div>

                {/* Download */}
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-8 mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">Download Lexisolve Font</h2>
                    <p className="text-gray-600 mb-6">
                        Get the variable font file for installation on your devices.
                    </p>
                    <a
                        href="/fonts/Lexisolve-Variable.ttf"
                        download
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                    >
                        Download Font (.ttf)
                    </a>
                </div>

                {/* Kindle */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">📚</span>
                        <h2 className="text-2xl font-semibold text-dark-blue">Kindle</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Newer Kindle models (Paperwhite 3+, Oasis, newer basic Kindles) support custom fonts.
                    </p>
                    <ol className="space-y-4 text-gray-700">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            <span>Connect your Kindle to your computer via USB</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            <span>Open the Kindle drive and find the <code className="bg-gray-100 px-1 rounded">fonts</code> folder (create it if it doesn&apos;t exist)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            <span>Copy the Lexisolve font file into the <code className="bg-gray-100 px-1 rounded">fonts</code> folder</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                            <span>Safely eject and disconnect your Kindle</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</span>
                            <span>On Kindle: Open a book → Tap top of screen → Aa (font) → Select &quot;Lexisolve&quot;</span>
                        </li>
                    </ol>
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-amber-800 text-sm">
                            <strong>Note:</strong> Kindle will use the base font but cannot apply your custom letter-spacing or line-height settings.
                            Use Kindle&apos;s built-in spacing controls to approximate your preferences.
                        </p>
                    </div>
                </section>

                {/* Windows */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">🪟</span>
                        <h2 className="text-2xl font-semibold text-dark-blue">Windows</h2>
                    </div>
                    <ol className="space-y-3 text-gray-700">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            <span>Download the font file above</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            <span>Right-click the downloaded file</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            <span>Select &quot;Install&quot; or &quot;Install for all users&quot;</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                            <span>The font will now appear in Word, Google Docs, and other applications</span>
                        </li>
                    </ol>
                </section>

                {/* Mac */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">🍎</span>
                        <h2 className="text-2xl font-semibold text-dark-blue">Mac</h2>
                    </div>
                    <ol className="space-y-3 text-gray-700">
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            <span>Download the font file above</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            <span>Double-click the downloaded file to open Font Book</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            <span>Click &quot;Install Font&quot;</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                            <span>The font will now appear in all macOS applications</span>
                        </li>
                    </ol>
                </section>

                {/* iOS/iPad */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl">📱</span>
                        <h2 className="text-2xl font-semibold text-dark-blue">iOS / iPad</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        iOS requires a configuration profile to install custom fonts. You can use apps like:
                    </p>
                    <ul className="space-y-2 text-gray-700 mb-4">
                        <li>• <strong>iFont</strong> (free) - Download from App Store</li>
                        <li>• <strong>Fontcase</strong> (free) - Download from App Store</li>
                        <li>• <strong>AnyFont</strong> (paid) - Download from App Store</li>
                    </ul>
                    <p className="text-gray-600">
                        After installation, the font will be available in apps like Pages, Keynote, and other font-aware applications.
                    </p>
                </section>

                <div className="text-center">
                    <Link
                        href="/next-steps"
                        className="inline-block border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
                    >
                        Back to Next Steps
                    </Link>
                </div>
            </div>
        </main>
    );
}