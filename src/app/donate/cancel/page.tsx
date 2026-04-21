import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donation Cancelled | UNCS Cares Foundation",
};

export default function DonationCancel() {
  return (
    <section className="bg-warm-50 min-h-[60vh] flex items-center">
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-3">
            Donation Cancelled
          </h1>
          <p className="text-gray-600 leading-relaxed mb-8">
            No worries — no charge was made. If you&apos;d like to try again or
            have questions, we&apos;re here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-6 py-3 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-400 transition-colors"
            >
              Try Again
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-teal-200 text-teal-700 font-medium rounded-lg hover:bg-teal-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
