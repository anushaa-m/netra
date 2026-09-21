import { Link } from "@tanstack/react-router";
import { RiskTimelineChart } from "@/charts/RiskTimelineChart";
import { KindTag } from "@/components/shared/KindTag";
import { PageHeader } from "@/components/shared/PageHeader";
import { RiskMeter } from "@/components/shared/RiskMeter";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { useTelemetry } from "@/data/useTelemetry";
import { formatPct } from "@/utils/format";

export function ThreatForecastPage() {
  const { riskTimeline, futureStates, earlyWarning, kpis } = useTelemetry();
  const forecastPoints = [10, 20, 30, 40, 50, 60].map((sec) => {
    const pt = riskTimeline.points.find((p) => p.offsetSec === sec) ?? riskTimeline.points.find((p) => p.offsetSec >= sec);
    return { sec, risk: pt?.risk ?? predictedAt(riskTimeline.currentRisk, sec), kind: pt?.kind ?? "predicted" };
  });

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Threat Forecast"
        title="Forward risk trajectory"
        subtitle="Observed history through the current state, then a 60-second rollout of predicted network risk."
      />

      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardTitle className="mb-3">Current</CardTitle>
          <RiskMeter risk={riskTimeline.currentRisk} />
        </Card>
        <Card>
          <CardTitle className="mb-3">+60 sec projected</CardTitle>
          <RiskMeter risk={earlyWarning.projectedRisk} />
        </Card>
        <Card>
          <CardTitle className="mb-1">Warning window</CardTitle>
          <div className="font-mono text-3xl tabular text-predicted">
            {earlyWarning.seconds == null ? "—" : `${earlyWarning.seconds} sec`}
          </div>
          <p className="mt-2 text-xs text-muted">Time until the 65% warning threshold on the predicted path.</p>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Predicted Network Risk</CardTitle>
            <CardDesc>{riskTimeline.explanation}</CardDesc>
          </div>
        </CardHeader>
        <RiskTimelineChart timeline={riskTimeline} />
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horizon checkpoints</CardTitle>
          <CardDesc>Discrete forecast samples used by the presentation path.</CardDesc>
        </CardHeader>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
          <Checkpoint label="Current" risk={riskTimeline.currentRisk} kind="observed" />
          {forecastPoints.map((p) => (
            <Checkpoint key={p.sec} label={`+${p.sec}s`} risk={p.risk} kind={p.kind} />
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Forward State Simulation</CardTitle>
            <CardDesc>S(t) → S(t+4) with dominant traffic behaviour at each step.</CardDesc>
          </div>
          <Button asChild size="sm">
            <Link to="/attack-progression">Attack progression</Link>
          </Button>
        </CardHeader>
        <ol className="space-y-2">
          {futureStates.map((s) => (
            <li key={s.offsetSec} className="grid gap-2 rounded-lg bg-bg-elevated px-3 py-2.5 md:grid-cols-[7rem_6rem_1fr_auto] md:items-center">
              <div className="font-mono text-xs text-muted">{s.offsetSec === 0 ? "CURRENT" : `+${s.offsetSec} sec`}</div>
              <div className="font-mono text-sm tabular text-fg">{formatPct(s.risk, 0)}</div>
              <div className="text-sm text-fg">
                {s.predictedState}
                <div className="text-xs text-muted">{s.behaviour}</div>
              </div>
              <KindTag kind={s.kind} />
            </li>
          ))}
        </ol>
      </Card>

      <p className="text-xs text-muted">
        Phase: {kpis.phase}. {kpis.narrativeDetail}
      </p>
    </div>
  );
}

function predictedAt(current: number, sec: number) {
  return Math.min(99, current + sec * 0.8);
}

function Checkpoint({
  label,
  risk,
  kind,
}: {
  label: string;
  risk: number;
  kind: "observed" | "predicted" | "projected";
}) {
  return (
    <div className="rounded-lg bg-bg-elevated p-3">
      <div className="text-[0.6875rem] tracking-wide text-muted uppercase">{label}</div>
      <div className="mt-1 font-mono text-xl tabular text-fg">{formatPct(risk, 0)}</div>
      <div className="mt-2">
        <KindTag kind={kind} />
      </div>
    </div>
  );
}
