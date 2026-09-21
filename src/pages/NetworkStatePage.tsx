import { useState } from "react";
import { Sparkline } from "@/charts/Sparkline";
import { TrafficCharts } from "@/charts/TrafficCharts";
import { NetworkMap } from "@/components/topology/NetworkMap";
import { PageHeader } from "@/components/shared/PageHeader";
import { RiskMeter } from "@/components/shared/RiskMeter";
import { KindLegend } from "@/components/shared/KindTag";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTelemetry } from "@/data/useTelemetry";
import type { TimeWindow } from "@/types/netra";
import { formatNumber } from "@/utils/format";

export function NetworkStatePage() {
  const { networkState, metrics, topology, traffic } = useTelemetry();
  const [window, setWindow] = useState<TimeWindow>("5m");

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Network State"
        title="Current encoded window"
        subtitle="Telemetry features for the active 10-second state, with traffic behaviour over selectable horizons."
      />

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Current Network State</CardTitle>
            <CardDesc>{networkState.dominantBehaviour}</CardDesc>
          </div>
          <div className="text-right font-mono text-xs text-muted">
            {networkState.timestamp}
            <div className="text-subtle">WINDOW {networkState.windowSec}s</div>
          </div>
        </CardHeader>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <Stat k="State ID" v={networkState.stateId} />
          <Stat k="Flows" v={formatNumber(networkState.flows)} />
          <Stat k="Packets" v={formatNumber(networkState.packets)} />
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="text-[0.6875rem] tracking-wide text-muted uppercase">Risk</div>
            <RiskMeter risk={networkState.risk} size="sm" />
          </div>
          <Stat k="Predicted state" v={networkState.label} />
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((m) => (
          <Card key={m.id} className="rounded-lg p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-[0.6875rem] tracking-wide text-muted uppercase">{m.label}</div>
                <div className="mt-1 font-mono text-lg tabular text-fg">
                  {m.value}
                  {m.unit ? <span className="ml-1 text-xs text-subtle">{m.unit}</span> : null}
                </div>
                {m.delta ? <div className="mt-0.5 text-[0.6875rem] text-muted">{m.delta} vs baseline</div> : null}
              </div>
              <Sparkline data={m.spark} tone={m.tone === "info" ? "info" : m.tone} />
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Traffic behaviour</CardTitle>
            <CardDesc>Solid traces are observed. Dashed traces are the forward window.</CardDesc>
          </div>
          <Tabs value={window} onValueChange={(v) => setWindow(v as TimeWindow)}>
            <TabsList>
              <TabsTrigger value="1m">Last 1 min</TabsTrigger>
              <TabsTrigger value="5m">Last 5 min</TabsTrigger>
              <TabsTrigger value="15m">Last 15 min</TabsTrigger>
              <TabsTrigger value="1h">Last hour</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <div className="mb-3">
          <KindLegend />
        </div>
        <TrafficCharts series={traffic[window]} />
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Network topology overlay</CardTitle>
            <CardDesc>Intended future topology-aware view. Risk on nodes follows the shared scenario.</CardDesc>
          </div>
        </CardHeader>
        <NetworkMap graph={topology} />
      </Card>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <div className="text-[0.6875rem] tracking-wide text-muted uppercase">{k}</div>
      <div className="mt-1 font-mono text-sm text-fg">{v}</div>
    </div>
  );
}
