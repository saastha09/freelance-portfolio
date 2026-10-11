import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/demo-data";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("rounded-xl border border-slate-200 bg-white shadow-sm", className)}>{children}</div>;
}

export function CardHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

const statusStyles: Record<ProjectStatus, string> = {
  "On track": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "At risk": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Delayed: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Handover: "bg-sky-50 text-sky-700 ring-sky-600/20",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={cn("inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset", statusStyles[status])}>
      {status}
    </span>
  );
}

export function Pill({ tone = "slate", children }: { tone?: "slate" | "green" | "amber" | "red" | "indigo"; children: React.ReactNode }) {
  const tones = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };
  return <span className={cn("inline-flex whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-medium", tones[tone])}>{children}</span>;
}

export function Progress({ value, tone = "indigo" }: { value: number; tone?: "indigo" | "amber" | "rose" | "emerald" }) {
  const tones = { indigo: "bg-indigo-500", amber: "bg-amber-500", rose: "bg-rose-500", emerald: "bg-emerald-500" };
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-100">
      <div className={cn("h-full rounded-full transition-all", tones[tone])} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

export function Kpi({
  label,
  value,
  hint,
  icon: Icon,
  tone = "slate",
}: {
  label: string;
  value: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "slate" | "amber" | "rose" | "emerald" | "indigo";
}) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    emerald: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600",
  };
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <span className={cn("grid h-8 w-8 place-items-center rounded-lg", tones[tone])}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </Card>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-indigo-600" : "bg-slate-300",
      )}
    >
      <span className={cn("inline-block h-5 w-5 rounded-full bg-white shadow transition-transform", checked ? "translate-x-5" : "translate-x-0.5")} />
    </button>
  );
}

export function GroupedBarChart({
  data,
  series,
  unit,
}: {
  data: { label: string; values: number[] }[];
  series: { name: string; color: string }[];
  unit: string;
}) {
  const max = Math.ceil(Math.max(...data.flatMap((d) => d.values)) + 1);
  const H = 180;
  const ticks = [0, max / 2, max];

  return (
    <div>
      <div className="mb-3 flex gap-4 text-xs text-slate-500">
        {series.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
            {s.name}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col justify-between pb-6 text-right text-[10px] text-slate-400" style={{ height: H + 24 }}>
          {[...ticks].reverse().map((t) => (
            <span key={t}>
              {t % 1 === 0 ? t : t.toFixed(1)}
              {unit}
            </span>
          ))}
        </div>
        <div className="flex flex-1 items-end justify-between gap-2 border-b border-l border-slate-200 pl-2" style={{ height: H }}>
          {data.map((d) => (
            <div key={d.label} className="group relative flex h-full flex-1 flex-col justify-end">
              <div className="flex h-full items-end justify-center gap-1">
                {d.values.map((v, i) => (
                  <div
                    key={i}
                    className="w-full max-w-[18px] rounded-t transition-opacity group-hover:opacity-80"
                    style={{ height: `${(v / max) * 100}%`, background: series[i].color }}
                    title={`${series[i].name}: ${v}${unit}`}
                  />
                ))}
              </div>
              <span className="absolute -bottom-6 left-0 right-0 text-center text-[11px] text-slate-500">{d.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
