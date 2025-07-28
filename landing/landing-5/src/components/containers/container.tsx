import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return (
    <section
      className={cn(
        "relative mx-auto grid h-full w-full max-w-7xl grid-cols-12 px-8 md:px-16 lg:px-32 md:mb-8",
        classNames,
      )}
    >
      {children}
    </section>
  );
};

export default Container;