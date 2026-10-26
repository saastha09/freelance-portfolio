"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

// Closing the menu collapses it in the same frame as the anchor jump, which cancels the
// browser's smooth scroll. So close first, then scroll once the menu has gone.
function goToSection(e: React.MouseEvent<HTMLAnchorElement>, close: () => void) {
  const id = e.currentTarget.getAttribute("href")?.slice(1);
  const target = id ? document.getElementById(id) : null;
  if (!target) return;
  e.preventDefault();
  close();
  window.setTimeout(() => {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  }, 320);
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 12);
    const planner = document.getElementById("planner");
    const nearPlanner = planner ? v + window.innerHeight > planner.offsetTop + 200 && v < planner.offsetTop + planner.offsetHeight : false;
    const contact = document.getElementById("contact");
    const atContact = contact ? v + window.innerHeight > contact.offsetTop + 160 : false;
    const projects = document.getElementById("projects");
    const inProjects = projects ? v + window.innerHeight > projects.offsetTop + 120 && v < projects.offsetTop + projects.offsetHeight - window.innerHeight * 0.6 : false;
    setShowCta(v > window.innerHeight * 0.8 && !nearPlanner && !atContact && !inProjects);
  });

  return (
    <>
      <motion.div className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-sand via-volt to-flare" style={{ scaleX: scrollYProgress }} />
      <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled || open ? "bg-night/70 backdrop-blur-xl" : "")}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-2.5 text-base font-bold tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-sand font-display text-sm font-semibold text-night transition-transform group-hover:rotate-12">AS</span>
            Aastha Sharma
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white">
                {l.label}
              </a>
            ))}
            <a href="#planner" className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-sand px-5 py-2 text-sm font-bold text-night transition-shadow hover:shadow-[0_0_30px_-4px_rgba(232,216,195,0.4)]">
              Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            className="rounded-full border border-white/20 p-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 md:hidden"
            >
              <div className="px-5 pb-6 pt-2">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => goToSection(e, () => setOpen(false))}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="mobile-link block border-b border-white/10 py-3 font-display text-3xl font-semibold"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <a href="#planner" onClick={(e) => goToSection(e, () => setOpen(false))} className="mt-5 block rounded-full bg-sand py-3 text-center font-bold text-night">
                  Start your project
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {showCta && (
          <motion.a
            href="#planner"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            data-testid="floating-cta"
            className="fixed bottom-5 left-1/2 z-50 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-sand px-6 py-3.5 font-bold text-night shadow-[0_10px_50px_-5px_rgba(232,216,195,0.35)] sm:left-auto sm:right-6 sm:translate-x-0"
          >
            <Sparkles className="h-4 w-4" /> Start a project
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
