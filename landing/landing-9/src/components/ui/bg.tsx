import Image from "next/image";
import React from "react";

const Grain = () => {
  return (
    <div className="fixed z-20 inset-0 h-full w-full">
      <Image className=" opacity-50" fill src="/assets/bg.png" alt="Grain bg" />
    </div>
  );
};

export default Grain;
