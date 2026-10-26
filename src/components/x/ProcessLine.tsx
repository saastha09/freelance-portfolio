"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { engagements, process } from "@/lib/portfolio-data";
import { Heading } from "./Heading";

export function ProcessLine() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="process" className="relative px-5 py-28 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <Heading index="04" kicker="How we'd work" title="Something working in" accent="week one." />

        <ol ref={ref} className="relative mt-14 space-y-10 pl-12 sm:pl-20">
          <span className="absolute bottom-0 left-[15px] top-0 w-0.5 bg-white/10 sm:left-[23px]" aria-hidden="true" />
          <motion.span
            className="absolute left-[15px] top-0 w-0.5 origin-top bg-gradient-to-b from-sand via-volt to-flare sm:left-[23px]"
            style={{ scaleY: line, height: "100%" }}
            aria-hidden="true"
          />
          {process.map((p, i) => (
            <motion.li
              key={p.step}
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="absolute -left-12 top-1 grid h-8 w-8 place-items-center rounded-full border-2 border-sand bg-night font-mono text-xs font-bold text-sand sm:-left-[4.25rem] sm:h-12 sm:w-12 sm:text-sm">
                {p.step}
              </span>
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{p.title}</h3>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">{p.body}</p>
              {i === 1 && (
                <p className="mt-4 inline-flex rounded-full bg-sand/10 px-3 py-1 text-sm font-semibold text-sand">
                  You see a clickable prototype within the first week
                </p>
              )}
            </motion.li>
          ))}
        </ol>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {engagements.map((e, i) => (
            <motion.div
              key={e.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-7"
            >
              <p className="font-mono text-xs text-sand">Option {i + 1}</p>
              <h3 className="mt-3 font-display text-xl font-semibold">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{e.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
