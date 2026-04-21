import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donation Refund Policy | UNCS Cares Foundation",
};

export default function RefundPolicyPage() {
  return (
    <>
      <section className="bg-teal-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Donation Refund Policy
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
                UNCS Cares Foundation appreciates every donation. We understand
                that mistakes happen, and we want to ensure your giving
                experience is positive. This policy outlines how we handle
                refund requests for donations made through our website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                General Policy
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Donations to UNCS Cares Foundation are generally considered
                final and non-refundable. When you make a donation, those funds
                are directed toward our community programs serving Broward
                County families.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                When We Will Issue a Refund
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                We will gladly process a refund in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Duplicate charges:</strong> If your card was charged
                  more than once for the same donation due to a technical error.
                </li>
                <li>
                  <strong>Incorrect amount:</strong> If you were charged a
                  different amount than what you intended to donate.
                </li>
                <li>
                  <strong>Unauthorized transaction:</strong> If a donation was
                  made without your authorization.
                </li>
                <li>
                  <strong>Technical error:</strong> If a system error caused an
                  unintended charge.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                How to Request a Refund
              </h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                To request a refund, please contact us within <strong>30
                days</strong> of the donation date:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@uncscares.org"
                    className="text-teal-700 underline hover:text-teal-900"
                  >
                    support@uncscares.org
                  </a>{" "}
                  — include your name, donation date, amount, and reason for the
                  request.
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+19545243325"
                    className="text-teal-700 underline hover:text-teal-900"
                  >
                    (954) 524-3325
                  </a>{" "}
                  — Monday through Friday, 9:00 AM to 5:00 PM EST.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Processing Time
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Approved refunds will be processed within 5&ndash;10 business
                days. The refund will be credited to the original payment method
                used for the donation. Depending on your bank or credit card
                company, it may take an additional billing cycle for the refund
                to appear on your statement.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Tax Implications
              </h2>
              <p className="text-gray-600 leading-relaxed">
                If you received a tax receipt for a donation that is
                subsequently refunded, the tax deduction is no longer valid. We
                will issue a corrected receipt if applicable. Please consult
                your tax advisor regarding any implications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-teal-900 mb-3">
                Disputes
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We encourage you to contact us directly before initiating a
                dispute with your bank or credit card company. We are committed
                to resolving any issues promptly and fairly.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-600 leading-relaxed">
                UNCS Cares Foundation is a 501(c)(3) tax-exempt organization
                (EIN #84-4044721). Questions about this policy may be directed
                to{" "}
                <a
                  href="mailto:support@uncscares.org"
                  className="text-teal-700 underline hover:text-teal-900"
                >
                  support@uncscares.org
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
