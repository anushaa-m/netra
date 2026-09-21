import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { i as formatPct, t as cn } from "./demo-clock-DhQ-gtV_.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useTelemetry } from "./router-CcegYp32.mjs";
import { t as Badge } from "./badge-Bz17xCYp.mjs";
import { n as KindTag } from "./KindTag-By2LkIDl.mjs";
import { a as PageHeader, i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-C70syC6Q.mjs";
import { i as TabsTrigger, r as TabsList, t as Tabs } from "./tabs-DTKKqHIk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/event-timeline-Bue9GNSx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"All",
	"High Risk",
	"Reconnaissance",
	"Initial Access",
	"Lateral Movement",
	"C2",
	"Exfiltration"
];
function matches(event, filter) {
	if (filter === "All") return true;
	if (filter === "High Risk") return event.risk === "High" || event.risk === "Critical";
	if (filter === "C2") return event.stage.toLowerCase().includes("command");
	return event.stage.toLowerCase().includes(filter.toLowerCase());
}
var RISK_TONE = {
	Low: "ok",
	Medium: "warn",
	High: "high",
	Critical: "critical"
};
function EventTimelinePage() {
	const { timeline, events } = useTelemetry();
	const [filter, setFilter] = (0, import_react.useState)("All");
	const rows = (0, import_react.useMemo)(() => events.filter((e) => matches(e, filter)), [events, filter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Event Timeline",
				title: "Observed history and projected markers",
				subtitle: "Markers distinguish observed telemetry from predicted and warning events along the same scenario."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Attack timeline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Scenario clock from baseline through projected progression." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "relative space-y-0 border-l border-border pl-5",
				children: timeline.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative pb-5 last:pb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute -left-[1.45rem] top-1 size-2.5 rounded-full", m.kind === "observed" ? "bg-observed" : m.kind === "predicted" ? "bg-predicted" : m.kind === "warning" ? "bg-warn" : "bg-projected") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs tabular text-muted",
								children: m.timestamp
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: m.kind })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-fg",
							children: m.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs leading-relaxed text-muted",
							children: m.detail
						})
					]
				}, m.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Detected / Predicted Events" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Private-network flows associated with the shared scenario." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
				value: filter,
				onValueChange: (v) => setFilter(v),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList, {
					className: "flex-wrap",
					children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: f,
						children: f
					}, f))
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[56rem] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-[0.6875rem] tracking-wide text-muted uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border",
							children: [
								"Timestamp",
								"Source",
								"Destination",
								"Port",
								"Protocol",
								"Behaviour",
								"Risk",
								"Stage",
								"Confidence",
								"Status"
							].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-2 font-medium",
								children: h
							}, h))
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/80 text-fg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 font-mono text-xs tabular",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/investigation/$id",
									params: { id: e.investigationId },
									className: "hover:text-accent",
									children: e.timestamp
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 font-mono text-xs",
								children: e.source
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 font-mono text-xs",
								children: e.destination
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 font-mono text-xs",
								children: e.port
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-xs",
								children: e.protocol
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-xs",
								children: e.behaviour
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: RISK_TONE[e.risk],
									children: e.risk
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 text-xs",
								children: e.stage
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2 font-mono text-xs tabular",
								children: formatPct(e.confidence, 0)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs",
										children: e.status
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: e.kind })]
								})
							})
						]
					}, e.id)) })]
				}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "px-2 py-6 text-sm text-muted",
					children: "No events in this filter."
				}) : null]
			})] })
		]
	});
}
var SplitComponent = EventTimelinePage;
//#endregion
export { SplitComponent as component };
