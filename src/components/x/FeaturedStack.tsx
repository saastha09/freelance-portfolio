"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, BadgeCheck, FileCheck, Gauge, Hand, LineChart, Radar, Send, Timer, Users } from "lucide-react";
import { useRef } from "react";
import { withBasePath } from "@/lib/base-path";
import { featuredProjects, type FeaturedProject } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Tilt } from "./fx";
import { Heading } from "./Heading";

const theme: Record<FeaturedProject["visual"], { card: string; glow: string; chip: string }> = {
  rightastra: { card: "from-[#1E1B30] to-[#100F18]", glow: "bg-volt/25", chip: "bg-volt text-night" },
  jobagent: { card: "from-[#172225] to-[#0D1314]", glow: "bg-[#8FB8B4]/20", chip: "bg-[#B7D3CF] text-night" },
  nekodesk: { card: "from-[#2B1A24] to-[#140D12]", glow: "bg-flare/25", chip: "bg-flare text-night" },
  northstone: { card: "from-[#2A2119] to-[#14100C]", glow: "bg-sand/20", chip: "bg-sand text-night" },
};

export function FeaturedStack() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative px-5 pt-28 sm:px-8 md:pt-36">
      <div className="mx-auto max-w-7xl">
        <Heading
          index="01"
          kicker="Selected work"
          title="Things I've built"
          accent="and shipped."
          description="Client work, products I use every day, and a live demo you can click right now."
        />
      </div>
      <div ref={container} className="mx-auto mt-16 max-w-7xl pb-24">
        {featuredProjects.map((p, i) => (
          <Card key={p.id} project={p} index={i} total={featuredProjects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

function Card({ project: p, index, total, progress }: { project: FeaturedProject; index: number; total: number; progress: MotionValue<number> }) {
  const t = theme[p.visual];
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index) * 0.04]);
  const shade = useTransform(progress, [start, Math.min(1, start + 1 / total)], [0, index === total - 1 ? 0 : 0.6]);

  return (
    <div className="mb-8 lg:sticky lg:mb-0 lg:h-[100vh] lg:pt-[12vh]" style={{ top: `${index * 28}px` }}>
      <motion.article
        id={`project-${p.id}`}
        style={{ scale }}
        className={cn(
          "relative origin-top overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br p-6 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.8)] sm:p-10 lg:h-[76vh]",
          t.card,
        )}
      >
        <div className={cn("pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-[110px]", t.glow)} />
        <motion.div className="pointer-events-none absolute inset-0 z-10 bg-night" style={{ opacity: shade }} aria-hidden="true" />
        <div className="relative grid h-full gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <span className={cn("rounded-full px-3 py-1 text-xs font-bold", t.chip)}>{p.tag}</span>
              <span className="font-mono text-xs text-white/40">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 font-display text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">{p.name}</h3>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{p.summary}</p>
            <ul className="mt-6 space-y-2.5">
              {p.built.slice(0, 4).map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-white/70">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sand" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[11px] text-white/70">
                  {s}
                </span>
              ))}
            </div>
            {p.links && (
              <div className="mt-7 flex flex-wrap gap-3">
                {p.links.map((l, i) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-bold transition-transform hover:-translate-y-0.5",
                      i === 0 ? "bg-white text-night" : "border border-white/25 text-white",
                    )}
                  >
                    {l.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Tilt className="relative" max={8}>
            <div>
              <Visual project={p} />
            </div>
          </Tilt>
        </div>
      </motion.article>
    </div>
  );
}

function Visual({ project: p }: { project: FeaturedProject }) {
  switch (p.visual) {
    case "rightastra":
      return <RightAstraMock />;
    case "jobagent":
      return <Pipeline />;
    case "nekodesk":
      return (
        <div className="flex items-center justify-center gap-4">
          <Image
            src={withBasePath("/work/nekodesk-panel-today.jpg")}
            alt="NekoDesk Today panel with top tasks and reminders"
            width={551}
            height={840}
            className="w-[50%] rounded-2xl border border-white/20 shadow-2xl"
          />
          <div className="flex w-[40%] flex-col gap-4">
            <Image
              src={withBasePath("/work/nekodesk-mood-happy.jpg")}
              alt="NekoDesk character Mira celebrating a finished task"
              width={630}
              height={840}
              className="rounded-2xl bg-white shadow-2xl"
            />
            <Image
              src={withBasePath("/work/nekodesk-panel-focus.jpg")}
              alt="NekoDesk focus timer panel"
              width={551}
              height={840}
              className="hidden rounded-2xl border border-white/20 shadow-2xl sm:block lg:hidden xl:block"
            />
          </div>
        </div>
      );
    case "northstone":
      return (
        <Link href="/demo/dashboard" className="block">
          <div className="overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            <div className="flex gap-1.5 bg-white/10 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-flare" />
              <span className="h-2.5 w-2.5 rounded-full bg-volt" />
              <span className="h-2.5 w-2.5 rounded-full bg-sand" />
            </div>
            <Image src={withBasePath("/work/northstone-dashboard.jpg")} alt={p.image?.alt ?? ""} width={1200} height={750} className="h-auto w-full" />
          </div>
          <p className="mt-4 text-center text-sm text-white/60">
            <span className="font-semibold text-white">Try this:</span> send an enquiry on the website, then watch it land in Leads.
          </p>
        </Link>
      );
  }
}

function RightAstraMock() {
  const rows = [
    { name: "Nifty Momentum", subs: 412, ret: "+18.4%" },
    { name: "BankNifty Swing", subs: 268, ret: "+11.2%" },
    { name: "Midcap Breakout", subs: 157, ret: "+9.7%" },
  ];
  return (
    <div className="space-y-4" aria-hidden="true">
      <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur">
        <div className="flex justify-between text-xs text-white/50">
          <span className="font-semibold text-white">Creator Studio</span>
          <span>Last 30 days</span>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { icon: Users, label: "Subscribers", value: "837" },
            { icon: LineChart, label: "Avg. return", value: "+13.1%" },
            { icon: BadgeCheck, label: "Verified", value: "P&L" },
          ].map((k) => (
            <div key={k.label} className="rounded-xl bg-white/[0.06] p-3">
              <k.icon className="h-4 w-4 text-volt" />
              <p className="mt-2 text-lg font-bold">{k.value}</p>
              <p className="text-[11px] text-white/50">{k.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 backdrop-blur">
        <p className="text-xs font-semibold">Marketplace listings</p>
        <div className="mt-3 divide-y divide-white/10">
          {rows.map((r) => (
            <div key={r.name} className="flex justify-between py-2.5 text-sm">
              <span>{r.name}</span>
              <span className="flex gap-4">
                <span className="text-xs text-white/50">{r.subs} subs</span>
                <span className="font-semibold text-sand">{r.ret}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-center text-[11px] text-white/40">Illustrative UI, built under NDA. Figures are placeholders.</p>
    </div>
  );
}

function Pipeline() {
  const steps = [
    { icon: Radar, title: "Discover", body: "212 company career boards" },
    { icon: Gauge, title: "Score", body: "Transparent 100-point fit model" },
    { icon: FileCheck, title: "Tailor", body: "Résumé per job, fact-checked" },
    { icon: Hand, title: "I approve", body: "Nothing goes out without my OK" },
    { icon: Timer, title: "Referral first", body: "Ask a contact, wait 48 hours" },
    { icon: Send, title: "Apply", body: "7 job boards + 5 company ATSs" },
  ];
  return (
    <ol className="relative grid grid-cols-2 gap-3" aria-label="Job-search agent pipeline">
      {steps.map((s, i) => (
        <motion.li
          key={s.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className={cn(
            "rounded-2xl border p-4",
            i === 3 ? "border-sand bg-sand text-night" : "border-white/15 bg-white/[0.05]",
          )}
        >
          <div className="flex items-center justify-between">
            <s.icon className={cn("h-5 w-5", i === 3 ? "text-night" : "text-sand")} />
            <span className={cn("font-mono text-xs", i === 3 ? "text-night/60" : "text-white/40")}>0{i + 1}</span>
          </div>
          <p className="mt-3 font-bold">{s.title}</p>
          <p className={cn("text-xs", i === 3 ? "text-night/70" : "text-white/55")}>{s.body}</p>
        </motion.li>
      ))}
    </ol>
  );
}
