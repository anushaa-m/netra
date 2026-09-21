import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardDesc, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemoClock, type PlaybackSpeed } from "@/data/demo-clock";
import { SCENARIO_MAX_SEC } from "@/mockData";
import type { ScenarioPhase } from "@/types/netra";
import { formatDuration } from "@/utils/format";

const PHASES: { id: ScenarioPhase; label: string; hint: string }[] = [
  { id: "baseline", label: "Baseline", hint: "Network operating normally" },
  { id: "deviation", label: "Deviation", hint: "SYN and port entropy drift" },
  { id: "reconnaissance", label: "Reconnaissance", hint: "Scanning pattern forming" },
  { id: "warning", label: "Warning", hint: "Threshold crossing" },
  { id: "projected", label: "Projected", hint: "Initial access trajectory" },
];

export function SettingsPage() {
  const elapsedSec = useDemoClock((s) => s.elapsedSec);
  const running = useDemoClock((s) => s.running);
  const speed = useDemoClock((s) => s.speed);
  const pause = useDemoClock((s) => s.pause);
  const resume = useDemoClock((s) => s.resume);
  const seek = useDemoClock((s) => s.seek);
  const setSpeed = useDemoClock((s) => s.setSpeed);
  const jumpToPhase = useDemoClock((s) => s.jumpToPhase);
  const reset = useDemoClock((s) => s.reset);

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Settings"
        title="Console preferences"
        subtitle="Playback controls for the demonstration scenario. All views share this single timeline."
      />

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Scenario playback</CardTitle>
            <CardDesc>
              Walk the defence story: normal → behavioural deviation → risk increase → predicted trajectory → early
              warning.
            </CardDesc>
          </div>
        </CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={running ? pause : resume}>
            {running ? "Pause" : "Resume"}
          </Button>
          <Button size="sm" onClick={reset}>
            Restart from baseline
          </Button>
          <div className="ml-auto font-mono text-xs tabular text-muted">{formatDuration(elapsedSec)} elapsed</div>
        </div>
        <label className="mt-4 block">
          <span className="text-xs text-muted">Scenario position</span>
          <input
            type="range"
            min={0}
            max={SCENARIO_MAX_SEC}
            value={elapsedSec}
            onChange={(e) => seek(Number(e.target.value))}
            className="mt-2 w-full accent-accent"
          />
        </label>
        <div className="mt-4">
          <div className="mb-2 text-xs text-muted">Jump to phase</div>
          <div className="flex flex-wrap gap-2">
            {PHASES.map((p) => (
              <Button key={p.id} size="sm" onClick={() => jumpToPhase(p.id)}>
                {p.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="mb-2 text-xs text-muted">Playback speed</div>
          <div className="flex gap-2">
            {([1, 2, 4] as PlaybackSpeed[]).map((s) => (
              <Button key={s} size="sm" variant={speed === s ? "accent" : "outline"} onClick={() => setSpeed(s)}>
                {s}×
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Display</CardTitle>
            <CardDesc>Analyst workstation defaults for this console.</CardDesc>
          </div>
        </CardHeader>
        <dl className="grid gap-2 text-sm sm:grid-cols-2">
          <Item k="Theme" v="Dark operations" />
          <Item k="Timezone" v="Scenario clock (10:41 epoch)" />
          <Item k="Analyst" v="soc-analyst-01" />
          <Item k="Site" v="NETRA · SOC-01" />
          <Item k="Forecast horizon" v="60 seconds" />
          <Item k="State window" v="10 seconds" />
        </dl>
      </Card>
    </div>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-bg-elevated px-3 py-2">
      <dt className="text-muted">{k}</dt>
      <dd className="font-mono text-xs text-fg">{v}</dd>
    </div>
  );
}
