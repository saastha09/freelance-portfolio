"use client";

import { Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { siteProjects, type ProjectStatus } from "@/lib/demo-data";
import { inrShort } from "@/lib/utils";
import { Card, Progress, StatusBadge } from "./ui";

const filters: ("All" | ProjectStatus)[] = ["All", "On track", "At risk", "Delayed", "Handover"];

export function ProjectsTab() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof filters)[number]>("All");

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    return siteProjects.filter(
      (p) =>
        (status === "All" || p.status === status) &&
        [p.name, p.client, p.location, p.manager].some((v) => v.toLowerCase().includes(q)),
    );
  }, [query, status]);

  function exportCsv() {
    const header = ["ID", "Project", "Client", "Location", "Manager", "Progress %", "Budget (INR)", "Spent (INR)", "Status"];
    const lines = rows.map((p) => [p.id, p.name, p.client, p.location, p.manager, p.progress, p.budget, p.spent, p.status].map((v) => `"${v}"`).join(","));
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "northstone-projects.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <Card>
      <div className="flex flex-col gap-3 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search project, client, PM…"
            className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setStatus(f)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${status === f ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {f}
            </button>
          ))}
          <button
            type="button"
            onClick={exportCsv}
            className="ml-1 inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
        </div>
      </div>

      <div className="scrollbar-thin overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">Project</th>
              <th className="px-3 py-3 font-medium">Client</th>
              <th className="px-3 py-3 font-medium">PM</th>
              <th className="px-3 py-3 font-medium">Timeline</th>
              <th className="w-40 px-3 py-3 font-medium">Progress</th>
              <th className="px-3 py-3 font-medium">Budget / spent</th>
              <th className="px-3 py-3 font-medium">Crew</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/60">
                <td className="px-5 py-3.5">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-slate-500">
                    {p.id} · {p.category} · {p.location}
                  </p>
                </td>
                <td className="px-3 py-3.5 text-slate-600">{p.client}</td>
                <td className="px-3 py-3.5 text-slate-600">{p.manager}</td>
                <td className="whitespace-nowrap px-3 py-3.5 text-xs text-slate-500">
                  {p.start} → {p.end}
                </td>
                <td className="px-3 py-3.5">
                  <div className="flex items-center gap-2">
                    <Progress value={p.progress} />
                    <span className="w-9 text-right text-xs text-slate-600">{p.progress}%</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <span className="font-medium">{inrShort(p.budget)}</span>
                  <span className="text-slate-400"> / {inrShort(p.spent)}</span>
                </td>
                <td className="px-3 py-3.5 text-slate-600">{p.workers}</td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-10 text-center text-sm text-slate-500">
                  No projects match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
