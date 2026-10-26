import { withBasePath } from "./base-path";

export const personal = {
  name: "Aastha Sharma",
  role: "Freelance Full-Stack Developer",
  location: "Remote · clients worldwide",
  email: "saastha.2911@gmail.com",
  phone: "+91 72968 36197",
  whatsapp: "https://wa.me/917296836197",
  github: "https://github.com/saastha09",
  cal: "https://cal.com/aastha-sharma-bjlgi7/15min",
  photoUrl: withBasePath("/photo.jpg"),
};

export const heroPoints = [
  "Web, mobile, desktop, AI and backend: one person accountable end to end",
  "Weekly demos you can click, not status reports",
  "Remote-first: clients across the US, Europe and beyond",
];

export type Service = {
  icon:
    | "dashboard"
    | "workflow"
    | "tools"
    | "website"
    | "webapp"
    | "mobile"
    | "desktop"
    | "ai"
    | "browser"
    | "payments"
    | "api"
    | "integrations"
    | "cloud"
    | "iot"
    | "support";
  title: string;
  description: string;
  examples: string[];
};

// Every service here is backed by a project below or by production work.
export const services: Service[] = [
  {
    icon: "webapp",
    title: "Web apps & SaaS products",
    description: "Customer-facing products taken from idea or Figma to a working, deployed app.",
    examples: ["Booking & reservation platforms", "Marketplaces & subscription products", "Customer portals and user dashboards"],
  },
  {
    icon: "mobile",
    title: "Mobile apps",
    description: "Cross-platform Android and iOS apps with Flutter, backed by an API I build too.",
    examples: ["Learning, quiz & test apps", "Booking and service apps", "Matching API with secure login"],
  },
  {
    icon: "desktop",
    title: "Desktop apps",
    description: "Installable desktop apps with Electron for tools that should live on your screen, not in a browser tab.",
    examples: ["Always-on-top assistants & widgets", "Works offline, data stays local", "Packaged installers"],
  },
  {
    icon: "ai",
    title: "AI features & assistants",
    description: "Useful AI inside your product or workflow, with fallbacks for when the model gets it wrong.",
    examples: ["Chat assistants on OpenAI or Claude", "Document Q&A over your files (RAG)", "AI image, video & text generation"],
  },
  {
    icon: "browser",
    title: "Browser automation & bots",
    description: "Scripts that do the repetitive clicking for you: logging in, filling forms, collecting data, on a schedule.",
    examples: ["Data collection from web portals", "Bulk form filling & applications", "Scheduled bots with logs and daily caps"],
  },
  {
    icon: "workflow",
    title: "Workflow automation",
    description: "Replace the WhatsApp-and-Excel chase with approvals, reminders and escalations that run on their own.",
    examples: ["Multi-level approvals", "Auto reminders & overdue escalations", "Scheduled daily / weekly reports"],
  },
  {
    icon: "dashboard",
    title: "Business dashboards",
    description: "One screen with the numbers you ask for every morning, pulled live from the data you already have.",
    examples: ["Sales, billing & collections", "Project progress & budget vs spend", "Excel / Sheets / ERP exports as sources"],
  },
  {
    icon: "tools",
    title: "Internal tools & CRMs",
    description: "Purpose-built apps for the processes off-the-shelf software never quite fits.",
    examples: ["CRMs and lead pipelines", "Inventory, vendor & procurement portals", "Attendance & daily reports"],
  },
  {
    icon: "website",
    title: "Websites & CMS",
    description: "Fast, mobile-first websites your team can update themselves, with every enquiry landing in one inbox.",
    examples: ["Admin panel for blogs, services & pages", "Enquiry forms wired to your CRM", "SEO basics & analytics"],
  },
  {
    icon: "payments",
    title: "Payments, wallets & logins",
    description: "Money and identity handled carefully: payment flows, wallets and who-can-see-what.",
    examples: ["Checkout, payment links & KYC flows", "Wallets, referrals & ledgers", "OTP, Google sign-in, roles & permissions"],
  },
  {
    icon: "api",
    title: "APIs & backend systems",
    description: "Fast, well-structured backends in Go, Node.js, Python or Java that other apps can rely on.",
    examples: ["REST, GraphQL & gRPC APIs", "Real-time updates over WebSockets", "Background jobs & queues"],
  },
  {
    icon: "integrations",
    title: "Integrations",
    description: "Connect the tools you already pay for so data is entered once and flows everywhere it is needed.",
    examples: ["WhatsApp, email & SMS (Twilio) alerts", "Google Sheets, Excel & accounting exports", "Third-party REST APIs & webhooks"],
  },
  {
    icon: "cloud",
    title: "Cloud, DevOps & hosting",
    description: "Your app deployed properly, with automatic builds, monitoring and the ability to roll back.",
    examples: ["AWS (EC2, S3), Docker & NGINX", "CI/CD with GitHub Actions", "Infrastructure as code with Terraform"],
  },
  {
    icon: "iot",
    title: "IoT & embedded Linux",
    description: "Software for connected devices: the backend that manages them and the Linux image they run.",
    examples: ["Device fleets: heartbeat, config sync", "Over-the-air updates (Mender, Yocto)", "SIP calling & multicast audio"],
  },
  {
    icon: "support",
    title: "Fixes, upgrades & support",
    description: "Take over an existing app: find what's broken, make it faster, and keep it healthy.",
    examples: ["Production bug hunting across layers", "Performance & database tuning", "Monthly maintenance retainers"],
  },
];

export type ProjectCategory = "client" | "web" | "ai" | "backend";

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "client", label: "Client work" },
  { id: "ai", label: "AI & automation" },
  { id: "backend", label: "Backend & infrastructure" },
];

export type ProjectImage = { src: string; alt: string };

export type Project = {
  id: string;
  name: string;
  tag: string;
  category: ProjectCategory;
  summary: string;
  problem?: string;
  built: string[];
  stack: string[];
  status?: string;
  image?: ProjectImage;
  links?: { label: string; href: string; internal?: boolean }[];
};

export type FeaturedVisual = "rightastra" | "jobagent" | "nekodesk" | "northstone";

export type FeaturedProject = Project & { visual: FeaturedVisual; highlights: string[] };

const img = (file: string, alt: string): ProjectImage => ({ src: withBasePath(`/work/${file}`), alt });

export const featuredProjects: FeaturedProject[] = [
  {
    id: "rightastra",
    visual: "rightastra",
    name: "RightAstra",
    tag: "Freelance · 4-person team",
    category: "client",
    summary: "A trading SaaS where creators publish strategies, subscribers follow them and results are verified.",
    problem:
      "The client had a complete product spec and screen designs but needed a remote freelance team to turn whole modules into working, connected software quickly.",
    built: [
      "Owned three modules end to end: creator marketplace & studio, trading journal & portfolio, and the verified-P&L trust layer",
      "Creator Studio dashboard with listings, subscriber management and analytics, kept in sync across tabs",
      "Creator KYC onboarding with Razorpay and a safe fallback path when the provider is unavailable",
      "FastAPI backend with parameterised SQL, JWT validation and OpenAPI docs; React front-end on a shared API client",
    ],
    stack: ["React", "Vite", "FastAPI", "Python", "SQL", "Auth0", "Razorpay"],
    highlights: ["3 modules owned", "Front-end + back-end", "Payments & KYC"],
  },
  {
    id: "jobagent",
    visual: "jobagent",
    name: "Job-Search Agent & Outreach CRM",
    tag: "Product · Automation + AI",
    category: "ai",
    summary: "My own 'Jarvis' for job hunting: it finds roles, scores them, tailors a résumé, and applies or asks for a referral once I approve.",
    problem:
      "Job hunting is hours of repetitive work across a dozen sites: searching, rewriting résumés, filling the same forms and chasing referrals.",
    built: [
      "Discovers openings across 212 company career boards, de-duplicates them and scores each on a transparent 100-point fit model",
      "Tailors a résumé per job and fact-checks it against my master résumé, so nothing untrue is ever claimed",
      "Fills and submits applications on 7 job boards (LinkedIn, Naukri, Wellfound, Hirist, Cutshort, Instahyre, HuntingCube) and 5 company ATSs (Greenhouse, Lever, Ashby, Workable, SmartRecruiters), only for packages I've approved",
      "Referral loop: asks contacts first, waits 48 hours, then applies directly, on a timed scheduler",
      "Local CRM dashboard for LinkedIn outreach with daily/weekly caps, follow-ups and AI-drafted notes",
    ],
    stack: ["Next.js", "React", "TypeScript", "Playwright", "SQLite", "Drizzle", "OpenAI", "Python"],
    highlights: ["212 career boards", "12 platforms", "Human-approved"],
  },
  {
    id: "nekodesk",
    visual: "nekodesk",
    name: "NekoDesk",
    tag: "Product · Desktop app + AI",
    category: "ai",
    summary: "An anime-inspired desktop companion that plans your day, runs a focus timer and reminds you about things, with a personality.",
    problem: "Planning apps feel like chores. This one lives on top of your windows with a character who keeps you on track.",
    built: [
      "Always-on-top Electron companion with tasks, reminders, inbox, focus timer and daily review",
      "Natural-language task entry ('Send invoice fri 3pm !1 ~20m') and Claude-powered planning chat",
      "Character moods and voice that react to what you do; an offline assistant answers when AI is unreachable",
      "Everything stays on your computer; packaged macOS app (Windows and Linux builds configured); unit + end-to-end tests",
    ],
    stack: ["Electron", "TypeScript", "Preact", "Claude API", "Zod", "Vitest"],
    highlights: ["Desktop app", "AI planning", "Works offline"],
    image: img("nekodesk-panel-today.jpg", "NekoDesk Today panel with top tasks and reminders"),
  },
  {
    id: "northstone",
    visual: "northstone",
    name: "Northstone Ops",
    tag: "Live demo · Website + internal tool",
    category: "web",
    summary: "A working demo for a fictional construction company: a public website plus the operations dashboard behind it.",
    problem:
      "Shows what I build for operations-heavy businesses: enquiries, approvals, site reports and receivables in one place instead of WhatsApp and Excel.",
    built: [
      "Company website whose enquiry form drops every lead straight into the dashboard",
      "Multi-level purchase approvals with automatic PO dispatch once the last approver signs off",
      "KPIs, project progress vs budget, sales pipeline, daily site reports with reminders, toggleable automation rules",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: ["Try it live", "Interactive", "Runs in your browser"],
    image: img("northstone-dashboard.jpg", "Northstone Ops dashboard overview with KPIs, billing chart and approvals"),
    links: [
      { label: "Open the dashboard", href: "/demo/dashboard", internal: true },
      { label: "Open the website", href: "/demo", internal: true },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "wansafar",
    name: "Wansafar",
    tag: "Solo build",
    category: "client",
    summary: "A safari booking platform, taken from design to production as the sole engineer.",
    built: [
      "Booking flows and REST APIs for bookings and resources",
      "Database schema designed from scratch",
      "Google sign-in, and roles so customers, staff and admins each see only what they should",
    ],
    stack: ["Go", "REST", "MySQL", "Google OAuth", "Casbin RBAC"],
  },
  {
    id: "ekksaath",
    name: "Ekksaath Super App",
    tag: "Backend build",
    category: "client",
    summary: "Backend foundation for a multi-service app covering delivery, bookings and home services.",
    built: [
      "OTP and Google login, JWT sessions and role-based access",
      "Wallet and referral system",
      "Razorpay payments, Twilio SMS and S3 file storage",
    ],
    stack: ["Node.js", "Express", "MySQL", "Sequelize", "Redis", "Razorpay", "AWS S3"],
  },
  {
    id: "edurik",
    name: "Edurik",
    tag: "Website + admin CMS",
    category: "client",
    summary: "A company website with its own admin panel, so the team updates blogs and services without a developer.",
    built: [
      "Public site: landing, services, blog and contact pages",
      "Admin with login, dashboard, rich-text blog editor and image uploads",
      "Enquiry inbox with Excel export",
    ],
    stack: ["React", "Vite", "Bootstrap", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    id: "law-learning",
    name: "Law Learning App",
    tag: "Mobile app + API",
    category: "client",
    summary: "A Flutter app for law students: courses, quizzes, tests, competitions, internships and mentors.",
    built: [
      "Courses, blogs, quizzes with results and review, beginner-to-advanced tests",
      "Competitions, internships, jobs and mentor listings in one app",
      "Node.js auth API with JWT, email, rate limiting and secure headers",
    ],
    stack: ["Flutter", "Dart", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    id: "health-app",
    name: "Health & Wellness App API",
    tag: "Backend build",
    category: "client",
    summary: "Async API for a women's health app: cycle tracking, doctors, articles, a shop and an admin.",
    built: ["Cycle and activity tracking", "Doctor directory, articles and a product shop", "Admin routes, user accounts and image uploads"],
    stack: ["Python", "FastAPI", "MongoDB", "Motor (async)"],
  },
  {
    id: "video-agent",
    name: "Video Agent",
    tag: "Tool · Generative AI",
    category: "ai",
    summary: "Turns a text prompt into a short MP4 video, with free and paid generation backends behind one command.",
    built: [
      "One CLI with pluggable backends: free (AI stills animated into video), Pollinations text-to-video, and fal models",
      "Defaults to the free backend so it works without paid credits",
      "Saves each video with its prompt and settings",
    ],
    stack: ["Python", "Pollinations", "fal.ai", "imageio / FFmpeg"],
    image: img("video-agent-frame.jpg", "Frame from a generated video of a dog running on a beach at sunset"),
  },
  {
    id: "askdocs",
    name: "askdocs",
    tag: "Product · AI search",
    category: "ai",
    status: "In progress",
    summary: "Being built to answer questions across company documents, with citations. Ingestion and chunking work today.",
    built: [
      "Multi-tenant ingestion from uploads, websites and GitHub",
      "Structure-aware chunking and vector storage in Postgres + pgvector",
      "Background job queue, embedding cache and full tracing/monitoring",
    ],
    stack: ["Go", "PostgreSQL", "pgvector", "Docker", "Grafana"],
  },
  {
    id: "llmgate",
    name: "llmgate",
    tag: "Infrastructure · AI",
    category: "ai",
    summary: "One gateway in front of several AI providers, so apps can switch models without code changes.",
    built: [
      "Accepts OpenAI- or Anthropic-format requests and routes to any configured provider",
      "Streaming responses over Server-Sent Events",
      "Structured logs and telemetry for every request",
    ],
    stack: ["Go", "SSE", "OpenAI API", "Anthropic API"],
  },
  {
    id: "botanicsight",
    name: "BotanicSight",
    tag: "Academic · Machine learning",
    category: "ai",
    summary: "Identifies medicinal plants from a photo using a trained image-classification model.",
    built: [
      "Keras/TensorFlow image classifier trained on plant photos",
      "Flask API that takes an uploaded image and returns the predicted species",
      "Simple web page for uploading photos; TensorFlow.js version for in-browser inference",
    ],
    stack: ["Python", "TensorFlow", "Keras", "Flask", "TensorFlow.js"],
  },
  {
    id: "shipyard",
    name: "Shipyard",
    tag: "Infrastructure · DevOps",
    category: "backend",
    summary: "A deployment platform: push code and get a checked path from dev to staging to production, with rollback.",
    built: [
      "Service templates with health checks, limits and secure defaults",
      "Production needs a signed build that passed staging plus a second approver",
      "Automatic rollback when a release is unhealthy; full audit log",
    ],
    stack: ["Go", "Kubernetes", "Helm", "Terraform", "GitHub Actions"],
  },
  {
    id: "kubeguard",
    name: "KubeGuard",
    tag: "Infrastructure · Reliability",
    category: "backend",
    summary: "Watches apps running on Kubernetes, explains why one is failing, and proposes a fix a human approves.",
    built: [
      "Detects crash loops, out-of-memory kills, failing health checks, bad images and stuck rollouts",
      "Evidence-backed diagnosis reports instead of raw logs",
      "Restart or rollback only after approval, with metrics and tracing",
    ],
    stack: ["Go", "Kubernetes", "Prometheus", "OpenTelemetry", "Helm"],
  },
  {
    id: "ledgerd",
    name: "ledgerd",
    tag: "Infrastructure · Payments",
    category: "backend",
    status: "Early",
    summary: "A double-entry ledger for wallets and payments, where money can only move, never appear or vanish.",
    built: [
      "Every entry must balance to zero per currency before it is saved",
      "Integer amounts in each currency's minor unit, no floating point",
      "Postgres with database-level checks and invariant queries",
    ],
    stack: ["Go", "PostgreSQL"],
  },
  {
    id: "cowrite",
    name: "cowrite",
    tag: "Infrastructure · Real-time",
    category: "backend",
    status: "Early",
    summary: "Real-time collaborative editing server: several people typing in the same document at once.",
    built: [
      "Per-document ordering of every edit, broadcast to all editors over WebSockets",
      "Safe re-send after reconnect; clients catch up from the log",
      "Slow clients are dropped instead of freezing everyone else",
    ],
    stack: ["Java", "Spring Boot", "WebSockets"],
  },
  {
    id: "flowd",
    name: "flowd",
    tag: "Infrastructure · Workflows",
    category: "backend",
    status: "In progress",
    summary: "A durable workflow engine, like Temporal: long-running business processes that survive crashes and restarts.",
    built: ["Event-history model persisted as the source of truth", "Roadmap: workers, replay, retries, timers and signals"],
    stack: ["Go", "PostgreSQL", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/saastha09/flowd" }],
  },
  {
    id: "xchange",
    name: "xchange",
    tag: "Infrastructure · Trading",
    category: "backend",
    status: "In progress",
    summary: "A mini crypto exchange built to learn exchange internals, starting with the order-matching engine.",
    built: ["In-memory order book with price-time-priority matching", "Roadmap: ledger, market data, risk checks and a trading UI"],
    stack: ["Java 21", "Gradle"],
  },
];

export const projectCount = featuredProjects.length + projects.length;

export const process = [
  {
    step: "01",
    title: "Understand the problem",
    body: "A video call, booked in your time zone, to see how work actually moves today: who does what, where it breaks, what success looks like.",
  },
  {
    step: "02",
    title: "Clickable prototype",
    body: "Within the first week you get a working prototype with your terms and sample data, so feedback is concrete.",
  },
  {
    step: "03",
    title: "Build in short sprints",
    body: "One feature at a time, demoed weekly and live for real users early. Priorities can change between sprints.",
  },
  {
    step: "04",
    title: "Handover & support",
    body: "Documentation, training and source code in your accounts. Optional monthly support after go-live.",
  },
];

export const engagements = [
  {
    title: "Part-time contract",
    body: "20–25 hours a week inside your team: your repo, your tickets, your standups. Billed hourly, in USD or EUR.",
  },
  {
    title: "Fixed-scope project",
    body: "Clear deliverables, timeline and price agreed up front. Best for a website, an app, a dashboard or one automation.",
  },
  {
    title: "Monthly retainer",
    body: "A set number of days each month for ongoing product work, new features or automating processes one by one.",
  },
  {
    title: "Support & maintenance",
    body: "Fixes, small changes and monitoring after launch so the system stays healthy.",
  },
];

export const stack = [
  { group: "Front-end, mobile & desktop", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter", "Electron"] },
  { group: "Back-end", items: ["Go", "Node.js", "Python (FastAPI, Flask)", "Java (Spring Boot)", "REST · GraphQL · gRPC", "WebSockets"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis", "pgvector"] },
  { group: "AI & automation", items: ["OpenAI & Claude APIs", "RAG / vector search", "TensorFlow", "Playwright", "Scheduled jobs"] },
  { group: "Payments & integrations", items: ["Razorpay", "Twilio SMS", "Google OAuth", "Webhooks", "Excel / Google Sheets"] },
  { group: "Cloud & DevOps", items: ["AWS (EC2, S3)", "Docker", "NGINX", "Terraform", "GitHub Actions", "Kubernetes (personal projects)"] },
];

export const about = [
  "I'm Aastha, a remote full-stack developer with 2.5+ years of building and running production software, working with clients wherever they are.",
  "I like owning the whole thing: the database and APIs, the screens people use, the automation in the background and the server it all runs on. That's why my projects range from a Flutter app and a desktop companion to payment ledgers and deployment platforms.",
  "I build tools for myself too. My job-search agent and NekoDesk run on my own machine every day, so I know what it takes to keep software useful after the demo.",
];
