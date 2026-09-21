export type RiskTone = "ok" | "warn" | "high" | "critical";
export type ObservationKind = "observed" | "predicted" | "projected";
export type EventStatus = "Observed" | "Investigating" | "Predicted" | "Contained";
export type RiskBand = "Low" | "Medium" | "High" | "Critical";
export type Protocol = "TCP" | "UDP" | "ICMP";

export type AttackStage =
  | "reconnaissance"
  | "initial_access"
  | "execution"
  | "persistence"
  | "lateral_movement"
  | "command_and_control"
  | "exfiltration";

export type ScenarioPhase =
  | "baseline"
  | "deviation"
  | "reconnaissance"
  | "warning"
  | "projected";

export type TimeWindow = "1m" | "5m" | "15m" | "1h";

export interface NetworkState {
  stateId: string;
  windowSec: number;
  timestamp: string;
  isoTime: string;
  flows: number;
  packets: number;
  risk: number;
  flowRate: number;
  packetRate: number;
  avgFlowDuration: number;
  synAckRatio: number;
  rstRate: number;
  destPortDiversity: number;
  fwdBwdRatio: number;
  avgPacketSize: number;
  flowIat: number;
  activeConnections: number;
  dominantBehaviour: string;
  label: string;
}

export interface RiskPoint {
  t: number;
  offsetSec: number;
  label: string;
  risk: number;
  kind: ObservationKind;
}

export interface RiskTimeline {
  points: RiskPoint[];
  currentIndex: number;
  currentRisk: number;
  warningThreshold: number;
  explanation: string;
}

export interface FutureState {
  offsetSec: number;
  timestamp: string;
  risk: number;
  behaviour: string;
  predictedState: string;
  kind: ObservationKind;
}

export interface AttackStageNode {
  id: AttackStage;
  label: string;
  mitre: string;
  status: "inactive" | "observed" | "current" | "predicted" | "potential";
}

export interface AttackProgression {
  stages: AttackStageNode[];
  currentStage: AttackStage | null;
  predictedStage: AttackStage | null;
  predictedProbability: number;
  nextStage: AttackStage | null;
  nextConfidence: number;
  summary: string;
}

export interface FeatureContribution {
  id: string;
  feature: string;
  contribution: number;
  direction: "increase" | "decrease";
}

export interface AttentionPoint {
  window: string;
  offsetSec: number;
  weight: number;
  kind: ObservationKind;
}

export interface BehaviouralIndicator {
  id: string;
  title: string;
  detail: string;
  severity: RiskTone;
  kind: ObservationKind;
}

export interface Explainability {
  features: FeatureContribution[];
  attention: AttentionPoint[];
  indicators: BehaviouralIndicator[];
  explanation: string;
}

export interface ThreatEvent {
  id: string;
  investigationId: string;
  timestamp: string;
  tSec: number;
  source: string;
  destination: string;
  port: number;
  protocol: Protocol;
  behaviour: string;
  risk: RiskBand;
  stage: string;
  confidence: number;
  status: EventStatus;
  kind: ObservationKind;
}

export interface TimelineMarker {
  id: string;
  tSec: number;
  timestamp: string;
  title: string;
  detail: string;
  kind: ObservationKind | "warning";
}

export interface TopologyNode {
  id: string;
  label: string;
  role: string;
  ip: string;
  x: number;
  y: number;
  risk: number;
  status: string;
}

export interface TopologyLink {
  from: string;
  to: string;
  intensity: number;
  risky: boolean;
}

export interface TopologyGraph {
  nodes: TopologyNode[];
  links: TopologyLink[];
  caption: string;
}

export interface OverviewKpis {
  networkRisk: number;
  riskLabel: string;
  activeFlows: number;
  networkStates: number;
  activeThreats: number;
  earliestWarningSec: number | null;
  modelConfidence: number;
  narrative: string;
  narrativeDetail: string;
  phase: ScenarioPhase;
}

export interface DefenceAlert {
  id: string;
  investigationId: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  title: string;
  risk: number;
  progression: string;
  warningSec: number | null;
  confidence: number;
  tSec: number;
  kind: ObservationKind;
}

export interface EarlyWarning {
  seconds: number | null;
  currentRisk: number;
  projectedRisk: number;
  threshold: number;
  status: string;
  explanation: string;
}

export interface TrafficSeriesPoint {
  t: number;
  label: string;
  value: number;
  kind: ObservationKind;
}

export interface TrafficSeries {
  packetRate: TrafficSeriesPoint[];
  flowRate: TrafficSeriesPoint[];
  synAckRatio: TrafficSeriesPoint[];
  destPortActivity: TrafficSeriesPoint[];
  flowDuration: { bucket: string; count: number }[];
  interArrival: TrafficSeriesPoint[];
  packetSize: { bucket: string; count: number }[];
}

export interface SystemHealth {
  inferenceStatus: "ONLINE" | "DEGRADED";
  telemetry: "CONNECTED" | "DELAYED";
  stateEncoder: "READY" | "WARMING";
  temporalModel: "READY" | "WARMING";
  forecastEngine: "READY" | "WARMING";
  explainability: "READY" | "WARMING";
  inferenceLatencyMs: number;
  statesProcessed: number;
  forecastHorizonSec: number;
  stateWindowSec: number;
  lastUpdate: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  value: string;
  trend: number[];
  note: string;
}

export interface Investigation {
  id: string;
  title: string;
  currentRisk: number;
  predictedStage: string;
  confidence: number;
  firstAnomaly: string;
  currentState: string;
  projectedProgression: string;
  observedBehaviour: string;
  latentState: string;
  predictedFuture: string;
  attackProgression: string;
  evidence: EvidenceItem[];
  events: ThreatEvent[];
}

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  unit?: string;
  delta?: string;
  tone: RiskTone | "info";
  spark: number[];
}

export interface TelemetrySnapshot {
  elapsedSec: number;
  now: Date;
  nowLabel: string;
  phase: ScenarioPhase;
  kpis: OverviewKpis;
  networkState: NetworkState;
  riskTimeline: RiskTimeline;
  futureStates: FutureState[];
  attackProgression: AttackProgression;
  explainability: Explainability;
  events: ThreatEvent[];
  timeline: TimelineMarker[];
  topology: TopologyGraph;
  alerts: DefenceAlert[];
  earlyWarning: EarlyWarning;
  traffic: Record<TimeWindow, TrafficSeries>;
  health: SystemHealth;
  metrics: MetricCard[];
  investigations: Investigation[];
}

export interface TelemetryApi {
  getSnapshot(elapsedSec: number): TelemetrySnapshot;
  getCurrentNetworkState(elapsedSec: number): NetworkState;
  getRiskTimeline(elapsedSec: number): RiskTimeline;
  getFutureStates(elapsedSec: number): FutureState[];
  getAttackProgression(elapsedSec: number): AttackProgression;
  getFeatureImportance(elapsedSec: number): FeatureContribution[];
  getThreatEvents(elapsedSec: number): ThreatEvent[];
  getTopology(elapsedSec: number): TopologyGraph;
}
