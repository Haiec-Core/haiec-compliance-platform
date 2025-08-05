import React from "react";
import Wrapper from "./wrapper";
import Image from "next/image";

const FeaturedTestimonial = ({ testimony }) => {
  return (
    <Wrapper classNames="my-16 lg:my-16">
      <div className="mx-auto  z-10 flex items-center justify-center gap-8 text-sm leading-6 text-inherit xl:mx-0 xl:max-w-none">
        <figure
          className={`w-fit relative  md:max-w-3xl mx-auto py-16 md:px-16 flex flex-col items-center justify-center gap-8`}
        >
          <Image
            src={"wave.svg"}
            alt="wave"
            fill
            className="absolute invert dark:invert-0 inset-0 object-cover"
          />
          <blockquote className=" font-normal text-xl text-balance leading-normal w-full text-center lg:leading-relaxed xl:leading-normal ">
            {`“${testimony.body}”`}
          </blockquote>
          <figcaption className="flex flex-col items-center justify-center w-fit space-y-4  px-6">
            <Image
              width={70}
              height={50}
              className="h-16 w-16 flex-none rounded-full bg-gray-50"
              src={testimony.author.imageUrl}
              alt=""
            />
            <div className="flex flex-col w-fit gap-1">
              <div className="font-semibold text-inherit w-fit">
                {testimony.author.name}
              </div>
              <div className="text-inherit/70 w-fit">{`@${testimony.author.handle}`}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </Wrapper>
  );
};

export default FeaturedTestimonial;
