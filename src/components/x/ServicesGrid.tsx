"use client";

import { motion } from "framer-motion";
import {
  AppWindow,
  Bot,
  Braces,
  CloudCog,
  Cpu,
  CreditCard,
  Globe,
  LayoutDashboard,
  LifeBuoy,
  Monitor,
  MousePointerClick,
  Plug,
  Smartphone,
  Workflow,
  Wrench,
} from "lucide-react";
import { services, type Service } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Spotlight } from "./fx";
import { Heading } from "./Heading";

const icons: Record<Service["icon"], React.ComponentType<{ className?: string }>> = {
  dashboard: LayoutDashboard,
  workflow: Workflow,
  tools: Wrench,
  website: Globe,
  webapp: AppWindow,
  mobile: Smartphone,
  desktop: Monitor,
  ai: Bot,
  browser: MousePointerClick,
  payments: CreditCard,
  api: Braces,
  integrations: Plug,
  cloud: CloudCog,
  iot: Cpu,
  support: LifeBuoy,
};

// Bento rhythm: the first few services get wider tiles on large screens.
const span = (i: number) => (i === 0 || i === 3 || i === 9 ? "lg:col-span-2" : "");

export function ServicesGrid() {
  return (
    <section id="services" className="relative px-5 py-28 sm:px-8 md:py-36">
      <div className="pointer-events-none absolute left-1/4 top-40 h-96 w-96 rounded-full bg-volt/15 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl">
        <Heading
          index="03"
          kicker="Services"
          title="Whatever you need built,"
          accent="I build it."
          description="Websites, web and mobile apps, desktop tools, AI, automation, payments, cloud and connected devices. One developer, accountable for all of it."
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <motion.div
                key={s.title}
                className={span(i)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Spotlight className="h-full rounded-3xl border border-white/10 bg-night-800 transition-colors hover:border-sand/40">
                  <article className="relative flex h-full flex-col p-6">
                    <div className="flex items-start justify-between">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-sand text-night transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="font-mono text-xs text-white/30">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className={cn("mt-5 font-display font-semibold tracking-tight", span(i) ? "text-2xl" : "text-xl")}>{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">{s.description}</p>
                    <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
                      {s.examples.map((e) => (
                        <li key={e} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70">
                          {e}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Spotlight>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
