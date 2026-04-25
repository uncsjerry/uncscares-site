import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Back to School Backpack Drive | UNCS Cares Foundation",
  description:
    "For just $50, send a child back to school with a brand new backpack filled with school supplies. 100% of your donation goes directly to a child in need.",
  openGraph: {
    title: "Back to School Backpack Drive — UNCS Cares Foundation",
    description:
      "Over 5,000 students are experiencing homelessness. Help us ensure every one of them gets a brand new backpack this year.",
    url: "https://uncscares.org/backpack-drive",
    siteName: "UNCS Cares Foundation",
    type: "website",
    images: ["/images/backpack-drive-2026.png"],
  },
};

/* WHY: Tier data duplicated here (not imported from donate page) because
   the donate page is a client component and these are static display values
   for the landing page. Keeping them separate avoids coupling. */
const impactTiers = [
  { backpacks: 25, amount: "$250" },
  { backpacks: 50, amount: "$400" },
  { backpacks: 100, amount: "$800" },
  { backpacks: 250, amount: "$2,000" },
  { backpacks: 500, amount: "$4,000" },
  { backpacks: 1000, amount: "$8,000" },
];

export default function BackpackDrivePage() {
  return (
    <>
      {/* Hero — uses official UNCS marketing image */}
      <section className="relative bg-teal-900 overflow-hidden">
        <Image
          src="/images/backpack-drive-2026.png"
          alt="UNCS Cares 2026 Back to School Backpack Drive — children holding colorful backpacks"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-teal-900/60" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <p className="text-sm uppercase tracking-widest text-gold-400 font-semibold mb-4">
            Summer 2026 Campaign
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Over 5,000 Students
            <br />
            <span className="text-gold-400">Are Experiencing Homelessness</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto leading-relaxed">
            Help us ensure that every student gets a brand new backpack filled
            with school supplies this year. No child should start the school
            year without the tools they need to succeed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-500 text-white text-lg font-bold rounded-lg hover:bg-gold-400 transition-colors shadow-lg"
            >
              Donate Today
            </Link>
            <a
              href="#impact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white text-lg font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              See Your Impact
            </a>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid sm:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-4">
                Every Child Deserves to Start the Year Prepared
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Thousands of children face the first day of
                school without basic supplies. No backpack. No pencils. No
                notebooks. For families experiencing homelessness or financial
                hardship, school supplies are an impossible expense.
              </p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-8 text-center">
              <p className="text-5xl font-bold text-teal-700">5,000+</p>
              <p className="mt-2 text-lg font-medium text-teal-900">
                Students need our help this year
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Every backpack includes notebooks, pencils, pens, folders,
                crayons, scissors, glue, ruler, and more — everything a
                student needs to walk in ready on day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Tiers */}
      <section id="impact" className="bg-warm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-900">
              Multiply Your Impact
            </h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">
              Whether you sponsor one backpack or a thousand, every dollar goes
              directly to a child in need.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {impactTiers.map((tier) => (
              <Link
                key={tier.backpacks}
                href="/donate"
                className="bg-white rounded-xl p-6 text-center border-2 border-gray-100 hover:border-teal-400 hover:shadow-md transition-all group"
              >
                <p className="text-3xl sm:text-4xl font-bold text-teal-700 group-hover:text-teal-600 transition-colors">
                  {tier.backpacks.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-gray-700 mt-1">
                  Backpacks
                </p>
                <p className="text-lg font-bold text-gold-600 mt-3">
                  {tier.amount}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/donate"
              className="inline-flex items-center px-8 py-4 bg-gold-500 text-white text-lg font-bold rounded-lg hover:bg-gold-400 transition-colors shadow-lg"
            >
              Choose Your Impact
            </Link>
          </div>
        </div>
      </section>

      {/* Trust / Tax Info */}
      <section className="bg-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-lg font-bold">501(c)(3) Nonprofit</p>
              <p className="text-sm text-teal-200 mt-1">
                EIN #84-4044721. Your donation is tax-deductible.
              </p>
            </div>
            <div>
              <p className="text-lg font-bold">100% Direct Impact</p>
              <p className="text-sm text-teal-200 mt-1">
                Every dollar funds supplies. UNCS covers all overhead.
              </p>
            </div>
            <div>
              <p className="text-lg font-bold">Employee-Driven</p>
              <p className="text-sm text-teal-200 mt-1">
                Organized and run by UNCS employees who volunteer their time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-warm-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-900">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            School starts soon. Help us make sure every child
            walks in prepared, confident, and ready to learn.
          </p>
          <Link
            href="/donate"
            className="mt-8 inline-flex items-center px-10 py-4 bg-gold-500 text-white text-xl font-bold rounded-lg hover:bg-gold-400 transition-colors shadow-lg"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </>
  );
}
