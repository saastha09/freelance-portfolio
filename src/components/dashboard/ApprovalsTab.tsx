"use client";

import { Check, FileCheck2, Info, Plus, X } from "lucide-react";
import { useState } from "react";
import { FINANCE_THRESHOLD, siteProjects } from "@/lib/demo-data";
import {
  bumpAutomation,
  isEnabled,
  logActivity,
  newRequestId,
  nextApprover,
  requiredApprovers,
  timeAgo,
  type DemoState,
  type PurchaseRequest,
  type RequestStatus,
} from "@/lib/demo-store";
import { cn, inr } from "@/lib/utils";
import type { TabProps } from "./Dashboard";
import { Card, Pill } from "./ui";

const filters: { id: RequestStatus | "all"; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "rejected", label: "Rejected" },
  { id: "all", label: "All" },
];

function approve(s: DemoState, id: string): DemoState {
  const r = s.requests.find((x) => x.id === id);
  if (!r) return s;
  const step = nextApprover(s, r);
  const approvals = step ? [...r.approvals, step] : r.approvals;
  const done = requiredApprovers(s, r.amount).every((a) => approvals.includes(a));
  let next: DemoState = {
    ...s,
    requests: s.requests.map((x) => (x.id === id ? { ...x, approvals, status: done ? "approved" : "pending" } : x)),
  };
  next = logActivity(next, step ? `You approved ${id} as ${step}` : `You gave final sign-off on ${id}`, "user");

  if (done && isEnabled(next, "auto-po")) {
    const po = `PO-${next.poCounter}`;
    next = {
      ...next,
      poCounter: next.poCounter + 1,
      requests: next.requests.map((x) => (x.id === id ? { ...x, poNumber: po } : x)),
    };
    next = logActivity(next, `${po} generated and emailed to ${r.vendor}; WhatsApp sent to ${r.raisedBy}`);
    next = bumpAutomation(next, "auto-po");
  } else if (done) {
    next = logActivity(next, `${id} fully approved. PO automation is off, so the PO needs to be raised manually`, "user");
  }
  return next;
}

function reject(s: DemoState, id: string): DemoState {
  const next: DemoState = {
    ...s,
    requests: s.requests.map((x) => (x.id === id ? { ...x, status: "rejected" } : x)),
  };
  return logActivity(next, `You rejected ${id}`, "user");
}

export function ApprovalsTab({ state, update, goTo }: TabProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("pending");
  const [showForm, setShowForm] = useState(false);
  const financeOn = isEnabled(state, "finance-gate");

  const list = state.requests
    .filter((r) => filter === "all" || r.status === filter)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 text-sm text-indigo-900 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-start gap-2">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            Workflow: <strong>Site engineer → Project manager → Purchase</strong>
            {financeOn ? (
              <>
                {" "}
                → <strong>Finance</strong> for requests above {inr(FINANCE_THRESHOLD)}
              </>
            ) : (
              <> (Finance step is currently switched off)</>
            )}
            . Approve a request through every step to see the PO automation fire.
          </span>
        </p>
        <button type="button" onClick={() => goTo("automations")} className="shrink-0 text-xs font-semibold text-indigo-700 underline">
          Edit rules
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const count = f.id === "all" ? state.requests.length : state.requests.filter((r) => r.status === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  filter === f.id ? "bg-slate-900 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
                )}
              >
                {f.label} · {count}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setShowForm((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
        >
          <Plus className="h-3.5 w-3.5" /> Raise request
        </button>
      </div>

      {showForm && (
        <NewRequestForm
          onCancel={() => setShowForm(false)}
          onSubmit={(r) => {
            update((s) => {
              const id = newRequestId(s);
              const next: DemoState = { ...s, requests: [{ ...r, id }, ...s.requests] };
              return logActivity(next, `${r.raisedBy} raised ${id}: ${r.item} (${inr(r.amount)})`, "user");
            });
            setShowForm(false);
            setFilter("pending");
          }}
        />
      )}

      <div className="space-y-3">
        {list.map((r) => (
          <RequestCard
            key={r.id}
            request={r}
            state={state}
            onApprove={() => update((s) => approve(s, r.id))}
            onReject={() => update((s) => reject(s, r.id))}
          />
        ))}
        {list.length === 0 && (
          <Card className="p-10 text-center text-sm text-slate-500">Nothing here. Raise a request to try the workflow.</Card>
        )}
      </div>
    </div>
  );
}

function RequestCard({
  request: r,
  state,
  onApprove,
  onReject,
}: {
  request: PurchaseRequest;
  state: DemoState;
  onApprove: () => void;
  onReject: () => void;
}) {
  const project = siteProjects.find((p) => p.id === r.projectId);
  const chain = r.status === "approved" ? r.approvals : requiredApprovers(state, r.amount);
  const steps = ["Raised", ...chain];
  const next = r.status === "pending" ? (nextApprover(state, r) ?? "final sign-off") : undefined;

  return (
    <Card className="p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-slate-500">{r.id}</span>
            {r.status === "pending" && <Pill tone="amber">Awaiting {next}</Pill>}
            {r.status === "approved" && <Pill tone="green">Approved</Pill>}
            {r.status === "rejected" && <Pill tone="red">Rejected</Pill>}
            {r.poNumber && (
              <Pill tone="indigo">
                <FileCheck2 className="mr-1 h-3 w-3" />
                {r.poNumber} sent
              </Pill>
            )}
          </div>
          <h3 className="mt-2 font-semibold">
            {r.item} <span className="font-normal text-slate-500">· {r.quantity}</span>
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            {project?.name} · Vendor: {r.vendor} · {r.raisedBy} · {timeAgo(r.createdAt)}
          </p>
        </div>
        <p className="shrink-0 text-xl font-semibold tracking-tight">{inr(r.amount)}</p>
      </div>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <ol className="flex flex-1 flex-wrap items-center gap-y-2">
          {steps.map((step, i) => {
            const done = i === 0 || r.approvals.includes(step);
            const isRejectedHere = r.status === "rejected" && step === steps[r.approvals.length + 1];
            const current = r.status === "pending" && step === next;
            return (
              <li key={step} className="flex items-center">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium",
                    done && "bg-emerald-50 text-emerald-700",
                    current && "bg-amber-50 text-amber-700 ring-1 ring-amber-300",
                    isRejectedHere && "bg-rose-50 text-rose-700",
                    !done && !current && !isRejectedHere && "bg-slate-100 text-slate-500",
                  )}
                >
                  {done ? <Check className="h-3 w-3" /> : isRejectedHere ? <X className="h-3 w-3" /> : null}
                  {step}
                </span>
                {i < steps.length - 1 && <span className="mx-1.5 h-px w-4 bg-slate-300" />}
              </li>
            );
          })}
          {r.status === "approved" && r.poNumber && (
            <li className="flex items-center">
              <span className="mx-1.5 h-px w-4 bg-slate-300" />
              <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700">PO auto-sent</span>
            </li>
          )}
        </ol>

        {r.status === "pending" && (
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={onReject}
              className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={onApprove}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
            >
              <Check className="h-3.5 w-3.5" /> {next === "final sign-off" ? "Give final sign-off" : `Approve as ${next}`}
            </button>
          </div>
        )}
      </div>
    </Card>
  );
}

function NewRequestForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (r: Omit<PurchaseRequest, "id">) => void;
  onCancel: () => void;
}) {
  const input = "w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100";

  function handle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    onSubmit({
      item: String(f.get("item")),
      quantity: String(f.get("quantity")),
      amount: Number(f.get("amount")),
      projectId: String(f.get("projectId")),
      vendor: String(f.get("vendor")),
      raisedBy: "You (Site Engg.)",
      createdAt: new Date().toISOString(),
      approvals: [],
      status: "pending",
    });
  }

  return (
    <Card className="p-5">
      <form onSubmit={handle} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <input name="item" required placeholder="Material / service" defaultValue="AAC blocks 600×200×200" className={cn(input, "lg:col-span-2")} />
        <input name="quantity" required placeholder="Quantity" defaultValue="12,000 nos" className={input} />
        <input name="amount" required type="number" min={1000} step={1000} placeholder="Amount (₹)" defaultValue={640000} className={input} />
        <input name="vendor" required placeholder="Vendor" defaultValue="Magicrete Distributors" className={input} />
        <select name="projectId" className={cn(input, "lg:col-span-2")}>
          {siteProjects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <div className="flex gap-2 sm:col-span-2 lg:col-span-3 lg:justify-end">
          <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
            Submit for approval
          </button>
        </div>
      </form>
    </Card>
  );
}
