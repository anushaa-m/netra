import { cn } from "@/utils/cn";

export function Logo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="size-7 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="7" className="fill-surface-2" />
        <circle cx="16" cy="16" r="9" className="fill-none stroke-accent" strokeWidth="1.4" />
        <circle cx="16" cy="16" r="4.2" className="fill-none stroke-accent/70" strokeWidth="1.2" />
        <circle cx="16" cy="16" r="1.6" className="fill-accent" />
        <path d="M16 5.5 V8.2 M16 23.8 V26.5 M5.5 16 H8.2 M23.8 16 H26.5" className="stroke-accent/80" strokeWidth="1.2" />
      </svg>
      {compact ? null : (
        <div className="min-w-0 leading-tight">
          <div className="text-sm font-semibold tracking-wide text-fg">NETRA</div>
          <div className="text-[0.625rem] uppercase tracking-[0.16em] text-muted">
            Threat & Risk Analytics
          </div>
        </div>
      )}
    </div>
  );
}
