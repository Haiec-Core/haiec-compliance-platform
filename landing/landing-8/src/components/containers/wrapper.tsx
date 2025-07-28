import { cn } from "@lib/utils";
import React from "react";

const Wrapper = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => {
  return (
    <section
      className={cn(
        "relative mx-auto max-w-[1600px] grid h-fit w-full grid-cols-12 px-8",
        classNames
      )}
    >
      <div className="w-full h-full col-span-12 max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Wrapper;
