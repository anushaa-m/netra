import { KindTag } from "@/components/shared/KindTag";
import type { TopologyGraph } from "@/types/netra";
import { cn } from "@/utils/cn";
import { formatPct, riskTone } from "@/utils/format";

const TONE = {
  ok: "stroke-ok fill-ok/20",
  warn: "stroke-warn fill-warn/20",
  high: "stroke-warn fill-warn/20",
  critical: "stroke-critical fill-critical/25",
};

export function NetworkMap({ graph }: { graph: TopologyGraph }) {
  const byId = Object.fromEntries(graph.nodes.map((n) => [n.id, n]));
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <KindTag kind="observed" />
        <p className="max-w-xl text-right text-[0.6875rem] leading-relaxed text-muted">{graph.caption}</p>
      </div>
      <div className="overflow-x-auto rounded-lg bg-bg-elevated p-2">
        <svg viewBox="0 0 100 100" className="h-[28rem] w-full min-w-[32rem]">
          {graph.links.map((l) => {
            const a = byId[l.from];
            const b = byId[l.to];
            if (!a || !b) return null;
            return (
              <line
                key={`${l.from}-${l.to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={l.risky ? "stroke-critical/70" : "stroke-border-strong"}
                strokeWidth={0.6 + l.intensity * 0.8}
                strokeDasharray="1.6 1.8"
                style={{ animation: "netra-flow 2.4s linear infinite" }}
              />
            );
          })}
          {graph.nodes.map((n) => {
            const tone = riskTone(n.risk);
            return (
              <g key={n.id} transform={`translate(${n.x} ${n.y})`}>
                <circle r="5.2" className={cn("stroke-[0.6]", TONE[tone])} />
                <circle r="1.4" className="fill-fg" />
                <text
                  y="8.6"
                  textAnchor="middle"
                  className="fill-fg"
                  style={{ fontSize: "3.1px", fontFamily: "var(--font-sans)" }}
                >
                  {n.label}
                </text>
                <text
                  y="12.2"
                  textAnchor="middle"
                  className="fill-muted"
                  style={{ fontSize: "2.5px", fontFamily: "var(--font-mono)" }}
                >
                  {formatPct(n.risk, 0)} · {n.status}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
