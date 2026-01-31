import Link from 'next/link';

export const metadata = {
    title: 'Research | Lexisolve',
    description: 'The scientific research behind Lexisolve typography optimization for dyslexia.',
};

interface Citation {
    authors: string;
    year: number;
    title: string;
    publication: string;
    doi: string;
    keyFinding: string;
    howWeUseIt: string;
}

const citations: Citation[] = [
    {
        authors: 'Zorzi, M., Barbiero, C., Facoetti, A., et al.',
        year: 2012,
        title: 'Extra-large letter spacing improves reading in dyslexia',
        publication: 'Proceedings of the National Academy of Sciences (PNAS), 109(28), 11455-11459',
        doi: '10.1073/pnas.1205566109',
        keyFinding: 'Extra-large letter spacing (+2.5 standard) improved reading speed by ~20% in dyslexic children without decreasing accuracy.',
        howWeUseIt: 'We test letter spacing from -10% to +40% as one of our primary optimization factors.',
    },
    {
        authors: 'Schneps, M. H., Thomson, J. M., Chen, C., et al.',
        year: 2013,
        title: 'E-readers are more effective than paper for some with dyslexia',
        publication: 'PLOS ONE, 8(9), e75634',
        doi: '10.1371/journal.pone.0075634',
        keyFinding: 'Reading on screens with optimized line spacing showed ~27% improvement in reading speed for dyslexic participants.',
        howWeUseIt: 'We test line height from 100% to 200% and validate that screen-based testing is effective.',
    },
    {
        authors: 'Rello, L., & Baeza-Yates, R.',
        year: 2013,
        title: 'Good fonts for dyslexia',
        publication: 'ACM SIGACCESS Conference on Computers and Accessibility (ASSETS \'13)',
        doi: '10.1145/2513383.2513447',
        keyFinding: 'Larger font sizes (14-18pt) performed better. No single "best" font—preferences varied significantly between individuals.',
        howWeUseIt: 'We default to 16pt and test a range, recognizing that personalization matters more than one-size-fits-all.',
    },
    {
        authors: 'Marinus, E., Mostard, M., Segers, E., et al.',
        year: 2016,
        title: 'A special font for people with dyslexia: Does it work and, if so, why?',
        publication: 'Dyslexia, 22(3), 233-244',
        doi: '10.1002/dys.1527',
        keyFinding: 'Word spacing (not unique letterforms) drove reading improvements in "dyslexia fonts." Spacing modifications may be more impactful than shape changes.',
        howWeUseIt: 'We include word spacing as a primary factor and focus on spacing optimization alongside font features.',
    },
    {
        authors: 'Martelli, M., Di Filippo, G., Spinelli, D., & Zoccolotti, P.',
        year: 2009,
        title: 'Crowding, reading, and developmental dyslexia',
        publication: 'Journal of Vision, 9(4), 14',
        doi: '10.1167/9.4.14',
        keyFinding: 'Dyslexic readers show larger "crowding" effects—letters are harder to identify when flanked by other letters.',
        howWeUseIt: 'This explains WHY spacing interventions work: they reduce visual crowding interference.',
    },
    {
        authors: 'Perea, M., Panadero, V., Moret-Tatay, C., & Gómez, P.',
        year: 2012,
        title: 'The effects of inter-letter spacing in visual-word recognition',
        publication: 'Learning and Instruction, 22(6), 420-430',
        doi: '10.1016/j.learninstruc.2012.04.001',
        keyFinding: 'Increased letter spacing benefited dyslexic readers more than typical readers in word recognition tasks.',
        howWeUseIt: 'Cross-validates the Zorzi findings and supports our letter spacing optimization range.',
    },
];

export default function ResearchPage() {
    return (
        <main className="min-h-screen bg-cream py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="text-center space-y-4 mb-12">
                    <h1 className="text-4xl font-bold text-dark-blue">
                        The Science Behind Lexisolve
                    </h1>
                    <p className="text-xl text-gray-600">
                        Our approach is built on peer-reviewed research in typography, visual perception, and reading science.
                    </p>
                </div>

                {/* Summary Card */}
                <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-semibold text-blue-900 mb-3">
                        📊 Key Research Findings
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="bg-white p-4 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600">~20%</div>
                            <div className="text-sm text-gray-600">Speed improvement from letter spacing</div>
                            <div className="text-xs text-gray-400 mt-1">Zorzi et al., 2012</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600">~27%</div>
                            <div className="text-sm text-gray-600">Speed improvement from line spacing</div>
                            <div className="text-xs text-gray-400 mt-1">Schneps et al., 2013</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600">Varies</div>
                            <div className="text-sm text-gray-600">Individual preferences differ</div>
                            <div className="text-xs text-gray-400 mt-1">Rello et al., 2013</div>
                        </div>
                    </div>
                </section>

                {/* Our Methodology */}
                <section className="bg-white rounded-xl p-8 shadow-sm mb-8">
                    <h2 className="text-2xl font-semibold text-dark-blue mb-4">
                        🔬 Our Testing Methodology
                    </h2>
                    <div className="space-y-4 text-gray-700">
                        <p>
                            Lexisolve uses <strong>Design of Experiments (DOE)</strong>, a statistical methodology
                            developed for industrial quality improvement, to efficiently identify which typography
                            factors affect your reading comfort.
                        </p>
                        <p>
                            Instead of testing every possible combination (which would require 128 trials for our
                            7 factors), DOE uses a structured approach that captures main effects and key interactions
                            in just 16 comparisons.
                        </p>
                        <p>
                            Our passages are <strong>calibrated using Flesch-Kincaid readability scores</strong> to
                            ensure consistent difficulty. Each grade level uses passages calibrated to 2 years below
                            the reader&apos;s level, creating comfortable but engaging reading material.
                        </p>
                    </div>
                </section>

                {/* Citations */}
                <section className="space-y-6 mb-12">
                    <h2 className="text-2xl font-semibold text-dark-blue text-center">
                        📚 Research Citations
                    </h2>

                    {citations.map((citation, index) => (
                        <article key={index} className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-dark-blue">
                                    {citation.title}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {citation.authors} ({citation.year})
                                    <br />
                                    <em>{citation.publication}</em>
                                </p>

                                <div className="bg-green-50 p-3 rounded-lg">
                                    <div className="text-sm font-medium text-green-800 mb-1">Key Finding:</div>
                                    <p className="text-sm text-green-700">{citation.keyFinding}</p>
                                </div>

                                <div className="bg-blue-50 p-3 rounded-lg">
                                    <div className="text-sm font-medium text-blue-800 mb-1">How We Use It:</div>
                                    <p className="text-sm text-blue-700">{citation.howWeUseIt}</p>
                                </div>

                                <a
                                    href={`https://doi.org/${citation.doi}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    DOI: {citation.doi} →
                                </a>
                            </div>
                        </article>
                    ))}
                </section>

                {/* CTA */}
                <div className="text-center space-y-4">
                    <Link
                        href="/getting-started"
                        className="inline-block bg-dark-blue text-cream px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
                    >
                        Learn How the Test Works
                    </Link>
                    <p className="text-gray-500">
                        <Link href="/test" className="text-blue-600 hover:underline">
                            Or start your test now →
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}