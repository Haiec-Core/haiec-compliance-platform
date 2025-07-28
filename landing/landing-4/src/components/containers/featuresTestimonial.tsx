import React from "react";
import Container from "./container";
import Image from "next/image";
import { featuredTestimonial } from "@/lib/enums";
import { Typography } from "../ui/typography";

const FeaturedTestimonial = ({}) => {
  return (
    <Container classNames="bg-secondary">
      <div className="mx-auto bg-secondary col-span-12 py-16 lg:py-32 flex flex-col items-center justify-center gap-8 text-sm leading-6 text-gray-900 dark:text-gray-300 xl:mx-0 xl:max-w-none">
        <Typography className="text-center w-full text-cyan-900 font-extrabold" variant={"h2"}>
          Loved by industry leaders
        </Typography>
        <Typography
          variant="subheading"
          className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance text-center"
        >
          Great, now that we have your attention, we will actually talk about
          how we help you
        </Typography>
        <figure className="col-span-2 w-4/5 md:w-full max-w-6xl mx-auto space-y-8">
          <blockquote className=" font-normal text-2xl lg:text-4xl xl:text-4xl leading-normal w-full text-center lg:leading-relaxed xl:leading-normal ">
            {`“${featuredTestimonial.body}”`}
          </blockquote>
          <figcaption className="flex items-center justify-center w-full gap-x-4  px-6">
            <Image
              width={70}
              height={50}
              className="h-16 w-16 flex-none rounded-full bg-gray-50"
              src={featuredTestimonial.author.imageUrl}
              alt=""
            />
            <div className="flex flex-col w-fit gap-1">
              <div className="font-semibold text-card-foreground w-fit">
                {featuredTestimonial.author.name}
              </div>
              <div className="text-card-foreground/70 w-fit">{`@${featuredTestimonial.author.handle}`}</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </Container>
  );
};

export default FeaturedTestimonial;
