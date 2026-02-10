import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Disclaimer */}
                <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 inline-block">
                        ⚠️ <strong>LexiCipher.org is NOT a diagnostic tool.</strong> Only qualified professionals can diagnose dyslexia.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                    <Link href="/getting-started" className="text-gray-600 hover:text-blue-600 hover:underline text-sm">
                        Getting Started
                    </Link>
                    <Link href="/about/research" className="text-gray-600 hover:text-blue-600 hover:underline text-sm">
                        Research
                    </Link>
                    <Link href="/privacy" className="text-gray-600 hover:text-blue-600 hover:underline text-sm">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-gray-600 hover:text-blue-600 hover:underline text-sm">
                        Terms of Service
                    </Link>
                    <Link href="/accessibility" className="text-gray-600 hover:text-blue-600 hover:underline text-sm">
                        Accessibility
                    </Link>
                    <a
                        href="https://github.com/lexicipher/lexicipher-org"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600 hover:underline text-sm"
                    >
                        GitHub
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-center text-xs text-gray-500">
                    <p>© {currentYear} LexiCipher.org. Open source under MIT License.</p>
                    <p className="mt-1">
                        Fonts: OpenDyslexic (SIL OFL) • Roboto Flex (Apache 2.0)
                    </p>
                </div>
            </div>
        </footer>
    );
}