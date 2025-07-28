import React from "react";
import { Typography } from "../ui/typography";
import Image from "next/image";

const Brands = () => {
  const BRANDS = [
    {
      id: "chronicle",
      src: "/chronicle.svg",
      alt: "Chronicle Logo",
    },
    {
      id: "hashnode",
      src: "/hashnode.svg",
      alt: "Hashnode Logo",
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
      id: "tinybird",
      src: "/tinybird.svg",
      alt: "Tinybird Logo",
    },
  ];
  return (
    <div className="flex absolute z-20 inset-x-0  bottom-0 mx-auto pt-40  flex-col row-span-1 col-span-12 items-center md:h-fit justify-start w-full  py-10">
   
      <div className="flex flex-wrap lg:flex-nowrap space-x-4 pt-10 w-full max-w-screen-md overflow-hidden lg:max-w-screen-xl justify-center  items-center mx-auto">
        {[...BRANDS].map(({ id, src, alt }, idx) => {
          return (
            <Image
              key={`${id}-${idx}`}
              src={src}
              className="h-full min-h-10 blur-0 text-transparent transition-all"
              width={160}
              height={180}
              alt={alt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Brands;
