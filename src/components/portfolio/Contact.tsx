import Link from "next/link";
import { Calendar, Mail, Phone } from "lucide-react";
import { personal } from "@/lib/portfolio-data";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./BrandIcons";

export function Contact() {
  const channels = [
    { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: WhatsappIcon, label: "WhatsApp", value: personal.phone, href: personal.whatsapp },
    { icon: Phone, label: "Call", value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}` },
  ];

  return (
    <section id="contact" className="scroll-mt-20 px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink text-white shadow-lift">
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-16">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-amber-400">Let&apos;s talk</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tell me the process that eats the most time in your week.
            </h2>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-slate-300">
              I&apos;ll come back with how I&apos;d automate it, a rough timeline, and a clickable prototype if it&apos;s a fit.
              Based in Bangalore and happy to meet in person.
            </p>
            <a
              href={personal.cal}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-amber-300"
            >
              <Calendar className="h-4 w-4" />
              Book a free 15-min call
            </a>
          </div>

          <div className="space-y-3">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-amber-400/50 hover:bg-white/10"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                  <c.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs text-slate-400">{c.label}</span>
                  <span className="block font-medium">{c.value}</span>
                </span>
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-slate-200 hover:bg-white/10"
              >
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm text-slate-200 hover:bg-white/10"
              >
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="px-5 pb-10 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-paper-line pt-8 text-sm text-ink-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {personal.name} · {personal.location}
        </p>
        <div className="flex gap-5">
          <Link href="/demo" className="hover:text-ink">
            Demo website
          </Link>
          <Link href="/demo/dashboard" className="hover:text-ink">
            Demo dashboard
          </Link>
          <a href={personal.github} target="_blank" rel="noreferrer" className="hover:text-ink">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
