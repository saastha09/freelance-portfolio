import { cn } from "@/lib/utils";
import { RevealWords } from "./fx";

/** Section heading: numbered kicker, big display title with an optional serif-italic tail. */
export function Heading({
  index,
  kicker,
  title,
  accent,
  description,
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  accent?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-4xl", className)}>
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
        <span className="text-sand">{index}</span>
        <span className="h-px w-12 bg-white/30" />
        {kicker}
      </p>
      <h2 className="mt-5 font-display text-[2rem] font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[3.2rem]">
        <RevealWords text={title} />
        {accent && (
          <>
            {" "}
            <RevealWords text={accent} delay={0.15} className="font-serif font-normal italic" wordClassName="text-gradient pr-[0.06em]" />
          </>
        )}
      </h2>
      {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">{description}</p>}
    </div>
  );
}
