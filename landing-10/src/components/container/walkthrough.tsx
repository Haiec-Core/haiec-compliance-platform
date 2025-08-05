"use client";
import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

const LARGE_PREVIEW = [
  "/assets/01.png",
  "/assets/02.png",
  "/assets/03.png",
  "/assets/04.png",
  "/assets/05.png",
];
const Walkthrough = () => {
  const { scrollYProgress } = useScroll();
  const transformX = useTransform(scrollYProgress, [0, 1], [0, -1000]);
  return (
    <Container id="steps" className="pb-20 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <Typography
          variant={"h3"}
          className="w-full flex items-center justify-start text-start pt-20 pb-10"
        >
          Get started in{" "}
          <div className="relative px-4 w-fit h-fit items-center justify-center flex">
            <p className="z-10 font-bold h-full w-full">easy steps</p>
          </div>
        </Typography>
        <Typography className="w-4/5 text-start text-gray-700 dark:text-gray-300">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
          illum iure ut veniam aliquam, voluptate natus optio quas harum odio.
        </Typography>
        <div className="flex lg:hidden items-center justify-start gap-8  min-w-screen pt-10 pl-[260px]">
          {LARGE_PREVIEW.slice(0, 3).map((_, idx) => (
            <motion.div
              style={{ translateX: transformX }}
              key={idx}
              className="col-span-1 group w-full bg-transparent min-w-72 flex flex-col items-start justify-start gap-4"
            >
              <div className="min-h-60  w-full">
                <Image src={_} width={480} height={480} alt="Step" />
              </div>

              <Typography className="font-semibold">Step {idx + 1}</Typography>
              <Typography className="text-gray-800 dark:text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
                unde.
              </Typography>
            </motion.div>
          ))}
        </div>

        {/* Large Screen Animation */}
        <div className="hidden lg:flex items-center justify-start gap-8  min-w-screen pt-10 pl-[10rem]">
          {LARGE_PREVIEW.map((_, idx) => (
            <motion.div
              style={{ translateX: transformX }}
              key={idx}
              className="col-span-1 group w-full min-w-72 flex flex-col items-start justify-start gap-4"
            >
              <div className="min-h-60  w-full">
                <Image src={_} width={480} height={480} alt="Step" />
              </div>

              <Typography className="font-semibold px-4">
                Step {idx + 1}
              </Typography>
              <Typography className="px-4 pb-8">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
                unde.
              </Typography>
            </motion.div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Walkthrough;
