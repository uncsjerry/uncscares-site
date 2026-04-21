import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | UNCS Cares Foundation",
};

export default function PrivacyPolicy() {
  return (
    <>
      <section className="bg-teal-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-teal-100">
            Last updated: April 21, 2026
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="prose prose-gray max-w-none space-y-8">
            <div>
              <p className="text-gray-600 leading-relaxed">
                UNCS Cares Foundation (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
                &ldquo;our&rdquo;) is committed to protecting the privacy of
                our donors, volunteers, and website visitors. This Privacy
                Policy explains how we collect, use, and safeguard your
                information when you visit uncscares.org or make a donation.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Information We Collect
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We may collect the following types of information:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Personal information you provide:</strong> Name, email
                  address, mailing address, and phone number when you make a
                  donation, sign up for updates, or contact us.
                </li>
                <li>
                  <strong>Payment information:</strong> Credit card and billing
                  details are processed securely by our third-party payment
                  processor, Stripe. We do not store your full credit card
                  number on our servers.
                </li>
                <li>
                  <strong>Usage data:</strong> We may collect anonymous
                  information about how you interact with our website, including
                  pages visited, time spent, and referring URLs.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>To process and acknowledge your donations</li>
                <li>To provide tax receipts and year-end giving statements</li>
                <li>
                  To communicate with you about our programs, events, and drives
                  (only if you opt in)
                </li>
                <li>To respond to your inquiries</li>
                <li>To improve our website and services</li>
                <li>
                  To comply with legal obligations, including IRS reporting
                  requirements for 501(c)(3) organizations
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Information Sharing
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We do not sell, trade, or rent your personal information to
                third parties. We may share information only in the following
                circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
                <li>
                  <strong>Payment processing:</strong> Stripe processes your
                  payment information in accordance with their{" "}
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 underline hover:text-teal-900"
                  >
                    Privacy Policy
                  </a>
                  .
                </li>
                <li>
                  <strong>Legal requirements:</strong> When required by law,
                  regulation, or legal process.
                </li>
                <li>
                  <strong>With your consent:</strong> When you have given us
                  explicit permission.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Data Security
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We implement reasonable administrative, technical, and physical
                safeguards to protect your personal information. All donation
                transactions are encrypted using SSL/TLS technology and
                processed through Stripe&apos;s PCI-DSS compliant
                infrastructure. However, no method of electronic transmission or
                storage is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Donor Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We respect the privacy of our donors. Donor information —
                including names, addresses, donation amounts, and giving history
                — is kept confidential and is not shared publicly unless the
                donor provides explicit written consent. Anonymous donations are
                honored as such.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Cookies
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our website may use cookies and similar technologies to improve
                your browsing experience. You may disable cookies through your
                browser settings, though some features of the website may not
                function properly without them.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Your Rights
              </h2>
              <p className="text-gray-600 leading-relaxed">
                You may request to review, update, or delete your personal
                information at any time by contacting us. You may also opt out
                of email communications by using the unsubscribe link in any
                email or by contacting us directly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Children&apos;s Privacy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Our website is not directed at children under 13. We do not
                knowingly collect personal information from children under 13.
                If we become aware that we have collected such information, we
                will take steps to delete it promptly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Changes to This Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this Privacy Policy from time to time. Changes
                will be posted on this page with an updated effective date. We
                encourage you to review this policy periodically.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you have questions about this Privacy Policy or how your
                information is handled, please contact us:
              </p>
              <address className="not-italic text-gray-600 mt-3 space-y-1">
                <p>UNCS Cares Foundation</p>
                <p>1471 NE 26th Street, Second Floor</p>
                <p>Fort Lauderdale, FL 33305</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:support@uncscares.org"
                    className="text-teal-700 underline hover:text-teal-900"
                  >
                    support@uncscares.org
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href="tel:+19545243325"
                    className="text-teal-700 underline hover:text-teal-900"
                  >
                    (954) 524-3325
                  </a>
                </p>
              </address>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
