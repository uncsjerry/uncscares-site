import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UNCS Cares Foundation | Building Stronger Communities in Broward County",
  description:
    "UNCS Cares Foundation is a 501(c)(3) nonprofit dedicated to serving Broward County families through annual drives, school supplies, meals, housing support, and community programs.",
  keywords: [
    "UNCS Cares",
    "Broward County nonprofit",
    "community giving",
    "homeless support",
    "back to school drive",
    "Thanksgiving dinner drive",
    "bicycle drive",
    "Fort Lauderdale charity",
  ],
  openGraph: {
    title: "UNCS Cares Foundation",
    description: "Building Stronger Communities in Broward County",
    url: "https://uncscares.org",
    siteName: "UNCS Cares Foundation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
