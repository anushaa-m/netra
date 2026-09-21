/**
 * Telemetry access layer.
 *
 * All dashboard views read through these functions so a live inference API
 * can replace the local engine later without redesigning the UI:
 *
 *   GET /api/network-state     → getCurrentNetworkState()
 *   GET /api/forecast          → getRiskTimeline() / getFutureStates()
 *   GET /api/explainability    → getFeatureImportance()
 *   GET /api/events            → getThreatEvents()
 *   GET /api/topology          → getTopology()
 *   GET /api/attack-path       → getAttackProgression()
 */
export {
  getSnapshot,
  getCurrentNetworkState,
  getRiskTimeline,
  getFutureStates,
  getAttackProgression,
  getFeatureImportance,
  getThreatEvents,
  getTopology,
  getInvestigation,
} from "@/mockData";

export type { TelemetryApi } from "@/types/netra";
