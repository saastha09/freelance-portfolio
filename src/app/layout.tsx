import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono, Schibsted_Grotesk } from "next/font/google";
import { withBasePath } from "@/lib/base-path";
import "./globals.css";

const display = Bricolage_Grotesque({ weight: ["500", "600", "700"], subsets: ["latin"], variable: "--font-display" });
const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-serif" });
const body = Schibsted_Grotesk({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://saastha09.github.io/freelance-portfolio/"),
  title: "Aastha Sharma | Freelance Full-Stack Developer, Bangalore",
  description:
    "Freelance full-stack developer in Bangalore: websites, web and mobile apps, dashboards, AI features, workflow automation, payments and cloud hosting.",
  keywords: [
    "freelance full stack developer Bangalore",
    "workflow automation developer",
    "business dashboard developer",
    "internal tools",
    "Next.js developer Bangalore",
    "Flutter app developer",
    "AI chatbot developer",
    "Golang developer freelance",
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
    <html lang="en" className={`${display.variable} ${serif.variable} ${body.variable} ${mono.variable} h-full`}>
      <body className="min-h-full bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
