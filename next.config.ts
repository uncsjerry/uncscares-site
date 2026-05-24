import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          /* WHY: Prevents clickjacking — no one should embed uncscares.org in an iframe */
          { key: "X-Frame-Options", value: "DENY" },
          /* WHY: Stops browsers from MIME-sniffing responses away from declared Content-Type */
          { key: "X-Content-Type-Options", value: "nosniff" },
          /* WHY: Forces HTTPS for 1 year, including subdomains */
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          /* WHY: Controls what info is sent in the Referer header — origin only for cross-origin */
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          /* WHY: Content Security Policy — restricts where scripts, styles, images, and
             connections can come from. Prevents XSS and data exfiltration.
             - 'unsafe-inline' needed for Next.js inline styles and Tailwind
             - connect-src allows Stripe and Supabase API calls
             - frame-src allows Stripe Checkout and Google Maps embed */
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' https: data:",
              "font-src 'self'",
              "connect-src 'self' https://api.stripe.com https://*.supabase.co https://api.resend.com",
              "frame-src https://js.stripe.com https://www.google.com",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
