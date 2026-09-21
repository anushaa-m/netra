import { i as formatPct } from "./demo-clock-DhQ-gtV_.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useTelemetry } from "./router-CcegYp32.mjs";
import { n as KindTag } from "./KindTag-By2LkIDl.mjs";
import { a as PageHeader, i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-C70syC6Q.mjs";
import { t as Button } from "./button-BvcHrOdV.mjs";
import { t as RiskMeter } from "./RiskMeter-D_WPMMEc.mjs";
import { t as RiskTimelineChart } from "./RiskTimelineChart-BCUj7g9s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/threat-forecast-BkpGiIXJ.js
var import_jsx_runtime = require_jsx_runtime();
function ThreatForecastPage() {
	const { riskTimeline, futureStates, earlyWarning, kpis } = useTelemetry();
	const forecastPoints = [
		10,
		20,
		30,
		40,
		50,
		60
	].map((sec) => {
		const pt = riskTimeline.points.find((p) => p.offsetSec === sec) ?? riskTimeline.points.find((p) => p.offsetSec >= sec);
		return {
			sec,
			risk: pt?.risk ?? predictedAt(riskTimeline.currentRisk, sec),
			kind: pt?.kind ?? "predicted"
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Threat Forecast",
				title: "Forward risk trajectory",
				subtitle: "Observed history through the current state, then a 60-second rollout of predicted network risk."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "mb-3",
						children: "Current"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskMeter, { risk: riskTimeline.currentRisk })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "mb-3",
						children: "+60 sec projected"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskMeter, { risk: earlyWarning.projectedRisk })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "mb-1",
							children: "Warning window"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-3xl tabular text-predicted",
							children: earlyWarning.seconds == null ? "—" : `${earlyWarning.seconds} sec`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: "Time until the 65% warning threshold on the predicted path."
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Predicted Network Risk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: riskTimeline.explanation })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskTimelineChart, { timeline: riskTimeline })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Horizon checkpoints" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Discrete forecast samples used by the presentation path." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2 sm:grid-cols-2 lg:grid-cols-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkpoint, {
					label: "Current",
					risk: riskTimeline.currentRisk,
					kind: "observed"
				}), forecastPoints.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkpoint, {
					label: `+${p.sec}s`,
					risk: p.risk,
					kind: p.kind
				}, p.sec))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Forward State Simulation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "S(t) → S(t+4) with dominant traffic behaviour at each step." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/attack-progression",
					children: "Attack progression"
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "space-y-2",
				children: futureStates.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "grid gap-2 rounded-lg bg-bg-elevated px-3 py-2.5 md:grid-cols-[7rem_6rem_1fr_auto] md:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-xs text-muted",
							children: s.offsetSec === 0 ? "CURRENT" : `+${s.offsetSec} sec`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-sm tabular text-fg",
							children: formatPct(s.risk, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-fg",
							children: [s.predictedState, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted",
								children: s.behaviour
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: s.kind })
					]
				}, s.offsetSec))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted",
				children: [
					"Phase: ",
					kpis.phase,
					". ",
					kpis.narrativeDetail
				]
			})
		]
	});
}
function predictedAt(current, sec) {
	return Math.min(99, current + sec * .8);
}
function Checkpoint({ label, risk, kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-bg-elevated p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[0.6875rem] tracking-wide text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-mono text-xl tabular text-fg",
				children: formatPct(risk, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind })
			})
		]
	});
}
var SplitComponent = ThreatForecastPage;
//#endregion
export { SplitComponent as component };
