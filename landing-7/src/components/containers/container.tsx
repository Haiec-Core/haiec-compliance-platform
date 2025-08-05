import { cn } from "@lib/utils";
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
        "relative mx-auto grid h-fit w-full grid-cols-12 px-8 md:px-16 ",
        classNames
      )}
    >
      <div className="col-span-12 max-w-6xl mx-auto">{children}</div>
    </section>
  );
};

export default Container;
