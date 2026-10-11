import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 px-5 py-20 sm:px-8 md:py-28", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p
        className={cn(
          "font-mono text-xs font-medium uppercase tracking-[0.18em]",
          dark ? "text-amber-400" : "text-brand",
        )}
      >
        {eyebrow}
      </p>
      <h2 className={cn("mt-3 text-3xl font-semibold tracking-tight sm:text-4xl", dark ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", dark ? "text-slate-300" : "text-ink-soft")}>
          {description}
        </p>
      )}
    </div>
  );
}
