import Image from "next/image";
import Link from "next/link";

/* ---------- Unsplash image URLs ---------- */
/* WHY: Using Unsplash source URLs with width params for consistent sizing.
   All images are free-to-use under the Unsplash License. */
const IMAGES = {
  hero: "/images/backpack-drive-2026.png", // UNCS Cares official Back to School 2026 marketing image
  backToSchool:
    "/images/backpack-drive-2026.png", // UNCS Cares official Back to School 2026 marketing image
  thanksgiving:
    "https://images.unsplash.com/photo-1633611609127-ed2b72bdf27e?w=600&q=80&fit=crop", // Thanksgiving dinner table
  bicycles:
    "https://images.unsplash.com/photo-1518771109721-6dbe1116cfee?w=600&q=80&fit=crop", // Child riding bicycle
  graduation:
    "https://images.unsplash.com/photo-1686213011418-e0caa4aef2c1?w=600&q=80&fit=crop", // College graduation students
  community:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80&fit=crop", // Volunteers hands together
};

/* ---------- Drive card data ---------- */
const drives = [
  {
    name: "Back to School Drive",
    description:
      "Backpacks filled with school supplies for children without stable housing.",
    amount: "$50",
    icon: "🎒",
    season: "Summer",
    image: IMAGES.backToSchool,
    imageAlt: "Backpack filled with school supplies",
  },
  {
    name: "Thanksgiving Dinner Drive",
    description:
      "Complete holiday meals for families served by Broward Partnership for the Homeless.",
    amount: "$250",
    icon: "🍽️",
    season: "Fall",
    image: IMAGES.thanksgiving,
    imageAlt: "Family gathered around a Thanksgiving dinner table",
  },
  {
    name: "Holiday Bicycle Drive",
    description:
      "Brand new bicycles and helmets for children in Broward County.",
    amount: "$350",
    icon: "🚲",
    season: "Winter",
    image: IMAGES.bicycles,
    imageAlt: "Child happily riding a bicycle",
  },
  {
    name: "Destination Dorm",
    description:
      "College essentials for graduating seniors experiencing homelessness.",
    amount: "$25",
    icon: "🎓",
    season: "Spring",
    image: IMAGES.graduation,
    imageAlt: "College students at graduation ceremony",
  },
];

/* ---------- Impact stats ---------- */
const stats = [
  { value: "20+", label: "Years Serving Broward County" },
  { value: "7", label: "Annual Community Drives" },
  { value: "1,000+", label: "Families Supported Annually" },
  { value: "100%", label: "Employee-Driven Volunteers" },
];

export default function Home() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="bg-teal-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <span className="inline-block text-xs font-bold uppercase tracking-widest bg-gold-500 text-white px-3 py-1.5 rounded-full mb-5">
                Summer 2026 Campaign
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Every Child Deserves to Start the School Year{" "}
                <span className="text-gold-400">Prepared</span>
              </h1>
              <p className="mt-5 text-lg text-teal-100 leading-relaxed">
                Our Back to School Drive provides children without stable housing
                a backpack filled with all the necessary school supplies they
                need to succeed. This year, we need your help more than ever.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/backpack-drive"
                  className="donate-pulse inline-flex items-center justify-center px-8 py-3.5 bg-gold-500 text-white font-semibold rounded-lg text-lg hover:bg-gold-400 transition-colors"
                >
                  Donate Today
                </Link>
                <Link
                  href="/drives"
                  className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-teal-100/30 text-white font-medium rounded-lg text-lg hover:bg-white/10 transition-colors"
                >
                  View All Drives
                </Link>
              </div>
              <p className="mt-5 text-sm text-teal-100/60">
                UNCS Cares Foundation &middot; 501(c)(3) Nonprofit &middot; All
                donations are tax-deductible
              </p>
            </div>

            {/* Right: Featured campaign image */}
            <div className="relative">
              <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
                <Image
                  src={IMAGES.hero}
                  alt="UNCS Cares 2026 Back to School Backpack Drive — children holding colorful backpacks"
                  width={800}
                  height={500}
                  priority
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Floating stat badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-white rounded-lg shadow-lg px-5 py-3 border border-gray-100">
                <p className="text-2xl sm:text-3xl font-bold text-teal-700">
                  5,000+
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  Students Need Our Help
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== IMPACT STATS ========== */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-teal-700">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FEATURED DRIVES ========== */}
      <section className="bg-warm-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-teal-900">
              Our Annual Drives
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Year-round, our team organizes drives that directly support
              Broward County families experiencing homelessness and hardship.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {drives.map((drive) => (
              <div
                key={drive.name}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
              >
                {/* Drive photo */}
                <div className="relative h-40 w-full">
                  <Image
                    src={drive.image}
                    alt={drive.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-medium uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-1 rounded-full mb-3">
                    {drive.season}
                  </span>
                  <h3 className="text-lg font-semibold text-teal-900 mb-2">
                    {drive.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {drive.description}
                  </p>
                  <p className="text-sm font-medium text-teal-700">
                    Starting at{" "}
                    <span className="text-lg font-bold">{drive.amount}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/drives"
              className="inline-flex items-center text-teal-700 font-medium hover:text-teal-900 transition-colors"
            >
              View all drives &amp; programs
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== ABOUT / MISSION ========== */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-teal-900">
                Employee-Driven. Community-Focused.
              </h2>
              <p className="mt-6 text-gray-600 leading-relaxed">
                UNCS Cares Foundation isn&apos;t your typical nonprofit. We&apos;re
                powered by the employees of UNCS who volunteer their time, energy,
                and resources to make a direct impact in our community.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                From packing backpacks for kids heading back to school, to
                delivering Thanksgiving dinners, to putting brand-new bicycles
                under the tree — every drive is hands-on, personal, and
                meaningful.
              </p>
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center px-6 py-3 bg-teal-700 text-white font-medium rounded-lg hover:bg-teal-600 transition-colors"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>

            {/* Community photo with quote overlay */}
            <div className="relative rounded-2xl overflow-hidden min-h-[320px]">
              <Image
                src={IMAGES.community}
                alt="Volunteers joining hands in a circle, symbolizing community unity"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* WHY: Semi-transparent teal overlay preserves brand feel
                  while keeping the quote text readable over the photo. */}
              <div className="absolute inset-0 bg-teal-900/70" />
              <div className="relative p-8 sm:p-12 flex flex-col justify-end h-full">
                <blockquote className="text-lg sm:text-xl text-white font-medium italic leading-relaxed">
                  &ldquo;A nonprofit is as strong as the community that holds it
                  up. Together, we can make the maximum positive effort for our
                  neighbors in Broward County.&rdquo;
                </blockquote>
                <p className="mt-4 text-sm text-teal-100 font-medium">
                  — Brett Rose, CEO
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="bg-teal-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Every Dollar Makes a Difference
          </h2>
          <p className="mt-3 text-teal-100 max-w-xl mx-auto">
            100% of donations go directly to our community programs. Contribute
            to our General Fund or choose a specific drive.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-gold-500 text-white font-semibold rounded-lg text-lg hover:bg-gold-400 transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-medium rounded-lg text-lg hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
