import Link from 'next/link';

export const metadata = {
    title: 'For Developers | LexiCipher',
    description: 'Integrate LexiCipher typography settings into your website or application.',
};

export default function DevelopersPage() {
    return (
        <main className="min-h-screen bg-cream py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <nav className="mb-8">
                    <Link href="/next-steps" className="text-orange-600 hover:underline">
                        ← Back to Next Steps
                    </Link>
                </nav>

                <div className="text-center space-y-4 mb-12">
                    <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-4xl mx-auto">
                        💻
                    </div>
                    <h1 className="text-4xl font-bold text-dark-blue">For Developers</h1>
                    <p className="text-xl text-gray-600">
                        Integrate LexiCipher into your website or application
                    </p>
                </div>

                {/* Quick Start */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-6">Quick Start</h2>
                    <p className="text-gray-600 mb-4">
                        Add the LexiCipher font and apply user-optimized settings via CSS:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">{`/* 1. Load the font */
@font-face {
  font-family: 'LexiCipher';
  src: url('/fonts/LexiCipher-Variable.ttf') format('truetype');
  font-weight: 100 900;
}

/* 2. Apply user settings (from JSON export) */
.readable-text {
  font-family: 'LexiCipher', sans-serif;
  font-size: 18px;
  letter-spacing: 0.05em;
  word-spacing: 0.1em;
  line-height: 1.6;
  font-variation-settings: "BWGT" 65;
  max-width: 65ch;
}`}</pre>
                    </div>
                </section>

                {/* JSON Export */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-6">Using Exported Settings</h2>
                    <p className="text-gray-600 mb-4">
                        Users can export their optimized settings as JSON. Here&apos;s the format:
                    </p>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto mb-4">
                        <pre className="text-blue-400 text-sm font-mono whitespace-pre-wrap">{`{
  "css": {
    "fontSize": "18px",
    "letterSpacing": "0.05em",
    "wordSpacing": "0.1em",
    "lineHeight": "1.6",
    "fontWeight": 450,
    "fontVariationSettings": "\\"BWGT\\" 65",
    "maxWidth": "65ch"
  },
  "version": "1.0",
  "exportedAt": "2025-01-28T..."
}`}</pre>
                    </div>
                    <p className="text-gray-600">
                        Parse this JSON and apply the CSS values directly to your content containers.
                    </p>
                </section>

                {/* Variable Font Axes */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-6">Variable Font Axes</h2>
                    <p className="text-gray-600 mb-4">
                        LexiCipher is a variable font with these axes:
                    </p>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2 font-semibold text-dark-blue">Axis</th>
                                <th className="py-2 font-semibold text-dark-blue">Tag</th>
                                <th className="py-2 font-semibold text-dark-blue">Range</th>
                                <th className="py-2 font-semibold text-dark-blue">Default</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600">
                            <tr className="border-b">
                                <td className="py-2">Weight</td>
                                <td className="py-2"><code className="bg-gray-100 px-1 rounded">wght</code></td>
                                <td className="py-2">100–900</td>
                                <td className="py-2">400</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2">Bottom Weight</td>
                                <td className="py-2"><code className="bg-gray-100 px-1 rounded">BWGT</code></td>
                                <td className="py-2">0–100</td>
                                <td className="py-2">50</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-blue-800 text-sm">
                            <strong>BWGT (Bottom Weight):</strong> A custom axis that adds weight to the bottom portion of characters,
                            creating a visual anchor that can improve reading stability for some users.
                        </p>
                    </div>
                </section>

                {/* Accessibility */}
                <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-6">Accessibility Considerations</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex gap-3">
                            <span className="text-green-500">✓</span>
                            <span>Allow users to override your defaults with their own settings</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-green-500">✓</span>
                            <span>Respect <code className="bg-gray-100 px-1 rounded">prefers-reduced-motion</code> for any animations</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-green-500">✓</span>
                            <span>Maintain sufficient color contrast (WCAG 2.1 AA minimum)</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-green-500">✓</span>
                            <span>Don&apos;t force fixed widths—let text reflow on different screens</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-green-500">✓</span>
                            <span>Store user preferences locally (localStorage) for persistence</span>
                        </li>
                    </ul>
                </section>

                {/* GitHub */}
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">Open Source</h2>
                    <p className="text-gray-600 mb-6">
                        LexiCipher is open source. View the code, report issues, or contribute on GitHub.
                    </p>
                    <a
                        href="https://github.com/lexicipher/lexicipher-org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
                    >
                        View on GitHub
                    </a>
                </div>
            </div>
        </main>
    );
}