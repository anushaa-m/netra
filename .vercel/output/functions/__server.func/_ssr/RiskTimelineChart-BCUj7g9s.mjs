import { i as formatPct } from "./demo-clock-DhQ-gtV_.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as KindLegend } from "./KindTag-By2LkIDl.mjs";
import { n as chartMargin, r as chartTheme, t as ChartTooltipFrame } from "./chart-theme-BAMafDdZ.mjs";
import { a as Line, i as XAxis, l as ResponsiveContainer, n as LineChart, o as CartesianGrid, r as YAxis, s as ReferenceLine, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RiskTimelineChart-BCUj7g9s.js
var import_jsx_runtime = require_jsx_runtime();
function RiskTimelineChart({ timeline }) {
	const current = timeline.points[timeline.currentIndex];
	const rows = timeline.points.map((p, i) => {
		const row = {
			label: p.label,
			kind: p.kind,
			offsetSec: p.offsetSec
		};
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex flex-wrap items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindLegend, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "font-mono text-xs text-muted tabular",
			children: [
				"Current ",
				formatPct(timeline.currentRisk, 0),
				" · Threshold ",
				formatPct(timeline.warningThreshold, 0)
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data: rows,
				margin: chartMargin,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: chartTheme.grid,
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: chartTheme.axis,
							fontSize: 11
						},
						tickLine: false,
						axisLine: false,
						minTickGap: 28
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						domain: [0, 100],
						tick: {
							fill: chartTheme.axis,
							fontSize: 11
						},
						tickLine: false,
						axisLine: false,
						tickFormatter: (v) => `${v}%`,
						width: 40
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
						if (!active || !payload?.length) return null;
						const row = payload[0]?.payload;
						const value = row.projected ?? row.predicted ?? row.observed;
						const kind = row.offsetSec > 0 ? row.projected ? "Projected" : "Predicted" : "Observed";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipFrame, {
							label: String(label),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								kind,
								": ",
								formatPct(Number(value ?? 0), 1)
							] })
						});
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
						y: timeline.warningThreshold,
						stroke: chartTheme.warn,
						strokeDasharray: "3 4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
						x: current?.label,
						stroke: chartTheme.accent,
						strokeWidth: 1.5,
						label: {
							value: "CURRENT STATE",
							fill: chartTheme.accent,
							fontSize: 10,
							position: "insideTopLeft"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "observed",
						stroke: chartTheme.observed,
						strokeWidth: 2,
						dot: false,
						connectNulls: false,
						isAnimationActive: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "predicted",
						stroke: chartTheme.predicted,
						strokeWidth: 2,
						strokeDasharray: "5 4",
						dot: false,
						connectNulls: true,
						isAnimationActive: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "projected",
						stroke: chartTheme.projected,
						strokeWidth: 2,
						strokeDasharray: "2 4",
						dot: false,
						connectNulls: true,
						isAnimationActive: false
					})
				]
			})
		})
	})] });
}
//#endregion
export { RiskTimelineChart as t };
