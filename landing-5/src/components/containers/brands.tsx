import React from "react";
import { Typography } from "../ui/typography";
import Image from "next/image";
import Container from "../ui/container";

const Brands = () => {
  const BRANDS = [
    {
      id: "next",
      src: "/next.svg",
      alt: "next Logo",
    },
    {
      id: "markdown",
      src: "/markdown.svg",
      alt: "Perplexity Logo",
    },
    {
      id: "tailwindcss",
      src: "/tailwindcss.svg",
      alt: "TailwindCSS Logo",
    },
    {
      id: "vercel",
      src: "/vercel.svg",
      alt: "Vercel Logo",
    },
  ];
  return (
    <Container
      size="full"
      classNames="py-10 bg-secondary-100 dark:bg-secondary-100/70"
    >
      <div className="flex p-10 lg:flex-row flex-col col-span-12 items-start md:h-fit justify-start lg:justify-between w-full space-y-4">
        <div className="flex flex-col justify-center items-start">
          <h2 className=" font-bold text-5xl">20-100Hr</h2>
          <Typography className="scroll-m-0">
            Saved by using nextbase
          </Typography>
        </div>
        <div className="flex justify-start items-flex w-fit justify-items-start items-start flex-wrap md:flex-nowrap gap-8 md:gap-4">
          {BRANDS.map(({ id, src, alt }) => {
            return (
              <Image
                key={id}
                src={src}
                className="h-8 w-40 grayscale-0 blur-0 text-transparent transition-all"
                width={220}
                height={100}
                alt={alt}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Brands;
