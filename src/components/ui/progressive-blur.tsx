"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressiveBlurProps extends React.ComponentProps<"div"> {
  blurIntensity?: number;
  direction?: "left" | "right";
}

export function ProgressiveBlur({
  blurIntensity = 1,
  direction = "left",
  className,
  ...props
}: ProgressiveBlurProps) {
  return (
    <div
      className={cn(
        direction === "left" 
          ? "bg-gradient-to-r from-transparent via-white/80 to-white" 
          : "bg-gradient-to-l from-transparent via-white/80 to-white",
        className
      )}
      style={{
        backdropFilter: `blur(${blurIntensity}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity}px)`,
      }}
      {...props}
    />
  );
}

