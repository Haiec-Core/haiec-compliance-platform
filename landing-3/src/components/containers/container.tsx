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
        "relative mx-auto grid overflow-hidden xl:max-w-none flex-col align-center justify-center px-5 lg:px-8 2xl:px-20 h-fit w-full lg:max-w-7xl md:max-w-2xl grid-cols-12 ",
        classNames
      )}
    >
      {children}
    </section>
  );
};

export default Container;
