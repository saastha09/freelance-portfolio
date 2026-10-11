import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { withBasePath } from "@/lib/base-path";
import "./globals.css";

export const metadata: Metadata = {
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
  },
  icons: { icon: withBasePath("/favicon.ico") },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} h-full`}>
      <body className="min-h-full bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
