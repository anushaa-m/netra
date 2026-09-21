import { t as cn } from "./demo-clock-DhQ-gtV_.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tabs-DTKKqHIk.js
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("inline-flex h-9 items-center gap-0.5 rounded-lg bg-bg-elevated p-0.5 shadow-[var(--shadow-border)]", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("inline-flex h-8 items-center justify-center rounded-md px-3 text-xs font-medium text-muted", "transition-[background-color,color] duration-150", "data-[state=active]:bg-surface-2 data-[state=active]:text-fg", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("outline-none", className),
		...props
	});
}
//#endregion
export { TabsTrigger as i, TabsContent as n, TabsList as r, Tabs as t };
