import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | UNCS Cares Foundation",
  description:
    "Get in touch with UNCS Cares Foundation. Questions about donations, volunteering, partnerships, or our community drives.",
  openGraph: {
    title: "Contact Us — UNCS Cares Foundation",
    description:
      "Questions, partnership inquiries, or want to volunteer? We'd love to hear from you.",
    url: "https://uncscares.org/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
