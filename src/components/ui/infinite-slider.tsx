"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InfiniteSliderProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  gap?: number;
  reverse?: boolean;
  speed?: number;
  speedOnHover?: number;
}

export function InfiniteSlider({
  children,
  gap = 16,
  reverse = false,
  speed = 60,
  speedOnHover = 20,
  className,
  ...props
}: InfiniteSliderProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const [items, setItems] = React.useState<React.ReactNode[]>([]);

  React.useEffect(() => {
    const childrenArray = React.Children.toArray(children);
    // Duplicate items for seamless loop - we need at least 2 copies
    setItems([...childrenArray, ...childrenArray]);
  }, [children]);

  const animationSpeed = isHovered ? speedOnHover : speed;
  const direction = reverse ? "reverse" : "normal";

  return (
    <div
      ref={sliderRef}
      className={cn("overflow-hidden", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        className="flex items-center animate-infinite-scroll will-change-transform"
        style={{
          gap: `${gap}px`,
          animationDirection: direction,
          animationDuration: `${animationSpeed}s`,
        }}
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

