"use client";

import Link from "next/link";
import { CheckCircle2, Send } from "lucide-react";
import { useState } from "react";
import { submitEnquiry } from "@/lib/demo-store";

const projectTypes = ["Commercial building", "Industrial / warehouse", "Infrastructure / roads", "Residential", "Interiors & fit-out"];
const budgets = ["Under ₹5 Cr", "₹5–10 Cr", "₹10–25 Cr", "₹25 Cr+", "Not sure yet"];

const inputCls =
  "w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 outline-none transition focus:border-site focus:ring-2 focus:ring-site/30";

export function EnquiryForm() {
  const [sent, setSent] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    submitEnquiry({
      name: get("name"),
      company: get("company"),
      phone: get("phone"),
      projectType: get("projectType"),
      location: get("location"),
      budget: get("budget"),
      message: get("message"),
    });
    setSent(get("name"));
    e.currentTarget.reset();
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <h3 className="mt-4 text-xl font-semibold text-stone-900">Thanks, {sent.split(" ")[0]}!</h3>
        <p className="mt-2 text-sm text-stone-600">Our business development team will call you within one working day.</p>
        <div className="mt-6 rounded-xl border border-dashed border-indigo-300 bg-white p-4 text-left text-sm text-stone-700">
          <p className="font-medium text-indigo-700">Demo tip</p>
          <p className="mt-1">
            This enquiry is now a lead in the ops dashboard, auto-assigned to a sales rep with an alert logged.
          </p>
          <Link href="/demo/dashboard?tab=leads" className="mt-3 inline-block font-semibold text-indigo-700 underline">
            See it in the dashboard →
          </Link>
        </div>
        <button type="button" onClick={() => setSent(null)} className="mt-5 text-sm text-stone-500 underline">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-card sm:grid-cols-2 sm:p-8">
      <label className="space-y-1.5">
        <span className="text-xs font-medium text-stone-600">Your name *</span>
        <input name="name" required className={inputCls} placeholder="Full name" />
      </label>
      <label className="space-y-1.5">
        <span className="text-xs font-medium text-stone-600">Company</span>
        <input name="company" className={inputCls} placeholder="Company / organisation" />
      </label>
      <label className="space-y-1.5">
        <span className="text-xs font-medium text-stone-600">Phone *</span>
        <input name="phone" required type="tel" className={inputCls} placeholder="+91" />
      </label>
      <label className="space-y-1.5">
        <span className="text-xs font-medium text-stone-600">Site location *</span>
        <input name="location" required className={inputCls} placeholder="e.g. Whitefield" />
      </label>
      <label className="space-y-1.5">
        <span className="text-xs font-medium text-stone-600">Project type</span>
        <select name="projectType" className={inputCls} defaultValue={projectTypes[0]}>
          {projectTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="space-y-1.5">
        <span className="text-xs font-medium text-stone-600">Estimated budget</span>
        <select name="budget" className={inputCls} defaultValue={budgets[2]}>
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>
      <label className="space-y-1.5 sm:col-span-2">
        <span className="text-xs font-medium text-stone-600">Tell us about the project</span>
        <textarea name="message" rows={3} className={inputCls} placeholder="Scope, timelines, anything we should know" />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-site px-6 py-3 text-sm font-semibold text-site-char transition-colors hover:bg-amber-400 sm:col-span-2"
      >
        <Send className="h-4 w-4" />
        Request a consultation
      </button>
    </form>
  );
}
