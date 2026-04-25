import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make a Donation | UNCS Cares Foundation",
  description:
    "Make a tax-deductible donation to UNCS Cares Foundation. Support families in need through our Back to School, Thanksgiving, Bicycle, and other community drives.",
  openGraph: {
    title: "Donate — UNCS Cares Foundation",
    description:
      "Every dollar goes directly to supporting families in need. All donations are tax-deductible.",
    url: "https://uncscares.org/donate",
  },
};

export default function DonateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
