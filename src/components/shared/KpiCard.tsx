import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

export function KpiCard({
  label,
  value,
  hint,
  tone = "fg",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "fg" | "ok" | "warn" | "critical" | "info";
}) {
  const valueClass =
    tone === "ok"
      ? "text-ok"
      : tone === "warn"
        ? "text-warn"
        : tone === "critical"
          ? "text-critical"
          : tone === "info"
            ? "text-predicted"
            : "text-fg";
  return (
    <Card className="rounded-lg p-3.5">
      <div className="text-[0.6875rem] tracking-[0.14em] text-muted uppercase">{label}</div>
      <div className={cn("mt-1.5 font-mono text-2xl font-medium tabular leading-none", valueClass)}>{value}</div>
      {hint ? <div className="mt-1.5 text-xs text-muted">{hint}</div> : null}
    </Card>
  );
}
