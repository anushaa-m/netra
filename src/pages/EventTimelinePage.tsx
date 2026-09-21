import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { KindTag } from "@/components/shared/KindTag";
import { PageHeader } from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTelemetry } from "@/data/useTelemetry";
import { cn } from "@/utils/cn";
import { formatPct } from "@/utils/format";
import type { ThreatEvent } from "@/types/netra";

const FILTERS = ["All", "High Risk", "Reconnaissance", "Initial Access", "Lateral Movement", "C2", "Exfiltration"] as const;

function matches(event: ThreatEvent, filter: (typeof FILTERS)[number]) {
  if (filter === "All") return true;
  if (filter === "High Risk") return event.risk === "High" || event.risk === "Critical";
  if (filter === "C2") return event.stage.toLowerCase().includes("command");
  return event.stage.toLowerCase().includes(filter.toLowerCase());
}

const RISK_TONE = {
  Low: "ok" as const,
  Medium: "warn" as const,
  High: "high" as const,
  Critical: "critical" as const,
};

export function EventTimelinePage() {
  const { timeline, events } = useTelemetry();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const rows = useMemo(() => events.filter((e) => matches(e, filter)), [events, filter]);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Event Timeline"
        title="Observed history and projected markers"
        subtitle="Markers distinguish observed telemetry from predicted and warning events along the same scenario."
      />

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Attack timeline</CardTitle>
            <CardDesc>Scenario clock from baseline through projected progression.</CardDesc>
          </div>
        </CardHeader>
        <ol className="relative space-y-0 border-l border-border pl-5">
          {timeline.map((m) => (
            <li key={m.id} className="relative pb-5 last:pb-0">
              <span
                className={cn(
                  "absolute -left-[1.45rem] top-1 size-2.5 rounded-full",
                  m.kind === "observed"
                    ? "bg-observed"
                    : m.kind === "predicted"
                      ? "bg-predicted"
                      : m.kind === "warning"
                        ? "bg-warn"
                        : "bg-projected",
                )}
              />
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs tabular text-muted">{m.timestamp}</span>
                <KindTag kind={m.kind} />
              </div>
              <div className="mt-1 text-sm text-fg">{m.title}</div>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{m.detail}</p>
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Detected / Predicted Events</CardTitle>
            <CardDesc>Private-network flows associated with the shared scenario.</CardDesc>
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as (typeof FILTERS)[number])}>
            <TabsList className="flex-wrap">
              {FILTERS.map((f) => (
                <TabsTrigger key={f} value={f}>
                  {f}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[56rem] text-left text-sm">
            <thead className="text-[0.6875rem] tracking-wide text-muted uppercase">
              <tr className="border-b border-border">
                {[
                  "Timestamp",
                  "Source",
                  "Destination",
                  "Port",
                  "Protocol",
                  "Behaviour",
                  "Risk",
                  "Stage",
                  "Confidence",
                  "Status",
                ].map((h) => (
                  <th key={h} className="px-2 py-2 font-medium">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} className="border-b border-border/80 text-fg">
                  <td className="px-2 py-2 font-mono text-xs tabular">
                    <Link to="/investigation/$id" params={{ id: e.investigationId }} className="hover:text-accent">
                      {e.timestamp}
                    </Link>
                  </td>
                  <td className="px-2 py-2 font-mono text-xs">{e.source}</td>
                  <td className="px-2 py-2 font-mono text-xs">{e.destination}</td>
                  <td className="px-2 py-2 font-mono text-xs">{e.port}</td>
                  <td className="px-2 py-2 text-xs">{e.protocol}</td>
                  <td className="px-2 py-2 text-xs">{e.behaviour}</td>
                  <td className="px-2 py-2">
                    <Badge tone={RISK_TONE[e.risk]}>{e.risk}</Badge>
                  </td>
                  <td className="px-2 py-2 text-xs">{e.stage}</td>
                  <td className="px-2 py-2 font-mono text-xs tabular">{formatPct(e.confidence, 0)}</td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{e.status}</span>
                      <KindTag kind={e.kind} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 ? <p className="px-2 py-6 text-sm text-muted">No events in this filter.</p> : null}
        </div>
      </Card>
    </div>
  );
}
