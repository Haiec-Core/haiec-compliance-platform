import { cn } from "@/lib/utils";
import React from "react";

const Container = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      "relative mx-auto grid overflow-hidden  flex-col align-center justify-center px-4 h-fit w-full  grid-cols-12 ",
      className
    )}
    {...props}
  >
    <div className="col-span-12 mx-auto w-full h-full lg:max-w-5xl md:max-w-2xl xl:max-w-none ">
      {children}
    </div>
  </section>
));

Container.displayName = "Container";

export default Container;
