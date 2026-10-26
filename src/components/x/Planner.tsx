"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Check, Mail, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { personal } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { WhatsappIcon } from "../portfolio/BrandIcons";
import { Heading } from "./Heading";

const NEEDS = [
  "Website",
  "Web app / SaaS",
  "Mobile app",
  "Desktop app",
  "AI feature or chatbot",
  "Automation / bot",
  "Dashboard or internal tool",
  "Payments & logins",
  "Backend / API",
  "Cloud & deployment",
  "IoT / devices",
  "Fix or upgrade an existing app",
];
const TIMELINES = ["As soon as possible", "Within a month", "2–3 months", "Flexible"];
const BUDGETS = ["Under ₹50k", "₹50k – ₹1.5L", "₹1.5L – ₹5L", "₹5L+", "Not sure yet"];

export function Planner() {
  const [step, setStep] = useState(0);
  const [needs, setNeeds] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [idea, setIdea] = useState("");

  const steps = ["What", "When", "Budget", "About you"];
  const canNext = [needs.length > 0, !!timeline, !!budget, name.trim().length > 0][step];

  const message = useMemo(
    () =>
      [
        `Hi Aastha, I'm ${name.trim() || "…"}.`,
        `I need: ${needs.join(", ") || "…"}.`,
        `Timeline: ${timeline || "…"}. Budget: ${budget || "…"}.`,
        idea.trim() ? `About the project: ${idea.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    [name, needs, timeline, budget, idea],
  );

  const wa = `${personal.whatsapp}?text=${encodeURIComponent(message)}`;
  const mail = `mailto:${personal.email}?subject=${encodeURIComponent(`New project: ${needs[0] ?? "enquiry"}`)}&body=${encodeURIComponent(message)}`;
  const done = step === steps.length;

  return (
    <section id="planner" className="relative px-5 py-28 sm:px-8 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-96 max-w-3xl rounded-full bg-sand/10 blur-[140px]" />
      <div className="relative mx-auto max-w-5xl">
        <Heading
          index="05"
          kicker="Start a project"
          title="Tell me what you need."
          accent="Takes 30 seconds."
          description="Pick a few options and I'll get a ready-to-send message. I reply within a day with how I'd build it, a timeline and a price."
        />

        <div className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-night-800/80 p-6 shadow-[0_40px_120px_-40px_rgba(169,150,232,0.25)] backdrop-blur sm:p-10">
          <div className="flex items-center gap-2" aria-label="Progress">
            {steps.map((s, i) => (
              <div key={s} className="flex-1">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-sand to-volt"
                    initial={false}
                    animate={{ width: step > i || done ? "100%" : step === i ? "50%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className={cn("mt-2 font-mono text-[11px]", step >= i ? "text-white/80" : "text-white/30")}>{s}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && (
                  <Choice title="What do you need built?" hint="Pick as many as you like." options={NEEDS} selected={needs} onPick={(o) => setNeeds((n) => (n.includes(o) ? n.filter((x) => x !== o) : [...n, o]))} />
                )}
                {step === 1 && <Choice title="When do you need it?" options={TIMELINES} selected={[timeline]} onPick={(o) => setTimeline(o)} />}
                {step === 2 && <Choice title="Roughly what budget?" hint="Helps me suggest the right scope. No commitment." options={BUDGETS} selected={[budget]} onPick={(o) => setBudget(o)} />}
                {step === 3 && (
                  <div>
                    <h3 className="font-display text-2xl font-semibold">Last bit: who are you?</h3>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-sm text-white/60">Your name</span>
                        <input
                          name="planner-name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Priya from Acme"
                          className="mt-2 w-full rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-sand"
                        />
                      </label>
                      <label className="block sm:col-span-2">
                        <span className="text-sm text-white/60">One line about the idea (optional)</span>
                        <textarea
                          name="planner-idea"
                          value={idea}
                          onChange={(e) => setIdea(e.target.value)}
                          rows={3}
                          placeholder="A booking app for my clinic, with reminders on WhatsApp…"
                          className="mt-2 w-full resize-none rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-sand"
                        />
                      </label>
                    </div>
                  </div>
                )}
                {done && (
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-sand text-night">
                        <Sparkles className="h-5 w-5" />
                      </span>
                      <h3 className="font-display text-2xl font-semibold">Your message is ready.</h3>
                    </div>
                    <pre data-testid="planner-message" className="mt-6 whitespace-pre-wrap rounded-2xl border border-white/10 bg-night p-5 font-sans text-sm leading-relaxed text-white/80">
                      {message}
                    </pre>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-sand px-6 py-3.5 font-bold text-night transition-transform hover:-translate-y-0.5">
                        <WhatsappIcon className="h-5 w-5" /> Send on WhatsApp
                      </a>
                      <a href={mail} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-night transition-transform hover:-translate-y-0.5">
                        <Mail className="h-5 w-5" /> Send by email
                      </a>
                      <a href={personal.cal} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-bold text-white transition-colors hover:border-white">
                        <Calendar className="h-5 w-5" /> Or book a call
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={cn("inline-flex items-center gap-2 text-sm text-white/60 hover:text-white", step === 0 && "invisible")}
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {!done && (
              <button
                type="button"
                disabled={!canNext}
                onClick={() => setStep((s) => s + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-sand px-6 py-3 font-bold text-night transition-all hover:shadow-[0_0_40px_-6px_rgba(232,216,195,0.4)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:shadow-none"
              >
                {step === steps.length - 1 ? "Create my message" : "Next"} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Choice({ title, hint, options, selected, onPick }: { title: string; hint?: string; options: string[]; selected: string[]; onPick: (o: string) => void }) {
  return (
    <div>
      <h3 className="font-display text-2xl font-semibold">{title}</h3>
      {hint && <p className="mt-2 text-white/50">{hint}</p>}
      <div className="mt-6 flex flex-wrap gap-3">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <motion.button
              key={o}
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={() => onPick(o)}
              aria-pressed={on}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors",
                on ? "border-sand bg-sand text-night" : "border-white/15 bg-white/[0.03] text-white/80 hover:border-white/40",
              )}
            >
              {on && <Check className="h-4 w-4" />}
              {o}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
