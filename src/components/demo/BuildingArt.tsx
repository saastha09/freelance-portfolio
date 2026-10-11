import type { SiteProject } from "@/lib/demo-data";

/** Lightweight blueprint-style illustration so the demo needs no stock photos. */
export function BuildingArt({ category, progress }: { category: SiteProject["category"]; progress: number }) {
  const built = Math.max(0.15, progress / 100);

  return (
    <svg viewBox="0 0 320 160" className="bg-blueprint h-full w-full" aria-hidden="true">
      <line x1="0" y1="140" x2="320" y2="140" stroke="#f59e0b" strokeOpacity="0.5" />

      {category === "Infrastructure" ? (
        <g>
          <path d="M0 140 L120 100 L320 92" stroke="#57534e" strokeWidth="18" fill="none" />
          <path d="M0 140 L120 100 L320 92" stroke="#f59e0b" strokeWidth="2" strokeDasharray="10 8" fill="none" />
          <path
            d="M0 140 L120 100 L320 92"
            stroke="#fbbf24"
            strokeWidth="18"
            strokeOpacity="0.35"
            fill="none"
            pathLength={100}
            strokeDasharray={`${progress} 100`}
          />
        </g>
      ) : category === "Industrial" ? (
        <g>
          <path d="M40 140 V80 L110 60 L180 80 L250 60 L280 70 V140 Z" fill="none" stroke="#a8a29e" strokeDasharray="4 4" />
          <path
            d={`M40 140 V${140 - 60 * built} H${40 + 240 * built} V140 Z`}
            fill="#f59e0b"
            fillOpacity="0.25"
            stroke="#f59e0b"
          />
          {[70, 120, 170, 220].map((x) => (
            <line key={x} x1={x} y1="140" x2={x} y2="85" stroke="#a8a29e" strokeOpacity="0.4" />
          ))}
        </g>
      ) : (
        <g>
          {[
            { x: 60, w: 70, h: 110 },
            { x: 140, w: 60, h: 80 },
            { x: 210, w: 56, h: 95 },
          ].map((b, i) => {
            const h = i === 0 ? b.h * built : b.h * Math.min(1, built + 0.2);
            return (
              <g key={b.x}>
                <rect x={b.x} y={140 - b.h} width={b.w} height={b.h} fill="none" stroke="#a8a29e" strokeDasharray="4 4" />
                <rect x={b.x} y={140 - h} width={b.w} height={h} fill="#f59e0b" fillOpacity="0.22" stroke="#f59e0b" />
                {Array.from({ length: Math.floor(h / 14) }).map((_, r) => (
                  <line
                    key={r}
                    x1={b.x + 6}
                    x2={b.x + b.w - 6}
                    y1={140 - 10 - r * 14}
                    y2={140 - 10 - r * 14}
                    stroke="#fbbf24"
                    strokeOpacity="0.35"
                  />
                ))}
              </g>
            );
          })}
          <g stroke="#fbbf24" strokeWidth="2">
            <line x1="40" y1="140" x2="40" y2="18" />
            <line x1="30" y1="22" x2="150" y2="22" />
            <line x1="120" y1="22" x2="120" y2="48" strokeWidth="1" />
          </g>
        </g>
      )}
    </svg>
  );
}
