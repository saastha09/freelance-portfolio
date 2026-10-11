import Image from "next/image";
import { about, personal, stack } from "@/lib/portfolio-data";
import { Section, SectionHeading } from "./Section";

export function About() {
  return (
    <Section id="about" className="bg-white">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading eyebrow="About" title="Hi, I'm Aastha." />
          <div className="mt-8 flex items-center gap-4">
            <Image
              src={personal.photoUrl}
              alt="Aastha Sharma"
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-full object-cover ring-4 ring-brand-soft"
            />
            <div>
              <p className="font-medium">{personal.name}</p>
              <p className="text-sm text-ink-muted">
                {personal.role} · {personal.location}
              </p>
            </div>
          </div>
          <div className="mt-8 space-y-4 text-ink-soft">
            {about.map((p) => (
              <p key={p} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-brand">Toolkit</p>
          <div className="mt-6 space-y-6">
            {stack.map((g) => (
              <div key={g.group} className="border-b border-paper-line pb-6 last:border-0">
                <p className="text-sm font-medium">{g.group}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <span key={i} className="rounded-full border border-paper-line bg-paper px-3 py-1 text-sm text-ink-soft">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
