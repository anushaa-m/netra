import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chart-theme-BAMafDdZ.js
var import_jsx_runtime = require_jsx_runtime();
function ChartTooltipFrame({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-surface-2 px-2.5 py-2 text-xs shadow-[var(--shadow-border-hover)]",
		children: [label ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-1 text-muted",
			children: label
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-0.5 text-fg",
			children
		})]
	});
}
var chartTheme = {
	observed: "var(--color-observed)",
	predicted: "var(--color-predicted)",
	projected: "var(--color-projected)",
	accent: "var(--color-accent)",
	warn: "var(--color-warn)",
	critical: "var(--color-critical)",
	ok: "var(--color-ok)",
	grid: "var(--color-border)",
	axis: "var(--color-muted)",
	tooltipBg: "var(--color-surface-2)",
	tooltipFg: "var(--color-fg)"
};
var chartMargin = {
	top: 8,
	right: 16,
	left: 0,
	bottom: 0
};
//#endregion
export { chartMargin as n, chartTheme as r, ChartTooltipFrame as t };
