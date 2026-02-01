import { cn } from "@/lib/tailwind-util";
import React from "react";

interface FilterChipProps extends React.ComponentPropsWithoutRef<"button"> {
  isSelected?: boolean;
}

export function FilterChip({
  isSelected = false,
  className,
  children,
  ...props
}: FilterChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-colors shrink-0 cursor-pointer",
        isSelected
          ? "bg-primary text-white border-primary"
          : "bg-surface-dark border border-border-dark text-text-secondary hover:text-white hover:border-gray-600",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
