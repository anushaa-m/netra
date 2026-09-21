import { cn } from "@/utils/cn";
import { formatPct, riskLabel, riskTone } from "@/utils/format";

const TONE_CLASS = {
  ok: "text-ok",
  warn: "text-warn",
  high: "text-warn",
  critical: "text-critical",
};

const BAR_CLASS = {
  ok: "bg-ok",
  warn: "bg-warn",
  high: "bg-warn",
  critical: "bg-critical",
};

export function RiskMeter({ risk, size = "md" }: { risk: number; size?: "sm" | "md" | "lg" }) {
  const tone = riskTone(risk);
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-2">
        <span
          className={cn(
            "font-mono font-medium tabular leading-none",
            size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl",
            TONE_CLASS[tone],
          )}
        >
          {formatPct(risk, 0)}
        </span>
        <span className={cn("text-xs uppercase tracking-wide", TONE_CLASS[tone])}>{riskLabel(risk)}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className={cn("h-full rounded-full transition-[width] duration-500 ease-out", BAR_CLASS[tone])}
          style={{ width: `${Math.min(100, Math.max(0, risk))}%` }}
        />
      </div>
    </div>
  );
}
