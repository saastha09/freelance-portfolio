import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { withBasePath } from "@/lib/base-path";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://saastha09.github.io/freelance-portfolio/"),
  title: "Aastha Sharma | Freelance Full-Stack Developer, Bangalore",
  description:
    "Freelance full-stack developer in Bangalore building business dashboards, internal tools and workflow automation, from database to front-end.",
  keywords: [
    "freelance full stack developer Bangalore",
    "workflow automation developer",
    "business dashboard developer",
    "internal tools",
    "Next.js developer Bangalore",
  ],
  openGraph: {
    title: "Aastha Sharma | Freelance Full-Stack Developer",
    description: "Dashboards, internal tools and workflow automation for growing businesses.",
    images: [{ url: "og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "Aastha Sharma | Freelance Full-Stack Developer" },
  icons: { icon: withBasePath("/favicon.ico") },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full`}>
      <body className="min-h-full bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
