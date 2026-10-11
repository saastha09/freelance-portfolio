import { ArrowDown, ArrowRight } from "lucide-react";
import { automationExamples } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "./Section";

export function Automations() {
  return (
    <Section id="automations">
      <SectionHeading
        eyebrow="Workflow automation"
        title="Small automations, hours back every week"
        description="These are the kinds of processes I usually automate first. Each one is a few weeks of work, and the payoff shows up right away."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {automationExamples.map((a) => (
          <article key={a.title} className="rounded-2xl border border-paper-line bg-white p-6 shadow-card">
            <h3 className="text-lg font-semibold tracking-tight">{a.title}</h3>
            <div className="mt-5 grid items-stretch gap-3 sm:grid-cols-[1fr_auto_1fr]">
              <div className="rounded-xl bg-rose-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">Today</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.before}</p>
              </div>
              <div className="grid place-items-center text-ink-muted">
                <ArrowRight className="hidden h-5 w-5 sm:block" />
                <ArrowDown className="h-5 w-5 sm:hidden" />
              </div>
              <div className="rounded-xl bg-emerald-50/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Automated</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.after}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
