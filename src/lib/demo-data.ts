export const company = {
  name: "Northstone Infra",
  legal: "Northstone Infra Pvt. Ltd.",
  tagline: "Commercial, industrial & infrastructure construction across Bengaluru",
  phone: "+91 80 4000 0000",
  email: "projects@northstone.example",
  address: "Outer Ring Road, Bellandur, Bengaluru 560103",
};

export type ProjectStatus = "On track" | "At risk" | "Delayed" | "Handover";

export type SiteProject = {
  id: string;
  name: string;
  category: "Commercial" | "Industrial" | "Infrastructure" | "Residential";
  client: string;
  location: string;
  manager: string;
  start: string;
  end: string;
  progress: number;
  budget: number;
  spent: number;
  workers: number;
  status: ProjectStatus;
  area: string;
};

export const siteProjects: SiteProject[] = [
  {
    id: "WTP-B",
    name: "Whitefield Tech Park, Tower B",
    category: "Commercial",
    client: "Aravali Developers",
    location: "Whitefield",
    manager: "Ravi Kumar",
    start: "Mar 2025",
    end: "Jun 2027",
    progress: 72,
    budget: 48_00_00_000,
    spent: 33_60_00_000,
    workers: 128,
    status: "On track",
    area: "4.2 lakh sq ft",
  },
  {
    id: "HLH",
    name: "Hebbal Logistics Hub",
    category: "Industrial",
    client: "Kaveri Logistics",
    location: "Hebbal",
    manager: "Sneha Rao",
    start: "Aug 2025",
    end: "Mar 2027",
    progress: 64,
    budget: 32_00_00_000,
    spent: 23_10_00_000,
    workers: 96,
    status: "At risk",
    area: "2.8 lakh sq ft",
  },
  {
    id: "EC2",
    name: "Electronic City Office Campus, Ph 2",
    category: "Commercial",
    client: "Sattva Realty",
    location: "Electronic City",
    manager: "Arjun Shetty",
    start: "Jan 2026",
    end: "Dec 2027",
    progress: 38,
    budget: 26_00_00_000,
    spent: 9_40_00_000,
    workers: 84,
    status: "On track",
    area: "1.9 lakh sq ft",
  },
  {
    id: "SRW",
    name: "Sarjapur Road Widening (2.4 km)",
    category: "Infrastructure",
    client: "BBMP",
    location: "Sarjapur Road",
    manager: "Imran Pasha",
    start: "Nov 2025",
    end: "Nov 2026",
    progress: 55,
    budget: 18_00_00_000,
    spent: 11_80_00_000,
    workers: 62,
    status: "Delayed",
    area: "2.4 km, 4-lane",
  },
  {
    id: "YRC",
    name: "Yelahanka Residences, Block C",
    category: "Residential",
    client: "Nandi Homes",
    location: "Yelahanka",
    manager: "Priya Nair",
    start: "Feb 2025",
    end: "Dec 2026",
    progress: 91,
    budget: 22_00_00_000,
    spent: 20_30_00_000,
    workers: 30,
    status: "Handover",
    area: "112 apartments",
  },
  {
    id: "DVW",
    name: "Devanahalli Warehousing Park",
    category: "Industrial",
    client: "Airport City Logistics",
    location: "Devanahalli",
    manager: "Ravi Kumar",
    start: "Aug 2026",
    end: "Oct 2027",
    progress: 12,
    budget: 14_00_00_000,
    spent: 1_50_00_000,
    workers: 41,
    status: "On track",
    area: "1.6 lakh sq ft",
  },
];

export const monthlyBilling = [
  { month: "Apr", billed: 4.2, collected: 3.6 },
  { month: "May", billed: 5.1, collected: 4.4 },
  { month: "Jun", billed: 4.8, collected: 4.9 },
  { month: "Jul", billed: 6.0, collected: 5.1 },
  { month: "Aug", billed: 5.6, collected: 5.0 },
  { month: "Sep", billed: 6.2, collected: 4.8 },
];

export const receivables = [
  { client: "Kaveri Logistics", invoice: "INV-2291", amount: 1_84_00_000, overdueDays: 21 },
  { client: "BBMP", invoice: "INV-2264", amount: 96_50_000, overdueDays: 34 },
  { client: "Aravali Developers", invoice: "INV-2302", amount: 2_12_00_000, overdueDays: 6 },
  { client: "Nandi Homes", invoice: "INV-2288", amount: 48_20_000, overdueDays: 15 },
];

export type SiteReport = {
  id: string;
  projectId: string;
  submittedBy: string;
  manpower: number;
  workDone: string;
  issue?: string;
  photos: number;
  submitted: boolean;
};

export const siteReports: SiteReport[] = [
  {
    id: "DPR-1",
    projectId: "WTP-B",
    submittedBy: "Manoj (Site Engg.)",
    manpower: 128,
    workDone: "Slab casting L9 east wing complete; blockwork L6 at 60%.",
    photos: 14,
    submitted: true,
  },
  {
    id: "DPR-2",
    projectId: "HLH",
    submittedBy: "Kiran (Site Engg.)",
    manpower: 88,
    workDone: "PEB column erection bay 4–7; DG foundation shuttering.",
    issue: "Crane hire delayed by 1 day; erection of bay 8 pushed to tomorrow.",
    photos: 9,
    submitted: true,
  },
  {
    id: "DPR-3",
    projectId: "EC2",
    submittedBy: "Deepa (Site Engg.)",
    manpower: 84,
    workDone: "Raft reinforcement block B 70%; excavation block C started.",
    photos: 11,
    submitted: true,
  },
  {
    id: "DPR-4",
    projectId: "SRW",
    submittedBy: "Suresh (Site Engg.)",
    manpower: 0,
    workDone: "",
    photos: 0,
    submitted: false,
  },
  {
    id: "DPR-5",
    projectId: "YRC",
    submittedBy: "Anita (Site Engg.)",
    manpower: 30,
    workDone: "Snag list closure floors 3–6; lift commissioning tower 2.",
    photos: 6,
    submitted: true,
  },
  {
    id: "DPR-6",
    projectId: "DVW",
    submittedBy: "Farhan (Site Engg.)",
    manpower: 0,
    workDone: "",
    photos: 0,
    submitted: false,
  },
];

export const salesTeam = ["Meera (Sales)", "Rohit (Sales)"];

/** Requests above this need an extra Finance approval when the rule is on. */
export const FINANCE_THRESHOLD = 5_00_000;
