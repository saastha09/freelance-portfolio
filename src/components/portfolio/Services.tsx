import { Globe, LayoutDashboard, Plug, ServerCog, Wrench, Workflow } from "lucide-react";
import { services, type Service } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "./Section";

const icons: Record<Service["icon"], React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  workflow: Workflow,
  tools: Wrench,
  website: Globe,
  integrations: Plug,
  backend: ServerCog,
};

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What I build"
        title="Software for how your business actually runs"
        description="Most teams don't need another off-the-shelf tool. They need the tools they have to talk to each other, and the repetitive parts to run on their own."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const Icon = icons[s.icon];
          return (
            <article
              key={s.title}
              className="group rounded-2xl border border-paper-line bg-white p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.description}</p>
              <ul className="mt-5 space-y-1.5 border-t border-paper-line pt-4">
                {s.examples.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm text-ink-soft">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
                    {e}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
