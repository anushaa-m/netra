import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { useTelemetry } from "@/data/useTelemetry";
import { formatNumber } from "@/utils/format";

export function SystemHealthPage() {
  const { health } = useTelemetry();
  const cards = [
    { label: "Inference Status", value: health.inferenceStatus },
    { label: "Telemetry", value: health.telemetry },
    { label: "State Encoder", value: health.stateEncoder },
    { label: "Temporal Model", value: health.temporalModel },
    { label: "Forecast Engine", value: health.forecastEngine },
    { label: "Explainability", value: health.explainability },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="System Health"
        title="World Model Status"
        subtitle="Frontend system-status for the defence console. Component readiness is reported independently of any remote inference service."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Card key={c.label} className="flex items-center justify-between">
            <div>
              <div className="text-[0.6875rem] tracking-wide text-muted uppercase">{c.label}</div>
              <div className="mt-1 text-lg text-fg">{c.value}</div>
            </div>
            <Badge tone="ok">{c.value === "ONLINE" || c.value === "CONNECTED" || c.value === "READY" ? "Healthy" : c.value}</Badge>
          </Card>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Inference latency" value={`${Math.round(health.inferenceLatencyMs)} ms`} />
        <Metric label="States processed" value={formatNumber(health.statesProcessed)} />
        <Metric label="Forecast horizon" value={`${health.forecastHorizonSec} sec`} />
        <Metric label="State window" value={`${health.stateWindowSec} sec`} />
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Pipeline</CardTitle>
            <CardDesc>Last telemetry frame {health.lastUpdate}.</CardDesc>
          </div>
        </CardHeader>
        <div className="grid gap-2 md:grid-cols-5">
          {["Telemetry ingest", "State encoder", "Temporal model", "Forecast engine", "Explainability"].map((step, i) => (
            <div key={step} className="rounded-lg bg-bg-elevated px-3 py-3">
              <div className="text-[0.6875rem] text-subtle">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-sm text-fg">{step}</div>
              <div className="mt-2 text-xs text-ok">Ready</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <div className="text-[0.6875rem] tracking-wide text-muted uppercase">{label}</div>
      <div className="mt-1 font-mono text-2xl tabular text-fg">{value}</div>
    </Card>
  );
}
