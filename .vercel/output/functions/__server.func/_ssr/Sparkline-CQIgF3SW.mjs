import { t as cn } from "./demo-clock-DhQ-gtV_.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Sparkline-CQIgF3SW.js
var import_jsx_runtime = require_jsx_runtime();
function Sparkline({ data, className, tone = "info" }) {
	if (data.length < 2) return null;
	const min = Math.min(...data);
	const span = Math.max(...data) - min || 1;
	const w = 84;
	const h = 28;
	const pts = data.map((v, i) => {
		const x = i / (data.length - 1) * w;
		const y = h - (v - min) / span * 26 - 1;
		return `${x.toFixed(1)},${y.toFixed(1)}`;
	}).join(" ");
	const color = tone === "ok" ? "var(--color-ok)" : tone === "critical" ? "var(--color-critical)" : tone === "warn" || tone === "high" ? "var(--color-warn)" : "var(--color-predicted)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("h-7 w-[84px]", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			fill: "none",
			stroke: color,
			strokeWidth: "1.5",
			points: pts
		})
	});
}
//#endregion
export { Sparkline as t };
