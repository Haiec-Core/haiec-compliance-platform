import React from "react";
import { Typography } from "../ui/typography";
import Image from "next/image";
import Container from "./container";

const WorkingBrands = () => {
  const BRANDS = [
    {
      id: "attio",
      src: "/attio.svg",
      alt: "Attio Logo",
    },
    {
      id: "cal",
      src: "/cal.svg",
      alt: "Cal Logo",
    },
    {
      id: "checkly",
      src: "/checkly.svg",
      alt: "Checkly Logo",
    },
    {
      id: "chronicle",
      src: "/chronicle.svg",
      alt: "Chronicle Logo",
    },
    {
      id: "crowd",
      src: "/crowd.svg",
      alt: "crowd Logo",
    },
    {
      id: "hashnode",
      src: "/hashnode.svg",
      alt: "Hashnode Logo",
    },
    {
      id: "lugg",
      src: "/lugg.svg",
      alt: "lugg Logo",
    },

    {
      id: "perplexity",
      src: "/perplexity.svg",
      alt: "Perplexity Logo",
    },
    {
      id: "prisma",
      src: "/prisma.svg",
      alt: "Prisma Logo",
    },
    {
      id: "replicate",
      src: "/replicate.svg",
      alt: "Replicate Logo",
    },
    {
      id: "super",
      src: "/super.svg",
      alt: "super Logo",
    },
  ];
  return (
    <Container classNames="flex flex-col col-span-12 items-center md:h-fit justify-start space-y-4 py-0 md:py-20">
    
      <div className="flex flex-wrap w-full h-full justify-center mx-auto">
        {[...BRANDS].map(({ id, src, alt }, idx) => {
          return (
            <Image
              key={`${id}-${idx}`}
              src={src}
              className="h-full blur-0 sm:w-1/2 md:w-44 text-transparent transition-all"
              width={160}
              height={180}
              alt={alt}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default WorkingBrands;
