import { a as getInvestigation, i as formatPct } from "./demo-clock-DhQ-gtV_.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Route, r as useTelemetry } from "./router-CcegYp32.mjs";
import { t as Badge } from "./badge-Bz17xCYp.mjs";
import { n as KindTag } from "./KindTag-By2LkIDl.mjs";
import { a as PageHeader, i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-C70syC6Q.mjs";
import { t as Button } from "./button-BvcHrOdV.mjs";
import { t as Sparkline } from "./Sparkline-CQIgF3SW.mjs";
import { t as RiskMeter } from "./RiskMeter-D_WPMMEc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/investigation._id-BKQh1BCx.js
var import_jsx_runtime = require_jsx_runtime();
function InvestigationPage({ id }) {
	const snap = useTelemetry();
	const inv = getInvestigation(snap.elapsedSec, id);
	const chain = [
		{
			label: "Observed behaviour",
			body: inv.observedBehaviour,
			kind: "observed"
		},
		{
			label: "Latent network state",
			body: inv.latentState,
			kind: "observed"
		},
		{
			label: "Predicted future states",
			body: inv.predictedFuture,
			kind: "predicted"
		},
		{
			label: "Attack progression",
			body: inv.attackProgression,
			kind: "projected"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Investigation",
				title: inv.id,
				subtitle: inv.title,
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/event-timeline",
							children: "View timeline"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/explainability",
							children: "View explanation"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[0.6875rem] tracking-wide text-muted uppercase",
						children: "Current risk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskMeter, {
							risk: inv.currentRisk,
							size: "sm"
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[0.6875rem] tracking-wide text-muted uppercase",
							children: "Predicted stage"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-lg text-predicted",
							children: inv.predictedStage
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 font-mono text-xs text-muted",
							children: ["Confidence ", formatPct(inv.confidence, 1)]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[0.6875rem] tracking-wide text-muted uppercase",
							children: "First anomaly"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 font-mono text-lg tabular",
							children: inv.firstAnomaly
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-muted",
							children: ["Current state ", inv.currentState]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[0.6875rem] tracking-wide text-muted uppercase",
						children: "Projected progression"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 font-mono text-lg tabular text-projected",
						children: inv.projectedProgression
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 md:grid-cols-4",
				children: chain.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "relative",
					children: [
						i < chain.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute -right-2 top-8 hidden text-subtle md:block",
							children: "↓"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: c.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: c.kind })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: c.body
						})
					]
				}, c.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Evidence" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Behavioural measurements supporting this investigation." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 md:grid-cols-5",
				children: inv.evidence.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-bg-elevated p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted",
								children: e.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, { data: e.trend })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 font-mono text-lg tabular text-fg",
							children: e.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[0.6875rem] leading-relaxed text-subtle",
							children: e.note
						})
					]
				}, e.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Related events" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [inv.events.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 rounded-lg bg-bg-elevated px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-xs tabular text-muted",
							children: e.timestamp
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-fg",
							children: [
								e.source,
								" → ",
								e.destination,
								":",
								e.port
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted",
							children: e.behaviour
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: e.risk === "Critical" || e.risk === "High" ? "critical" : "warn",
							children: e.risk
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: e.kind })
					]
				}, e.id)), inv.events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No correlated events yet in this window."
				}) : null]
			})] })
		]
	});
}
function InvestigationRoute() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InvestigationPage, { id });
}
//#endregion
export { InvestigationRoute as component };
