import { Link } from "@tanstack/react-router";
import { Bell, Menu, UserRound } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTelemetry } from "@/data/useTelemetry";
import { cn } from "@/utils/cn";
import { formatDuration } from "@/utils/format";

export function TopBar({ onMenu }: { onMenu: () => void }) {
  const { nowLabel, elapsedSec, health, alerts, kpis } = useTelemetry();
  const unread = alerts.filter((a) => a.severity === "CRITICAL" || a.severity === "HIGH").length;

  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-bg-elevated px-3 md:px-5">
      <button
        type="button"
        className="inline-flex size-10 items-center justify-center rounded-md text-fg md:hidden"
        onClick={onMenu}
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </button>
      <div className="md:hidden">
        <Logo compact />
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-[netra-pulse_2s_ease-in-out_infinite] rounded-full bg-ok opacity-70" />
          <span className="relative inline-flex size-2 rounded-full bg-ok" />
        </span>
        <span className="text-xs font-medium tracking-[0.14em] text-ok uppercase">Defence System Online</span>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        <Meta label="Telemetry" value={nowLabel} />
        <Meta label="Monitoring" value={formatDuration(elapsedSec)} />
        <div className="hidden items-center gap-2 lg:flex">
          <span className={cn("size-1.5 rounded-full", kpis.networkRisk < 55 ? "bg-ok" : "bg-warn")} />
          <span className="text-xs text-muted">
            Network {kpis.riskLabel} · {health.telemetry}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="relative inline-flex size-10 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-fg"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              {unread > 0 ? (
                <span className="absolute top-2 right-2 size-1.5 rounded-full bg-critical" />
              ) : null}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-2 py-1.5 text-[0.6875rem] uppercase tracking-wide text-muted">Alert Center</div>
            {alerts.slice(0, 4).map((a) => (
              <DropdownMenuItem key={a.id} asChild>
                <Link to="/investigation/$id" params={{ id: a.investigationId }} className="flex flex-col items-start gap-0.5">
                  <span className="text-[0.6875rem] tracking-wide text-muted uppercase">{a.severity}</span>
                  <span>{a.title}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            {alerts.length === 0 ? (
              <div className="px-2 py-3 text-xs text-muted">No active alerts.</div>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="inline-flex size-10 items-center justify-center rounded-md text-muted" aria-label="Analyst profile">
          <UserRound className="size-4" />
        </div>
      </div>
    </header>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="hidden leading-tight sm:block">
      <div className="text-[0.625rem] tracking-wide text-subtle uppercase">{label}</div>
      <div className="font-mono text-xs tabular text-fg">{value}</div>
    </div>
  );
}
