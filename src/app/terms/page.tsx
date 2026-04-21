import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | UNCS Cares Foundation",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-teal-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Terms &amp; Conditions
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
                By accessing and using the UNCS Cares Foundation website
                (uncscares.org), you agree to be bound by these Terms &amp;
                Conditions. If you do not agree, please do not use this website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                About UNCS Cares Foundation
              </h2>
              <p className="text-gray-600 leading-relaxed">
                UNCS Cares Foundation is a 501(c)(3) tax-exempt nonprofit
                organization (EIN #84-4044721) based in Fort Lauderdale,
                Florida. We are an employee-driven charitable organization
                dedicated to serving Broward County families through community
                drives and programs.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Donations
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  All donations made through this website are voluntary
                  contributions to UNCS Cares Foundation.
                </li>
                <li>
                  Donations are tax-deductible to the extent permitted by law.
                  No goods or services are provided in exchange for donations
                  unless otherwise stated.
                </li>
                <li>
                  Donations are processed securely through Stripe and are
                  subject to Stripe&apos;s{" "}
                  <a
                    href="https://stripe.com/legal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 underline hover:text-teal-900"
                  >
                    Terms of Service
                  </a>
                  .
                </li>
                <li>
                  You will receive an email confirmation and receipt for each
                  donation. This receipt may be used for tax purposes.
                </li>
                <li>
                  While you may designate a donation to a specific fund or
                  drive, UNCS Cares Foundation reserves the right to redirect
                  funds to the area of greatest need if the designated program
                  is fully funded or discontinued.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Refund Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Donations are generally non-refundable. However, if a donation
                was made in error (e.g., duplicate charge, incorrect amount), we
                will work with you to resolve the issue. Please contact us
                within 30 days at{" "}
                <a
                  href="mailto:support@uncscares.org"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  support@uncscares.org
                </a>{" "}
                for refund requests. See our full{" "}
                <a
                  href="/refund-policy"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  Refund Policy
                </a>{" "}
                for details.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Use of Website
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  This website is provided for informational and donation
                  purposes. You agree to use it only for lawful purposes.
                </li>
                <li>
                  You may not use automated systems (bots, scrapers) to access
                  the website without our written permission.
                </li>
                <li>
                  You may not attempt to gain unauthorized access to any portion
                  of the website or its systems.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Intellectual Property
              </h2>
              <p className="text-gray-600 leading-relaxed">
                All content on this website — including text, images, logos, and
                design — is the property of UNCS Cares Foundation or its
                licensors and is protected by copyright and trademark laws. You
                may not reproduce, distribute, or create derivative works from
                this content without our written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Tax-Deductibility Disclaimer
              </h2>
              <p className="text-gray-600 leading-relaxed">
                UNCS Cares Foundation is recognized by the Internal Revenue
                Service as a 501(c)(3) tax-exempt organization. Contributions
                are tax-deductible to the fullest extent permitted by law. No
                goods or services were provided in exchange for your
                contribution unless otherwise noted in your donation receipt.
                Please consult your tax advisor regarding the deductibility of
                your contribution.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Disclaimer of Warranties
              </h2>
              <p className="text-gray-600 leading-relaxed">
                This website is provided &ldquo;as is&rdquo; without warranties
                of any kind, either express or implied. We do not guarantee that
                the website will be uninterrupted, error-free, or free of
                viruses or other harmful components.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Limitation of Liability
              </h2>
              <p className="text-gray-600 leading-relaxed">
                To the fullest extent permitted by law, UNCS Cares Foundation
                shall not be liable for any indirect, incidental, or
                consequential damages arising from your use of this website or
                any donation made through it.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Governing Law
              </h2>
              <p className="text-gray-600 leading-relaxed">
                These Terms &amp; Conditions are governed by the laws of the
                State of Florida. Any disputes shall be resolved in the courts
                of Broward County, Florida.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Changes to These Terms
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We reserve the right to update these Terms &amp; Conditions at
                any time. Changes will be posted on this page with a revised
                effective date. Continued use of the website constitutes
                acceptance of the updated terms.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Contact Us
              </h2>
              <p className="text-gray-600 leading-relaxed">
                For questions about these terms, please contact:
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
