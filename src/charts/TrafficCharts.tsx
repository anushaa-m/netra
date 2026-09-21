import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltipFrame } from "@/charts/ChartTooltip";
import { chartMargin, chartTheme } from "@/charts/chart-theme";
import type { TrafficSeries, TrafficSeriesPoint } from "@/types/netra";

function TimeSeries({
  data,
  unit,
}: {
  data: TrafficSeriesPoint[];
  unit?: string;
}) {
  const lastObservedIdx = data.reduce((acc, p, i) => (p.kind === "observed" ? i : acc), -1);
  const rows = data.map((p, i) => ({
    label: p.label,
    observed: p.kind === "observed" ? p.value : undefined,
    predicted: p.kind !== "observed" || i === lastObservedIdx ? p.value : undefined,
    kind: p.kind,
  }));
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={chartMargin}>
          <CartesianGrid stroke={chartTheme.grid} vertical={false} />
          <XAxis dataKey="label" tick={{ fill: chartTheme.axis, fontSize: 10 }} tickLine={false} axisLine={false} minTickGap={32} />
          <YAxis tick={{ fill: chartTheme.axis, fontSize: 10 }} tickLine={false} axisLine={false} width={36} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const v = payload.find((x) => x.value != null)?.value;
              return (
                <ChartTooltipFrame label={String(label)}>
                  <div>
                    {Number(v).toFixed(1)}
                    {unit ? ` ${unit}` : ""}
                  </div>
                </ChartTooltipFrame>
              );
            }}
          />
          <Line type="monotone" dataKey="observed" stroke={chartTheme.observed} strokeWidth={1.8} dot={false} isAnimationActive={false} />
          <Line type="monotone" dataKey="predicted" stroke={chartTheme.predicted} strokeWidth={1.8} strokeDasharray="4 4" dot={false} connectNulls isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function Dist({ data }: { data: { bucket: string; count: number }[] }) {
  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={chartMargin}>
          <CartesianGrid stroke={chartTheme.grid} vertical={false} />
          <XAxis dataKey="bucket" tick={{ fill: chartTheme.axis, fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fill: chartTheme.axis, fontSize: 10 }} tickLine={false} axisLine={false} width={32} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <ChartTooltipFrame label={String(label)}>
                  <div>{Number(payload[0].value)}</div>
                </ChartTooltipFrame>
              );
            }}
          />
          <Bar dataKey="count" fill={chartTheme.observed} radius={[3, 3, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrafficCharts({ series }: { series: TrafficSeries }) {
  const panels = [
    { title: "Packet rate", node: <TimeSeries data={series.packetRate} unit="pps" /> },
    { title: "Flow rate", node: <TimeSeries data={series.flowRate} unit="fps" /> },
    { title: "SYN/ACK ratio", node: <TimeSeries data={series.synAckRatio} /> },
    { title: "Destination port activity", node: <TimeSeries data={series.destPortActivity} unit="ports" /> },
    { title: "Flow duration distribution", node: <Dist data={series.flowDuration} /> },
    { title: "Inter-arrival time", node: <TimeSeries data={series.interArrival} unit="ms" /> },
    { title: "Packet-size distribution", node: <Dist data={series.packetSize} /> },
  ];
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {panels.map((p) => (
        <div key={p.title} className="rounded-lg bg-bg-elevated p-3">
          <div className="mb-2 text-xs font-medium text-muted">{p.title}</div>
          {p.node}
        </div>
      ))}
    </div>
  );
}
