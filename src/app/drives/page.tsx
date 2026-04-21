import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Annual Drives | UNCS Cares Foundation",
  description:
    "Learn about our year-round community drives supporting Broward County families — from Back to School supplies to Holiday Bicycles.",
};

const drives = [
  {
    name: "Back to School Drive",
    season: "Summer",
    amount: "$50",
    description:
      "Every child deserves to start the school year prepared. Our Back to School Drive provides children without stable housing a backpack filled with all the necessary school supplies they need to succeed.",
    impact: "Backpacks with full school supplies for children in need",
    icon: "🎒",
  },
  {
    name: "4EveryKid & Soles4Souls Drive",
    season: "Summer",
    amount: "Any amount",
    description:
      "Led by Rita Case, this initiative ensures homeless youth entering the school year receive brand new athletic shoes. Every child deserves to walk into school with confidence.",
    impact: "New athletic shoes for homeless youth",
    icon: "👟",
  },
  {
    name: "Destination Dorm",
    season: "Spring",
    amount: "$25",
    description:
      "Graduating seniors experiencing homelessness face a unique challenge — starting college without the basics. Destination Dorm equips them with college essentials to set them up for success.",
    impact: "College essentials for graduating seniors",
    icon: "🎓",
  },
  {
    name: "Thanksgiving Dinner Drive",
    season: "Fall",
    amount: "$250",
    description:
      "No family should go without a holiday meal. Our Thanksgiving Dinner Drive provides complete holiday dinners to families served by the Broward Partnership for the Homeless.",
    impact: "Complete Thanksgiving meals for families",
    icon: "🍽️",
  },
  {
    name: "Holiday Bicycle Drive",
    season: "Winter",
    amount: "$350",
    description:
      "Our signature drive. A donation of $350 ensures a child in Broward County receives a brand new bicycle and helmet this holiday season. It's more than a gift — it's a childhood memory.",
    impact: "New bicycles and helmets for children",
    icon: "🚲",
  },
  {
    name: "7 on 7th Affordable Housing",
    season: "Year-round",
    amount: "Any amount",
    description:
      "Supporting Broward Partnership's housing programs and services. Your donation helps provide stable, affordable housing solutions for individuals and families experiencing homelessness.",
    impact: "Affordable housing support programs",
    icon: "🏠",
  },
  {
    name: "General Fund",
    season: "Year-round",
    amount: "Any amount",
    description:
      "Our General Fund allows us to direct resources where they're needed most. Your contribution supports all of our programs and helps us respond to emerging needs in the community.",
    impact: "Flexible support across all programs",
    icon: "❤️",
  },
];

export default function DrivesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-teal-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Annual Drives &amp; Programs
          </h1>
          <p className="mt-4 text-lg text-teal-100 max-w-2xl">
            Throughout the year, UNCS employees organize and run drives that
            directly serve Broward County families. Every drive is hands-on and
            community-driven.
          </p>
        </div>
      </section>

      {/* Drive Cards */}
      <section className="bg-warm-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid gap-8">
            {drives.map((drive) => (
              <div
                key={drive.name}
                className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6"
              >
                <div className="text-4xl sm:text-5xl shrink-0">{drive.icon}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-teal-900">
                      {drive.name}
                    </h2>
                    <span className="inline-block text-xs font-medium uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full">
                      {drive.season}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {drive.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-sm text-gray-500">
                      Starting at{" "}
                      <span className="text-lg font-bold text-teal-700">
                        {drive.amount}
                      </span>
                    </span>
                    <Link
                      href="/donate"
                      className="inline-flex items-center px-5 py-2 bg-gold-500 text-white text-sm font-semibold rounded-lg hover:bg-gold-400 transition-colors"
                    >
                      Donate to This Drive
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
