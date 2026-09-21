import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./demo-clock-DhQ-gtV_.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-Bz17xCYp.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center gap-1.5 rounded-sm px-1.5 py-0.5 text-[0.6875rem] font-medium tracking-wide uppercase", {
	variants: { tone: {
		ok: "bg-ok/15 text-ok",
		warn: "bg-warn/15 text-warn",
		high: "bg-warn/20 text-warn",
		critical: "bg-critical/15 text-critical",
		info: "bg-predicted/15 text-predicted",
		muted: "bg-surface-2 text-muted",
		observed: "bg-observed/15 text-observed",
		predicted: "bg-predicted/15 text-predicted",
		projected: "bg-projected/15 text-projected"
	} },
	defaultVariants: { tone: "muted" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
//#endregion
export { Badge as t };
