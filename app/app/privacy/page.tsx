import DeleteDataButton from "@/components/DeleteDataButton";

export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: January 26, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <p className="mb-4">
          Lexisolve.org (&quot;we&quot;, &quot;our&quot;, or &quot;the platform&quot;) is committed to protecting your privacy.
          This policy explains what information we collect, how we use it, and your rights regarding your data.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
          <p className="font-semibold">Important Notice</p>
          <p>
            Lexisolve.org is <strong>NOT a HIPAA-covered entity</strong>. We do not provide medical services,
            store medical records, or accept health insurance. However, we voluntarily apply privacy-by-design
            principles to protect your data.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">What We Collect</h2>
        <h3 className="text-lg font-medium mb-2">Required Information</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Age range or grade level (to select appropriate reading passages)</li>
          <li>Consent acknowledgment</li>
          <li>Test responses (your ratings of font samples)</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Optional Information</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Diagnosis status (if you choose to share)</li>
          <li>Reading preferences and current accommodations</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">What We Do NOT Collect</h3>
        <ul className="list-disc pl-6">
          <li>Your name</li>
          <li>Your email address (unless you create an optional account)</li>
          <li>Your physical address</li>
          <li>Any personally identifiable information (PII)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How We Store Your Data</h2>
        <p className="mb-4">
          <strong>All test data is stored locally in your browser</strong> using localStorage.
          Your data is never transmitted to our servers in the MVP version of this platform.
        </p>
        <ul className="list-disc pl-6">
          <li><strong>Session data:</strong> Stored in your browser only</li>
          <li><strong>Custom font files:</strong> Generated in your browser, downloaded to your device</li>
          <li><strong>Automatic expiry:</strong> Sessions expire after 7 days of inactivity</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">How We Use Your Data</h2>
        <ul className="list-disc pl-6">
          <li>To provide personalized font recommendations</li>
          <li>To generate your custom font file</li>
          <li>To improve the testing experience during your session</li>
        </ul>
        <p className="mt-4">
          <strong>We do NOT:</strong>
        </p>
        <ul className="list-disc pl-6">
          <li>Sell your data to third parties</li>
          <li>Share your data with advertisers</li>
          <li>Use your data for marketing without explicit consent</li>
          <li>Link your results to any medical diagnosis</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <p className="mb-4">
          We use privacy-first analytics that do not track individual users or use cookies.
          We only collect aggregate, anonymous data such as:
        </p>
        <ul className="list-disc pl-6">
          <li>Total page views</li>
          <li>Completion rates (what percentage of users finish testing)</li>
          <li>General geographic region (country level only)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Rights</h2>
        <h3 className="text-lg font-medium mb-2">Delete Your Data</h3>
        <p className="mb-4">
          You can delete all your data at any time using the button below. This will:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Clear all localStorage data</li>
          <li>Remove any cookies</li>
          <li>Reset your session completely</li>
        </ul>
        <div className="mb-4">
          <DeleteDataButton />
        </div>

        <h3 className="text-lg font-medium mb-2">Data Portability</h3>
        <p>
          You can download your results as a PDF report, which you own and control.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Children&apos;s Privacy (COPPA)</h2>
        <p className="mb-4">
          Users under 13 years of age must use this platform with a parent or guardian present.
          We do not knowingly collect personal information from children under 13 without
          parental consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
        <p className="mb-4">
          <strong>Hosting:</strong> Our platform is hosted on Vercel, which is SOC 2 Type II compliant.
        </p>
        <p>
          <strong>Fonts:</strong> We use open-source fonts (OpenDyslexic under SIL OFL, Roboto Flex under
          Apache 2.0) which do not collect any user data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. We will notify users of any
          significant changes by posting a notice on the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <p>
          If you have questions about this privacy policy, please contact us through our
          GitHub repository or the contact form on this website.
        </p>
      </section>
    </main>
  );
}