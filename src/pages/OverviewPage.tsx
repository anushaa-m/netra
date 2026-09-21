import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { RiskTimelineChart } from "@/charts/RiskTimelineChart";
import { FeatureImportanceChart } from "@/charts/FeatureImportanceChart";
import { KindTag } from "@/components/shared/KindTag";
import { KpiCard } from "@/components/shared/KpiCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { useTelemetry } from "@/data/useTelemetry";
import { cn } from "@/utils/cn";
import { formatNumber, formatPct, riskTone } from "@/utils/format";

const SEV = {
  CRITICAL: "critical" as const,
  HIGH: "high" as const,
  MEDIUM: "warn" as const,
  LOW: "ok" as const,
};

export function OverviewPage() {
  const { kpis, riskTimeline, futureStates, earlyWarning, attackProgression, alerts, explainability } =
    useTelemetry();
  const tone = riskTone(kpis.networkRisk);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Command Center"
        title="Predictive Cyber Defence"
        subtitle="Network World Model — Real-Time Behaviour & Attack Progression Forecast"
      />

      <div
        className={cn(
          "rounded-xl px-4 py-3 shadow-[var(--shadow-border)]",
          tone === "ok" ? "bg-ok/10" : tone === "critical" ? "bg-critical/10" : "bg-warn/10",
        )}
      >
        <div className="text-sm font-medium text-fg">{kpis.narrative}</div>
        <p className="mt-1 text-xs leading-relaxed text-muted">{kpis.narrativeDetail}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        <KpiCard
          label="Network Risk"
          value={formatPct(kpis.networkRisk, 0)}
          hint={kpis.riskLabel}
          tone={tone === "ok" ? "ok" : tone === "critical" ? "critical" : "warn"}
        />
        <KpiCard label="Active Flows" value={formatNumber(kpis.activeFlows)} hint="Live session count" />
        <KpiCard label="Network States" value={formatNumber(kpis.networkStates)} hint="Encoded windows" />
        <KpiCard
          label="Active Threats"
          value={kpis.activeThreats}
          hint={kpis.activeThreats ? "Under investigation" : "None asserted"}
          tone={kpis.activeThreats ? "warn" : "ok"}
        />
        <KpiCard
          label="Earliest Warning"
          value={kpis.earliestWarningSec == null ? "—" : `${kpis.earliestWarningSec}s`}
          hint="To warning threshold"
          tone="info"
        />
        <KpiCard
          label="Model Confidence"
          value={`${kpis.modelConfidence.toFixed(1)}%`}
          hint="Temporal forecast"
          tone="info"
        />
      </div>

      <div className="grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_minmax(18rem,1fr)]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Predicted Network Risk</CardTitle>
              <CardDesc>{riskTimeline.explanation}</CardDesc>
            </div>
          </CardHeader>
          <RiskTimelineChart timeline={riskTimeline} />
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div>
              <CardTitle>Early Warning</CardTitle>
              <CardDesc>Estimated warning before projected attack progression</CardDesc>
            </div>
            <KindTag kind={earlyWarning.currentRisk >= 65 ? "projected" : "predicted"} />
          </CardHeader>
          <div className="font-mono text-5xl font-medium tabular text-predicted">
            {earlyWarning.seconds == null ? "—" : `${earlyWarning.seconds}s`}
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <Row k="Current risk" v={formatPct(earlyWarning.currentRisk, 0)} />
            <Row k="Projected risk" v={formatPct(earlyWarning.projectedRisk, 0)} />
            <Row k="Warning threshold" v={formatPct(earlyWarning.threshold, 0)} />
          </div>
          <Badge
            tone={earlyWarning.status.includes("PRE-ATTACK") || earlyWarning.status.includes("EXCEEDED") ? "critical" : "ok"}
            className="mt-4 w-fit"
          >
            {earlyWarning.status}
          </Badge>
          <p className="mt-3 text-xs leading-relaxed text-muted">{earlyWarning.explanation}</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Forward State Simulation</CardTitle>
            <CardDesc>World-model rollouts of S(t) through S(t+4). Observed present, predicted future.</CardDesc>
          </div>
        </CardHeader>
        <div className="grid min-w-0 gap-2 md:grid-cols-5">
          {futureStates.map((s, i) => (
            <div key={s.offsetSec} className="relative rounded-lg bg-bg-elevated p-3">
              {i < futureStates.length - 1 ? (
                <div className="pointer-events-none absolute top-1/2 -right-2 hidden text-subtle md:block">→</div>
              ) : null}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[0.6875rem] tracking-wide text-muted uppercase">
                  {s.offsetSec === 0 ? "S(t)" : `S(t+${s.offsetSec})`}
                </span>
                <KindTag kind={s.kind} />
              </div>
              <div className="mt-2 font-mono text-xs text-subtle">{s.timestamp}</div>
              <div className="mt-1 font-mono text-xl tabular text-fg">{formatPct(s.risk, 0)}</div>
              <div className="mt-2 text-xs leading-relaxed text-muted">{s.predictedState}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid min-w-0 gap-3 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Predicted Attack Progression</CardTitle>
              <CardDesc>{attackProgression.summary}</CardDesc>
            </div>
            <Button asChild size="sm">
              <Link to="/attack-progression">
                Open <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <div className="flex min-w-0 gap-1 overflow-x-auto pb-1">
            {attackProgression.stages.map((st) => (
              <div
                key={st.id}
                className={cn(
                  "min-w-[7.5rem] rounded-md px-2 py-2 text-center text-[0.6875rem] uppercase tracking-wide",
                  st.status === "current"
                    ? "bg-warn/15 text-warn"
                    : st.status === "predicted"
                      ? "bg-predicted/15 text-predicted"
                      : st.status === "potential"
                        ? "bg-surface-2 text-muted"
                        : st.status === "observed"
                          ? "bg-observed/15 text-observed"
                          : "bg-bg-elevated text-subtle",
                )}
              >
                {st.label}
                <div className="mt-1 normal-case tracking-normal text-[0.625rem] text-subtle">{st.status}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <Row k="Current" v={attackProgression.currentStage ?? "None"} />
            <Row
              k="Predicted"
              v={
                attackProgression.predictedStage
                  ? `${attackProgression.predictedStage.replaceAll("_", " ")} · ${attackProgression.predictedProbability}%`
                  : "—"
              }
            />
          </div>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Alert Center</CardTitle>
              <CardDesc>Prioritized trajectories and behavioural deviations.</CardDesc>
            </div>
          </CardHeader>
          <div className="space-y-2">
            {alerts.length === 0 ? (
              <p className="text-sm text-muted">No alerts in the current window.</p>
            ) : (
              alerts.map((a) => (
                <Link
                  key={a.id}
                  to="/investigation/$id"
                  params={{ id: a.investigationId }}
                  className="flex items-start justify-between gap-3 rounded-lg bg-bg-elevated px-3 py-2.5 transition-[background-color] duration-150 hover:bg-surface-2"
                >
                  <div>
                    <Badge tone={SEV[a.severity]}>{a.severity}</Badge>
                    <div className="mt-1 text-sm text-fg">{a.title}</div>
                    <div className="mt-0.5 text-xs text-muted">{a.progression}</div>
                  </div>
                  <div className="text-right font-mono text-xs tabular text-muted">
                    {formatPct(a.risk, 0)}
                    <div className="text-subtle">{a.confidence}% conf</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Why is the risk increasing?</CardTitle>
            <CardDesc>{explainability.explanation}</CardDesc>
          </div>
          <Button asChild size="sm">
            <Link to="/explainability">
              Explainability <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <FeatureImportanceChart features={explainability.features} />
      </Card>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted">{k}</span>
      <span className="font-mono text-fg capitalize">{v.replaceAll("_", " ")}</span>
    </div>
  );
}





