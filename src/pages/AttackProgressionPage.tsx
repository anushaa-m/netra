import { Link } from "@tanstack/react-router";
import { KindTag } from "@/components/shared/KindTag";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { useTelemetry } from "@/data/useTelemetry";
import { cn } from "@/utils/cn";
import { formatPct } from "@/utils/format";

export function AttackProgressionPage() {
  const { attackProgression, earlyWarning, alerts } = useTelemetry();
  const critical = alerts.find((a) => a.severity === "CRITICAL") ?? alerts[0];

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Attack Progression"
        title="Predicted attack progression"
        subtitle="Kill-chain stages are only highlighted when the trajectory supports them. Unlit stages are not asserted."
      />

      <Card>
        <CardHeader>
          <div>
            <CardTitle>MITRE ATT&CK stage path</CardTitle>
            <CardDesc>{attackProgression.summary}</CardDesc>
          </div>
        </CardHeader>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch">
          {attackProgression.stages.map((st, i) => (
            <div key={st.id} className="flex min-w-0 flex-1 items-stretch gap-2">
              <div
                className={cn(
                  "flex-1 rounded-lg px-3 py-3",
                  st.status === "current"
                    ? "bg-warn/15 shadow-[0_0_0_1px_var(--color-warn)]"
                    : st.status === "predicted"
                      ? "bg-predicted/10 border border-dashed border-predicted"
                      : st.status === "potential"
                        ? "bg-surface-2"
                        : st.status === "observed"
                          ? "bg-observed/15"
                          : "bg-bg-elevated",
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[0.6875rem] tracking-wide text-subtle uppercase">{st.mitre}</span>
                  {st.status === "current" ? <KindTag kind="observed" /> : null}
                  {st.status === "predicted" ? <KindTag kind="predicted" /> : null}
                  {st.status === "potential" ? <KindTag kind="projected" /> : null}
                </div>
                <div className="mt-2 text-sm font-medium text-fg">{st.label}</div>
                <div className="mt-1 text-[0.6875rem] tracking-wide text-muted uppercase">{st.status}</div>
              </div>
              {i < attackProgression.stages.length - 1 ? (
                <div className="hidden items-center text-subtle lg:flex">↓</div>
              ) : null}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardTitle className="mb-2">Current</CardTitle>
          <div className="text-lg text-fg capitalize">
            {attackProgression.currentStage?.replaceAll("_", " ") ?? "None asserted"}
          </div>
          <p className="mt-2 text-xs text-muted">Suspected stage from the observed window.</p>
        </Card>
        <Card>
          <CardTitle className="mb-2">Predicted</CardTitle>
          <div className="text-lg capitalize text-predicted">
            {attackProgression.predictedStage?.replaceAll("_", " ") ?? "—"}
          </div>
          <div className="mt-1 font-mono text-sm tabular text-muted">
            Probability {attackProgression.predictedProbability}%
          </div>
        </Card>
        <Card>
          <CardTitle className="mb-2">Potential next stage</CardTitle>
          <div className="text-lg capitalize text-projected">
            {attackProgression.nextStage?.replaceAll("_", " ") ?? "—"}
          </div>
          <div className="mt-1 font-mono text-sm tabular text-muted">
            Confidence {attackProgression.nextConfidence}%
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Early warning linkage</CardTitle>
            <CardDesc>
              {earlyWarning.explanation} Current {formatPct(earlyWarning.currentRisk, 0)} → projected{" "}
              {formatPct(earlyWarning.projectedRisk, 0)}.
            </CardDesc>
          </div>
          {critical ? (
            <Button asChild size="sm">
              <Link to="/investigation/$id" params={{ id: critical.investigationId }}>
                Investigate
              </Link>
            </Button>
          ) : null}
        </CardHeader>
        <div className="flex flex-wrap gap-2">
          <Badge tone="warn">{earlyWarning.status}</Badge>
          <Badge tone="info">{earlyWarning.seconds == null ? "No threshold in horizon" : `${earlyWarning.seconds}s warning`}</Badge>
        </div>
      </Card>
    </div>
  );
}
