import React from "react";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </p>
  );
};

export default Heading;
