import { useState, type ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TelemetryProvider } from "@/data/useTelemetry";

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <TelemetryProvider>
      <TooltipProvider>
        <div className="flex min-h-dvh overflow-x-hidden bg-bg text-fg">
          <div className="sticky top-0 hidden h-dvh w-56 shrink-0 border-r border-border max-md:hidden md:block">
            <Sidebar />
          </div>

          {open ? (
            <div className="fixed inset-0 z-40 md:hidden">
              <button
                type="button"
                className="absolute inset-0 bg-bg/70"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              />
              <div className="relative h-full w-60 max-w-[80vw] border-r border-border bg-bg-elevated">
                <Sidebar onNavigate={() => setOpen(false)} />
              </div>
            </div>
          ) : null}

          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar onMenu={() => setOpen(true)} />
            <main className="min-w-0 flex-1 overflow-x-hidden px-3 py-4 md:px-6 md:py-5">{children}</main>
          </div>
        </div>
      </TooltipProvider>
    </TelemetryProvider>
  );
}
