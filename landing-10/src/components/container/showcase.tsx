"use client";
import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";
import { CAROUSAL_IMAGES } from "@/lib/enums";

const Showcase = () => {
  const { scrollYProgress } = useScroll();
  const transformX = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  return (
    <Container className="pb-20 dark:bg-gray-950 mt-14">
      <div className="mx-auto">
        <div className="flex overflow-x-scroll items-center justify-start gap-8 min-w-screen">
          {CAROUSAL_IMAGES.slice(0, 3).map((_, idx) => (
            <motion.div
              style={{ translateX: transformX }}
              key={idx}
              className="col-span-1 group w-[350px] h-[230px] md:w-[730px] md:h-[479px] bg-[hsl(153,75%,95%)] dark:bg-dark-950 flex-none"
            >
              <div className="relative w-full h-full">
                <Image
                  src={_.src}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                  alt="Showcase"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Showcase;