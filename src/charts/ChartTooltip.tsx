import type { ReactNode } from "react";

export function ChartTooltipFrame({
  label,
  children,
}: {
  label?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-md bg-surface-2 px-2.5 py-2 text-xs shadow-[var(--shadow-border-hover)]">
      {label ? <div className="mb-1 text-muted">{label}</div> : null}
      <div className="space-y-0.5 text-fg">{children}</div>
    </div>
  );
}
