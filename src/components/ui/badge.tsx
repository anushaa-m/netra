import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-sm px-1.5 py-0.5 text-[0.6875rem] font-medium tracking-wide uppercase",
  {
    variants: {
      tone: {
        ok: "bg-ok/15 text-ok",
        warn: "bg-warn/15 text-warn",
        high: "bg-warn/20 text-warn",
        critical: "bg-critical/15 text-critical",
        info: "bg-predicted/15 text-predicted",
        muted: "bg-surface-2 text-muted",
        observed: "bg-observed/15 text-observed",
        predicted: "bg-predicted/15 text-predicted",
        projected: "bg-projected/15 text-projected",
      },
    },
    defaultVariants: { tone: "muted" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
