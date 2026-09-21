import { l as useDemoClock, n as formatDuration } from "./demo-clock-DhQ-gtV_.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as PageHeader, i as CardTitle, n as CardDesc, r as CardHeader, t as Card } from "./card-C70syC6Q.mjs";
import { t as Button } from "./button-BvcHrOdV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CiovTqtN.js
var import_jsx_runtime = require_jsx_runtime();
var PHASES = [
	{
		id: "baseline",
		label: "Baseline",
		hint: "Network operating normally"
	},
	{
		id: "deviation",
		label: "Deviation",
		hint: "SYN and port entropy drift"
	},
	{
		id: "reconnaissance",
		label: "Reconnaissance",
		hint: "Scanning pattern forming"
	},
	{
		id: "warning",
		label: "Warning",
		hint: "Threshold crossing"
	},
	{
		id: "projected",
		label: "Projected",
		hint: "Initial access trajectory"
	}
];
function SettingsPage() {
	const elapsedSec = useDemoClock((s) => s.elapsedSec);
	const running = useDemoClock((s) => s.running);
	const speed = useDemoClock((s) => s.speed);
	const pause = useDemoClock((s) => s.pause);
	const resume = useDemoClock((s) => s.resume);
	const seek = useDemoClock((s) => s.seek);
	const setSpeed = useDemoClock((s) => s.setSpeed);
	const jumpToPhase = useDemoClock((s) => s.jumpToPhase);
	const reset = useDemoClock((s) => s.reset);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				eyebrow: "Settings",
				title: "Console preferences",
				subtitle: "Playback controls for the demonstration scenario. All views share this single timeline."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Scenario playback" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Walk the defence story: normal → behavioural deviation → risk increase → predicted trajectory → early warning." })] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: running ? pause : resume,
							children: running ? "Pause" : "Resume"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: reset,
							children: "Restart from baseline"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto font-mono text-xs tabular text-muted",
							children: [formatDuration(elapsedSec), " elapsed"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: "Scenario position"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 180,
						value: elapsedSec,
						onChange: (e) => seek(Number(e.target.value)),
						className: "mt-2 w-full accent-accent"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-xs text-muted",
						children: "Jump to phase"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: PHASES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							onClick: () => jumpToPhase(p.id),
							children: p.label
						}, p.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 text-xs text-muted",
						children: "Playback speed"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2",
						children: [
							1,
							2,
							4
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: speed === s ? "accent" : "outline",
							onClick: () => setSpeed(s),
							children: [s, "×"]
						}, s))
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Display" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDesc, { children: "Analyst workstation defaults for this console." })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-2 text-sm sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						k: "Theme",
						v: "Dark operations"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						k: "Timezone",
						v: "Scenario clock (10:41 epoch)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						k: "Analyst",
						v: "soc-analyst-01"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						k: "Site",
						v: "NETRA · SOC-01"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						k: "Forecast horizon",
						v: "60 seconds"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
						k: "State window",
						v: "10 seconds"
					})
				]
			})] })
		]
	});
}
function Item({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 rounded-lg bg-bg-elevated px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "font-mono text-xs text-fg",
			children: v
		})]
	});
}
var SplitComponent = SettingsPage;
//#endregion
export { SplitComponent as component };
