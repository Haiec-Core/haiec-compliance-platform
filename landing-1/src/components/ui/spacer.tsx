import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const Spacer = ({ type }: { type?: "lg" | "xl" | "xs" | "sm" | "md" }) => {
  const spaceVariants = cva("w-full", {
    variants: {
      type: {
        xs: "min-h-2",
        sm: "min-h-4",
        md: "min-h-14",
        lg: "min-h-20",
        xl: "min-h-[120px]",
      },
    },
    defaultVariants: {
      type: "xl",
    },
  });

  return <div className={cn(spaceVariants({ type }))}></div>;
};

export default Spacer;
