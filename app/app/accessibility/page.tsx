export default function AccessibilityStatement() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Accessibility Statement</h1>
      <p className="text-sm text-gray-500 mb-8">Last Updated: January 26, 2026</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Our Commitment</h2>
        <p className="mb-4">
          Lexisolve.org is committed to ensuring digital accessibility for people with disabilities.
          We are continually improving the user experience for everyone and applying the relevant
          accessibility standards.
        </p>
        <p>
          Given that our platform is specifically designed to help individuals with dyslexia and
          reading difficulties, accessibility is not just a feature—it is central to our mission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Conformance Status</h2>
        <p className="mb-4">
          We aim to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
          These guidelines explain how to make web content more accessible for people with disabilities.
        </p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="font-semibold">Target Standards</p>
          <ul className="list-disc pl-6 mt-2">
            <li>WCAG 2.1 Level AA (primary target)</li>
            <li>WCAG 2.1 Level AAA (where feasible)</li>
            <li>Section 508 of the Rehabilitation Act</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
        <p className="mb-4">We have implemented the following accessibility features:</p>

        <h3 className="text-lg font-medium mb-2">Navigation & Interaction</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Full keyboard navigation support throughout the site</li>
          <li>Clear focus indicators on interactive elements</li>
          <li>Skip-to-content link for screen reader users</li>
          <li>Logical tab order and heading structure</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Visual Design</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Color contrast ratios meeting WCAG AA standards (4.5:1 minimum)</li>
          <li>Text is resizable up to 200% without loss of functionality</li>
          <li>No content relies solely on color to convey information</li>
          <li>No flashing or strobing content</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Content & Typography</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Clear, simple language throughout</li>
          <li>Dyslexia-friendly default typography options</li>
          <li>Customizable text size and spacing in the testing interface</li>
          <li>Sufficient line height and letter spacing</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Screen Reader Support</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Semantic HTML structure with proper landmarks</li>
          <li>ARIA labels where appropriate</li>
          <li>Alternative text for images and icons</li>
          <li>Form labels and error messages are programmatically associated</li>
        </ul>

        <h3 className="text-lg font-medium mb-2">Testing Interface</h3>
        <ul className="list-disc pl-6">
          <li>Large touch targets (minimum 44x44 pixels)</li>
          <li>No time limits on reading or responding</li>
          <li>Progress saved automatically to prevent data loss</li>
          <li>Clear progress indicators</li>
          <li>Optional breaks built into the testing flow</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Known Limitations</h2>
        <p className="mb-4">
          While we strive for full accessibility, some limitations may exist:
        </p>
        <ul className="list-disc pl-6">
          <li>
            <strong>Font preview rendering:</strong> Custom font previews may not be fully
            accessible to screen readers. We provide text descriptions of typography settings.
          </li>
          <li>
            <strong>PDF downloads:</strong> Generated PDF reports may have limited accessibility
            features. We recommend using the on-screen results for screen reader users.
          </li>
          <li>
            <strong>Third-party content:</strong> Some embedded content from external sources
            may not meet our accessibility standards.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Assistive Technology Compatibility</h2>
        <p className="mb-4">
          Lexisolve.org is designed to be compatible with the following assistive technologies:
        </p>
        <ul className="list-disc pl-6">
          <li>Screen readers (NVDA, JAWS, VoiceOver, TalkBack)</li>
          <li>Screen magnification software</li>
          <li>Speech recognition software</li>
          <li>Keyboard-only navigation</li>
          <li>Browser zoom and text resizing features</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Testing Methods</h2>
        <p className="mb-4">We evaluate accessibility through:</p>
        <ul className="list-disc pl-6">
          <li>Automated testing tools (Lighthouse, axe DevTools)</li>
          <li>Manual testing with keyboard navigation</li>
          <li>Screen reader testing (VoiceOver, NVDA)</li>
          <li>Color contrast analysis</li>
          <li>User feedback from people with disabilities</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Feedback & Contact</h2>
        <p className="mb-4">
          We welcome your feedback on the accessibility of Lexisolve.org. Please let us know
          if you encounter accessibility barriers:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>GitHub Issues:</strong> Report accessibility issues on our{" "}
            <a
              href="https://github.com/lexisolve/lexisolve-org/issues"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>
          </li>
          <li>
            <strong>Email:</strong> Contact us through the contact form on this website
          </li>
        </ul>
        <p>
          We aim to respond to accessibility feedback within 5 business days and to
          resolve issues as quickly as possible.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Continuous Improvement</h2>
        <p>
          Accessibility is an ongoing effort. We regularly review and improve our platform
          to ensure it remains accessible to all users. This statement is reviewed and
          updated at least annually, or when significant changes are made to the platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Related Resources</h2>
        <ul className="list-disc pl-6">
          <li>
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </li>
          <li>
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>
          </li>
          <li>
            <a
              href="https://www.w3.org/WAI/standards-guidelines/wcag/"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WCAG 2.1 Guidelines (W3C)
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}