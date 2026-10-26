"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { withBasePath } from "@/lib/base-path";
import { personal, projectCount, services } from "@/lib/portfolio-data";
import { CountUp, Magnetic, ScrambleWords } from "./fx";
import { ParticleField } from "./ParticleField";

function useParallax(x: MotionValue<number>, y: MotionValue<number>, depth: number) {
  return { x: useTransform(x, (v) => v * depth), y: useTransform(y, (v) => v * depth) };
}

const WORDS = ["web apps", "AI agents", "mobile apps", "dashboards", "automations", "SaaS", "websites"];

export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const l1 = useParallax(sx, sy, 18);
  const l2 = useParallax(sx, sy, -28);
  const l3 = useParallax(sx, sy, 38);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 sm:px-8"
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse") return;
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <ParticleField className="absolute inset-0 -z-10 h-full w-full" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-20 h-[28rem] w-[28rem] animate-float rounded-full bg-volt/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 -z-20 h-[26rem] w-[26rem] animate-float rounded-full bg-flare/15 blur-[130px] [animation-delay:-3s]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-20 h-64 w-64 rounded-full bg-sand/[0.07] blur-[110px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        <div>
          <div className="animate-fade-up inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-sand" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sand" />
            </span>
            Taking new projects · {personal.location}
          </div>

          <h1 className="mt-7 font-display text-[2.3rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.4rem] xl:text-[3.9rem]">
            <span className="animate-fade-up block [animation-delay:80ms]">I build</span>
            <span className="animate-fade-up block min-h-[1em] whitespace-nowrap [animation-delay:160ms]">
              <ScrambleWords words={WORDS} className="text-gradient" />
            </span>
            <span className="animate-fade-up block [animation-delay:240ms]">
              that grow your <span className="font-serif font-normal italic">business.</span>
            </span>
          </h1>

          <p className="animate-fade-up mt-8 max-w-xl text-lg leading-relaxed text-white/70 [animation-delay:320ms]">
            Hi, I&apos;m <span className="font-semibold text-white">Aastha</span>, a freelance full-stack developer. Web, mobile,
            desktop, AI and the cloud underneath, from the first sketch to launch day. One person, fully accountable.
          </p>

          <div className="animate-fade-up mt-10 flex flex-wrap items-center gap-4 [animation-delay:400ms]">
            <Magnetic>
              <a
                href="#planner"
                className="group inline-flex items-center gap-2 rounded-full bg-sand px-7 py-4 text-base font-bold text-night shadow-[0_0_40px_-6px_rgba(232,216,195,0.35)] transition-shadow hover:shadow-[0_0_60px_-4px_rgba(232,216,195,0.45)]"
              >
                <Sparkles className="h-5 w-5" />
                Start your project
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-base font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-night"
              >
                See my work
              </a>
            </Magnetic>
          </div>

          <dl className="animate-fade-up mt-14 grid max-w-lg grid-cols-3 gap-6 [animation-delay:480ms]">
            {[
              { to: projectCount, suffix: "", label: "projects built" },
              { to: services.length, suffix: "", label: "things I build" },
              { to: 2.5, suffix: "+", label: "years shipping" },
            ].map((s) => (
              <div key={s.label}>
                <dd className="font-display text-3xl font-semibold sm:text-4xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-sm text-white/50">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden h-[560px] lg:block" aria-hidden="true">
          <motion.div style={l1} className="absolute right-0 top-6 w-[115%]">
            <div className="animate-float overflow-hidden rounded-2xl border border-white/15 bg-night-700 shadow-[0_30px_80px_-20px_rgba(169,150,232,0.35)]">
              <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-flare" />
                <span className="h-2.5 w-2.5 rounded-full bg-sand" />
                <span className="h-2.5 w-2.5 rounded-full bg-volt" />
              </div>
              <Image src={withBasePath("/work/northstone-dashboard.jpg")} alt="" width={1200} height={750} priority className="h-auto w-full" />
            </div>
          </motion.div>
          <motion.div style={l2} className="absolute -left-10 bottom-0 w-[42%]">
            <div className="animate-float -rotate-6 overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_60px_-15px_rgba(233,168,160,0.3)] [animation-delay:-2s]">
              <Image src={withBasePath("/work/nekodesk-panel-today.jpg")} alt="" width={551} height={840} className="h-auto w-full" />
            </div>
          </motion.div>
          <motion.div style={l3} className="absolute bottom-10 right-[-6%] w-[55%]">
            <div className="animate-float rotate-3 overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_60px_-15px_rgba(232,216,195,0.25)] [animation-delay:-4s]">
              <Image src={withBasePath("/work/video-agent-frame.jpg")} alt="" width={800} height={450} className="h-auto w-full" />
            </div>
          </motion.div>
        </div>
      </div>

      <a href="#marquee" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/50 sm:flex" aria-label="Scroll down">
        scroll
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
