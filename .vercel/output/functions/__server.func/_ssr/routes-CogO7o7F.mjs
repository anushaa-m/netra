import { c as riskTone, i as formatPct, r as formatNumber, t as cn } from "./demo-clock-DhQ-gtV_.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { f as ArrowRight } from "../_libs/lucide-react.mjs";
import { r as useTelemetry } from "./router-CcegYp32.mjs";
import { t as Badge } from "./badge-Bz17xCYp.mjs";
import { n as KindTag } from "./KindTag-By2LkIDl.mjs";
import { a as PageHeader, i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-C70syC6Q.mjs";
import { t as Button } from "./button-BvcHrOdV.mjs";
import { t as FeatureImportanceChart } from "./FeatureImportanceChart-DzJSl909.mjs";
import { t as RiskTimelineChart } from "./RiskTimelineChart-BCUj7g9s.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CogO7o7F.js
var import_jsx_runtime = require_jsx_runtime();
function KpiCard({ label, value, hint, tone = "fg" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-lg p-3.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[0.6875rem] tracking-[0.14em] text-muted uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("mt-1.5 font-mono text-2xl font-medium tabular leading-none", tone === "ok" ? "text-ok" : tone === "warn" ? "text-warn" : tone === "critical" ? "text-critical" : tone === "info" ? "text-predicted" : "text-fg"),
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5 text-xs text-muted",
				children: hint
			}) : null
		]
	});
}
var SEV = {
	CRITICAL: "critical",
	HIGH: "high",
	MEDIUM: "warn",
	LOW: "ok"
};
function OverviewPage() {
	const { kpis, riskTimeline, futureStates, earlyWarning, attackProgression, alerts, explainability } = useTelemetry();
	const tone = riskTone(kpis.networkRisk);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Command Center",
				title: "Predictive Cyber Defence",
				subtitle: "Network World Model — Real-Time Behaviour & Attack Progression Forecast"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("rounded-xl px-4 py-3 shadow-[var(--shadow-border)]", tone === "ok" ? "bg-ok/10" : tone === "critical" ? "bg-critical/10" : "bg-warn/10"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-medium text-fg",
					children: kpis.narrative
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs leading-relaxed text-muted",
					children: kpis.narrativeDetail
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Network Risk",
						value: formatPct(kpis.networkRisk, 0),
						hint: kpis.riskLabel,
						tone: tone === "ok" ? "ok" : tone === "critical" ? "critical" : "warn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Active Flows",
						value: formatNumber(kpis.activeFlows),
						hint: "Live session count"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Network States",
						value: formatNumber(kpis.networkStates),
						hint: "Encoded windows"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Active Threats",
						value: kpis.activeThreats,
						hint: kpis.activeThreats ? "Under investigation" : "None asserted",
						tone: kpis.activeThreats ? "warn" : "ok"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Earliest Warning",
						value: kpis.earliestWarningSec == null ? "—" : `${kpis.earliestWarningSec}s`,
						hint: "To warning threshold",
						tone: "info"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Model Confidence",
						value: `${kpis.modelConfidence.toFixed(1)}%`,
						hint: "Temporal forecast",
						tone: "info"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 xl:grid-cols-[minmax(0,1.6fr)_minmax(18rem,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Predicted Network Risk" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: riskTimeline.explanation })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskTimelineChart, { timeline: riskTimeline })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Early Warning" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Estimated warning before projected attack progression" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: earlyWarning.currentRisk >= 65 ? "projected" : "predicted" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-5xl font-medium tabular text-predicted",
							children: earlyWarning.seconds == null ? "—" : `${earlyWarning.seconds}s`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Current risk",
									v: formatPct(earlyWarning.currentRisk, 0)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Projected risk",
									v: formatPct(earlyWarning.projectedRisk, 0)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Warning threshold",
									v: formatPct(earlyWarning.threshold, 0)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: earlyWarning.status.includes("PRE-ATTACK") || earlyWarning.status.includes("EXCEEDED") ? "critical" : "ok",
							className: "mt-4 w-fit",
							children: earlyWarning.status
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs leading-relaxed text-muted",
							children: earlyWarning.explanation
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Forward State Simulation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "World-model rollouts of S(t) through S(t+4). Observed present, predicted future." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 md:grid-cols-5",
				children: futureStates.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative rounded-lg bg-bg-elevated p-3",
					children: [
						i < futureStates.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute top-1/2 -right-2 hidden text-subtle md:block",
							children: "→"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[0.6875rem] tracking-wide text-muted uppercase",
								children: s.offsetSec === 0 ? "S(t)" : `S(t+${s.offsetSec})`
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: s.kind })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 font-mono text-xs text-subtle",
							children: s.timestamp
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 font-mono text-xl tabular text-fg",
							children: formatPct(s.risk, 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-xs leading-relaxed text-muted",
							children: s.predictedState
						})
					]
				}, s.offsetSec))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Predicted Attack Progression" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: attackProgression.summary })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/attack-progression",
							children: ["Open ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1 overflow-x-auto pb-1",
						children: attackProgression.stages.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("min-w-[7.5rem] rounded-md px-2 py-2 text-center text-[0.6875rem] uppercase tracking-wide", st.status === "current" ? "bg-warn/15 text-warn" : st.status === "predicted" ? "bg-predicted/15 text-predicted" : st.status === "potential" ? "bg-surface-2 text-muted" : st.status === "observed" ? "bg-observed/15 text-observed" : "bg-bg-elevated text-subtle"),
							children: [st.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 normal-case tracking-normal text-[0.625rem] text-subtle",
								children: st.status
							})]
						}, st.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Current",
							v: attackProgression.currentStage ?? "None"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Predicted",
							v: attackProgression.predictedStage ? `${attackProgression.predictedStage.replaceAll("_", " ")} · ${attackProgression.predictedProbability}%` : "—"
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Alert Center" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Prioritized trajectories and behavioural deviations." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: alerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No alerts in the current window."
					}) : alerts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/investigation/$id",
						params: { id: a.investigationId },
						className: "flex items-start justify-between gap-3 rounded-lg bg-bg-elevated px-3 py-2.5 transition-[background-color] duration-150 hover:bg-surface-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: SEV[a.severity],
								children: a.severity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-sm text-fg",
								children: a.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-xs text-muted",
								children: a.progression
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right font-mono text-xs tabular text-muted",
							children: [formatPct(a.risk, 0), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-subtle",
								children: [a.confidence, "% conf"]
							})]
						})]
					}, a.id))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Why is the risk increasing?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: explainability.explanation })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/explainability",
					children: ["Explainability ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureImportanceChart, { features: explainability.features })] })
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-fg capitalize",
			children: v.replaceAll("_", " ")
		})]
	});
}
var SplitComponent = OverviewPage;
//#endregion
export { SplitComponent as component };
