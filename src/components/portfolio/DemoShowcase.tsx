import Link from "next/link";
import { ArrowUpRight, Globe, LayoutDashboard } from "lucide-react";
import { Section, SectionHeading } from "./Section";

const demos = [
  {
    href: "/demo",
    icon: Globe,
    label: "Company website",
    title: "Northstone Infra: public site",
    body: "Services, live project showcase and an enquiry form that drops every lead straight into the operations dashboard.",
    features: ["Project portfolio with live progress", "Enquiry form → CRM lead", "Mobile-first, fast"],
  },
  {
    href: "/demo/dashboard",
    icon: LayoutDashboard,
    label: "Operations dashboard",
    title: "Northstone Ops: internal tool",
    body: "The back-office: KPIs, projects, a multi-level purchase approval workflow, a leads pipeline, site reports and automation rules.",
    features: ["Approve / reject purchase requests", "Move leads through the pipeline", "Toggle automation rules"],
  },
];

export function DemoShowcase() {
  return (
    <Section id="demo" className="bg-ink text-white">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Live demo"
            title="Don't take my word for it. Click around."
            dark
            description="I built a working demo for an imaginary Bangalore construction company: a public website plus the internal dashboard behind it. Everything is interactive and runs on sample data."
          />
          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-300">
            <span className="font-medium text-white">Try this:</span> submit an enquiry on the website, then open the
            dashboard. It shows up in Leads, with an automation logged in the activity feed.
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {demos.map((d) => (
            <Link
              key={d.href}
              href={d.href}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:-translate-y-1 hover:border-amber-400/60 hover:bg-white/[0.07]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                  <d.icon className="h-3.5 w-3.5" />
                  {d.label}
                </span>
                <ArrowUpRight className="h-5 w-5 text-slate-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-300" />
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{d.body}</p>
              <ul className="mt-5 space-y-2 border-t border-white/10 pt-4">
                {d.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    {f}
                  </li>
                ))}
              </ul>
              <span className="mt-6 text-sm font-medium text-amber-300">Open {d.label.toLowerCase()} →</span>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
