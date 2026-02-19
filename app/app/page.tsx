import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-1 flex-col items-center justify-center px-8 pb-8 pt-4">
        <div className="max-w-3xl text-center space-y-6">
          {/* Hero */}
          <p className="text-xl md:text-2xl text-gray-700">
            Discover your optimal reading configuration through guided testing
          </p>
          <p className="text-lg text-gray-600">
            Get a custom font file personalized for{" "}
            <strong>your unique visual processing</strong>
          </p>

          {/* CTA */}
          <div className="pt-4">
            <Link
              href="/test"
              className="inline-block bg-dark-blue text-cream px-8 py-4 rounded-lg text-xl font-semibold hover:bg-opacity-90 transition-colors"
            >
              Start Free Test
            </Link>
            <p className="mt-2 text-sm text-gray-500">~15-20 minutes</p>
            <p className="mt-3 text-sm">
              <Link href="/next-steps" className="text-blue-600 hover:underline">
                Already have your settings? See Next Steps →
              </Link>
            </p>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-2">🔬</div>
              <h3 className="font-semibold mb-1">Science-Based</h3>
              <p className="text-sm text-gray-600">
                Uses Design of Experiments (DOE) methodology
              </p>
              <Link href="/about/research" className="text-xs text-blue-600 hover:underline mt-2 inline-block">
                View research →
              </Link>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-2">👤</div>
              <h3 className="font-semibold mb-1">Personalized</h3>
              <p className="text-sm text-gray-600">
                Custom font based on YOUR preferences
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-sm">
              <div className="text-3xl mb-2">💾</div>
              <h3 className="font-semibold mb-1">Downloadable</h3>
              <p className="text-sm text-gray-600">
                Get an OTF/TTF file to use anywhere
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            <strong>Important:</strong> This tool is NOT a diagnostic tool for
            dyslexia. It helps discover typographic preferences that may improve
            reading comfort.
          </div>
        </div>
      </main>
    </div>
  );
}
