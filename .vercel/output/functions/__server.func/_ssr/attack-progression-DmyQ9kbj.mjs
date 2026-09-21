import { i as formatPct, t as cn } from "./demo-clock-DhQ-gtV_.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useTelemetry } from "./router-CcegYp32.mjs";
import { t as Badge } from "./badge-Bz17xCYp.mjs";
import { n as KindTag } from "./KindTag-By2LkIDl.mjs";
import { a as PageHeader, i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-C70syC6Q.mjs";
import { t as Button } from "./button-BvcHrOdV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attack-progression-DmyQ9kbj.js
var import_jsx_runtime = require_jsx_runtime();
function AttackProgressionPage() {
	const { attackProgression, earlyWarning, alerts } = useTelemetry();
	const critical = alerts.find((a) => a.severity === "CRITICAL") ?? alerts[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Attack Progression",
				title: "Predicted attack progression",
				subtitle: "Kill-chain stages are only highlighted when the trajectory supports them. Unlit stages are not asserted."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "MITRE ATT&CK stage path" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: attackProgression.summary })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-2 lg:flex-row lg:items-stretch",
				children: attackProgression.stages.map((st, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 flex-1 items-stretch gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("flex-1 rounded-lg px-3 py-3", st.status === "current" ? "bg-warn/15 shadow-[0_0_0_1px_var(--color-warn)]" : st.status === "predicted" ? "bg-predicted/10 border border-dashed border-predicted" : st.status === "potential" ? "bg-surface-2" : st.status === "observed" ? "bg-observed/15" : "bg-bg-elevated"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[0.6875rem] tracking-wide text-subtle uppercase",
										children: st.mitre
									}),
									st.status === "current" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: "observed" }) : null,
									st.status === "predicted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: "predicted" }) : null,
									st.status === "potential" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: "projected" }) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-sm font-medium text-fg",
								children: st.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[0.6875rem] tracking-wide text-muted uppercase",
								children: st.status
							})
						]
					}), i < attackProgression.stages.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden items-center text-subtle lg:flex",
						children: "↓"
					}) : null]
				}, st.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "mb-2",
							children: "Current"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg text-fg capitalize",
							children: attackProgression.currentStage?.replaceAll("_", " ") ?? "None asserted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: "Suspected stage from the observed window."
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "mb-2",
							children: "Predicted"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg capitalize text-predicted",
							children: attackProgression.predictedStage?.replaceAll("_", " ") ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 font-mono text-sm tabular text-muted",
							children: [
								"Probability ",
								attackProgression.predictedProbability,
								"%"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "mb-2",
							children: "Potential next stage"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg capitalize text-projected",
							children: attackProgression.nextStage?.replaceAll("_", " ") ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 font-mono text-sm tabular text-muted",
							children: [
								"Confidence ",
								attackProgression.nextConfidence,
								"%"
							]
						})
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Early warning linkage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDesc, { children: [
				earlyWarning.explanation,
				" Current ",
				formatPct(earlyWarning.currentRisk, 0),
				" → projected",
				" ",
				formatPct(earlyWarning.projectedRisk, 0),
				"."
			] })] }), critical ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/investigation/$id",
					params: { id: critical.investigationId },
					children: "Investigate"
				})
			}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "warn",
					children: earlyWarning.status
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "info",
					children: earlyWarning.seconds == null ? "No threshold in horizon" : `${earlyWarning.seconds}s warning`
				})]
			})] })
		]
	});
}
var SplitComponent = AttackProgressionPage;
//#endregion
export { SplitComponent as component };
