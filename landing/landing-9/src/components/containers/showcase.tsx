"use client";

import * as React from "react";
import Image from "next/image";
import Container from "./container";
import { motion, useScroll, useTransform } from "framer-motion";
const CAROUSAL_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432519/usenextbase/layouts_wmhadw.webp",
  },
  {
    id: 6,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432514/usenextbase/orgs-teams_1_zzemcg.webp",
  },
];
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
