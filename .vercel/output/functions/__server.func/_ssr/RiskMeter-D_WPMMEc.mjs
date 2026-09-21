import { c as riskTone, i as formatPct, s as riskLabel, t as cn } from "./demo-clock-DhQ-gtV_.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RiskMeter-D_WPMMEc.js
var import_jsx_runtime = require_jsx_runtime();
var TONE_CLASS = {
	ok: "text-ok",
	warn: "text-warn",
	high: "text-warn",
	critical: "text-critical"
};
var BAR_CLASS = {
	ok: "bg-ok",
	warn: "bg-warn",
	high: "bg-warn",
	critical: "bg-critical"
};
function RiskMeter({ risk, size = "md" }) {
	const tone = riskTone(risk);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("font-mono font-medium tabular leading-none", size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl", TONE_CLASS[tone]),
				children: formatPct(risk, 0)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-xs uppercase tracking-wide", TONE_CLASS[tone]),
				children: riskLabel(risk)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 h-1 overflow-hidden rounded-full bg-surface-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full transition-[width] duration-500 ease-out", BAR_CLASS[tone]),
				style: { width: `${Math.min(100, Math.max(0, risk))}%` }
			})
		})]
	});
}
//#endregion
export { RiskMeter as t };
