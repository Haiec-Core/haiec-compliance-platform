"use client";
import React, { useState } from "react";
import Container from "./container";
import Image from "next/image";
import { testimonials } from "@lib/enums";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

const FeaturedTestimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getTestimonialDataArr = () => {
    const result = [];
    for (let i in testimonials) {
      if (Array.isArray(testimonials[i])) {
        result.push(...testimonials[i]);
      }
    }
    return result;
  };

  const nestedTestimonialData = getTestimonialDataArr();

  const arr0 = nestedTestimonialData[0] || [];
  const arr1 = nestedTestimonialData[1] || [];

  const removeDuplicates = (array, key) => {
    const seen = new Set();
    return array.filter((item) => {
      const duplicate = seen.has(item[key]);
      seen.add(item[key]);
      return !duplicate;
    });
  };

  const uniqueArr0 = removeDuplicates(arr0, "body");
  const combinedResult = [...uniqueArr0, ...arr1];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? combinedResult.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === combinedResult.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentTestimony = combinedResult[currentIndex];

  return (
    <Container>
      <div className="mx-auto lg:pt-[3rem] flex flex-col items-center justify-center gap-8 text-sm leading-6 xl:mx-0 xl:max-w-none">
        <figure className="col-span-2 md:w-full max-w-6xl mx-auto rounded-2xl space-y-10">
          <blockquote className="font-normal text-balance text-sm md:text-lg lg:text-xl xl:text-2xl leading-normal w-full lg:leading-relaxed xl:leading-normal flex items-center justify-center space-x-4">
            <button onClick={handlePrev} className="p-2 md:p-1 bg-white">
              <ArrowLeftIcon className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <span className="flex-1 text-center">{`“${currentTestimony.body}”`}</span>
            <button onClick={handleNext} className="p-2 md:p-1 bg-white">
              <ArrowRightIcon className="w-6 h-6 md:w-8 md:h-8" />
            </button>
          </blockquote>
          <figcaption className="flex items-center justify-center w-full gap-x-4 border-gray-900/10 px-6">
            <Image
              width={70}
              height={50}
              className="h-12 w-12 md:h-20 md:w-20 flex-none rounded-full"
              src={currentTestimony.author.imageUrl}
              alt={currentTestimony.author.name}
            />
            <div className="flex flex-col w-fit gap-1">
              <div className="font-semibold text-card-foreground w-fit text-sm">
                {currentTestimony.author.name}
              </div>
              <div className="text-card-foreground/70 w-fit text-sm">{`@${currentTestimony.author.handle}`}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </Container>
  );
};

export default FeaturedTestimonial;
