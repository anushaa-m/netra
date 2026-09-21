import { cn } from "@/utils/cn";

export function Sparkline({
  data,
  className,
  tone = "info",
}: {
  data: number[];
  className?: string;
  tone?: "ok" | "warn" | "high" | "critical" | "info";
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const w = 84;
  const h = 28;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / span) * (h - 2) - 1;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const color =
    tone === "ok"
      ? "var(--color-ok)"
      : tone === "critical"
        ? "var(--color-critical)"
        : tone === "warn" || tone === "high"
          ? "var(--color-warn)"
          : "var(--color-predicted)";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-7 w-[84px]", className)} aria-hidden="true">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={pts} />
    </svg>
  );
}
