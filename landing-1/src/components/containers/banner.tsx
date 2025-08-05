"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import Container from "./container";

const Banner = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 10, 0]);

  return (
    <Container>
      <div ref={targetRef} className="block h-[50dvh] w-full md:h-[75vh]">
        <motion.div
          style={{
            scale,
            rotateX,
            translateX: "-50%",
            translateY: "-50%",
            top: "50%",
            left: "50%",
          }}
          className=" absolute z-10 mx-auto hidden w-[768px] overflow-hidden rounded-lg border-[1px] border-indigo-900/20 antialiased shadow-lg [perspective:1200px] md:block md:h-[578px] lg:h-[640px] lg:w-[1024px]  "
        >
          <Image
            alt="Hero image"
            fill
            className="hidden md:block"
            src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1703582349/admin-dashboard_pzonvt.png"
          />
        </motion.div>
        <div className="absolute left-1/2 top-1/2 z-[2] h-[300px] w-[80vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg antialiased shadow-[0_24px_48px_-12px_#0f17282e] md:hidden  ">
          <Image
            alt="Hero image"
            fill
            src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1703582349/admin-dashboard_pzonvt.png"
          />
        </div>
      </div>
    </Container>
  );
};

export default Banner;
