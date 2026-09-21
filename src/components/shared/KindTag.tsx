import { Badge } from "@/components/ui/badge";
import type { ObservationKind } from "@/types/netra";

const LABELS: Record<ObservationKind | "warning", string> = {
  observed: "Observed",
  predicted: "Predicted",
  projected: "Projected",
  warning: "Warning",
};

export function KindTag({ kind }: { kind: ObservationKind | "warning" }) {
  const tone =
    kind === "observed" ? "observed" : kind === "predicted" ? "predicted" : kind === "warning" ? "warn" : "projected";
  return <Badge tone={tone}>{LABELS[kind]}</Badge>;
}

export function KindLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-[0.6875rem] text-muted">
      <span className="inline-flex items-center gap-1.5">
        <span className="h-px w-4 bg-observed" />
        Observed
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-px w-4 border-t border-dashed border-predicted" />
        Predicted
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-px w-4 border-t border-dashed border-projected" />
        Projected
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="h-3 w-px bg-accent" />
        Current state
      </span>
    </div>
  );
}
