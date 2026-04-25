import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-teal-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/images/logo/uncs-cares-white.png"
              alt="UNCS Cares Foundation"
              width={160}
              height={120}
              className="h-14 w-auto mb-4"
            />
            <p className="text-sm text-teal-100 leading-relaxed">
              A 501(c)(3) nonprofit organization dedicated to building stronger
              communities.
            </p>
            <p className="text-xs text-teal-100/70 mt-3">EIN #84-4044721</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/drives", label: "Annual Drives" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
                { href: "/donate", label: "Donate" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-teal-100 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Drives */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Our Drives
            </h4>
            <ul className="space-y-2">
              {[
                "Back to School",
                "Thanksgiving Dinner",
                "Holiday Bicycle",
                "Destination Dorm",
                "4EveryKid Shoes",
              ].map((drive) => (
                <li key={drive}>
                  <Link
                    href="/drives"
                    className="text-sm text-teal-100 hover:text-white transition-colors"
                  >
                    {drive}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact Us
            </h4>
            <address className="not-italic text-sm text-teal-100 space-y-2">
              <p>1471 NE 26th Street</p>
              <p>Second Floor</p>
              <p>Fort Lauderdale, FL 33305</p>
              <p className="pt-2">
                <a
                  href="tel:+19545243325"
                  className="hover:text-white transition-colors"
                >
                  (954) 524-3325
                </a>
              </p>
              <p>
                <a
                  href="mailto:support@uncscares.org"
                  className="hover:text-white transition-colors"
                >
                  support@uncscares.org
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-teal-700/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-teal-100/70">
            &copy; {currentYear} UNCS Cares Foundation. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            <Link
              href="/privacy"
              className="text-xs text-teal-100/70 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-teal-100/70 hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/refund-policy"
              className="text-xs text-teal-100/70 hover:text-white transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
