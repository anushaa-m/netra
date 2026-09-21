import { t as cn } from "./demo-clock-DhQ-gtV_.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useTelemetry } from "./router-CcegYp32.mjs";
import { n as KindTag } from "./KindTag-By2LkIDl.mjs";
import { a as PageHeader, i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-C70syC6Q.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DTKKqHIk.mjs";
import { t as FeatureImportanceChart } from "./FeatureImportanceChart-DzJSl909.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explainability-DiIjNIzG.js
var import_jsx_runtime = require_jsx_runtime();
function ExplainabilityPage() {
	const { explainability } = useTelemetry();
	const maxW = Math.max(...explainability.attention.map((a) => a.weight), .01);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Explainability",
			title: "Why is the risk increasing?",
			subtitle: explainability.explanation
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "features",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "features",
						children: "Feature Contribution"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "attention",
						children: "Attention / Temporal Importance"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "behaviour",
						children: "Behavioural Indicators"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "features",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Feature contribution" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Relative weight of observed behavioural characteristics associated with the predicted risk trajectory." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeatureImportanceChart, { features: explainability.features })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "attention",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Temporal attention" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Which state windows most influence the current forecast." })] }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end gap-2",
							children: explainability.attention.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-1 flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-40 w-full items-end rounded-md bg-bg-elevated px-1 pb-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("w-full rounded-sm", a.kind === "observed" ? "bg-observed" : "bg-predicted", a.kind === "predicted" && "opacity-80"),
										style: { height: `${a.weight / maxW * 100}%` }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[0.625rem] text-muted",
									children: a.window
								})]
							}, a.window))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: "Solid observed windows versus dashed-style predicted windows (cyan). Peak attention sits on S(t) and the near forecast."
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "behaviour",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 md:grid-cols-2",
						children: explainability.indicators.map((ind) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: ind.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KindTag, { kind: ind.kind })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted",
							children: ind.detail
						})] }, ind.id))
					})
				})
			]
		})]
	});
}
var SplitComponent = ExplainabilityPage;
//#endregion
export { SplitComponent as component };
