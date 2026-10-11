import { engagements, process } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "./Section";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="How we'd work together"
        title="Something working in week one, not month three"
        description="Short feedback loops keep the build close to how your team actually works, and you can see the progress for yourself."
      />

      <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {process.map((p) => (
          <li key={p.step} className="relative rounded-2xl border border-paper-line bg-white p-6 shadow-card">
            <span className="font-mono text-sm font-medium text-brand">{p.step}</span>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-3xl border border-paper-line bg-white p-7 shadow-card sm:p-10">
        <h3 className="text-xl font-semibold tracking-tight">Ways to engage</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {engagements.map((e) => (
            <div key={e.title} className="border-l-2 border-brand pl-4">
              <p className="font-medium">{e.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{e.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
