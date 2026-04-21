import Link from "next/link";

/* ---------- Drive card data ---------- */
const drives = [
  {
    name: "Back to School Drive",
    description:
      "Backpacks filled with school supplies for children without stable housing.",
    amount: "$50",
    icon: "🎒",
    season: "Summer",
  },
  {
    name: "Thanksgiving Dinner Drive",
    description:
      "Complete holiday meals for families served by Broward Partnership for the Homeless.",
    amount: "$250",
    icon: "🍽️",
    season: "Fall",
  },
  {
    name: "Holiday Bicycle Drive",
    description:
      "Brand new bicycles and helmets for children in Broward County.",
    amount: "$350",
    icon: "🚲",
    season: "Winter",
  },
  {
    name: "Destination Dorm",
    description:
      "College essentials for graduating seniors experiencing homelessness.",
    amount: "$25",
    icon: "🎓",
    season: "Spring",
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
      <section className="relative bg-teal-900 overflow-hidden">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-700 to-teal-900 opacity-90" />
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <p className="text-teal-100 text-sm font-medium uppercase tracking-widest mb-4">
              501(c)(3) Nonprofit &middot; Broward County, FL
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Building Stronger{" "}
              <span className="text-gold-400">Communities</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-teal-100 leading-relaxed max-w-xl">
              For over 20 years, UNCS employees and volunteers have come
              together to support families in Broward County through hands-on
              drives, donations, and community programs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/donate"
                className="donate-pulse inline-flex items-center justify-center px-8 py-3.5 bg-gold-500 text-white font-semibold rounded-lg text-lg hover:bg-gold-400 transition-colors"
              >
                Donate to Our General Fund
              </Link>
              <Link
                href="/drives"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-teal-100/30 text-white font-medium rounded-lg text-lg hover:bg-white/10 transition-colors"
              >
                View Our Drives
              </Link>
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
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-3xl mb-4">{drive.icon}</div>
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

            {/* Visual placeholder — teal accent block */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 sm:p-12 border border-teal-200/50">
              <blockquote className="text-lg sm:text-xl text-teal-900 font-medium italic leading-relaxed">
                &ldquo;A nonprofit is as strong as the community that holds it
                up. Together, we can make the maximum positive effort for our
                neighbors in Broward County.&rdquo;
              </blockquote>
              <p className="mt-4 text-sm text-teal-700 font-medium">
                — Brett Rose, CEO
              </p>
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
