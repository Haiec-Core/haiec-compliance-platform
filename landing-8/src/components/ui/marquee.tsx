import { cn } from "@lib/utils";
import React, { HTMLAttributes, ReactNode } from "react";

export type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  direction?: "left" | "up";
  pauseOnHover?: boolean;
  reverse?: boolean;
  fade?: boolean;
  innerClassName?: string;
  numberOfCopies?: number;
};
const Marquee = ({
  children,
  direction = "left",
  pauseOnHover = false,
  reverse = false,
  fade = false,
  className,
  innerClassName,
  numberOfCopies = 2,
  ...rest
}: MarqueeProps) => {
  return (
    <div
      className={cn(
        "group flex gap-4 overflow-hidden",
        direction === "left" ? "flex-row" : "flex-col",
        className
      )}
      style={{
        maskImage: fade
          ? `linear-gradient(${
              direction === "left" ? "to right" : "to bottom"
            }, transparent 0%, rgba(0,0,0,1.0) 10%, rgba(0,0,0,1.0) 90%, transparent 100%)`
          : "",
        WebkitMaskImage: fade
          ? `linear-gradient(${
              direction === "left" ? "to right" : "to bottom"
            }, transparent 0%, rgba(0,0,0,1.0) 10%, rgba(0,0,0,1.0) 90%, transparent 100%)`
          : "",
      }}
      {...rest}
    >
      {Array(numberOfCopies)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex justify-around gap-[1rem] [--gap:1rem] shrink-0",
              direction === "left"
                ? "animate-marquee-left flex-row"
                : "animate-marquee-up flex-col",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              reverse && "direction-reverse",
              innerClassName
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

export default Marquee;
