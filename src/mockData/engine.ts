import type {
  AttackProgression,
  AttackStage,
  BehaviouralIndicator,
  DefenceAlert,
  EarlyWarning,
  EvidenceItem,
  Explainability,
  FeatureContribution,
  FutureState,
  Investigation,
  MetricCard,
  NetworkState,
  ObservationKind,
  OverviewKpis,
  RiskTimeline,
  ScenarioPhase,
  SystemHealth,
  TelemetrySnapshot,
  ThreatEvent,
  TimelineMarker,
  TimeWindow,
  TopologyGraph,
  TrafficSeries,
  TrafficSeriesPoint,
} from "@/types/netra";
import { clamp, formatNumber, formatScenarioClock, lerp, riskLabel } from "@/utils/format";
import { jitter } from "./prng";

/** Scenario epoch: 22 Sep 2026 10:41:00 IST-equivalent wall clock for the demo story. */
export const SCENARIO_EPOCH = Date.UTC(2026, 8, 22, 5, 11, 0);
export const SCENARIO_START_SEC = 40;
export const SCENARIO_MAX_SEC = 180;
export const WARNING_THRESHOLD = 65;
export const FORECAST_HORIZON = 60;
export const STATE_WINDOW_SEC = 10;

const RISK_KEYS: [number, number][] = [
  [0, 18],
  [10, 20],
  [20, 21],
  [30, 23],
  [40, 26],
  [50, 32],
  [60, 38],
  [70, 46],
  [80, 57],
  [90, 67],
  [100, 76],
  [110, 82],
  [120, 86],
  [150, 88],
  [180, 89],
];

function interpKeys(keys: [number, number][], t: number) {
  if (t <= keys[0][0]) return keys[0][1];
  const last = keys[keys.length - 1];
  if (t >= last[0]) return last[1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i - 1];
    const [t2, v2] = keys[i];
    if (t <= t2) {
      const p = (t - t1) / (t2 - t1);
      return lerp(v1, v2, p);
    }
  }
  return last[1];
}

export function scenarioDate(elapsedSec: number) {
  return new Date(SCENARIO_EPOCH + elapsedSec * 1000);
}

export function riskAt(tSec: number) {
  const t = Math.max(0, tSec);
  const base = interpKeys(RISK_KEYS, t);
  return clamp(base + jitter("risk", t, 0.9), 0, 99);
}

export function predictedRiskAt(now: number, offset: number) {
  return clamp(riskAt(now + offset) + offset * 0.04, 0, 99);
}

export function phaseAt(tSec: number): ScenarioPhase {
  if (tSec < 35) return "baseline";
  if (tSec < 55) return "deviation";
  if (tSec < 80) return "reconnaissance";
  if (tSec < 100) return "warning";
  return "projected";
}

function countAt(t: number) {
  return Math.max(0, t);
}

export function earliestWarningSec(now: number): number | null {
  for (let s = 1; s <= 90; s++) {
    if (predictedRiskAt(now, s) >= WARNING_THRESHOLD) return s;
  }
  return null;
}

function behaviourAt(t: number): { dominant: string; label: string } {
  const phase = phaseAt(t);
  if (phase === "baseline") return { dominant: "Benign east-west traffic", label: "Normal / Monitoring" };
  if (phase === "deviation") return { dominant: "Elevated SYN without matching ACK", label: "Increased scanning activity" };
  if (phase === "reconnaissance") return { dominant: "Wide destination-port spread", label: "Abnormal connection pattern" };
  if (phase === "warning") return { dominant: "Repeated connection attempts", label: "Potential reconnaissance" };
  return { dominant: "Burst toward internal services", label: "High-risk progression" };
}

function futureBehaviour(offset: number, now: number) {
  return behaviourAt(now + offset);
}

export function getCurrentNetworkState(elapsedSec: number): NetworkState {
  const t = countAt(elapsedSec);
  const now = scenarioDate(t);
  const p = clamp(t / 120, 0, 1);
  const risk = riskAt(t);
  const { dominant, label } = behaviourAt(t);
  const flows = Math.round(1640 + p * 420 + jitter("flows", t, 18));
  const packets = Math.round(9800 + p * 4200 + jitter("pkts", t, 80));
  return {
    stateId: `ST-${(1084 + Math.floor(t / 10)).toString().padStart(4, "0")}`,
    windowSec: STATE_WINDOW_SEC,
    timestamp: formatScenarioClock(t),
    isoTime: now.toISOString(),
    flows,
    packets,
    risk,
    flowRate: 180 + p * 95 + jitter("fr", t, 6),
    packetRate: 1180 + p * 620 + jitter("pr", t, 22),
    avgFlowDuration: 2.4 - p * 0.9 + jitter("fd", t, 0.08),
    synAckRatio: 0.48 + p * 0.42 + jitter("sa", t, 0.02),
    rstRate: 0.018 + p * 0.09 + jitter("rst", t, 0.004),
    destPortDiversity: 16 + p * 48 + jitter("port", t, 1.4),
    fwdBwdRatio: 1.12 + p * 0.85 + jitter("fb", t, 0.04),
    avgPacketSize: 740 - p * 180 + jitter("psz", t, 8),
    flowIat: 48 - p * 22 + jitter("iat", t, 1.6),
    activeConnections: Math.round(420 + p * 310 + jitter("ac", t, 8)),
    dominantBehaviour: dominant,
    label,
  };
}

export function getRiskTimeline(elapsedSec: number): RiskTimeline {
  const now = countAt(elapsedSec);
  const points: RiskTimeline["points"] = [];
  const historyStart = Math.max(0, now - 90);
  for (let t = historyStart; t <= now; t += 2) {
    points.push({
      t,
      offsetSec: t - now,
      label: formatScenarioClock(t),
      risk: riskAt(t),
      kind: "observed",
    });
  }
  const currentIndex = points.length - 1;
  for (let offset = 2; offset <= FORECAST_HORIZON; offset += 2) {
    const t = now + offset;
    const kind: ObservationKind = predictedRiskAt(now, offset) >= WARNING_THRESHOLD ? "projected" : "predicted";
    points.push({
      t,
      offsetSec: offset,
      label: formatScenarioClock(t),
      risk: predictedRiskAt(now, offset),
      kind,
    });
  }
  return {
    points,
    currentIndex,
    currentRisk: riskAt(now),
    warningThreshold: WARNING_THRESHOLD,
    explanation:
      "Risk trajectory indicates increasing deviation from learned benign network behaviour.",
  };
}

export function getFutureStates(elapsedSec: number): FutureState[] {
  const now = countAt(elapsedSec);
  const offsets = [0, 10, 20, 30, 40];
  return offsets.map((offset) => {
    const t = now + offset;
    const b = futureBehaviour(offset, now);
    const kind: ObservationKind =
      offset === 0 ? "observed" : predictedRiskAt(now, offset) >= WARNING_THRESHOLD ? "projected" : "predicted";
    return {
      offsetSec: offset,
      timestamp: formatScenarioClock(t),
      risk: offset === 0 ? riskAt(now) : predictedRiskAt(now, offset),
      behaviour: b.dominant,
      predictedState: b.label,
      kind,
    };
  });
}

export function getAttackProgression(elapsedSec: number): AttackProgression {
  const t = countAt(elapsedSec);
  const phase = phaseAt(t);
  const stages: AttackProgression["stages"] = [
    { id: "reconnaissance", label: "Reconnaissance", mitre: "TA0043", status: "inactive" },
    { id: "initial_access", label: "Initial Access", mitre: "TA0001", status: "inactive" },
    { id: "execution", label: "Execution", mitre: "TA0002", status: "inactive" },
    { id: "persistence", label: "Persistence", mitre: "TA0003", status: "inactive" },
    { id: "lateral_movement", label: "Lateral Movement", mitre: "TA0008", status: "inactive" },
    { id: "command_and_control", label: "Command & Control", mitre: "TA0011", status: "inactive" },
    { id: "exfiltration", label: "Exfiltration", mitre: "TA0010", status: "inactive" },
  ];

  let current: AttackStage | null = null;
  let predicted: AttackStage | null = null;
  let next: AttackStage | null = null;
  let predP = 0;
  let nextP = 0;
  let summary = "No attack-stage progression currently indicated.";

  if (phase === "baseline") {
    summary = "Traffic remains consistent with learned benign behaviour. No stage is asserted.";
  } else if (phase === "deviation") {
    current = "reconnaissance";
    predicted = "reconnaissance";
    next = "initial_access";
    predP = 41;
    nextP = 22;
    stages[0].status = "current";
    stages[1].status = "potential";
    summary = "Early scanning signatures resemble reconnaissance, without a committed next stage.";
  } else if (phase === "reconnaissance") {
    current = "reconnaissance";
    predicted = "initial_access";
    next = "lateral_movement";
    predP = 64;
    nextP = 38;
    stages[0].status = "current";
    stages[1].status = "predicted";
    stages[4].status = "potential";
    summary = "Observed reconnaissance. Predicted progression toward initial access.";
  } else if (phase === "warning") {
    current = "reconnaissance";
    predicted = "initial_access";
    next = "lateral_movement";
    predP = 73;
    nextP = 61;
    stages[0].status = "current";
    stages[1].status = "predicted";
    stages[4].status = "potential";
    summary = "Reconnaissance is active. Forecast indicates initial access, with lateral movement as a potential follow-on.";
  } else {
    current = "reconnaissance";
    predicted = "initial_access";
    next = "lateral_movement";
    predP = 84;
    nextP = 68;
    stages[0].status = "observed";
    stages[1].status = "predicted";
    stages[2].status = "potential";
    stages[4].status = "potential";
    summary = "Trajectory continues toward initial access. Later stages remain uncommitted.";
  }

  return {
    stages,
    currentStage: current,
    predictedStage: predicted,
    predictedProbability: predP,
    nextStage: next,
    nextConfidence: nextP,
    summary,
  };
}

export function getFeatureImportance(elapsedSec: number): FeatureContribution[] {
  const t = countAt(elapsedSec);
  const p = clamp((t - 20) / 90, 0, 1);
  const raw = [
    { id: "syn", feature: "SYN Flag Rate", contribution: 0.12 + p * 0.2 },
    { id: "ports", feature: "Destination Port Diversity", contribution: 0.1 + p * 0.16 },
    { id: "pkt", feature: "Flow Packet Rate", contribution: 0.09 + p * 0.11 },
    { id: "iat", feature: "Flow IAT Variance", contribution: 0.16 - p * 0.04 },
    { id: "rst", feature: "RST Flag Rate", contribution: 0.06 + p * 0.04 },
    { id: "psz", feature: "Packet Size Variance", contribution: 0.08 - p * 0.03 },
  ];
  const sum = raw.reduce((a, b) => a + b.contribution, 0);
  return raw.map((r) => ({
    ...r,
    contribution: r.contribution / sum,
    direction: "increase" as const,
  }));
}

function indicatorsAt(t: number): BehaviouralIndicator[] {
  const items: BehaviouralIndicator[] = [];
  if (t >= 28) {
    items.push({
      id: "syn",
      title: "Elevated SYN activity",
      detail: "SYN packets are rising relative to completed handshakes across internal subnets.",
      severity: t >= 70 ? "high" : "warn",
      kind: t >= 30 ? "observed" : "predicted",
    });
  }
  if (t >= 40) {
    items.push({
      id: "ports",
      title: "Unusual port distribution",
      detail: "Destination-port entropy is expanding beyond the learned service profile.",
      severity: t >= 80 ? "high" : "warn",
      kind: t >= 50 ? "observed" : "predicted",
    });
  }
  if (t >= 55) {
    items.push({
      id: "repeat",
      title: "Repeated connection attempts",
      detail: "Host 10.0.4.21 is retrying connections to SMB and SSH on adjacent servers.",
      severity: "high",
      kind: t >= 70 ? "observed" : "predicted",
    });
  }
  if (t >= 48) {
    items.push({
      id: "iat",
      title: "Abnormal inter-arrival pattern",
      detail: "Flow inter-arrival times are tightening into a probing cadence.",
      severity: t >= 90 ? "critical" : "warn",
      kind: t >= 60 ? "observed" : "predicted",
    });
  }
  if (items.length === 0) {
    items.push({
      id: "baseline",
      title: "Stable flow mix",
      detail: "Packet sizes, ports, and handshake ratios remain inside the baseline envelope.",
      severity: "ok",
      kind: "observed",
    });
  }
  return items;
}

export function getExplainability(elapsedSec: number): Explainability {
  const t = countAt(elapsedSec);
  const features = getFeatureImportance(t);
  const attention = Array.from({ length: 10 }, (_, i) => {
    const offset = (i - 6) * 10;
    const kind: ObservationKind = offset <= 0 ? "observed" : "predicted";
    const peak = offset === 0 || offset === 10 ? 1 : 0.35 + (i / 10) * 0.4;
    return {
      window: offset === 0 ? "S(t)" : offset > 0 ? `S(t+${offset})` : `S(t${offset})`,
      offsetSec: offset,
      weight: clamp(peak + jitter(`att-${i}`, t, 0.05), 0.08, 1),
      kind,
    };
  });
  return {
    features,
    attention,
    indicators: indicatorsAt(t),
    explanation:
      "Feature contribution indicates which observed behavioural characteristics are associated with the predicted risk trajectory.",
  };
}

const EVENT_DEFS: Omit<ThreatEvent, "timestamp" | "kind" | "status">[] = [
  {
    id: "EVT-0140",
    investigationId: "TRT-2026-00142",
    tSec: 50,
    source: "10.0.4.21",
    destination: "10.0.2.15",
    port: 445,
    protocol: "TCP",
    behaviour: "Repeated connection attempts",
    risk: "High",
    stage: "Reconnaissance",
    confidence: 91,
  },
  {
    id: "EVT-0141",
    investigationId: "TRT-2026-00142",
    tSec: 62,
    source: "10.0.4.21",
    destination: "10.0.2.18",
    port: 22,
    protocol: "TCP",
    behaviour: "Port probing pattern",
    risk: "Medium",
    stage: "Reconnaissance",
    confidence: 82,
  },
  {
    id: "EVT-0142",
    investigationId: "TRT-2026-00142",
    tSec: 74,
    source: "10.0.4.21",
    destination: "10.0.2.15",
    port: 139,
    protocol: "TCP",
    behaviour: "SMB session enumeration",
    risk: "High",
    stage: "Reconnaissance",
    confidence: 88,
  },
  {
    id: "EVT-0143",
    investigationId: "TRT-2026-00143",
    tSec: 88,
    source: "10.0.4.27",
    destination: "10.0.2.18",
    port: 8080,
    protocol: "TCP",
    behaviour: "Abnormal connection burst",
    risk: "High",
    stage: "Initial Access",
    confidence: 76,
  },
  {
    id: "EVT-0144",
    investigationId: "TRT-2026-00142",
    tSec: 102,
    source: "10.0.4.21",
    destination: "10.0.2.20",
    port: 1433,
    protocol: "TCP",
    behaviour: "Database port sweep",
    risk: "Critical",
    stage: "Lateral Movement",
    confidence: 71,
  },
  {
    id: "EVT-0136",
    investigationId: "TRT-2026-00138",
    tSec: 18,
    source: "10.0.4.22",
    destination: "10.0.2.15",
    port: 443,
    protocol: "TCP",
    behaviour: "TLS session restart cluster",
    risk: "Low",
    stage: "Baseline",
    confidence: 54,
  },
  {
    id: "EVT-0138",
    investigationId: "TRT-2026-00140",
    tSec: 33,
    source: "10.0.4.23",
    destination: "10.0.0.1",
    port: 53,
    protocol: "UDP",
    behaviour: "DNS query volume step-up",
    risk: "Low",
    stage: "Deviation",
    confidence: 61,
  },
];

export function getThreatEvents(elapsedSec: number): ThreatEvent[] {
  const now = countAt(elapsedSec);
  return EVENT_DEFS.filter((e) => e.tSec <= now + 50)
    .map((e) => {
      const kind: ObservationKind = e.tSec <= now ? "observed" : e.tSec <= now + 30 ? "predicted" : "projected";
      let status: ThreatEvent["status"] = "Observed";
      if (kind !== "observed") status = "Predicted";
      else if (e.risk === "High" || e.risk === "Critical") status = "Investigating";
      else if (e.risk === "Low" && e.tSec < now - 40) status = "Contained";
      return {
        ...e,
        timestamp: formatScenarioClock(e.tSec),
        kind,
        status,
      };
    })
    .sort((a, b) => b.tSec - a.tSec);
}

const TIMELINE_DEFS: Omit<TimelineMarker, "timestamp">[] = [
  {
    id: "tl-1",
    tSec: 10,
    title: "Baseline behaviour",
    detail: "Flow mix and handshake ratios sit inside the learned envelope.",
    kind: "observed",
  },
  {
    id: "tl-2",
    tSec: 30,
    title: "Increased SYN activity",
    detail: "SYN flag rate begins to diverge from completed TCP sessions.",
    kind: "observed",
  },
  {
    id: "tl-3",
    tSec: 50,
    title: "Port diversity increased",
    detail: "Destination-port entropy expands across internal server ranges.",
    kind: "observed",
  },
  {
    id: "tl-4",
    tSec: 70,
    title: "Repeated connection attempts",
    detail: "Host 10.0.4.21 retries SMB and SSH against application servers.",
    kind: "observed",
  },
  {
    id: "tl-5",
    tSec: 90,
    title: "Risk trajectory crosses warning threshold",
    detail: "Forecasted risk exceeds the 65% defensive warning line.",
    kind: "warning",
  },
  {
    id: "tl-6",
    tSec: 110,
    title: "Projected progression",
    detail: "Forward states indicate movement toward initial access.",
    kind: "projected",
  },
];

export function getTimeline(elapsedSec: number): TimelineMarker[] {
  const now = countAt(elapsedSec);
  return TIMELINE_DEFS.map((m) => {
    let kind = m.kind;
    if (m.tSec > now) {
      kind = m.kind === "warning" ? "warning" : m.tSec > now + 30 ? "projected" : "predicted";
    } else if (m.kind === "projected" && m.tSec <= now) {
      kind = "observed";
    }
    return { ...m, kind, timestamp: formatScenarioClock(m.tSec) };
  });
}

export function getTopology(elapsedSec: number): TopologyGraph {
  const t = countAt(elapsedSec);
  const p = clamp((t - 20) / 100, 0, 1);
  const wsRisk = 22 + p * 58;
  const gwRisk = 18 + p * 22;
  const webRisk = 16 + p * 28;
  const appRisk = 20 + p * 18;
  const dbRisk = 12 + p * 14;
  const nodes = [
    { id: "inet", label: "Internet", role: "Edge", ip: "—", x: 50, y: 12, risk: 8 + p * 6, status: "Normal" },
    { id: "gw", label: "Gateway", role: "Perimeter", ip: "10.0.0.1", x: 50, y: 32, risk: gwRisk, status: riskLabel(gwRisk) },
    { id: "web", label: "Web Server", role: "Server-01", ip: "10.0.2.15", x: 22, y: 54, risk: webRisk, status: riskLabel(webRisk) },
    { id: "app", label: "Application Server", role: "Server-02", ip: "10.0.2.18", x: 50, y: 56, risk: appRisk, status: riskLabel(appRisk) },
    { id: "db", label: "Database", role: "Server-03", ip: "10.0.2.20", x: 78, y: 54, risk: dbRisk, status: riskLabel(dbRisk) },
    { id: "ws1", label: "Workstation 01", role: "Endpoint", ip: "10.0.4.21", x: 18, y: 82, risk: wsRisk, status: riskLabel(wsRisk) },
    { id: "ws2", label: "Workstation 02", role: "Endpoint", ip: "10.0.4.22", x: 42, y: 86, risk: 18 + p * 12, status: riskLabel(18 + p * 12) },
    { id: "ws3", label: "Workstation 03", role: "Endpoint", ip: "10.0.4.23", x: 66, y: 86, risk: 16 + p * 10, status: riskLabel(16 + p * 10) },
    { id: "ws7", label: "Workstation 07", role: "Endpoint", ip: "10.0.4.27", x: 88, y: 80, risk: 24 + p * 42, status: riskLabel(24 + p * 42) },
  ];
  const links = [
    { from: "inet", to: "gw", intensity: 0.4 + p * 0.2, risky: false },
    { from: "gw", to: "web", intensity: 0.6 + p * 0.25, risky: p > 0.45 },
    { from: "gw", to: "app", intensity: 0.5, risky: false },
    { from: "web", to: "app", intensity: 0.55 + p * 0.2, risky: p > 0.4 },
    { from: "app", to: "db", intensity: 0.45 + p * 0.15, risky: p > 0.7 },
    { from: "ws1", to: "web", intensity: 0.7 + p * 0.3, risky: p > 0.2 },
    { from: "ws1", to: "app", intensity: 0.5 + p * 0.4, risky: p > 0.35 },
    { from: "ws2", to: "web", intensity: 0.35, risky: false },
    { from: "ws3", to: "app", intensity: 0.3, risky: false },
    { from: "ws7", to: "app", intensity: 0.4 + p * 0.3, risky: p > 0.55 },
  ];
  return {
    nodes,
    links,
    caption:
      "Topology overlay for a future graph-aware release. Node risk is correlated with the shared traffic scenario, not inferred from topology itself.",
  };
}

export function getKpis(elapsedSec: number): OverviewKpis {
  const t = countAt(elapsedSec);
  const phase = phaseAt(t);
  const risk = riskAt(t);
  const p = clamp(t / 120, 0, 1);
  const warning = earliestWarningSec(t);
  const narratives: Record<ScenarioPhase, { title: string; detail: string }> = {
    baseline: {
      title: "Network currently operating normally.",
      detail: "Observed flows remain inside the learned benign envelope. The forward simulation is monitoring for deviation.",
    },
    deviation: {
      title: "Subtle behavioural deviation from learned baseline.",
      detail: "SYN activity and port entropy are drifting. Forward states show a rising risk trajectory.",
    },
    reconnaissance: {
      title: "Reconnaissance-like behaviour is forming.",
      detail: "Repeated connection attempts and scanning signatures are accumulating across internal hosts.",
    },
    warning: {
      title: "Risk trajectory has crossed the warning threshold.",
      detail: "The forecast indicates pre-attack activity with a narrowing warning window.",
    },
    projected: {
      title: "Projected progression toward a higher-risk stage.",
      detail: "Forward simulation points to initial access. Later kill-chain stages remain uncommitted.",
    },
  };
  const n = narratives[phase];
  return {
    networkRisk: risk,
    riskLabel: riskLabel(risk),
    activeFlows: Math.round(18240 + p * 6200 + jitter("af", t, 40)),
    networkStates: 840 + Math.floor(t / 10),
    activeThreats: t < 48 ? 0 : t < 70 ? 1 : t < 90 ? 2 : 3,
    earliestWarningSec: warning,
    modelConfidence: clamp(96.2 - p * 5.1 + jitter("conf", t, 0.2), 88, 98),
    narrative: n.title,
    narrativeDetail: n.detail,
    phase,
  };
}

export function getAlerts(elapsedSec: number): DefenceAlert[] {
  const t = countAt(elapsedSec);
  const warning = earliestWarningSec(t);
  const risk = riskAt(t);
  const items: DefenceAlert[] = [];
  if (t >= 28) {
    items.push({
      id: "ALR-2004",
      investigationId: "TRT-2026-00142",
      severity: "LOW",
      title: "Flow-rate deviation detected",
      risk: 28 + (t - 28) * 0.2,
      progression: "Baseline → Deviation",
      warningSec: warning,
      confidence: 74,
      tSec: 28,
      kind: "observed",
    });
  }
  if (t >= 36) {
    items.push({
      id: "ALR-2007",
      investigationId: "TRT-2026-00142",
      severity: "MEDIUM",
      title: "Destination-port diversity increased",
      risk: 34 + (t - 36) * 0.25,
      progression: "Deviation → Reconnaissance",
      warningSec: warning,
      confidence: 81,
      tSec: 36,
      kind: "observed",
    });
  }
  if (t >= 48) {
    items.push({
      id: "ALR-2011",
      investigationId: "TRT-2026-00142",
      severity: "HIGH",
      title: "Unusual SYN activity",
      risk: 48 + (t - 48) * 0.3,
      progression: "Reconnaissance",
      warningSec: warning,
      confidence: 86,
      tSec: 48,
      kind: "observed",
    });
  }
  if (t >= 78) {
    items.push({
      id: "ALR-2018",
      investigationId: "TRT-2026-00142",
      severity: "CRITICAL",
      title: "High-risk trajectory detected",
      risk,
      progression: "Reconnaissance → Initial Access",
      warningSec: warning,
      confidence: 91,
      tSec: 78,
      kind: predictedRiskAt(t, 20) >= 70 ? "projected" : "predicted",
    });
  }
  return items.sort((a, b) => {
    const rank = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
    return rank[a.severity] - rank[b.severity];
  });
}

export function getEarlyWarning(elapsedSec: number): EarlyWarning {
  const t = countAt(elapsedSec);
  const seconds = earliestWarningSec(t);
  const currentRisk = riskAt(t);
  const projectedRisk = predictedRiskAt(t, FORECAST_HORIZON);
  const status =
    currentRisk >= WARNING_THRESHOLD
      ? "WARNING THRESHOLD EXCEEDED"
      : projectedRisk >= WARNING_THRESHOLD
        ? "PRE-ATTACK ACTIVITY DETECTED"
        : "MONITORING BASELINE";
  return {
    seconds,
    currentRisk,
    projectedRisk,
    threshold: WARNING_THRESHOLD,
    status,
    explanation:
      "The system identifies a trajectory toward elevated malicious behaviour before the projected attack state.",
  };
}

function series(
  now: number,
  spanSec: number,
  step: number,
  fn: (t: number) => number,
): TrafficSeriesPoint[] {
  const start = now - spanSec;
  const pts: TrafficSeriesPoint[] = [];
  for (let t = start; t <= now + 20; t += step) {
    const kind: ObservationKind = t <= now ? "observed" : "predicted";
    pts.push({
      t,
      label: formatScenarioClock(Math.max(0, t)),
      value: fn(Math.max(0, t)),
      kind,
    });
  }
  return pts;
}

function trafficAtWindow(now: number, window: TimeWindow): TrafficSeries {
  const span = window === "1m" ? 60 : window === "5m" ? 300 : window === "15m" ? 900 : 3600;
  const step = window === "1m" ? 2 : window === "5m" ? 5 : window === "15m" ? 10 : 30;
  const pAt = (t: number) => clamp(t / 120, 0, 1);
  return {
    packetRate: series(now, span, step, (t) => 1100 + pAt(t) * 700 + jitter("prw", t, 30)),
    flowRate: series(now, span, step, (t) => 170 + pAt(t) * 110 + jitter("frw", t, 8)),
    synAckRatio: series(now, span, step, (t) => clamp(0.46 + pAt(t) * 0.44 + jitter("saw", t, 0.02), 0.2, 1.6)),
    destPortActivity: series(now, span, step, (t) => 14 + pAt(t) * 52 + jitter("dpw", t, 1.8)),
    interArrival: series(now, span, step, (t) => 52 - pAt(t) * 24 + jitter("iatw", t, 1.5)),
    flowDuration: [
      { bucket: "0–0.5s", count: Math.round(420 + pAt(now) * 280) },
      { bucket: "0.5–1s", count: Math.round(310 + pAt(now) * 40) },
      { bucket: "1–2s", count: Math.round(180 - pAt(now) * 30) },
      { bucket: "2–5s", count: Math.round(90 - pAt(now) * 20) },
      { bucket: "5s+", count: Math.round(40 - pAt(now) * 10) },
    ],
    packetSize: [
      { bucket: "40–80", count: Math.round(210 + pAt(now) * 160) },
      { bucket: "80–200", count: Math.round(340 + pAt(now) * 40) },
      { bucket: "200–600", count: Math.round(280 - pAt(now) * 50) },
      { bucket: "600–1200", count: Math.round(160 - pAt(now) * 30) },
      { bucket: "1200+", count: Math.round(90 - pAt(now) * 20) },
    ],
  };
}

export function getTraffic(elapsedSec: number): Record<TimeWindow, TrafficSeries> {
  const now = countAt(elapsedSec);
  return {
    "1m": trafficAtWindow(now, "1m"),
    "5m": trafficAtWindow(now, "5m"),
    "15m": trafficAtWindow(now, "15m"),
    "1h": trafficAtWindow(now, "1h"),
  };
}

export function getHealth(elapsedSec: number): SystemHealth {
  const t = countAt(elapsedSec);
  return {
    inferenceStatus: "ONLINE",
    telemetry: "CONNECTED",
    stateEncoder: "READY",
    temporalModel: "READY",
    forecastEngine: "READY",
    explainability: "READY",
    inferenceLatencyMs: 22 + jitter("lat", t, 3),
    statesProcessed: 840 + Math.floor(t / 10),
    forecastHorizonSec: FORECAST_HORIZON,
    stateWindowSec: STATE_WINDOW_SEC,
    lastUpdate: formatScenarioClock(t),
  };
}

function spark(seed: string, t: number, base: number, amp: number) {
  return Array.from({ length: 18 }, (_, i) => base + jitter(`${seed}-${i}`, t - (18 - i), amp));
}

export function getMetrics(elapsedSec: number): MetricCard[] {
  const s = getCurrentNetworkState(elapsedSec);
  const t = countAt(elapsedSec);
  return [
    {
      id: "flow",
      label: "Flow rate",
      value: formatNumber(s.flowRate, 0),
      unit: "fps",
      delta: "+12%",
      tone: "info",
      spark: spark("flow", t, s.flowRate, 12),
    },
    {
      id: "pkt",
      label: "Packet rate",
      value: formatNumber(s.packetRate, 0),
      unit: "pps",
      delta: "+18%",
      tone: t > 50 ? "warn" : "info",
      spark: spark("pkt", t, s.packetRate, 40),
    },
    {
      id: "dur",
      label: "Avg flow duration",
      value: s.avgFlowDuration.toFixed(2),
      unit: "s",
      delta: "−0.4s",
      tone: "info",
      spark: spark("dur", t, s.avgFlowDuration * 40, 4),
    },
    {
      id: "syn",
      label: "SYN/ACK ratio",
      value: s.synAckRatio.toFixed(2),
      delta: "+0.31",
      tone: s.synAckRatio > 0.7 ? "high" : s.synAckRatio > 0.55 ? "warn" : "ok",
      spark: spark("syn", t, s.synAckRatio * 100, 6),
    },
    {
      id: "rst",
      label: "RST rate",
      value: (s.rstRate * 100).toFixed(1),
      unit: "%",
      delta: "+3.2pp",
      tone: s.rstRate > 0.07 ? "warn" : "ok",
      spark: spark("rst", t, s.rstRate * 1000, 8),
    },
    {
      id: "ports",
      label: "Dst-port diversity",
      value: formatNumber(s.destPortDiversity, 0),
      unit: "ports",
      delta: "+22",
      tone: s.destPortDiversity > 40 ? "high" : s.destPortDiversity > 28 ? "warn" : "ok",
      spark: spark("ports", t, s.destPortDiversity, 4),
    },
    {
      id: "fb",
      label: "Fwd/Bwd packet ratio",
      value: s.fwdBwdRatio.toFixed(2),
      tone: "info",
      spark: spark("fb", t, s.fwdBwdRatio * 40, 3),
    },
    {
      id: "psz",
      label: "Avg packet size",
      value: formatNumber(s.avgPacketSize, 0),
      unit: "B",
      delta: "−96B",
      tone: "info",
      spark: spark("psz", t, s.avgPacketSize / 10, 4),
    },
    {
      id: "iat",
      label: "Flow IAT",
      value: s.flowIat.toFixed(1),
      unit: "ms",
      delta: "−11ms",
      tone: t > 55 ? "warn" : "ok",
      spark: spark("iat", t, s.flowIat, 3),
    },
    {
      id: "conn",
      label: "Active connections",
      value: formatNumber(s.activeConnections),
      tone: "info",
      spark: spark("conn", t, s.activeConnections / 8, 6),
    },
  ];
}

function evidence(t: number): EvidenceItem[] {
  const s = getCurrentNetworkState(t);
  return [
    {
      id: "syn",
      title: "SYN activity",
      value: s.synAckRatio.toFixed(2),
      trend: spark("ev-syn", t, s.synAckRatio * 100, 5),
      note: "Handshake completion is lagging SYN volume.",
    },
    {
      id: "port",
      title: "Port distribution",
      value: formatNumber(s.destPortDiversity, 0),
      trend: spark("ev-port", t, s.destPortDiversity, 3),
      note: "Destination entropy expanding beyond service baseline.",
    },
    {
      id: "flow",
      title: "Flow-rate deviation",
      value: `${formatNumber(s.flowRate, 0)} fps`,
      trend: spark("ev-flow", t, s.flowRate, 10),
      note: "Short-lived flows increasing against historical mix.",
    },
    {
      id: "iat",
      title: "IAT variance",
      value: `${s.flowIat.toFixed(1)} ms`,
      trend: spark("ev-iat", t, s.flowIat, 2),
      note: "Inter-arrival collapsing into a probing cadence.",
    },
    {
      id: "freq",
      title: "Connection frequency",
      value: formatNumber(s.activeConnections),
      trend: spark("ev-freq", t, s.activeConnections / 8, 5),
      note: "Repeated attempts from 10.0.4.21 to internal servers.",
    },
  ];
}

export function getInvestigations(elapsedSec: number): Investigation[] {
  const t = countAt(elapsedSec);
  const events = getThreatEvents(t);
  const risk = riskAt(Math.max(t, 90));
  const primary: Investigation = {
    id: "TRT-2026-00142",
    title: "High-risk trajectory — reconnaissance toward initial access",
    currentRisk: riskAt(t),
    predictedStage: "Initial Access",
    confidence: 91.4,
    firstAnomaly: formatScenarioClock(30),
    currentState: formatScenarioClock(t),
    projectedProgression: formatScenarioClock(t + 47),
    observedBehaviour: "Elevated SYN rate, expanding destination ports, repeated SMB/SSH attempts from 10.0.4.21.",
    latentState: `ST-${(1084 + Math.floor(t / 10)).toString().padStart(4, "0")} encodes a scanning-dominant window with compressed IAT.`,
    predictedFuture: "S(t+30) to S(t+60) continue climbing through the 65% warning line toward 80%+ risk.",
    attackProgression: "Current: Reconnaissance. Predicted: Initial Access. Potential next: Lateral Movement.",
    evidence: evidence(t),
    events: events.filter((e) => e.investigationId === "TRT-2026-00142"),
  };
  const secondary: Investigation = {
    id: "TRT-2026-00143",
    title: "Workstation 07 burst toward application tier",
    currentRisk: clamp(risk * 0.72, 12, 90),
    predictedStage: "Reconnaissance",
    confidence: 76,
    firstAnomaly: formatScenarioClock(88),
    currentState: formatScenarioClock(t),
    projectedProgression: formatScenarioClock(t + 60),
    observedBehaviour: "Short connection burst from 10.0.4.27 to 10.0.2.18:8080.",
    latentState: "Secondary host contributing to destination entropy, not the primary trajectory.",
    predictedFuture: "Remains below the primary warning path unless correlated with 10.0.4.21.",
    attackProgression: "Uncommitted. Tracked as supporting reconnaissance evidence.",
    evidence: evidence(t),
    events: events.filter((e) => e.investigationId === "TRT-2026-00143"),
  };
  return [primary, secondary];
}

export function getInvestigation(elapsedSec: number, id: string): Investigation {
  const all = getInvestigations(elapsedSec);
  return all.find((i) => i.id === id) ?? all[0];
}

export function getSnapshot(elapsedSec: number): TelemetrySnapshot {
  const t = clamp(elapsedSec, 0, SCENARIO_MAX_SEC);
  const now = scenarioDate(t);
  return {
    elapsedSec: t,
    now,
    nowLabel: formatScenarioClock(t),
    phase: phaseAt(t),
    kpis: getKpis(t),
    networkState: getCurrentNetworkState(t),
    riskTimeline: getRiskTimeline(t),
    futureStates: getFutureStates(t),
    attackProgression: getAttackProgression(t),
    explainability: getExplainability(t),
    events: getThreatEvents(t),
    timeline: getTimeline(t),
    topology: getTopology(t),
    alerts: getAlerts(t),
    earlyWarning: getEarlyWarning(t),
    traffic: getTraffic(t),
    health: getHealth(t),
    metrics: getMetrics(t),
    investigations: getInvestigations(t),
  };
}
