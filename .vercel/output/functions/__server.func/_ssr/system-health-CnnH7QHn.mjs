import { r as formatNumber } from "./demo-clock-DhQ-gtV_.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useTelemetry } from "./router-CcegYp32.mjs";
import { t as Badge } from "./badge-Bz17xCYp.mjs";
import { a as PageHeader, i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-C70syC6Q.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/system-health-CnnH7QHn.js
var import_jsx_runtime = require_jsx_runtime();
function SystemHealthPage() {
	const { health } = useTelemetry();
	const cards = [
		{
			label: "Inference Status",
			value: health.inferenceStatus
		},
		{
			label: "Telemetry",
			value: health.telemetry
		},
		{
			label: "State Encoder",
			value: health.stateEncoder
		},
		{
			label: "Temporal Model",
			value: health.temporalModel
		},
		{
			label: "Forecast Engine",
			value: health.forecastEngine
		},
		{
			label: "Explainability",
			value: health.explainability
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "System Health",
				title: "World Model Status",
				subtitle: "Frontend system-status for the defence console. Component readiness is reported independently of any remote inference service."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
				children: cards.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[0.6875rem] tracking-wide text-muted uppercase",
						children: c.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-lg text-fg",
						children: c.value
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "ok",
						children: c.value === "ONLINE" || c.value === "CONNECTED" || c.value === "READY" ? "Healthy" : c.value
					})]
				}, c.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Inference latency",
						value: `${Math.round(health.inferenceLatencyMs)} ms`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "States processed",
						value: formatNumber(health.statesProcessed)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "Forecast horizon",
						value: `${health.forecastHorizonSec} sec`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
						label: "State window",
						value: `${health.stateWindowSec} sec`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Pipeline" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDesc, { children: [
				"Last telemetry frame ",
				health.lastUpdate,
				"."
			] })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 md:grid-cols-5",
				children: [
					"Telemetry ingest",
					"State encoder",
					"Temporal model",
					"Forecast engine",
					"Explainability"
				].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-bg-elevated px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[0.6875rem] text-subtle",
							children: String(i + 1).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-sm text-fg",
							children: step
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-xs text-ok",
							children: "Ready"
						})
					]
				}, step))
			})] })
		]
	});
}
function Metric({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[0.6875rem] tracking-wide text-muted uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 font-mono text-2xl tabular text-fg",
		children: value
	})] });
}
var SplitComponent = SystemHealthPage;
//#endregion
export { SplitComponent as component };
