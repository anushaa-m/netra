import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { NAV } from "@/components/layout/nav";
import { cn } from "@/utils/cn";

const linkBase =
  "flex h-10 items-center gap-2.5 rounded-md px-2.5 text-sm text-muted transition-[background-color,color] duration-150 hover:bg-surface hover:text-fg data-[status=active]:bg-surface data-[status=active]:text-fg";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full flex-col bg-bg-elevated">
      <div className="flex h-14 items-center px-4">
        <Logo />
      </div>
      <nav className="flex-1 space-y-0.5 px-2 py-3">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={linkBase}
              activeOptions={{ exact: item.to === "/" }}
            >
              <Icon className="size-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border px-4 py-3">
        <div className="text-[0.625rem] uppercase tracking-[0.16em] text-subtle">World Model Console</div>
        <div className="mt-1 font-mono text-xs text-muted">NETRA · SOC-01</div>
      </div>
    </aside>
  );
}

export function MobileNav({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-1 overflow-x-auto px-2 py-2", className)}>
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="shrink-0 rounded-md px-2.5 py-1.5 text-xs text-muted data-[status=active]:bg-surface data-[status=active]:text-fg"
          activeOptions={{ exact: item.to === "/" }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
