"use client";

import { AlertTriangle, BellRing, Camera, CheckCircle2, Clock, Users } from "lucide-react";
import { siteProjects, siteReports } from "@/lib/demo-data";
import { bumpAutomation, isEnabled, logActivity, type DemoState } from "@/lib/demo-store";
import type { TabProps } from "./Dashboard";
import { Card, Kpi, Pill } from "./ui";

export function ReportsTab({ state, update }: TabProps) {
  const submitted = siteReports.filter((r) => r.submitted);
  const missing = siteReports.filter((r) => !r.submitted);
  const issues = submitted.filter((r) => r.issue);
  const autoOn = isEnabled(state, "dpr-reminder");
  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" });

  function remind(ids: string[]) {
    update((s) => {
      let next: DemoState = { ...s, remindedReports: Array.from(new Set([...s.remindedReports, ...ids])) };
      for (const id of ids) {
        const r = siteReports.find((x) => x.id === id)!;
        const p = siteProjects.find((x) => x.id === r.projectId)!;
        next = logActivity(next, `WhatsApp reminder sent to ${r.submittedBy.split(" ")[0]} for ${p.name} daily report`);
      }
      return bumpAutomation(next, "dpr-reminder");
    });
  }

  const pendingReminders = missing.filter((r) => !state.remindedReports.includes(r.id)).map((r) => r.id);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Kpi label="Reports received" value={`${submitted.length} / ${siteReports.length}`} hint={today} icon={CheckCircle2} tone="emerald" />
        <Kpi label="Workforce reported" value={String(submitted.reduce((s, r) => s + r.manpower, 0))} hint="Across reporting sites" icon={Users} tone="indigo" />
        <Kpi label="Issues flagged" value={String(issues.length)} hint="Need PM attention" icon={AlertTriangle} tone="amber" />
        <Kpi label="Site photos" value={String(submitted.reduce((s, r) => s + r.photos, 0))} hint="Uploaded from mobile" icon={Camera} />
      </div>

      {missing.length > 0 && (
        <div className="flex flex-col gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-2 text-sm text-amber-900">
            <Clock className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {missing.length} sites haven&apos;t reported yet.{" "}
              {autoOn ? "Automatic reminders go out at 6 PM, or send them now." : "Automatic reminders are switched off."}
            </span>
          </p>
          <button
            type="button"
            disabled={pendingReminders.length === 0}
            onClick={() => remind(pendingReminders)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-semibold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <BellRing className="h-3.5 w-3.5" />
            {pendingReminders.length === 0 ? "Reminders sent" : "Remind all now"}
          </button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {siteReports.map((r) => {
          const p = siteProjects.find((x) => x.id === r.projectId)!;
          const reminded = state.remindedReports.includes(r.id);
          return (
            <Card key={r.id} className="min-w-0 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-semibold">{p.name}</p>
                  <p className="text-xs text-slate-500">{r.submittedBy}</p>
                </div>
                {r.submitted ? <Pill tone="green">Submitted</Pill> : reminded ? <Pill tone="indigo">Reminder sent</Pill> : <Pill tone="amber">Missing</Pill>}
              </div>

              {r.submitted ? (
                <>
                  <p className="mt-3 text-sm text-slate-700">{r.workDone}</p>
                  {r.issue && (
                    <p className="mt-3 flex items-start gap-2 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-800">
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {r.issue}
                    </p>
                  )}
                  <div className="mt-4 flex gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" /> {r.manpower} workers
                    </span>
                    <span className="flex items-center gap-1">
                      <Camera className="h-3.5 w-3.5" /> {r.photos} photos
                    </span>
                  </div>
                </>
              ) : (
                <div className="mt-4 flex items-center justify-between rounded-lg border border-dashed border-slate-300 p-3">
                  <span className="text-xs text-slate-500">No report submitted today</span>
                  <button
                    type="button"
                    disabled={reminded}
                    onClick={() => remind([r.id])}
                    className="text-xs font-semibold text-indigo-700 hover:underline disabled:text-slate-400 disabled:no-underline"
                  >
                    {reminded ? "Reminded" : "Send reminder"}
                  </button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
