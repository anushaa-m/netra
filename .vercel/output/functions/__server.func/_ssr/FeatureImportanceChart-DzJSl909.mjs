import { i as formatPct } from "./demo-clock-DhQ-gtV_.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/FeatureImportanceChart-DzJSl909.js
var import_jsx_runtime = require_jsx_runtime();
function FeatureImportanceChart({ features }) {
	const max = Math.max(...features.map((f) => f.contribution), .01);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2.5",
		children: features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-[minmax(0,1fr)_minmax(8rem,2fr)_auto] items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "truncate text-xs text-fg",
					children: f.feature
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-2 overflow-hidden rounded-full bg-bg-elevated",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full rounded-full bg-predicted",
						style: { width: `${f.contribution / max * 100}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-10 text-right font-mono text-xs tabular text-muted",
					children: formatPct(f.contribution * 100, 0)
				})
			]
		}, f.id))
	});
}
//#endregion
export { FeatureImportanceChart as t };
