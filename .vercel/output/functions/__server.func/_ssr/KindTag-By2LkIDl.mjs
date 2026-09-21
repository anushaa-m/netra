import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Badge } from "./badge-Bz17xCYp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/KindTag-By2LkIDl.js
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	observed: "Observed",
	predicted: "Predicted",
	projected: "Projected",
	warning: "Warning"
};
function KindTag({ kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: kind === "observed" ? "observed" : kind === "predicted" ? "predicted" : kind === "warning" ? "warn" : "projected",
		children: LABELS[kind]
	});
}
function KindLegend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-4 text-[0.6875rem] text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-4 bg-observed" }), "Observed"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-4 border-t border-dashed border-predicted" }), "Predicted"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-4 border-t border-dashed border-projected" }), "Projected"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-px bg-accent" }), "Current state"]
			})
		]
	});
}
//#endregion
export { KindTag as n, KindLegend as t };
