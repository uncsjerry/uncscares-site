import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | UNCS Cares Foundation",
  description:
    "Learn about the UNCS Cares Foundation — our history, mission, and the employee-driven team behind 20+ years of community impact in Broward County.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header with background photo */}
      <section className="relative bg-teal-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80&fit=crop"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* WHY: Teal overlay at 80% keeps header text legible over any photo
            while staying on-brand. */}
        <div className="absolute inset-0 bg-teal-900/80" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            About UNCS Cares Foundation
          </h1>
          <p className="mt-4 text-lg text-teal-100 max-w-2xl">
            An employee-driven 501(c)(3) nonprofit serving Broward County for
            over 20 years.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          {/* Mission */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              UNCS Cares Foundation exists to make the maximum positive effort
              for our community. We focus on serving Broward County families —
              especially those experiencing homelessness — through direct,
              hands-on community programs and annual drives.
            </p>
          </div>

          {/* History */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-6">
              Our History
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              For over two decades, the employees of UNCS have come together
              each year to give back to Broward County. What started as a simple
              desire to help our neighbors has grown into a full foundation with
              seven annual drives spanning every season.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              From Back-to-School supply drives in the summer, to Thanksgiving
              dinners in the fall, to our signature Holiday Bicycle Drive in the
              winter — UNCS employees volunteer their time, energy, and personal
              resources to make each program happen.
            </p>
            <p className="text-gray-600 leading-relaxed">
              In recognition of this sustained commitment, the UNCS Cares
              Foundation was formally established as a 501(c)(3) nonprofit
              organization (EIN #84-4044721) to expand our reach and create a
              lasting vehicle for community impact.
            </p>
          </div>

          {/* Community photo break */}
          <div className="mb-16 relative rounded-2xl overflow-hidden h-64 sm:h-80">
            <Image
              src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200&q=80&fit=crop"
              alt="Volunteers joining hands, representing community unity and service"
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
            {/* WHY: Light teal gradient overlay from bottom gives the
                photo a branded feel without obscuring the subject. */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
          </div>

          {/* What Makes Us Different */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-6">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Employee-Driven",
                  text: "Every drive is organized, funded, and executed by UNCS employees who volunteer their own time.",
                },
                {
                  title: "Hands-On",
                  text: "We don't just write checks. Our team packs backpacks, delivers meals, and assembles bicycles personally.",
                },
                {
                  title: "Local Impact",
                  text: "Every dollar stays in Broward County. We partner with organizations like the Broward Partnership for the Homeless.",
                },
                {
                  title: "Year-Round",
                  text: "With seven annual drives, we're active in every season — not just the holidays.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-warm-50 rounded-xl p-6 border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-teal-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-900 mb-6">
              Our Programs
            </h2>
            <ul className="space-y-3 text-gray-600">
              {[
                "Community Fundraising — organized drives that fund direct assistance",
                "Volunteer Placement Assistance — connecting employees to service opportunities",
                "Workforce Development — supporting families in building stability",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-teal-600 mt-0.5 shrink-0"
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
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-teal-50 rounded-2xl p-8 sm:p-10 text-center border border-teal-100">
            <h2 className="text-2xl font-bold text-teal-900 mb-3">
              Join Our Mission
            </h2>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              Whether you donate, volunteer, or simply spread the word — you
              help us build a stronger Broward County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center px-6 py-3 bg-gold-500 text-white font-semibold rounded-lg hover:bg-gold-400 transition-colors"
              >
                Make a Donation
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
