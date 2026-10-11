import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Factory, HardHat, MapPin, Phone, Mail, Route, ShieldCheck, Smartphone, Timer } from "lucide-react";
import { BuildingArt } from "@/components/demo/BuildingArt";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { EnquiryForm } from "@/components/demo/EnquiryForm";
import { company, siteProjects } from "@/lib/demo-data";

export const metadata: Metadata = {
  title: "Northstone Infra (Demo) | Construction in Bengaluru",
  description: "Demo company website built by Aastha Sharma. Fictional company, sample data.",
};

const services = [
  { icon: Building2, title: "Commercial buildings", body: "Tech parks, office campuses and retail, delivered design-build or as general contractor." },
  { icon: Factory, title: "Industrial & warehousing", body: "PEB warehouses, logistics hubs and manufacturing facilities with fast-track schedules." },
  { icon: Route, title: "Infrastructure", body: "Road widening, storm-water drains and civic works for government and private clients." },
  { icon: HardHat, title: "Project management (PMC)", body: "Cost control, quality audits and vendor management on behalf of owners." },
];

const stats = [
  { value: "60+", label: "projects delivered" },
  { value: "1.2 Cr", label: "sq ft constructed" },
  { value: "700+", label: "people on our sites" },
  { value: "ISO 9001", label: "& 45001 certified" },
];

const promises = [
  { icon: Smartphone, title: "Live client portal", body: "Daily site photos, progress and billing, visible to you any time." },
  { icon: Timer, title: "Schedule discipline", body: "Weekly look-ahead plans and early warnings when anything slips." },
  { icon: ShieldCheck, title: "Safety first", body: "Daily toolbox talks, PPE audits and zero-harm reporting on every site." },
];

export default function DemoWebsite() {
  const showcase = siteProjects.slice(0, 6);

  return (
    <div className="bg-stone-50 text-stone-900">
      <DemoBanner current="website" />

      <header className="sticky top-0 z-50 border-b border-stone-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/demo" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-site-char text-sm font-bold text-site">NS</span>
            <span className="leading-tight">
              <span className="block font-semibold tracking-tight">Northstone Infra</span>
              <span className="block text-[11px] text-stone-500">Building Bengaluru since 2008</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-stone-600 md:flex">
            <a href="#services" className="hover:text-stone-900">Services</a>
            <a href="#projects" className="hover:text-stone-900">Projects</a>
            <a href="#why" className="hover:text-stone-900">Why us</a>
            <a href="#contact" className="hover:text-stone-900">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/demo/dashboard"
              className="hidden rounded-md border border-stone-300 px-3.5 py-2 text-sm font-medium hover:border-stone-900 sm:block"
            >
              Staff login
            </Link>
            <a href="#contact" className="rounded-md bg-site px-3.5 py-2 text-sm font-semibold text-site-char hover:bg-amber-400">
              Get a quote
            </a>
          </div>
        </div>
      </header>

      <section className="bg-blueprint relative overflow-hidden text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-site/40 bg-site/10 px-3 py-1 text-xs font-medium text-amber-300">
              <MapPin className="h-3.5 w-3.5" /> Commercial · Industrial · Infrastructure
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              We build Bengaluru&apos;s workplaces, <span className="text-site">on schedule.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-300">{company.tagline}. Transparent costs, live progress tracking and a single point of accountability from groundbreaking to handover.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-md bg-site px-6 py-3 text-sm font-semibold text-site-char hover:bg-amber-400">
                Discuss your project <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#projects" className="rounded-md border border-white/25 px-6 py-3 text-sm font-medium hover:bg-white/10">
                See ongoing projects
              </a>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-wider text-stone-400">Live from our sites today</p>
            <div className="mt-4 space-y-4">
              {siteProjects.slice(0, 4).map((p) => (
                <div key={p.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate pr-3">{p.name}</span>
                    <span className="font-mono text-amber-300">{p.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-site" style={{ width: `${p.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/20">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 sm:px-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-semibold text-site sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-sm text-stone-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-16 px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-site-dark">What we do</p>
          <h2 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">End-to-end construction, one accountable team</h2>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <article key={s.title} className="rounded-xl border border-stone-200 bg-white p-6 shadow-card">
                <s.icon className="h-8 w-8 text-site-dark" />
                <h3 className="mt-5 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="scroll-mt-16 bg-white px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-site-dark">Projects</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Currently building</h2>
            </div>
            <p className="max-w-sm text-sm text-stone-600">Progress figures update from our site reports. Clients see the same numbers in their portal.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((p) => (
              <article key={p.id} className="group overflow-hidden rounded-xl border border-stone-200 bg-stone-50 shadow-card">
                <div className="relative aspect-[2/1] overflow-hidden">
                  <BuildingArt category={p.category} progress={p.progress} />
                  <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold leading-snug">{p.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
                    <MapPin className="h-3.5 w-3.5" /> {p.location} · {p.area}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
                    <span>{p.status === "Handover" ? "In handover" : "Progress"}</span>
                    <span className="font-mono font-medium text-stone-800">{p.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-stone-200">
                    <div className="h-full rounded-full bg-site" style={{ width: `${p.progress}%` }} />
                  </div>
                  <p className="mt-3 text-xs text-stone-500">Completion: {p.end}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="scroll-mt-16 px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-site-dark">Why Northstone</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">You always know where your project stands</h2>
            <p className="mt-4 text-stone-600">
              We run every site on a digital backbone: daily reports, approvals and billing all in one system, so delays and cost overruns surface early instead of at the monthly review.
            </p>
          </div>
          <div className="space-y-4">
            {promises.map((p) => (
              <div key={p.title} className="flex gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-card">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-site-soft text-site-dark">
                  <p.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-stone-600">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-16 bg-stone-100 px-5 py-20 sm:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-site-dark">Start a project</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Tell us what you&apos;re planning</h2>
            <p className="mt-4 text-stone-600">Share a few details and our team will get back within one working day with next steps and a site-visit slot.</p>
            <div className="mt-8 space-y-3 text-sm text-stone-700">
              <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-site-dark" /> {company.phone}</p>
              <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-site-dark" /> {company.email}</p>
              <p className="flex items-center gap-3"><MapPin className="h-4 w-4 text-site-dark" /> {company.address}</p>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>

      <footer className="bg-site-char px-5 py-10 text-sm text-stone-400 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row">
          <p>© {new Date().getFullYear()} {company.legal} (fictional, for demonstration only)</p>
          <Link href="/" className="text-amber-300 hover:text-amber-200">Website & dashboard by Aastha Sharma →</Link>
        </div>
      </footer>
    </div>
  );
}
