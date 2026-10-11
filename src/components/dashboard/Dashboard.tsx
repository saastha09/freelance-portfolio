"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  RotateCcw,
  Users,
  Zap,
} from "lucide-react";
import { siteReports } from "@/lib/demo-data";
import { useDemoState, type DemoState } from "@/lib/demo-store";
import { cn } from "@/lib/utils";
import { ApprovalsTab } from "./ApprovalsTab";
import { AutomationsTab } from "./AutomationsTab";
import { LeadsTab } from "./LeadsTab";
import { Overview } from "./Overview";
import { ProjectsTab } from "./ProjectsTab";
import { ReportsTab } from "./ReportsTab";

export type TabId = "overview" | "projects" | "approvals" | "leads" | "reports" | "automations";

export type TabProps = {
  state: DemoState;
  update: (fn: (s: DemoState) => DemoState) => void;
  goTo: (tab: TabId) => void;
};

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }>; title: string; subtitle: string }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, title: "Welcome back, Rohan", subtitle: "Here's how the business looks today." },
  { id: "projects", label: "Projects", icon: FolderKanban, title: "Projects", subtitle: "Progress, budget and status across every site." },
  { id: "approvals", label: "Approvals", icon: ClipboardCheck, title: "Purchase approvals", subtitle: "Multi-level approval workflow for material and equipment requests." },
  { id: "leads", label: "Leads", icon: Users, title: "Sales pipeline", subtitle: "Enquiries from the website and referrals, from first call to won." },
  { id: "reports", label: "Site reports", icon: ClipboardList, title: "Daily progress reports", subtitle: "Today's submissions from every site, with automatic reminders." },
  { id: "automations", label: "Automations", icon: Zap, title: "Automations", subtitle: "Rules that run in the background. Toggle one and watch the workflow change." },
];

export function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { state, update, reset } = useDemoState();
  const [resetCount, setResetCount] = useState(0);
  const [showResetToast, setShowResetToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  function handleReset() {
    reset();
    // Remount the active tab so local UI state (filters, open forms) resets too.
    setResetCount((c) => c + 1);
    setShowResetToast(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setShowResetToast(false), 2500);
  }

  const active = (tabs.find((t) => t.id === params.get("tab"))?.id ?? "overview") as TabId;
  const current = tabs.find((t) => t.id === active)!;
  const goTo = (tab: TabId) => router.replace(tab === "overview" ? pathname : `${pathname}?tab=${tab}`, { scroll: false });

  const badges: Partial<Record<TabId, number>> = state
    ? {
        approvals: state.requests.filter((r) => r.status === "pending").length,
        leads: state.leads.filter((l) => l.stage === "New").length,
        reports: siteReports.filter((r) => !r.submitted).length,
      }
    : {};

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <Link href="/demo" className="flex items-center gap-2.5 border-b border-slate-100 px-5 py-4">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-stone-900 text-xs font-bold text-amber-400">NS</span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">Northstone Ops</span>
            <span className="block text-[11px] text-slate-500">Internal workspace</span>
          </span>
        </Link>
        <nav className="flex-1 space-y-0.5 p-3">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => goTo(t.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                active === t.id ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <t.icon className="h-4 w-4" />
              <span className="flex-1 text-left">{t.label}</span>
              {!!badges[t.id] && (
                <span className="rounded-full bg-slate-900 px-1.5 text-[10px] font-semibold leading-4 text-white">{badges[t.id]}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-indigo-600 text-xs font-semibold text-white">RM</span>
            <div className="leading-tight">
              <p className="text-sm font-medium">Rohan Menon</p>
              <p className="text-[11px] text-slate-500">Director, Operations</p>
            </div>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-5 py-3 sm:px-8">
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold tracking-tight">{current.title}</h1>
              <p className="hidden truncate text-xs text-slate-500 sm:block">{current.subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                title="Restore the original sample data"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset demo</span>
              </button>
              <button
                type="button"
                onClick={() => goTo("automations")}
                className="relative rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                aria-label="Activity"
              >
                <Bell className="h-4 w-4" />
                {state && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />}
              </button>
            </div>
          </div>
          <nav className="scrollbar-thin flex gap-1 overflow-x-auto px-3 pb-2 lg:hidden">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => goTo(t.id)}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs",
                  active === t.id ? "bg-indigo-600 font-medium text-white" : "bg-slate-100 text-slate-600",
                )}
              >
                <t.icon className="h-3.5 w-3.5" />
                {t.label}
                {!!badges[t.id] && <span className="font-semibold">· {badges[t.id]}</span>}
              </button>
            ))}
          </nav>
        </header>

        <main className="px-5 py-6 sm:px-8">
          {!state ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-28 animate-pulse rounded-xl bg-slate-200/60" />
              ))}
            </div>
          ) : (
            <div key={resetCount}>
              {active === "overview" && <Overview state={state} update={update} goTo={goTo} />}
              {active === "projects" && <ProjectsTab />}
              {active === "approvals" && <ApprovalsTab state={state} update={update} goTo={goTo} />}
              {active === "leads" && <LeadsTab state={state} update={update} goTo={goTo} />}
              {active === "reports" && <ReportsTab state={state} update={update} goTo={goTo} />}
              {active === "automations" && <AutomationsTab state={state} update={update} goTo={goTo} />}
            </div>
          )}
        </main>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-200",
          showResetToast ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        )}
      >
        {showResetToast && (
          <span className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-lg">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Demo data reset
          </span>
        )}
      </div>
    </div>
  );
}
