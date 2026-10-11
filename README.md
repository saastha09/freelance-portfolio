# Aastha Sharma — Freelance Portfolio

Freelance-focused portfolio plus a working demo of the kind of software I build for clients.

| Route | What it is |
|-------|------------|
| `/` | Portfolio: services, workflow-automation examples, selected work, process, contact |
| `/demo` | Demo company website for a fictional Bengaluru construction firm (Northstone Infra) |
| `/demo/dashboard` | Interactive operations dashboard: KPIs, projects, purchase-approval workflow, leads pipeline, site reports, automation rules |

The demo runs entirely in the browser on sample data stored in `localStorage`. An enquiry submitted on `/demo` appears as a lead in the dashboard (also across tabs). "Reset demo" in the dashboard restores the sample data.

## Develop

```bash
npm install
npm run dev
```

## Edit content

- Portfolio copy, projects, services, contact details: `src/lib/portfolio-data.ts`
- Demo company, projects and site reports: `src/lib/demo-data.ts`
- Demo workflow state and automation logic: `src/lib/demo-store.ts`
