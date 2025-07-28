import React from "react";
import Image from "next/image";

const Brands = () => {
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
      alt: "Crowd Logo",
    },
    {
      id: "hashnode",
      src: "/hashnode.svg",
      alt: "Hashnode Logo",
    },
    {
      id: "lugg",
      src: "/lugg.svg",
      alt: "Lugg Logo",
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
      alt: "Super Logo",
    },
    {
      id: "tinybird",
      src: "/tinybird.svg",
      alt: "Tinybird Logo",
    },
  ];
  return (
    <div className="flex items-center justify-center space-x-4 md:space-x-8 w-full md:h-[186px] my-10 md:my-4">
      {BRANDS.slice(0, 10).map(({ id, src, alt }) => {
        return (
          <Image
            key={id}
            src={src}
            className="h-12 md:h-20 blur-0 transition-all hover:scale-110 col-span-1"
            width={180}
            height={180}
            alt={alt}
          />
        );
      })}
    </div>
  );
};

export default Brands;
