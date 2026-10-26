"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { about, personal, stack } from "@/lib/portfolio-data";
import { Heading } from "./Heading";

export function About() {
  const rows = [stack.slice(0, 3).flatMap((g) => g.items), stack.slice(3).flatMap((g) => g.items)];

  return (
    <section id="about" className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <motion.div
          className="relative mx-auto w-full max-w-sm"
          initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sand via-volt to-flare opacity-60 blur-2xl" />
          <Image
            src={personal.photoUrl}
            alt="Aastha Sharma"
            width={600}
            height={600}
            className="relative aspect-square w-full rounded-[2rem] border border-white/20 object-cover"
          />
          <svg viewBox="0 0 120 120" className="absolute -bottom-10 -right-8 h-32 w-32 animate-spin-slow" aria-hidden="true">
            <defs>
              <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
            </defs>
            <circle cx="60" cy="60" r="58" fill="#E8D8C3" />
            <text className="fill-night font-mono text-[10.5px] font-bold uppercase tracking-[0.2em]">
              <textPath href="#badge-circle">available for freelance · available for freelance ·</textPath>
            </text>
          </svg>
        </motion.div>

        <div>
          <Heading index="06" kicker="About" title="Hi, I'm Aastha." accent="Nice to meet you." />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/70">
            {about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 space-y-3" aria-label="Toolkit">
        {rows.map((items, r) => (
          <div key={r} className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className={r === 0 ? "flex w-max animate-marquee gap-3" : "flex w-max animate-marquee-rev gap-3"}>
              {[...items, ...items].map((t, i) => (
                <span key={`${t}-${i}`} className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 font-mono text-sm text-white/75">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
