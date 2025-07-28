"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";

const Banner = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  return (
    <div
      ref={targetRef}
      className=" h-full w-full col-span-12 mx-auto flex justify-center items-center py-20"
    >
      <motion.div className=" z-10 mx-auto max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl w-full overflow-hidden rounded-lg border-[1px] border-indigo-900/20 antialiased shadow-lg [perspective:1200px] flex h-[300px] md:h-[520px] lg:h-[640px] lg:w-[1024px]  ">
        <Image
          alt="Hero image"
          fill
          src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1703582349/admin-dashboard_pzonvt.png"
        />
      </motion.div>
    </div>
  );
};

export default Banner;
