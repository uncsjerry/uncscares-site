import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Annual Drives | UNCS Cares Foundation",
  description:
    "Learn about our year-round community drives supporting Broward County families — from Back to School supplies to Holiday Bicycles.",
};

/* WHY: Unsplash URLs with width params sized for the card layout.
   All images are free-to-use under the Unsplash License. */
const DRIVE_IMAGES = {
  backToSchool: "/images/backpack-drive-2026.png",
  shoes:
    "https://images.unsplash.com/photo-1631491540202-8bcabf87f842?w=400&q=80&fit=crop",
  graduation:
    "https://images.unsplash.com/photo-1686213011418-e0caa4aef2c1?w=400&q=80&fit=crop",
  thanksgiving:
    "https://images.unsplash.com/photo-1633611609127-ed2b72bdf27e?w=400&q=80&fit=crop",
  bicycles:
    "https://images.unsplash.com/photo-1518771109721-6dbe1116cfee?w=400&q=80&fit=crop",
  housing:
    "https://images.unsplash.com/photo-1770938474402-b605503e1342?w=400&q=80&fit=crop",
  generalFund:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80&fit=crop",
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
    image: DRIVE_IMAGES.backToSchool,
    imageAlt: "Backpack with school supplies ready for a new school year",
  },
  {
    name: "4EveryKid & Soles4Souls Drive",
    season: "Summer",
    amount: "Any amount",
    description:
      "Led by Rita Case, this initiative ensures homeless youth entering the school year receive brand new athletic shoes. Every child deserves to walk into school with confidence.",
    impact: "New athletic shoes for homeless youth",
    icon: "👟",
    image: DRIVE_IMAGES.shoes,
    imageAlt: "New athletic sneakers for kids",
  },
  {
    name: "Destination Dorm",
    season: "Spring",
    amount: "$25",
    description:
      "Graduating seniors experiencing homelessness face a unique challenge — starting college without the basics. Destination Dorm equips them with college essentials to set them up for success.",
    impact: "College essentials for graduating seniors",
    icon: "🎓",
    image: DRIVE_IMAGES.graduation,
    imageAlt: "College students celebrating at graduation",
  },
  {
    name: "Thanksgiving Dinner Drive",
    season: "Fall",
    amount: "$250",
    description:
      "No family should go without a holiday meal. Our Thanksgiving Dinner Drive provides complete holiday dinners to families served by the Broward Partnership for the Homeless.",
    impact: "Complete Thanksgiving meals for families",
    icon: "🍽️",
    image: DRIVE_IMAGES.thanksgiving,
    imageAlt: "Family gathered for a Thanksgiving meal",
  },
  {
    name: "Holiday Bicycle Drive",
    season: "Winter",
    amount: "$350",
    description:
      "Our signature drive. A donation of $350 ensures a child in Broward County receives a brand new bicycle and helmet this holiday season. It's more than a gift — it's a childhood memory.",
    impact: "New bicycles and helmets for children",
    icon: "🚲",
    image: DRIVE_IMAGES.bicycles,
    imageAlt: "Child happily riding a bicycle outdoors",
  },
  {
    name: "7 on 7th Affordable Housing",
    season: "Year-round",
    amount: "Any amount",
    description:
      "Supporting Broward Partnership's housing programs and services. Your donation helps provide stable, affordable housing solutions for individuals and families experiencing homelessness.",
    impact: "Affordable housing support programs",
    icon: "🏠",
    image: DRIVE_IMAGES.housing,
    imageAlt: "Neighborhood housing in a community setting",
  },
  {
    name: "General Fund",
    season: "Year-round",
    amount: "Any amount",
    description:
      "Our General Fund allows us to direct resources where they're needed most. Your contribution supports all of our programs and helps us respond to emerging needs in the community.",
    impact: "Flexible support across all programs",
    icon: "❤️",
    image: DRIVE_IMAGES.generalFund,
    imageAlt: "Volunteers joining hands in community service",
  },
];

export default function DrivesPage() {
  return (
    <>
      {/* Header with background photo */}
      <section className="relative bg-teal-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80&fit=crop"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-teal-900/80" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
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
                className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row overflow-hidden"
              >
                {/* Drive photo thumbnail */}
                <div className="relative w-full sm:w-48 md:w-56 h-48 sm:h-auto shrink-0">
                  <Image
                    src={drive.image}
                    alt={drive.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 224px"
                  />
                </div>
                <div className="flex-1 p-6 sm:p-8">
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
