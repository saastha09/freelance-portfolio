import type { Metadata } from "next";
import { Suspense } from "react";
import { DemoBanner } from "@/components/demo/DemoBanner";
import { Dashboard } from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Northstone Ops (Demo Dashboard)",
  description: "Interactive operations dashboard demo built by Aastha Sharma. Fictional company, sample data.",
};

export default function DashboardPage() {
  return (
    <>
      <DemoBanner current="dashboard" />
      <Suspense>
        <Dashboard />
      </Suspense>
    </>
  );
}
