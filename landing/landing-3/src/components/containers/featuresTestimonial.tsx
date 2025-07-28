"use client";

import React, { useState } from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { TESTIMONIES } from "@/lib/enums";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? TESTIMONIES.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === TESTIMONIES.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimony = TESTIMONIES[currentIndex];

  return (
    <Container classNames="flex justify-center items-center">
      <div className="w-full p-6 shadow-lg rounded-lg">
        <div className="flex flex-col items-center justify-center gap-4 mx-auto md:flex-col md:items-center md:justify-center">
          <Typography className="text-center w-full" variant={"h2"}>
            Loved by industry leaders
          </Typography>
          <Typography
            variant="subheading"
            className="w-3/4 lg:max-w-[50%] mx-auto text-balance text-white/60 text-center"
          >
            Great, now that we have your attention, we will actually talk about
            how we help you
          </Typography>
          <div className="flex flex-col items-center justify-center gap-8 text-balance md:flex-row md:w-2/4">
            <button onClick={handlePrev} className="p-2 md:p-1">
              <ChevronLeftIcon className="w-8 h-8 md:w-6 md:h-6" />
            </button>
            <Typography className="text-lg md:flex-grow text-balance px-12">
              &rdquo;{currentTestimony.review}&rdquo;
            </Typography>
            <button onClick={handleNext} className="p-2 md:p-1">
              <ChevronRightIcon className="w-8 h-8 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center mt-10 md:mt-4">
            <div className="relative w-24 h-24">
              <Image
                src={currentTestimony.profilePic}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                alt={`Picture of ${currentTestimony.author}`}
              />
            </div>
            <Typography className="mt-2">
              @{currentTestimony.author.split(" ")[0]}
            </Typography>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Testimonials;
