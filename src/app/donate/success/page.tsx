import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | UNCS Cares Foundation",
};

export default function DonationSuccess() {
  return (
    <section className="bg-warm-50 min-h-[60vh] flex items-center">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-3">
            Thank You for Your Donation!
          </h1>
          <p className="text-gray-600 leading-relaxed mb-2">
            Your generous contribution makes a real difference for families in
            Broward County. A tax receipt will be sent to the email you
            provided at checkout.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            UNCS Cares Foundation is a 501(c)(3) nonprofit. EIN #84-4044721.
            Your donation may be tax-deductible.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/drives"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-200 text-teal-700 font-medium rounded-lg hover:bg-teal-50 transition-colors"
            >
              Explore Our Drives
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
