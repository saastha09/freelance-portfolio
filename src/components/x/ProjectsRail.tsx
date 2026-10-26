"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Boxes, Briefcase, Globe, Sparkles } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { Spotlight } from "./fx";
import { Heading } from "./Heading";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Pin + scroll sideways only where the whole block fits on screen; otherwise it's a swipe carousel.
const PIN_QUERY = "(min-width: 1024px) and (min-height: 740px) and (prefers-reduced-motion: no-preference)";
// Vertical scroll needed per pixel of sideways travel. Below 1 makes the rail move faster than you scroll.
const SCROLL_RATIO = 0.6;

const band: Record<ProjectCategory, { bg: string; icon: React.ComponentType<{ className?: string }>; label: string }> = {
  client: { bg: "from-volt/35 to-volt/5", icon: Briefcase, label: "Client work" },
  web: { bg: "from-[#8FB8B4]/35 to-[#8FB8B4]/5", icon: Globe, label: "Web & mobile" },
  ai: { bg: "from-flare/35 to-flare/5", icon: Sparkles, label: "AI & automation" },
  backend: { bg: "from-sand/30 to-sand/5", icon: Boxes, label: "Backend & infra" },
};

export function ProjectsRail() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const shown = projects.filter((p) => filter === "all" || p.category === filter);
  const count = (id: ProjectCategory | "all") => projects.filter((p) => id === "all" || p.category === id).length;

  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  useIsoLayoutEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const measure = () => {
      setPinned(mq.matches);
      if (track.current) setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [filter]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useSpring(useTransform(scrollYProgress, [0, 1], [0, -distance]), { stiffness: 140, damping: 30, mass: 0.3 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("article")?.parentElement as HTMLElement | null;
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 360) + 20), behavior: "smooth" });
  };

  const pickFilter = (id: ProjectCategory | "all") => {
    setFilter(id);
    if (pinned && section.current) window.scrollTo({ top: section.current.offsetTop, behavior: "smooth" });
    else track.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <section
      ref={section}
      id="projects"
      className="relative"
      style={pinned ? { height: `calc(100vh + ${Math.round(distance * SCROLL_RATIO)}px)` } : undefined}
    >
      <div className={cn("py-24", pinned && "sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-10 pt-20")}>
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <Heading index="02" kicker="More projects" title="Everything" accent="else." className="max-w-md" />
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter projects">
              {projectCategories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === c.id}
                  onClick={() => pickFilter(c.id)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    filter === c.id ? "border-sand bg-sand text-night" : "border-white/15 text-white/70 hover:border-white/50 hover:text-white",
                  )}
                >
                  {c.label} <span className="ml-0.5 opacity-60">{count(c.id)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          ref={track}
          data-testid="project-track"
          style={pinned ? { x } : undefined}
          className={cn(
            "mt-10 flex gap-5 px-5 sm:px-8",
            pinned
              ? "w-max lg:pl-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] lg:pr-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]"
              : "snap-x snap-mandatory scroll-pl-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] sm:scroll-pl-8 [&::-webkit-scrollbar]:hidden lg:scroll-pl-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]",
          )}
        >
          {shown.map((p, i) => (
            <ProjectCard key={p.id} project={p} n={i + 1} />
          ))}
        </motion.div>

        <div className="mx-auto mt-8 flex w-full max-w-7xl items-center gap-4 px-5 sm:px-8">
          {pinned ? (
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full bg-gradient-to-r from-sand via-volt to-flare" style={{ width: bar }} />
            </div>
          ) : (
            <>
              <p className="flex-1 text-sm text-white/40">Swipe or use the arrows</p>
              <button type="button" aria-label="Previous projects" onClick={() => nudge(-1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-sand hover:text-sand">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button type="button" aria-label="Next projects" onClick={() => nudge(1)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-sand hover:text-sand">
                <ArrowRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, n }: { project: Project; n: number }) {
  const b = band[p.category];
  const link = p.links?.[0];
  const extra = p.stack.length - 5;
  return (
    <Spotlight className="w-[82vw] max-w-[360px] shrink-0 snap-start rounded-3xl border border-white/10 bg-night-700 sm:w-[360px]">
      <article className="relative flex h-full flex-col">
        <div className={cn("relative h-28 overflow-hidden rounded-t-3xl bg-gradient-to-br", b.bg)}>
          {p.image && <Image src={p.image.src} alt={p.image.alt} width={800} height={450} className="h-full w-full object-cover opacity-90" />}
          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-night/60 px-2.5 py-1 text-xs text-white/80 backdrop-blur">
              <b.icon className="h-3.5 w-3.5" /> {b.label}
            </span>
            <span className="rounded-full bg-night/60 px-2.5 py-1 font-mono text-[11px] text-white/70 backdrop-blur">{String(n).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-xl font-semibold tracking-tight">{p.name}</h3>
            {p.status && <span className="rounded-full bg-sand px-2 py-0.5 text-[11px] font-semibold text-night">{p.status}</span>}
          </div>
          <p className="mt-1 text-xs text-white/45">{p.tag}</p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">{p.summary}</p>
          <ul className="mt-3 space-y-1.5">
            {p.built.slice(0, 2).map((item) => (
              <li key={item} className="flex gap-2 text-[13px] leading-relaxed text-white/55">
                <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-sand" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {p.stack.slice(0, 5).map((s) => (
              <span key={s} className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-[11px] text-white/60">
                {s}
              </span>
            ))}
            {extra > 0 && <span className="rounded-md px-1 py-0.5 font-mono text-[11px] text-white/40">+{extra}</span>}
          </div>
          {link && (
            <a href={link.href} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sand hover:underline">
              {link.label} <ArrowUpRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </article>
    </Spotlight>
  );
}
