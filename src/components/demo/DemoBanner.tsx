import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function DemoBanner({ current }: { current: "website" | "dashboard" }) {
  return (
    <div className="relative z-[60] flex flex-wrap items-center justify-center gap-x-4 gap-y-1 bg-brand px-4 py-2 text-center text-xs text-white sm:text-sm">
      <span>
        Demo built by <strong>Aastha Sharma</strong>: fictional company, sample data.
      </span>
      <span className="flex items-center gap-3">
        {current === "website" ? (
          <Link href="/demo/dashboard" className="font-semibold underline underline-offset-2">
            Open the ops dashboard →
          </Link>
        ) : (
          <Link href="/demo" className="font-semibold underline underline-offset-2">
            View the company website →
          </Link>
        )}
        <Link href="/" className="inline-flex items-center gap-1 text-indigo-100 hover:text-white">
          <ArrowLeft className="h-3 w-3" /> Portfolio
        </Link>
      </span>
    </div>
  );
}
