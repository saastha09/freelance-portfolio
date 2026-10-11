"use client";

import { useCallback, useSyncExternalStore } from "react";
import { FINANCE_THRESHOLD, salesTeam } from "./demo-data";

export type RequestStatus = "pending" | "approved" | "rejected";

export type PurchaseRequest = {
  id: string;
  item: string;
  quantity: string;
  amount: number;
  projectId: string;
  vendor: string;
  raisedBy: string;
  createdAt: string;
  approvals: string[];
  status: RequestStatus;
  poNumber?: string;
};

export const leadStages = ["New", "Contacted", "Site visit", "Quote sent", "Won"] as const;
export type LeadStage = (typeof leadStages)[number];

export type Lead = {
  id: string;
  name: string;
  company: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  message?: string;
  source: "Website" | "Referral" | "Repeat client";
  owner: string;
  stage: LeadStage;
  createdAt: string;
};

export type AutomationId = "finance-gate" | "auto-po" | "lead-alert" | "dpr-reminder" | "invoice-followup" | "daily-digest";

export type Automation = {
  id: AutomationId;
  name: string;
  trigger: string;
  action: string;
  enabled: boolean;
  runs: number;
};

export type Activity = {
  id: string;
  at: string;
  kind: "automation" | "user";
  text: string;
};

export type DemoState = {
  requests: PurchaseRequest[];
  leads: Lead[];
  automations: Automation[];
  activity: Activity[];
  remindedReports: string[];
  poCounter: number;
};

const STORAGE_KEY = "northstone-demo-v1";

const ago = (minutes: number) => new Date(Date.now() - minutes * 60_000).toISOString();
const uid = () => Math.random().toString(36).slice(2, 9);

function seed(): DemoState {
  return {
    poCounter: 1046,
    remindedReports: [],
    requests: [
      {
        id: "PR-1042",
        item: "TMT steel Fe550D, 12mm",
        quantity: "18 tonnes",
        amount: 7_92_000,
        projectId: "WTP-B",
        vendor: "Shree Steels",
        raisedBy: "Manoj (Site Engg.)",
        createdAt: ago(95),
        approvals: ["Project manager", "Purchase"],
        status: "pending",
      },
      {
        id: "PR-1043",
        item: "OPC 53 grade cement",
        quantity: "600 bags",
        amount: 2_46_000,
        projectId: "EC2",
        vendor: "Ultra Build Supplies",
        raisedBy: "Deepa (Site Engg.)",
        createdAt: ago(40),
        approvals: [],
        status: "pending",
      },
      {
        id: "PR-1044",
        item: "Crane hire, 50T mobile",
        quantity: "6 days",
        amount: 3_30_000,
        projectId: "HLH",
        vendor: "Deccan Cranes",
        raisedBy: "Kiran (Site Engg.)",
        createdAt: ago(180),
        approvals: ["Project manager"],
        status: "pending",
      },
      {
        id: "PR-1045",
        item: "Bitumen VG-30",
        quantity: "24 tonnes",
        amount: 11_52_000,
        projectId: "SRW",
        vendor: "Karnataka Petro Products",
        raisedBy: "Suresh (Site Engg.)",
        createdAt: ago(320),
        approvals: [],
        status: "pending",
      },
      {
        id: "PR-1039",
        item: "Ready-mix concrete M30",
        quantity: "140 m³",
        amount: 7_14_000,
        projectId: "WTP-B",
        vendor: "Bengaluru RMC",
        raisedBy: "Manoj (Site Engg.)",
        createdAt: ago(60 * 26),
        approvals: ["Project manager", "Purchase", "Finance"],
        status: "approved",
        poNumber: "PO-1038",
      },
      {
        id: "PR-1040",
        item: "Scaffolding cuplock (rental)",
        quantity: "1 month",
        amount: 1_85_000,
        projectId: "YRC",
        vendor: "SafeRise Scaffolds",
        raisedBy: "Anita (Site Engg.)",
        createdAt: ago(60 * 30),
        approvals: ["Project manager"],
        status: "rejected",
      },
    ],
    leads: [
      {
        id: "L-" + uid(),
        name: "Vikram Hegde",
        company: "Hegde Hospitality",
        phone: "+91 98450 00000",
        projectType: "Commercial building",
        location: "Jayanagar",
        budget: "₹10–25 Cr",
        source: "Website",
        owner: salesTeam[0],
        stage: "New",
        createdAt: ago(55),
      },
      {
        id: "L-" + uid(),
        name: "Lakshmi Iyer",
        company: "Iyer Pharma",
        phone: "+91 99000 00000",
        projectType: "Industrial / warehouse",
        location: "Bommasandra",
        budget: "₹25 Cr+",
        source: "Referral",
        owner: salesTeam[1],
        stage: "Contacted",
        createdAt: ago(60 * 20),
      },
      {
        id: "L-" + uid(),
        name: "Sanjay Gowda",
        company: "Gowda Estates",
        phone: "+91 97400 00000",
        projectType: "Residential",
        location: "Hennur",
        budget: "₹10–25 Cr",
        source: "Website",
        owner: salesTeam[0],
        stage: "Site visit",
        createdAt: ago(60 * 52),
      },
      {
        id: "L-" + uid(),
        name: "Fatima Khan",
        company: "Aravali Developers",
        phone: "+91 98860 00000",
        projectType: "Commercial building",
        location: "Whitefield",
        budget: "₹25 Cr+",
        source: "Repeat client",
        owner: salesTeam[1],
        stage: "Quote sent",
        createdAt: ago(60 * 96),
      },
      {
        id: "L-" + uid(),
        name: "Rahul Menon",
        company: "Kaveri Logistics",
        phone: "+91 90080 00000",
        projectType: "Industrial / warehouse",
        location: "Hoskote",
        budget: "₹10–25 Cr",
        source: "Repeat client",
        owner: salesTeam[0],
        stage: "Won",
        createdAt: ago(60 * 240),
      },
    ],
    automations: [
      {
        id: "finance-gate",
        name: "Finance approval for large purchases",
        trigger: "Purchase request above ₹5,00,000",
        action: "Add Finance as a final approver",
        enabled: true,
        runs: 14,
      },
      {
        id: "auto-po",
        name: "Auto-generate purchase orders",
        trigger: "Purchase request fully approved",
        action: "Create PO, email vendor, WhatsApp the site engineer",
        enabled: true,
        runs: 37,
      },
      {
        id: "lead-alert",
        name: "Instant lead alerts",
        trigger: "New enquiry on the website",
        action: "Create lead, assign to sales (round robin), WhatsApp alert",
        enabled: true,
        runs: 22,
      },
      {
        id: "dpr-reminder",
        name: "Daily progress report reminders",
        trigger: "Every day 6:00 PM, report missing",
        action: "WhatsApp reminder to site engineer, escalate to PM at 8 PM",
        enabled: true,
        runs: 58,
      },
      {
        id: "invoice-followup",
        name: "Overdue invoice follow-ups",
        trigger: "Invoice overdue 7 / 15 / 30 days",
        action: "Email reminder to client; escalate to director at 30 days",
        enabled: true,
        runs: 19,
      },
      {
        id: "daily-digest",
        name: "Directors' daily digest",
        trigger: "Every day 8:00 PM",
        action: "Email summary of progress, approvals and collections",
        enabled: false,
        runs: 0,
      },
    ],
    activity: [
      { id: uid(), at: ago(12), kind: "automation", text: "Reminder sent to Suresh: Sarjapur Road report missing" },
      { id: uid(), at: ago(55), kind: "automation", text: "New website lead Vikram Hegde assigned to Meera (Sales)" },
      { id: uid(), at: ago(95), kind: "user", text: "Sneha Rao approved PR-1042 as Purchase" },
      { id: uid(), at: ago(140), kind: "automation", text: "Invoice follow-up emailed to BBMP for INV-2264 (34 days)" },
      { id: uid(), at: ago(60 * 26), kind: "automation", text: "PO-1038 emailed to Bengaluru RMC" },
    ],
  };
}

// The in-memory copy is the source of truth; localStorage is best-effort persistence,
// so the demo (including reset) keeps working where storage is blocked or full.
let memory: DemoState | null = null;
const listeners = new Set<() => void>();

function parse(raw: string | null): DemoState | null {
  if (!raw) return null;
  try {
    const s = JSON.parse(raw) as DemoState;
    const ok =
      Array.isArray(s?.requests) &&
      Array.isArray(s.leads) &&
      Array.isArray(s.automations) &&
      Array.isArray(s.activity) &&
      Array.isArray(s.remindedReports) &&
      typeof s.poCounter === "number";
    return ok ? s : null;
  } catch {
    return null;
  }
}

function persist(state: DemoState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Private mode / quota / sandboxed iframe: state stays in memory only.
  }
}

function load(): DemoState {
  if (memory) return memory;
  let stored: DemoState | null = null;
  try {
    stored = parse(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    // Blocked storage: start from sample data.
  }
  memory = stored ?? seed();
  if (!stored) persist(memory);
  return memory;
}

function commit(state: DemoState) {
  memory = state;
  persist(state);
  listeners.forEach((l) => l());
}

function onStorage(e: StorageEvent) {
  if (e.key !== null && e.key !== STORAGE_KEY) return;
  memory = parse(e.newValue);
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) window.addEventListener("storage", onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

const getServerSnapshot = () => null;

export function useDemoState() {
  const state = useSyncExternalStore<DemoState | null>(subscribe, load, getServerSnapshot);

  const update = useCallback((fn: (s: DemoState) => DemoState) => {
    commit(fn(load()));
  }, []);

  const reset = useCallback(() => commit(seed()), []);

  return { state, update, reset };
}

export function logActivity(s: DemoState, text: string, kind: Activity["kind"] = "automation"): DemoState {
  return { ...s, activity: [{ id: uid(), at: new Date().toISOString(), kind, text }, ...s.activity].slice(0, 40) };
}

export function bumpAutomation(s: DemoState, id: AutomationId): DemoState {
  return { ...s, automations: s.automations.map((a) => (a.id === id ? { ...a, runs: a.runs + 1 } : a)) };
}

export function isEnabled(s: DemoState, id: AutomationId) {
  return s.automations.find((a) => a.id === id)?.enabled ?? false;
}

export function requiredApprovers(s: DemoState, amount: number) {
  const chain = ["Project manager", "Purchase"];
  if (isEnabled(s, "finance-gate") && amount > FINANCE_THRESHOLD) chain.push("Finance");
  return chain;
}

export function nextApprover(s: DemoState, r: PurchaseRequest) {
  return requiredApprovers(s, r.amount).find((step) => !r.approvals.includes(step));
}

export function newRequestId(s: DemoState) {
  const max = Math.max(...s.requests.map((r) => Number(r.id.replace("PR-", ""))), 1046);
  return `PR-${max + 1}`;
}

export function submitEnquiry(input: {
  name: string;
  company: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  message: string;
}) {
  let s = load();
  const owner = salesTeam[s.leads.length % salesTeam.length];
  const lead: Lead = {
    id: "L-" + uid(),
    ...input,
    company: input.company || "Individual",
    source: "Website",
    owner,
    stage: "New",
    createdAt: new Date().toISOString(),
  };
  s = { ...s, leads: [lead, ...s.leads] };
  s = logActivity(s, `New website enquiry from ${lead.name} (${lead.projectType}, ${lead.location})`, "user");
  if (isEnabled(s, "lead-alert")) {
    s = logActivity(s, `Lead ${lead.name} assigned to ${owner}; WhatsApp alert sent`);
    s = bumpAutomation(s, "lead-alert");
  }
  commit(s);
}

export function timeAgo(iso: string) {
  const mins = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}
