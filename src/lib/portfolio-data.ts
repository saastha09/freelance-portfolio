import { withBasePath } from "./base-path";

export const personal = {
  name: "Aastha Sharma",
  role: "Freelance Full-Stack Developer",
  location: "Bangalore, India",
  email: "saastha.2911@gmail.com",
  phone: "+91 72968 36197",
  whatsapp: "https://wa.me/917296836197",
  github: "https://github.com/saastha09",
  linkedin: "https://linkedin.com/in/aastha-sharma-906a2720a",
  cal: "https://cal.com/aastha-sharma-bjlgi7/15min",
  photoUrl: withBasePath("/photo.jpg"),
};

export const heroPoints = [
  "Front-end, back-end and deployment, one person accountable",
  "Bangalore-based, happy to work on-site with your team",
  "Weekly demos you can click, not status reports",
];

export type Service = {
  icon: "dashboard" | "workflow" | "tools" | "website" | "integrations" | "backend";
  title: string;
  description: string;
  examples: string[];
};

export const services: Service[] = [
  {
    icon: "dashboard",
    title: "Business dashboards",
    description: "One screen with the numbers your directors ask for every morning, pulled live from the data you already have.",
    examples: ["Project progress & budget vs spend", "Billing, collections & receivables", "Excel / Sheets / ERP exports as sources"],
  },
  {
    icon: "workflow",
    title: "Workflow automation",
    description: "Replace the WhatsApp-and-Excel chase with approvals, reminders and escalations that run on their own.",
    examples: ["Multi-level purchase approvals", "Auto reminders & overdue escalations", "Scheduled daily / weekly reports"],
  },
  {
    icon: "tools",
    title: "Internal tools & portals",
    description: "Purpose-built apps for the processes off-the-shelf software never quite fits.",
    examples: ["Procurement, inventory & vendor portals", "Daily progress reports from site", "Attendance & labour tracking"],
  },
  {
    icon: "website",
    title: "Company websites",
    description: "Fast, mobile-first websites that showcase your work and send every enquiry straight into your pipeline.",
    examples: ["Project portfolio pages", "Enquiry forms wired to your CRM", "SEO basics & analytics"],
  },
  {
    icon: "integrations",
    title: "Integrations",
    description: "Connect the tools you already pay for so data is entered once and flows everywhere it is needed.",
    examples: ["WhatsApp, email & SMS alerts", "Razorpay & payment links", "Google Sheets, Tally exports, REST APIs"],
  },
  {
    icon: "backend",
    title: "Secure backend & hosting",
    description: "The unglamorous parts done properly, so the system keeps working after handover.",
    examples: ["Logins, roles & permissions", "Audit trails & backups", "Cloud deployment & monitoring"],
  },
];

export const automationExamples = [
  {
    title: "Material purchase requests",
    before: "Site engineer sends a WhatsApp photo, someone re-types it into Excel, approvals get lost in chats.",
    after: "Mobile form → engineer → PM → finance (above a set limit). PO is generated and emailed to the vendor on approval.",
  },
  {
    title: "Daily progress reports",
    before: "Calling each site at 7pm to ask what got done and how many workers turned up.",
    after: "Each site submits a 2-minute report; missing reports get a reminder, and directors get one summary email.",
  },
  {
    title: "Client & vendor follow-ups",
    before: "Overdue invoices tracked in a spreadsheet that only one person understands.",
    after: "Automatic reminders at 7 / 15 / 30 days overdue, with escalation and a live receivables view.",
  },
  {
    title: "Website enquiries",
    before: "Enquiry emails sit in a shared inbox until someone notices.",
    after: "Every enquiry is logged as a lead, assigned to sales, and pinged on WhatsApp within seconds.",
  },
];

export type ProjectCategory = "client" | "web" | "ai" | "backend";

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "client", label: "Client work" },
  { id: "web", label: "Web & mobile apps" },
  { id: "ai", label: "AI & automation" },
  { id: "backend", label: "Backend & infrastructure" },
];

export type Project = {
  id: string;
  name: string;
  tag: string;
  category: ProjectCategory;
  summary: string;
  problem: string;
  built: string[];
  stack: string[];
  highlights: string[];
  status?: string;
  link?: { label: string; href: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "rightastra",
    name: "RightAstra",
    tag: "Freelance · 4-person team",
    category: "client",
    featured: true,
    summary: "A trading SaaS where creators publish strategies, subscribers follow them and results are verified.",
    problem:
      "The client had a complete product spec and screen designs but needed a remote freelance team to turn whole modules into working, connected software quickly.",
    built: [
      "Owned three modules end to end: creator marketplace & studio, trading journal & portfolio, and the trust layer (verified P&L)",
      "Creator Studio dashboard with listings, subscriber management and analytics, kept in sync across tabs",
      "Creator KYC onboarding with Razorpay and a safe fallback path when the provider is unavailable",
      "FastAPI backend with plain parameterised SQL, JWT validation and OpenAPI docs; React front-end against a shared API client",
    ],
    stack: ["React", "Vite", "FastAPI", "Python", "SQL", "Auth0", "Razorpay"],
    highlights: ["3 modules owned", "Front-end + back-end", "Payments & KYC"],
  },
  {
    id: "wansafar",
    name: "Wansafar",
    tag: "Freelance · Solo build",
    category: "client",
    summary: "A safari booking platform, taken from design to production as the sole engineer.",
    problem: "A travel business needed customers to discover and book safaris online, with staff managing bookings behind a secure admin.",
    built: [
      "Booking flows and REST APIs for bookings and resources",
      "Database schema designed from scratch",
      "Google sign-in for customers",
      "Role-based access so customers, staff and admins each see only what they should",
    ],
    stack: ["Go", "REST", "MySQL", "Google OAuth", "Casbin RBAC"],
    highlights: ["Solo, end to end", "Roles & permissions", "In production"],
  },
  {
    id: "ekksaath",
    name: "Ekksaath Super App",
    tag: "Backend build",
    category: "client",
    summary: "Backend foundation for a multi-service app covering delivery, bookings and home services.",
    problem: "A super-app needed one secure account, wallet and payments layer shared by many different service modules.",
    built: [
      "OTP and Google login, JWT sessions and role-based access",
      "Wallet and referral system",
      "Razorpay payments, Twilio SMS and S3 file storage integrations",
    ],
    stack: ["Node.js", "Express", "MySQL", "Sequelize", "Redis", "Razorpay", "AWS S3"],
    highlights: ["Payments & wallet", "OTP auth", "Modular services"],
  },
  {
    id: "edurik",
    name: "Edurik",
    tag: "Website + admin CMS",
    category: "web",
    summary: "A company website with its own admin panel, so the team updates blogs and services without a developer.",
    problem: "The business wanted a modern website it could keep fresh itself, and one place to see every contact enquiry.",
    built: [
      "Public site: landing, services, blog and contact pages",
      "Admin panel with login, dashboard and quick stats",
      "Rich-text blog editor with image uploads; manage services and read enquiries",
      "Excel export for the team",
    ],
    stack: ["React", "Vite", "Bootstrap", "Node.js", "Express", "MongoDB", "JWT"],
    highlights: ["Self-serve content", "Enquiry inbox", "Excel export"],
  },
  {
    id: "law-learning",
    name: "Law Learning App",
    tag: "Mobile app + API",
    category: "web",
    summary: "A Flutter app for law students: courses, quizzes, tests, competitions, internships and mentors.",
    problem: "Students had to jump between websites and groups to find courses, practice tests and opportunities.",
    built: [
      "Flutter screens for courses, blogs, quizzes with results and review, and beginner-to-advanced tests",
      "Competitions, internships, jobs and mentor listings in one app",
      "Node.js auth API: signup, login, JWT, email, rate limiting and secure headers",
    ],
    stack: ["Flutter", "Dart", "Node.js", "Express", "MongoDB", "JWT"],
    highlights: ["Android & iOS", "Quizzes & tests", "Secure auth API"],
  },
  {
    id: "health-app",
    name: "Health & Wellness App API",
    tag: "Backend build",
    category: "web",
    summary: "Async API for a women's health app: cycle tracking, doctors, articles, a shop and an admin.",
    problem: "A mobile app needed one backend for personal tracking, content, doctor listings and product sales.",
    built: [
      "Cycle and activity tracking endpoints",
      "Doctor directory, articles and a product shop",
      "Admin routes, user accounts and image uploads",
    ],
    stack: ["Python", "FastAPI", "MongoDB", "Motor (async)"],
    highlights: ["Async Python", "Content + commerce", "Admin API"],
  },
  {
    id: "agent-hub",
    name: "Outreach Automation Hub",
    tag: "Product · Automation",
    category: "ai",
    summary: "A local-first dashboard that runs multi-step outreach workflows with browser automation and a built-in CRM.",
    problem:
      "A repetitive, multi-step outreach process (find contacts, connect, track replies, follow up) was eating hours every day and living in spreadsheets.",
    built: [
      "Pipeline that runs find → contact → track acceptance → templated follow-up, logging every outcome",
      "Background workers and a scheduler, so long runs never block the dashboard",
      "CRM dashboard: per-company progress, contacts, send log, daily/weekly caps and a batch queue",
      "AI drafting of messages from templates, with deterministic fallbacks",
    ],
    stack: ["Next.js", "React", "TypeScript", "Playwright", "SQLite", "Drizzle", "OpenAI"],
    highlights: ["Multi-step workflow", "Background jobs", "CRM dashboard"],
  },
  {
    id: "nekodesk",
    name: "NekoDesk",
    tag: "Product · Desktop app",
    category: "ai",
    summary: "An anime-inspired desktop companion that plans your day, runs a focus timer and reminds you about things.",
    problem: "Planning apps feel like chores. This one lives on top of your windows with a character who keeps you on track.",
    built: [
      "Always-on-top Electron companion with tasks, reminders and a focus timer",
      "Claude-powered planning conversations with a consistent character voice",
      "Local-first: everything stays on the user's computer; packaged installers",
      "Unit and end-to-end tests",
    ],
    stack: ["Electron", "TypeScript", "Preact", "Claude API", "Zod", "Vitest"],
    highlights: ["Desktop app", "AI assistant", "Local-first"],
  },
  {
    id: "askdocs",
    name: "askdocs",
    tag: "Product · AI search",
    category: "ai",
    status: "In progress",
    summary: "Being built to answer questions across company documents, with citations. Ingestion and chunking work today.",
    problem: "Teams keep knowledge in uploads, websites and GitHub, and nobody can find the right answer fast.",
    built: [
      "Multi-tenant ingestion from uploads, websites and GitHub",
      "Structure-aware chunking and vector storage in Postgres + pgvector",
      "Background job queue, embedding cache and full tracing/monitoring",
    ],
    stack: ["Go", "PostgreSQL", "pgvector", "Docker", "Grafana"],
    highlights: ["RAG", "Multi-tenant", "Observable"],
  },
  {
    id: "llmgate",
    name: "llmgate",
    tag: "Infrastructure · AI",
    category: "ai",
    summary: "One gateway in front of several AI providers, so apps can switch models without code changes.",
    problem: "Apps get locked into one AI provider's API format and have no visibility into usage.",
    built: [
      "Accepts OpenAI- or Anthropic-format requests and routes to any configured provider",
      "Streaming responses over Server-Sent Events",
      "Structured logs and telemetry for every request",
    ],
    stack: ["Go", "SSE", "OpenAI API", "Anthropic API"],
    highlights: ["Provider-agnostic", "Streaming", "Telemetry"],
  },
  {
    id: "ledgerd",
    name: "ledgerd",
    tag: "Infrastructure · Payments",
    category: "backend",
    status: "Early",
    summary: "A double-entry ledger for wallets and payments, where money can only move, never appear or vanish.",
    problem: "Wallet balances stored as a single number drift and can't be audited.",
    built: [
      "Every entry must balance to zero per currency before it is saved",
      "Integer amounts in each currency's minor unit, no floating point",
      "Postgres with database-level checks and invariant queries",
    ],
    stack: ["Go", "PostgreSQL"],
    highlights: ["Auditable", "Multi-currency", "Safe money maths"],
  },
  {
    id: "cowrite",
    name: "cowrite",
    tag: "Infrastructure · Real-time",
    category: "backend",
    status: "Early",
    summary: "Real-time collaborative editing server: several people typing in the same document at once.",
    problem: "Live collaboration breaks on flaky connections and slow devices.",
    built: [
      "Per-document ordering of every edit, broadcast to all editors over WebSockets",
      "Safe re-send after reconnect; clients catch up from the log",
      "Slow clients are dropped instead of freezing everyone else",
    ],
    stack: ["Java", "Spring Boot", "WebSockets"],
    highlights: ["Real-time", "Reconnect-safe", "Tested"],
  },
  {
    id: "shipyard",
    name: "Shipyard",
    tag: "Infrastructure · DevOps",
    category: "backend",
    summary: "A deployment platform: push code and get a checked path from dev to staging to production, with rollback.",
    problem: "Deploys done by hand or with copy-pasted CI scripts are risky and impossible to audit.",
    built: [
      "Service templates with health checks, limits and secure defaults",
      "Production needs a signed build that passed staging plus a second approver",
      "Automatic rollback when a release is unhealthy; full audit log",
    ],
    stack: ["Go", "Kubernetes", "Helm", "Terraform", "GitHub Actions"],
    highlights: ["Safe releases", "Auto rollback", "Audit trail"],
  },
];

export const process = [
  {
    step: "01",
    title: "Understand the workflow",
    body: "A call or site visit to see how work actually moves today: who enters what, who approves, where it breaks.",
  },
  {
    step: "02",
    title: "Clickable prototype",
    body: "Within the first week you get a working prototype with your terms and sample data, so feedback is concrete.",
  },
  {
    step: "03",
    title: "Build in short sprints",
    body: "One module at a time, demoed weekly and live for real users early. Priorities can change between sprints.",
  },
  {
    step: "04",
    title: "Handover & support",
    body: "Documentation, team training and source code in your accounts. Optional monthly support after go-live.",
  },
];

export const engagements = [
  {
    title: "Fixed-scope project",
    body: "Clear deliverables, timeline and price agreed up front. Best for a website, a dashboard or a single workflow.",
  },
  {
    title: "Monthly retainer",
    body: "A set number of days each month to keep automating processes one by one. Best for ongoing operations work.",
  },
  {
    title: "Support & maintenance",
    body: "Fixes, small changes and monitoring after launch so the system stays healthy.",
  },
];

export const stack = [
  { group: "Front-end & mobile", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter", "Electron"] },
  { group: "Back-end", items: ["Node.js", "Python (FastAPI)", "Go", "REST APIs", "Background jobs"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis", "Excel / Google Sheets"] },
  { group: "Automation, AI & integrations", items: ["Playwright", "OpenAI & Claude APIs", "RAG / vector search", "Razorpay", "Twilio SMS", "Webhooks"] },
  { group: "Hosting", items: ["AWS", "Docker", "NGINX", "Vercel", "CI/CD"] },
];

export const about = [
  "I'm Aastha, a full-stack developer in Bangalore with 2.5+ years of building and running production software.",
  "Most of my work sits where business processes meet code: approval chains, dashboards, booking and payment flows, and the background jobs that keep everything moving. I'm comfortable owning the whole thing, from the database and APIs to the screens people use every day.",
  "I like working with operations teams directly. The best automation comes from sitting with the people who do the work, not from a requirements document.",
];
