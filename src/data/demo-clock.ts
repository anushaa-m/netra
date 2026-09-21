import { create } from "zustand";
import { SCENARIO_MAX_SEC, SCENARIO_START_SEC } from "@/mockData";
import type { ScenarioPhase } from "@/types/netra";

export type PlaybackSpeed = 1 | 2 | 4;

interface DemoClock {
  elapsedSec: number;
  running: boolean;
  speed: PlaybackSpeed;
  tick: (dtSec: number) => void;
  pause: () => void;
  resume: () => void;
  seek: (sec: number) => void;
  setSpeed: (speed: PlaybackSpeed) => void;
  jumpToPhase: (phase: ScenarioPhase) => void;
  reset: () => void;
}

const PHASE_AT: Record<ScenarioPhase, number> = {
  baseline: 12,
  deviation: 42,
  reconnaissance: 68,
  warning: 92,
  projected: 112,
};

export const useDemoClock = create<DemoClock>((set) => ({
  elapsedSec: SCENARIO_START_SEC,
  running: true,
  speed: 1,
  tick: (dtSec) =>
    set((s) => ({
      elapsedSec: s.running
        ? Math.min(SCENARIO_MAX_SEC, s.elapsedSec + dtSec * s.speed)
        : s.elapsedSec,
    })),
  pause: () => set({ running: false }),
  resume: () => set({ running: true }),
  seek: (sec) => set({ elapsedSec: Math.min(SCENARIO_MAX_SEC, Math.max(0, sec)) }),
  setSpeed: (speed) => set({ speed }),
  jumpToPhase: (phase) => set({ elapsedSec: PHASE_AT[phase], running: true }),
  reset: () => set({ elapsedSec: 8, running: true, speed: 1 }),
}));
