"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, MapPin, Phone } from "lucide-react";
import { leadStages, logActivity, timeAgo, type Lead } from "@/lib/demo-store";
import { cn } from "@/lib/utils";
import type { TabProps } from "./Dashboard";
import { Pill } from "./ui";

const stageColors: Record<Lead["stage"], string> = {
  New: "bg-sky-500",
  Contacted: "bg-indigo-500",
  "Site visit": "bg-amber-500",
  "Quote sent": "bg-violet-500",
  Won: "bg-emerald-500",
};

export function LeadsTab({ state, update }: TabProps) {
  function move(lead: Lead, dir: 1 | -1) {
    const idx = leadStages.indexOf(lead.stage) + dir;
    if (idx < 0 || idx >= leadStages.length) return;
    const stage = leadStages[idx];
    update((s) =>
      logActivity(
        { ...s, leads: s.leads.map((l) => (l.id === lead.id ? { ...l, stage } : l)) },
        `${lead.name} moved to ${stage}`,
        "user",
      ),
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>New enquiries from the company website land here automatically and are assigned to sales.</span>
        <Link href="/demo#contact" className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-indigo-700 hover:underline">
          Submit a test enquiry <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="scrollbar-thin -mx-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8">
        <div className="grid min-w-[940px] grid-cols-5 gap-3">
          {leadStages.map((stage) => {
            const leads = state.leads.filter((l) => l.stage === stage);
            return (
              <div key={stage} className="rounded-xl bg-slate-100/80 p-3">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                    <span className={cn("h-2 w-2 rounded-full", stageColors[stage])} />
                    {stage}
                  </span>
                  <span className="text-xs text-slate-500">{leads.length}</span>
                </div>
                <div className="space-y-2.5">
                  {leads.map((l) => (
                    <article key={l.id} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                      <p className="truncate text-sm font-semibold">{l.name}</p>
                      <div className="mt-0.5 flex items-center justify-between gap-2">
                        <p className="truncate text-xs text-slate-500">{l.company}</p>
                        <Pill tone={l.source === "Website" ? "indigo" : "slate"}>{l.source}</Pill>
                      </div>
                      <p className="mt-2 text-xs text-slate-600">{l.projectType}</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {l.location}
                        </span>
                        <span>{l.budget}</span>
                      </div>
                      {l.message && <p className="mt-2 line-clamp-2 text-[11px] italic text-slate-500">&ldquo;{l.message}&rdquo;</p>}
                      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
                        <span className="text-[11px] text-slate-400">
                          {l.owner.split(" ")[0]} · {timeAgo(l.createdAt)}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <a href={`tel:${l.phone.replace(/\s/g, "")}`} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Call">
                            <Phone className="h-3.5 w-3.5" />
                          </a>
                          <button
                            type="button"
                            disabled={stage === leadStages[0]}
                            onClick={() => move(l, -1)}
                            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
                            aria-label="Move back"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={stage === "Won"}
                            onClick={() => move(l, 1)}
                            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30"
                            aria-label="Move forward"
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </span>
                      </div>
                    </article>
                  ))}
                  {leads.length === 0 && <p className="rounded-lg border border-dashed border-slate-300 p-4 text-center text-xs text-slate-400">Empty</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
