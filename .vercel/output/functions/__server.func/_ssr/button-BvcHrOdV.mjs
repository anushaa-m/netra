import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./demo-clock-DhQ-gtV_.mjs";
import { n as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-BvcHrOdV.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium outline-none disabled:pointer-events-none disabled:opacity-40 transition-[background-color,color,box-shadow,opacity,transform] duration-150 ease-out active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-fg text-bg hover:bg-fg/90",
			accent: "bg-accent text-accent-fg hover:bg-accent/90",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)] hover:bg-surface-2",
			ghost: "bg-transparent text-muted hover:text-fg hover:bg-surface-2",
			danger: "bg-critical/15 text-critical hover:bg-critical/25"
		},
		size: {
			sm: "h-8 px-2.5 text-xs",
			md: "h-9 px-3.5",
			lg: "h-11 px-4",
			icon: "size-9"
		}
	},
	defaultVariants: {
		variant: "outline",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
