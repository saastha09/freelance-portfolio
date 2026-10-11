import { AlertTriangle, Bot, Building2, ChevronRight, ClipboardCheck, HardHat, IndianRupee, User, Wallet } from "lucide-react";
import { monthlyBilling, receivables, siteProjects, siteReports } from "@/lib/demo-data";
import { nextApprover, timeAgo } from "@/lib/demo-store";
import { inrShort } from "@/lib/utils";
import type { TabProps } from "./Dashboard";
import { Card, CardHeader, GroupedBarChart, Kpi, Progress, StatusBadge } from "./ui";

export function Overview({ state, goTo }: TabProps) {
  const orderBook = siteProjects.reduce((s, p) => s + p.budget, 0);
  const billed = monthlyBilling.reduce((s, m) => s + m.billed, 0);
  const collected = monthlyBilling.reduce((s, m) => s + m.collected, 0);
  const pending = state.requests.filter((r) => r.status === "pending");
  const pendingValue = pending.reduce((s, r) => s + r.amount, 0);
  const workers = siteReports.filter((r) => r.submitted).reduce((s, r) => s + r.manpower, 0);
  const overdue = receivables.reduce((s, r) => s + r.amount, 0);
  const missing = siteReports.filter((r) => !r.submitted);

  const attention = [
    ...pending.slice(0, 3).map((r) => ({
      key: r.id,
      text: `${r.id} · ${r.item} awaits ${nextApprover(state, r) ?? "approval"}`,
      meta: inrShort(r.amount),
      tab: "approvals" as const,
    })),
    ...missing.map((r) => ({
      key: r.id,
      text: `No progress report yet from ${siteProjects.find((p) => p.id === r.projectId)?.name}`,
      meta: "Today",
      tab: "reports" as const,
    })),
    ...receivables
      .filter((r) => r.overdueDays >= 30)
      .map((r) => ({ key: r.invoice, text: `${r.invoice} from ${r.client} is ${r.overdueDays} days overdue`, meta: inrShort(r.amount), tab: "automations" as const })),
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Kpi label="Order book" value={inrShort(orderBook)} hint={`${siteProjects.length} active projects`} icon={Building2} tone="indigo" />
        <Kpi
          label="Billed this FY"
          value={`₹${billed.toFixed(1)} Cr`}
          hint={`${Math.round((collected / billed) * 100)}% collected (₹${collected.toFixed(1)} Cr)`}
          icon={IndianRupee}
          tone="emerald"
        />
        <Kpi label="Pending approvals" value={String(pending.length)} hint={`${inrShort(pendingValue)} waiting on sign-off`} icon={ClipboardCheck} tone="amber" />
        <Kpi label="On site today" value={String(workers)} hint={`${missing.length} sites yet to report`} icon={HardHat} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader title="Billing vs collections" subtitle="Monthly, FY 2026–27 (₹ crore)" />
          <div className="p-5 pb-9">
            <GroupedBarChart
              unit=" Cr"
              series={[
                { name: "Billed", color: "#6366f1" },
                { name: "Collected", color: "#10b981" },
              ]}
              data={monthlyBilling.map((m) => ({ label: m.month, values: [m.billed, m.collected] }))}
            />
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Needs your attention"
            subtitle={`${attention.length} items`}
            action={<AlertTriangle className="h-4 w-4 text-amber-500" />}
          />
          <ul className="divide-y divide-slate-100">
            {attention.map((a) => (
              <li key={a.key}>
                <button type="button" onClick={() => goTo(a.tab)} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-slate-50">
                  <span className="min-w-0 flex-1 text-sm text-slate-700">{a.text}</span>
                  <span className="shrink-0 text-xs font-medium text-slate-500">{a.meta}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
                </button>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader
            title="Projects at a glance"
            subtitle="Physical progress vs budget consumed"
            action={
              <button type="button" onClick={() => goTo("projects")} className="text-xs font-medium text-indigo-600 hover:underline">
                View all
              </button>
            }
          />
          <div className="divide-y divide-slate-100">
            {siteProjects.map((p) => {
              const used = Math.round((p.spent / p.budget) * 100);
              const overrun = used > p.progress + 3;
              return (
                <div key={p.id} className="grid gap-3 px-5 py-3.5 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_76px] sm:items-center">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.manager} · due {p.end}</p>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-[11px] text-slate-500">
                      <span>Progress</span>
                      <span>{p.progress}%</span>
                    </div>
                    <Progress value={p.progress} />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-[11px] text-slate-500">
                      <span>Budget used</span>
                      <span className={overrun ? "font-medium text-rose-600" : ""}>{used}%</span>
                    </div>
                    <Progress value={used} tone={overrun ? "rose" : "emerald"} />
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              );
            })}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Overdue receivables" subtitle={`${inrShort(overdue)} outstanding`} action={<Wallet className="h-4 w-4 text-slate-400" />} />
            <ul className="divide-y divide-slate-100">
              {receivables.map((r) => (
                <li key={r.invoice} className="flex items-center justify-between px-5 py-3 text-sm">
                  <span>
                    <span className="font-medium">{r.client}</span>
                    <span className="block text-xs text-slate-500">{r.invoice}</span>
                  </span>
                  <span className="text-right">
                    <span className="block font-medium">{inrShort(r.amount)}</span>
                    <span className={`text-xs ${r.overdueDays >= 30 ? "text-rose-600" : "text-amber-600"}`}>{r.overdueDays}d overdue</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <CardHeader title="Recent activity" />
            <ul className="max-h-72 space-y-3 overflow-y-auto p-5">
              {state.activity.slice(0, 6).map((a) => (
                <li key={a.id} className="flex gap-3 text-sm">
                  <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${a.kind === "automation" ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
                    {a.kind === "automation" ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-slate-700">{a.text}</span>
                    <span className="text-xs text-slate-400">{timeAgo(a.at)}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
