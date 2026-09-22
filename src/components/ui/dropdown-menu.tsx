import {
  createContext,
  useContext,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "@/utils/cn";

type DropdownContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const DropdownContext = createContext<DropdownContextType | null>(null);

export function DropdownMenu({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  ...props
}: ComponentProps<"button"> & {
  asChild?: boolean;
}) {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      "DropdownMenuTrigger must be used inside DropdownMenu",
    );
  }

  return (
    <button
      type="button"
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        context.setOpen(!context.open);
      }}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  align?: "start" | "center" | "end";
}) {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error(
      "DropdownMenuContent must be used inside DropdownMenu",
    );
  }

  if (!context.open) {
    return null;
  }

  return (
    <div
      {...props}
      className={cn(
        "absolute right-0 top-full z-50 mt-2 min-w-56 overflow-hidden rounded-lg bg-surface-2 p-1 shadow-[var(--shadow-border-hover)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  className,
  children,
  ...props
}: ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const context = useContext(DropdownContext);

  return (
    <div
      {...props}
      role="menuitem"
      tabIndex={0}
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-fg outline-none hover:bg-surface",
        className,
      )}
      onClick={(event) => {
        props.onClick?.(event);
        context?.setOpen(false);
      }}
    >
      {children}
    </div>
  );
}
