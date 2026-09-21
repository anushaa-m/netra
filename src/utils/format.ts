export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function pad2(n: number) {
  return String(Math.floor(n)).padStart(2, "0");
}

/** Scenario wall-clock starting at 10:41:00, independent of host timezone. */
export function formatScenarioClock(elapsedSec: number) {
  const start = 10 * 3600 + 41 * 60;
  const total = start + Math.max(0, Math.floor(elapsedSec));
  const h = Math.floor(total / 3600) % 24;
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
}

export function formatClock(date: Date) {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}:${pad2(date.getSeconds())}`;
}

export function formatDuration(totalSec: number) {
  const s = Math.max(0, Math.floor(totalSec));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${pad2(h)}:${pad2(m)}:${pad2(sec)}`;
  return `${pad2(m)}:${pad2(sec)}`;
}

export function formatNumber(n: number, digits = 0) {
  return n.toLocaleString("en-US", {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

export function formatPct(n: number, digits = 0) {
  return `${n.toFixed(digits)}%`;
}

export function formatMs(n: number) {
  return `${Math.round(n)} ms`;
}

export function riskTone(risk: number): "ok" | "warn" | "high" | "critical" {
  if (risk < 30) return "ok";
  if (risk < 55) return "warn";
  if (risk < 75) return "high";
  return "critical";
}

export function riskLabel(risk: number) {
  const tone = riskTone(risk);
  if (tone === "ok") return "Normal";
  if (tone === "warn") return "Elevated";
  if (tone === "high") return "High";
  return "Critical";
}
