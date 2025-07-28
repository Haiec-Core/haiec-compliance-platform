import { cn } from "@lib/utils";
import React from "react";

const Container = ({
  children,
  classNames,
  size = "full",
}: {
  children: React.ReactNode;
  classNames?: string;
  size?: "full" | "narrow";
}) => {
  return (
    <section
      className={cn(
        "relative mx-auto grid h-fit max-w-9xl grid-cols-12 px-8 md:px-16 lg:px-32 ",
        size === "full" && "w-full",
        size === "narrow" && "max-w-4xl",
        classNames
      )}
    >
      {children}
    </section>
  );
};

export default Container;
