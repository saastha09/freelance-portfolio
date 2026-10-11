import Link from "next/link";
import { ArrowRight, Bell, Calendar, CheckCircle2, Clock, FileText, TrendingUp } from "lucide-react";
import { heroPoints, personal } from "@/lib/portfolio-data";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Available for freelance · {personal.location}
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            I turn spreadsheets and WhatsApp follow-ups into{" "}
            <span className="text-brand">software your team actually uses.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Freelance full-stack developer building business dashboards, internal tools and workflow automation, from the
            database to the screen.
          </p>

          <ul className="mt-7 space-y-2.5">
            {heroPoints.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-ink-soft">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/demo/dashboard"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-lift transition-colors hover:bg-brand"
            >
              Try the live demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={personal.cal}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-paper-line bg-white px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
            >
              <Calendar className="h-4 w-4" />
              Book a 15-min call
            </a>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  const steps = [
    { label: "Requested", who: "Site engineer", done: true },
    { label: "Approved", who: "Project manager", done: true },
    { label: "Finance", who: "Above ₹5 L", done: false },
    { label: "PO sent", who: "Auto", done: false },
  ];

  return (
    <div className="relative animate-fade-up [animation-delay:150ms]" aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-brand/10 via-transparent to-amber-200/30 blur-2xl" />

      <div className="relative rounded-2xl border border-paper-line bg-white p-5 shadow-lift">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4 text-ink-muted" />
            Purchase request <span className="font-mono text-ink-muted">#PR-1042</span>
          </div>
          <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">Awaiting finance</span>
        </div>
        <p className="mt-3 text-sm text-ink-soft">TMT steel 12mm · 18 tonnes · Vendor: Shree Steels</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">₹7,92,000</p>

        <div className="mt-5 grid grid-cols-4 gap-2">
          {steps.map((s, i) => (
            <div key={s.label} className="relative">
              <div
                className={`h-1.5 rounded-full ${s.done ? "bg-brand" : i === 2 ? "bg-amber-300" : "bg-slate-200"}`}
              />
              <p className="mt-2 text-xs font-medium">{s.label}</p>
              <p className="text-[11px] text-ink-muted">{s.who}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative ml-auto mt-4 grid w-[92%] grid-cols-2 gap-4">
        <div className="rounded-2xl border border-paper-line bg-white p-4 shadow-card">
          <div className="flex items-center gap-1.5 text-xs text-ink-muted">
            <TrendingUp className="h-3.5 w-3.5" /> Collected this month
          </div>
          <p className="mt-2 text-xl font-semibold tracking-tight">₹4.8 Cr</p>
          <div className="mt-3 flex h-10 items-end gap-1">
            {[40, 55, 35, 70, 60, 85, 75].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm bg-brand/80" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="space-y-3 rounded-2xl border border-paper-line bg-ink p-4 text-white shadow-card">
          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <Bell className="h-3.5 w-3.5" /> Automations today
          </div>
          {["Reminder sent to 2 sites", "Daily report emailed", "3 invoices followed up"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-xs">
              <Clock className="h-3 w-3 text-emerald-400" />
              <span className="text-slate-200">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
