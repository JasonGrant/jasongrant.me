"use client";
import * as LabelPrimitive from "@radix-ui/react-label";
import type * as React from "react";
import { cn } from "./utils";

export function Label({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn("text-[13px] font-semibold text-foreground", className)}
      {...props}
    />
  );
}
