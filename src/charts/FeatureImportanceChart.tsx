import type { FeatureContribution } from "@/types/netra";
import { formatPct } from "@/utils/format";

export function FeatureImportanceChart({ features }: { features: FeatureContribution[] }) {
  const max = Math.max(...features.map((f) => f.contribution), 0.01);
  return (
    <div className="space-y-3">
      {features.map((f) => (
        <div key={f.id} className="flex items-center gap-3">
          <div className="w-[9.5rem] shrink-0 truncate text-xs text-fg sm:w-52">{f.feature}</div>
          <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-border-strong">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${Math.max(6, (f.contribution / max) * 100)}%` }}
            />
          </div>
          <div className="w-10 shrink-0 text-right font-mono text-xs tabular text-muted">
            {formatPct(f.contribution * 100, 0)}
          </div>
        </div>
      ))}
    </div>
  );
}
