import * as Dropdown from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

export const DropdownMenu = Dropdown.Root;
export const DropdownMenuTrigger = Dropdown.Trigger;

export function DropdownMenuContent({
  className,
  ...props
}: ComponentProps<typeof Dropdown.Content>) {
  return (
    <Dropdown.Portal>
      <Dropdown.Content
        sideOffset={8}
        className={cn(
          "z-50 min-w-56 overflow-hidden rounded-lg bg-surface-2 p-1 shadow-[var(--shadow-border-hover)]",
          className,
        )}
        {...props}
      />
    </Dropdown.Portal>
  );
}

export function DropdownMenuItem({
  className,
  ...props
}: ComponentProps<typeof Dropdown.Item>) {
  return (
    <Dropdown.Item
      className={cn(
        "flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm text-fg outline-none",
        "data-[highlighted]:bg-surface",
        className,
      )}
      {...props}
    />
  );
}
