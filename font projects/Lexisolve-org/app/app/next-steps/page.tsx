import Link from 'next/link';

export const metadata = {
    title: 'Next Steps | Lexisolve',
    description: 'Learn how to use your personalized reading settings everywhere.',
};

const nextStepsCards = [
    {
        title: 'LexiView',
        emoji: '📱',
        color: 'blue',
        description: 'Read anything right now in your browser. Use your camera to scan physical text or paste any content to read with your optimized settings.',
        href: '/next-steps/lexiview',
    },
    {
        title: 'LexiPage',
        emoji: '🌐',
        color: 'green',
        description: 'Apply your settings to any website automatically with our Chrome extension. Import your settings once and browse the web with improved readability.',
        href: '/next-steps/lexipage',
    },
    {
        title: 'Install the Font',
        emoji: '📄',
        color: 'purple',
        description: 'Use Lexisolve in Word, Google Docs, eBooks, Kindle, and other applications. Install the font on your device for system-wide access.',
        href: '/next-steps/install-font',
    },
    {
        title: 'For Developers',
        emoji: '💻',
        color: 'orange',
        description: 'Integrate Lexisolve into your website or application. Use our CSS exports or implement custom accessibility features.',
        href: '/next-steps/developers',
    },
];

const colorStyles: Record<string, { bg: string; border: string; iconBg: string; iconText: string; buttonBg: string; buttonHover: string }> = {
    blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        iconBg: 'bg-blue-100',
        iconText: 'text-blue-600',
        buttonBg: 'bg-blue-600',
        buttonHover: 'hover:bg-blue-700',
    },
    green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        iconBg: 'bg-green-100',
        iconText: 'text-green-600',
        buttonBg: 'bg-green-600',
        buttonHover: 'hover:bg-green-700',
    },
    purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        iconBg: 'bg-purple-100',
        iconText: 'text-purple-600',
        buttonBg: 'bg-purple-600',
        buttonHover: 'hover:bg-purple-700',
    },
    orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        iconBg: 'bg-orange-100',
        iconText: 'text-orange-600',
        buttonBg: 'bg-orange-600',
        buttonHover: 'hover:bg-orange-700',
    },
};

export default function NextStepsPage() {
    return (
        <main className="min-h-screen bg-cream py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-4xl font-bold text-dark-blue">
                        Use Your Results
                    </h1>
                    <p className="text-xl text-gray-600">
                        Choose how you want to apply your personalized reading settings.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {nextStepsCards.map((card) => {
                        const styles = colorStyles[card.color];
                        return (
                            <div
                                key={card.title}
                                className={`${styles.bg} ${styles.border} border-2 rounded-xl p-6 flex flex-col`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 ${styles.iconBg} ${styles.iconText} rounded-full flex items-center justify-center text-2xl`}>
                                        {card.emoji}
                                    </div>
                                    <h2 className="text-2xl font-semibold text-dark-blue">
                                        {card.title}
                                    </h2>
                                </div>
                                <p className="text-gray-600 mb-6 flex-grow">
                                    {card.description}
                                </p>
                                <Link
                                    href={card.href}
                                    className={`${styles.buttonBg} ${styles.buttonHover} text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center`}
                                >
                                    Learn More
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Tips */}
                <section className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-semibold text-amber-900 mb-4">
                        💡 Tips for Best Results
                    </h2>
                    <ul className="space-y-2 text-amber-800">
                        <li>• Your settings may need slight adjustment for different screen sizes</li>
                        <li>• Retest if your reading environment changes significantly</li>
                        <li>• Results can change over time—consider retesting annually</li>
                        <li>• Combine with proper lighting and screen distance for best results</li>
                    </ul>
                </section>

                {/* Footer Links */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/test"
                        className="inline-block bg-dark-blue text-cream px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors text-center"
                    >
                        Take Another Test
                    </Link>
                    <Link
                        href="/"
                        className="inline-block border-2 border-dark-blue text-dark-blue px-8 py-4 rounded-lg font-semibold hover:bg-dark-blue hover:text-cream transition-colors text-center"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}