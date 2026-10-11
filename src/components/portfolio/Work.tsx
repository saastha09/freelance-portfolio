import { BadgeCheck, CheckCircle2, LineChart, Users } from "lucide-react";
import { projects, type Project } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "./Section";

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <Section id="work" className="bg-white">
      <SectionHeading
        eyebrow="Selected work"
        title="Products I've built and shipped"
        description="Freelance and independent work across dashboards, payments, automation and booking platforms."
      />

      <FeaturedProject project={featured} />

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {rest.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Section>
  );
}

function FeaturedProject({ project: p }: { project: Project }) {
  return (
    <article className="mt-14 overflow-hidden rounded-3xl border border-paper-line bg-paper shadow-card">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        <div className="p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{p.name}</h3>
            <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">{p.tag}</span>
          </div>
          <p className="mt-3 text-lg text-ink-soft">{p.summary}</p>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-muted">The brief</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.problem}</p>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-muted">What I built</p>
          <ul className="mt-3 space-y-2.5">
            {p.built.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span key={s} className="rounded-md border border-paper-line bg-white px-2.5 py-1 font-mono text-xs text-ink-soft">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="relative hidden border-l border-paper-line bg-gradient-to-br from-indigo-50 to-white p-8 lg:block" aria-hidden="true">
          <RightAstraMock />
        </div>
      </div>
    </article>
  );
}

function RightAstraMock() {
  const rows = [
    { name: "Nifty Momentum", subs: 412, ret: "+18.4%" },
    { name: "BankNifty Swing", subs: 268, ret: "+11.2%" },
    { name: "Midcap Breakout", subs: 157, ret: "+9.7%" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="rounded-2xl border border-paper-line bg-white p-5 shadow-card">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span className="font-medium text-ink">Creator Studio</span>
          <span>Last 30 days</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { icon: Users, label: "Subscribers", value: "837" },
            { icon: LineChart, label: "Avg. return", value: "+13.1%" },
            { icon: BadgeCheck, label: "Verified", value: "P&L" },
          ].map((k) => (
            <div key={k.label} className="rounded-lg bg-paper p-3">
              <k.icon className="h-4 w-4 text-brand" />
              <p className="mt-2 text-base font-semibold">{k.value}</p>
              <p className="text-[11px] text-ink-muted">{k.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-paper-line bg-white p-5 shadow-card">
        <p className="text-xs font-medium">Marketplace listings</p>
        <div className="mt-3 divide-y divide-paper-line">
          {rows.map((r) => (
            <div key={r.name} className="flex items-center justify-between py-2.5 text-sm">
              <span>{r.name}</span>
              <span className="flex items-center gap-4">
                <span className="text-xs text-ink-muted">{r.subs} subs</span>
                <span className="font-medium text-emerald-600">{r.ret}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-[11px] text-ink-muted">Illustrative UI, built under NDA. Figures are placeholders.</p>
    </div>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-2xl border border-paper-line bg-paper p-6 shadow-card">
      <span className="w-fit rounded-full bg-white px-2.5 py-1 text-xs font-medium text-ink-soft ring-1 ring-paper-line">
        {p.tag}
      </span>
      <h3 className="mt-4 text-xl font-semibold tracking-tight">{p.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.summary}</p>

      <ul className="mt-5 space-y-2">
        {p.built.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm leading-relaxed text-ink-soft">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" />
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {p.stack.map((s) => (
          <span key={s} className="rounded-md bg-white px-2 py-0.5 font-mono text-[11px] text-ink-muted ring-1 ring-paper-line">
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}
