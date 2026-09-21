import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as riskTone, i as formatPct, r as formatNumber, t as cn } from "./demo-clock-DhQ-gtV_.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useTelemetry } from "./router-CcegYp32.mjs";
import { n as KindTag, t as KindLegend } from "./KindTag-By2LkIDl.mjs";
import { a as PageHeader, i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-C70syC6Q.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-DTKKqHIk.mjs";
import { t as Sparkline } from "./Sparkline-CQIgF3SW.mjs";
import { t as RiskMeter } from "./RiskMeter-D_WPMMEc.mjs";
import { n as chartMargin, r as chartTheme, t as ChartTooltipFrame } from "./chart-theme-BAMafDdZ.mjs";
import { a as Line, c as Bar, i as XAxis, l as ResponsiveContainer, n as LineChart, o as CartesianGrid, r as YAxis, t as BarChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/network-state-Dxy2eNQD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TimeSeries({ data, unit }) {
	const lastObservedIdx = data.reduce((acc, p, i) => p.kind === "observed" ? i : acc, -1);
	const rows = data.map((p, i) => ({
		label: p.label,
		observed: p.kind === "observed" ? p.value : void 0,
		predicted: p.kind !== "observed" || i === lastObservedIdx ? p.value : void 0,
		kind: p.kind
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-40 w-full",
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
							fontSize: 10
						},
						tickLine: false,
						axisLine: false,
						minTickGap: 32
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: chartTheme.axis,
							fontSize: 10
						},
						tickLine: false,
						axisLine: false,
						width: 36
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
						if (!active || !payload?.length) return null;
						const v = payload.find((x) => x.value != null)?.value;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipFrame, {
							label: String(label),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [Number(v).toFixed(1), unit ? ` ${unit}` : ""] })
						});
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "observed",
						stroke: chartTheme.observed,
						strokeWidth: 1.8,
						dot: false,
						isAnimationActive: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "predicted",
						stroke: chartTheme.predicted,
						strokeWidth: 1.8,
						strokeDasharray: "4 4",
						dot: false,
						connectNulls: true,
						isAnimationActive: false
					})
				]
			})
		})
	});
}
function Dist({ data }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-40 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				margin: chartMargin,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: chartTheme.grid,
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "bucket",
						tick: {
							fill: chartTheme.axis,
							fontSize: 10
						},
						tickLine: false,
						axisLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: chartTheme.axis,
							fontSize: 10
						},
						tickLine: false,
						axisLine: false,
						width: 32
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload, label }) => {
						if (!active || !payload?.length) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltipFrame, {
							label: String(label),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: Number(payload[0].value) })
						});
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "count",
						fill: chartTheme.observed,
						radius: [
							3,
							3,
							0,
							0
						],
						isAnimationActive: false
					})
				]
			})
		})
	});
}
function TrafficCharts({ series }) {
	const panels = [
		{
			title: "Packet rate",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeSeries, {
				data: series.packetRate,
				unit: "pps"
			})
		},
		{
			title: "Flow rate",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeSeries, {
				data: series.flowRate,
				unit: "fps"
			})
		},
		{
			title: "SYN/ACK ratio",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeSeries, { data: series.synAckRatio })
		},
		{
			title: "Destination port activity",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeSeries, {
				data: series.destPortActivity,
				unit: "ports"
			})
		},
		{
			title: "Flow duration distribution",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dist, { data: series.flowDuration })
		},
		{
			title: "Inter-arrival time",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeSeries, {
				data: series.interArrival,
				unit: "ms"
			})
		},
		{
			title: "Packet-size distribution",
			node: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dist, { data: series.packetSize })
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 md:grid-cols-2",
		children: panels.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg bg-bg-elevated p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 text-xs font-medium text-muted",
				children: p.title
			}), p.node]
		}, p.title))
	});
}
var TONE = {
	ok: "stroke-ok fill-ok/20",
	warn: "stroke-warn fill-warn/20",
	high: "stroke-warn fill-warn/20",
	critical: "stroke-critical fill-critical/25"
};
function NetworkMap({ graph }) {
	const byId = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-center justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: "observed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-xl text-right text-[0.6875rem] leading-relaxed text-muted",
			children: graph.caption
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-lg bg-bg-elevated p-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			className: "h-[28rem] w-full min-w-[32rem]",
			children: [graph.links.map((l) => {
				const a = byId[l.from];
				const b = byId[l.to];
				if (!a || !b) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: a.x,
					y1: a.y,
					x2: b.x,
					y2: b.y,
					className: l.risky ? "stroke-critical/70" : "stroke-border-strong",
					strokeWidth: .6 + l.intensity * .8,
					strokeDasharray: "1.6 1.8",
					style: { animation: "netra-flow 2.4s linear infinite" }
				}, `${l.from}-${l.to}`);
			}), graph.nodes.map((n) => {
				const tone = riskTone(n.risk);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: `translate(${n.x} ${n.y})`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							r: "5.2",
							className: cn("stroke-[0.6]", TONE[tone])
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							r: "1.4",
							className: "fill-fg"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							y: "8.6",
							textAnchor: "middle",
							className: "fill-fg",
							style: {
								fontSize: "3.1px",
								fontFamily: "var(--font-sans)"
							},
							children: n.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
							y: "12.2",
							textAnchor: "middle",
							className: "fill-muted",
							style: {
								fontSize: "2.5px",
								fontFamily: "var(--font-mono)"
							},
							children: [
								formatPct(n.risk, 0),
								" · ",
								n.status
							]
						})
					]
				}, n.id);
			})]
		})
	})] });
}
function NetworkStatePage() {
	const { networkState, metrics, topology, traffic } = useTelemetry();
	const [window, setWindow] = (0, import_react.useState)("5m");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Network State",
				title: "Current encoded window",
				subtitle: "Telemetry features for the active 10-second state, with traffic behaviour over selectable horizons."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Current Network State" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: networkState.dominantBehaviour })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right font-mono text-xs text-muted",
				children: [networkState.timestamp, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-subtle",
					children: [
						"WINDOW ",
						networkState.windowSec,
						"s"
					]
				})]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "State ID",
						v: networkState.stateId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Flows",
						v: formatNumber(networkState.flows)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Packets",
						v: formatNumber(networkState.packets)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2 lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[0.6875rem] tracking-wide text-muted uppercase",
							children: "Risk"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskMeter, {
							risk: networkState.risk,
							size: "sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Predicted state",
						v: networkState.label
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-5",
				children: metrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "rounded-lg p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[0.6875rem] tracking-wide text-muted uppercase",
								children: m.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 font-mono text-lg tabular text-fg",
								children: [m.value, m.unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 text-xs text-subtle",
									children: m.unit
								}) : null]
							}),
							m.delta ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-0.5 text-[0.6875rem] text-muted",
								children: [m.delta, " vs baseline"]
							}) : null
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
							data: m.spark,
							tone: m.tone === "info" ? "info" : m.tone
						})]
					})
				}, m.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Traffic behaviour" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Solid traces are observed. Dashed traces are the forward window." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: window,
					onValueChange: (v) => setWindow(v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "1m",
							children: "Last 1 min"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "5m",
							children: "Last 5 min"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "15m",
							children: "Last 15 min"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "1h",
							children: "Last hour"
						})
					] })
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindLegend, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrafficCharts, { series: traffic[window] })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Network topology overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Intended future topology-aware view. Risk on nodes follows the shared scenario." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NetworkMap, { graph: topology })] })
		]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[0.6875rem] tracking-wide text-muted uppercase",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 font-mono text-sm text-fg",
		children: v
	})] });
}
var SplitComponent = NetworkStatePage;
//#endregion
export { SplitComponent as component };
