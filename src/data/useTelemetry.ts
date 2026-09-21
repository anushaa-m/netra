import { createContext, createElement, useContext, useEffect, useMemo, type ReactNode } from "react";
import { getSnapshot } from "@/data/provider";
import { useDemoClock } from "@/data/demo-clock";
import type { TelemetrySnapshot } from "@/types/netra";

const TelemetryContext = createContext<TelemetrySnapshot | null>(null);

export function TelemetryProvider({ children }: { children: ReactNode }) {
  const elapsedSec = useDemoClock((s) => s.elapsedSec);
  const tick = useDemoClock((s) => s.tick);

  useEffect(() => {
    const id = window.setInterval(() => tick(0.5), 500);
    return () => window.clearInterval(id);
  }, [tick]);

  const snapshot = useMemo(() => getSnapshot(elapsedSec), [elapsedSec]);

  return createElement(TelemetryContext.Provider, { value: snapshot }, children);
}

export function useTelemetry(): TelemetrySnapshot {
  const ctx = useContext(TelemetryContext);
  if (!ctx) throw new Error("useTelemetry must be used within TelemetryProvider");
  return ctx;
}
