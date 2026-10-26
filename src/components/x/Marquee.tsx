"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Asterisk } from "lucide-react";
import { useRef } from "react";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** A row of text that scrolls forever and speeds up / skews with page scroll velocity. */
function VelocityRow({ items, baseVelocity, outline }: { items: string[]; baseVelocity: number; outline?: boolean }) {
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2500, 0, 2500], [8, 0, -8]);
  const x = useTransform(base, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    move += direction.current * move * f;
    base.set(base.get() + move);
  });

  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className={outline ? "text-outline" : "text-white"}>{t}</span>
          <Asterisk className="mx-5 h-7 w-7 shrink-0 text-sand sm:h-9 sm:w-9" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex font-display text-3xl font-semibold uppercase tracking-tight sm:text-5xl lg:text-[3.6rem]" style={{ x, skewX: skew }}>
        {row}
        {row}
      </motion.div>
    </div>
  );
}

export function Marquee({ top, bottom }: { top: string[]; bottom: string[] }) {
  return (
    <section id="marquee" aria-label="What I build" className="relative -rotate-[1.5deg] scale-[1.04] space-y-2 border-y border-white/10 bg-night-800 py-6">
      <VelocityRow items={top} baseVelocity={-3} />
      <VelocityRow items={bottom} baseVelocity={3} outline />
    </section>
  );
}
