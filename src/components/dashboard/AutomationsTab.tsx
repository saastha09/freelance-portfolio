"use client";

import { ArrowRight, Bot, User, Zap } from "lucide-react";
import { logActivity, timeAgo } from "@/lib/demo-store";
import type { TabProps } from "./Dashboard";
import { Card, CardHeader, Toggle } from "./ui";

export function AutomationsTab({ state, update }: TabProps) {
  const totalRuns = state.automations.reduce((s, a) => s + a.runs, 0);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
      <div className="space-y-3">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{totalRuns} automated actions</span> this month, each one a phone call, WhatsApp
          message or spreadsheet update nobody had to do by hand.
        </p>
        {state.automations.map((a) => (
          <Card key={a.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${a.enabled ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"}`}>
                  <Zap className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-semibold">{a.name}</h3>
                  <div className="mt-2 flex flex-col gap-1.5 text-xs text-slate-600 sm:flex-row sm:items-center sm:gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1">
                      <span className="font-semibold text-slate-500">WHEN</span> {a.trigger}
                    </span>
                    <ArrowRight className="hidden h-3.5 w-3.5 shrink-0 text-slate-400 sm:block" />
                    <span className="rounded-md bg-indigo-50 px-2 py-1 text-indigo-800">
                      <span className="font-semibold text-indigo-500">THEN</span> {a.action}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">{a.runs} runs this month</p>
                </div>
              </div>
              <Toggle
                checked={a.enabled}
                label={`Toggle ${a.name}`}
                onChange={() =>
                  update((s) =>
                    logActivity(
                      { ...s, automations: s.automations.map((x) => (x.id === a.id ? { ...x, enabled: !x.enabled } : x)) },
                      `${a.enabled ? "Paused" : "Enabled"} automation "${a.name}"`,
                      "user",
                    ),
                  )
                }
              />
            </div>
          </Card>
        ))}
      </div>

      <Card className="h-fit xl:sticky xl:top-24">
        <CardHeader title="Activity log" subtitle="Every action, by people and by automations" />
        <ul className="max-h-[560px] space-y-4 overflow-y-auto p-5">
          {state.activity.map((a) => (
            <li key={a.id} className="flex gap-3 text-sm">
              <span
                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${a.kind === "automation" ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"}`}
              >
                {a.kind === "automation" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
              </span>
              <span className="min-w-0">
                <span className="block text-slate-700">{a.text}</span>
                <span className="text-xs text-slate-400">
                  {a.kind === "automation" ? "Automation" : "User"} · {timeAgo(a.at)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
