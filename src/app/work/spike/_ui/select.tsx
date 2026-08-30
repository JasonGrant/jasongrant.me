"use client";
import * as SelectPrimitive from "@radix-ui/react-select";
import type * as React from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import { cn } from "./utils";

export const Select = SelectPrimitive.Root;
export const SelectValue = SelectPrimitive.Value;

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-card px-3 text-[13.5px] font-medium text-foreground shadow-[inset_0_1px_2px_rgba(16,18,26,0.03)] transition-colors",
        "hover:border-[#c3c6cd] focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <FiChevronDown className="size-3.5 text-muted-foreground" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "relative z-50 overflow-hidden rounded-lg border border-border bg-card text-foreground shadow-[0_12px_32px_-8px_rgba(16,18,26,0.24)]",
          className,
        )}
        position="popper"
        sideOffset={4}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-3 pr-8 text-[13px] outline-none data-[highlighted]:bg-secondary",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <span className="absolute right-2 flex items-center">
        <SelectPrimitive.ItemIndicator>
          <FiCheck className="size-3.5 text-primary" />
        </SelectPrimitive.ItemIndicator>
      </span>
    </SelectPrimitive.Item>
  );
}
