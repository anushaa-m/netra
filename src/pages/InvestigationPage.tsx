import { Link } from "@tanstack/react-router";
import { Sparkline } from "@/charts/Sparkline";
import { KindTag } from "@/components/shared/KindTag";
import { PageHeader } from "@/components/shared/PageHeader";
import { RiskMeter } from "@/components/shared/RiskMeter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvestigation } from "@/data/provider";
import { useTelemetry } from "@/data/useTelemetry";
import { formatPct } from "@/utils/format";

export function InvestigationPage({ id }: { id: string }) {
  const snap = useTelemetry();
  const inv = getInvestigation(snap.elapsedSec, id);

  const chain = [
    { label: "Observed behaviour", body: inv.observedBehaviour, kind: "observed" as const },
    { label: "Latent network state", body: inv.latentState, kind: "observed" as const },
    { label: "Predicted future states", body: inv.predictedFuture, kind: "predicted" as const },
    { label: "Attack progression", body: inv.attackProgression, kind: "projected" as const },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Investigation"
        title={inv.id}
        subtitle={inv.title}
        actions={
          <div className="flex gap-2">
            <Button asChild size="sm">
              <Link to="/event-timeline">View timeline</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/explainability">View explanation</Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div className="text-[0.6875rem] tracking-wide text-muted uppercase">Current risk</div>
          <div className="mt-2">
            <RiskMeter risk={inv.currentRisk} size="sm" />
          </div>
        </Card>
        <Card>
          <div className="text-[0.6875rem] tracking-wide text-muted uppercase">Predicted stage</div>
          <div className="mt-2 text-lg text-predicted">{inv.predictedStage}</div>
          <div className="mt-1 font-mono text-xs text-muted">Confidence {formatPct(inv.confidence, 1)}</div>
        </Card>
        <Card>
          <div className="text-[0.6875rem] tracking-wide text-muted uppercase">First anomaly</div>
          <div className="mt-2 font-mono text-lg tabular">{inv.firstAnomaly}</div>
          <div className="mt-1 text-xs text-muted">Current state {inv.currentState}</div>
        </Card>
        <Card>
          <div className="text-[0.6875rem] tracking-wide text-muted uppercase">Projected progression</div>
          <div className="mt-2 font-mono text-lg tabular text-projected">{inv.projectedProgression}</div>
        </Card>
      </div>

      <div className="grid gap-2 md:grid-cols-4">
        {chain.map((c, i) => (
          <Card key={c.label} className="relative">
            {i < chain.length - 1 ? (
              <div className="pointer-events-none absolute -right-2 top-8 hidden text-subtle md:block">↓</div>
            ) : null}
            <div className="mb-2 flex items-center justify-between gap-2">
              <CardTitle>{c.label}</CardTitle>
              <KindTag kind={c.kind} />
            </div>
            <p className="text-sm leading-relaxed text-muted">{c.body}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Evidence</CardTitle>
            <CardDesc>Behavioural measurements supporting this investigation.</CardDesc>
          </div>
        </CardHeader>
        <div className="grid gap-3 md:grid-cols-5">
          {inv.evidence.map((e) => (
            <div key={e.id} className="rounded-lg bg-bg-elevated p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="text-xs text-muted">{e.title}</div>
                <Sparkline data={e.trend} />
              </div>
              <div className="mt-2 font-mono text-lg tabular text-fg">{e.value}</div>
              <p className="mt-1 text-[0.6875rem] leading-relaxed text-subtle">{e.note}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related events</CardTitle>
        </CardHeader>
        <div className="space-y-2">
          {inv.events.map((e) => (
            <div key={e.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-bg-elevated px-3 py-2">
              <div className="font-mono text-xs tabular text-muted">{e.timestamp}</div>
              <div className="text-sm text-fg">
                {e.source} → {e.destination}:{e.port}
              </div>
              <div className="text-xs text-muted">{e.behaviour}</div>
              <Badge tone={e.risk === "Critical" || e.risk === "High" ? "critical" : "warn"}>{e.risk}</Badge>
              <KindTag kind={e.kind} />
            </div>
          ))}
          {inv.events.length === 0 ? <p className="text-sm text-muted">No correlated events yet in this window.</p> : null}
        </div>
      </Card>
    </div>
  );
}
