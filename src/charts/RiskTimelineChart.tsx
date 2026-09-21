import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltipFrame } from "@/charts/ChartTooltip";
import { chartMargin, chartTheme } from "@/charts/chart-theme";
import { KindLegend } from "@/components/shared/KindTag";
import type { RiskTimeline } from "@/types/netra";
import { formatPct } from "@/utils/format";

type Row = {
  label: string;
  observed?: number;
  predicted?: number;
  projected?: number;
  kind: string;
  offsetSec: number;
};

export function RiskTimelineChart({ timeline }: { timeline: RiskTimeline }) {
  const current = timeline.points[timeline.currentIndex];
  const rows: Row[] = timeline.points.map((p, i) => {
    const row: Row = { label: p.label, kind: p.kind, offsetSec: p.offsetSec };
    if (p.kind === "observed") row.observed = p.risk;
    if (i === timeline.currentIndex) {
      row.observed = p.risk;
      row.predicted = p.risk;
    }
    if (p.kind === "predicted") row.predicted = p.risk;
    if (p.kind === "projected") {
      row.predicted = p.risk;
      row.projected = p.risk;
    }
    return row;
  });

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <KindLegend />
        <div className="font-mono text-xs text-muted tabular">
          Current {formatPct(timeline.currentRisk, 0)} · Threshold {formatPct(timeline.warningThreshold, 0)}
        </div>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={rows} margin={chartMargin}>
            <CartesianGrid stroke={chartTheme.grid} vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: chartTheme.axis, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={28}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: chartTheme.axis, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
              width={40}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const row = payload[0]?.payload as Row;
                const value = row.projected ?? row.predicted ?? row.observed;
                const kind =
                  row.offsetSec > 0 ? (row.projected ? "Projected" : "Predicted") : "Observed";
                return (
                  <ChartTooltipFrame label={String(label)}>
                    <div>
                      {kind}: {formatPct(Number(value ?? 0), 1)}
                    </div>
                  </ChartTooltipFrame>
                );
              }}
            />
            <ReferenceLine
              y={timeline.warningThreshold}
              stroke={chartTheme.warn}
              strokeDasharray="3 4"
            />
            <ReferenceLine
              x={current?.label}
              stroke={chartTheme.accent}
              strokeWidth={1.5}
              label={{ value: "CURRENT STATE", fill: chartTheme.accent, fontSize: 10, position: "insideTopLeft" }}
            />
            <Line
              type="monotone"
              dataKey="observed"
              stroke={chartTheme.observed}
              strokeWidth={2}
              dot={false}
              connectNulls={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke={chartTheme.predicted}
              strokeWidth={2}
              strokeDasharray="5 4"
              dot={false}
              connectNulls
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="projected"
              stroke={chartTheme.projected}
              strokeWidth={2}
              strokeDasharray="2 4"
              dot={false}
              connectNulls
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
