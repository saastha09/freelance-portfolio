"use client";

import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { personal } from "@/lib/portfolio-data";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "../portfolio/BrandIcons";
import { Magnetic } from "./fx";

export function Contact() {
  const channels = [
    { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: WhatsappIcon, label: "WhatsApp", value: personal.phone, href: personal.whatsapp },
    { icon: Phone, label: "Call", value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}` },
  ];

  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-volt/25 blur-[160px]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
          <span className="text-sand">07</span>
          <span className="h-px w-12 bg-white/30" />
          Let&apos;s talk
        </p>

        <a href="#planner" className="group mt-8 block">
          <span className="block font-display text-[12vw] font-semibold leading-[0.95] tracking-tight lg:text-[7rem]">
            <span className="text-outline transition-colors duration-500 group-hover:text-sand">Let&apos;s</span>
            <br />
            <span className="inline-flex items-center gap-4">
              build
              <ArrowUpRight className="h-[0.7em] w-[0.7em] text-sand transition-transform duration-500 group-hover:-translate-y-3 group-hover:translate-x-3" />
            </span>
          </span>
        </a>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-sand hover:bg-sand hover:text-night"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 transition-colors group-hover:bg-night group-hover:text-sand">
                <c.icon className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-[11px] uppercase opacity-60">{c.label}</span>
                <span className="block truncate font-semibold">{c.value}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <Magnetic>
            <a
              href={personal.cal}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sand px-7 py-4 font-bold text-night shadow-[0_0_40px_-6px_rgba(232,216,195,0.35)]"
            >
              Book a free 15-min call <ArrowUpRight className="h-5 w-5" />
            </a>
          </Magnetic>
          <a href={personal.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-semibold hover:border-white">
            <LinkedinIcon className="h-4 w-4" /> LinkedIn
          </a>
          <a href={personal.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-semibold hover:border-white">
            <GithubIcon className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-white/40 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {personal.name} · {personal.location}
        </p>
        <div className="flex gap-5">
          <Link href="/demo" className="hover:text-white">
            Demo website
          </Link>
          <Link href="/demo/dashboard" className="hover:text-white">
            Demo dashboard
          </Link>
          <a href={personal.github} target="_blank" rel="noreferrer" className="hover:text-white">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
