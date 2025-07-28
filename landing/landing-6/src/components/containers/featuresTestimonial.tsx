import * as React from "react";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { featuredTestimonial } from "@/lib/enums";
import { Typography } from "../ui/typography";

export function FeaturedTestimonial() {
  const testimonials = featuredTestimonial.flat(2);

  return (
     <div className="col-span-12 py-5">
      <div className="w-full md:w-5/6 mx-auto px-3 md-px-0 lg:px-0">
      <Typography variant={"h2"} className="p-0 tracking-tighter">
      Loved by industry leaders
      </Typography>
      <Typography variant={"p"} className="p-0 text-base font-light tracking-tighter">
      Great, now that we have your attention, we will actually talk about how we help you
      </Typography>
      </div>
    <Carousel
      opts={{
        align: "center",
        loop: true,
        auto:true,
        perPage: 1, 
      }}
      className="w-100 md:w-5/6 mx-auto max-w-screen px-2 md:px-0 pt-2 pb-8 bg-gradient-to-b "
    >
      <CarouselContent className="">
        {testimonials.map((testimonial) => (
          <CarouselItem key={testimonial.author.handle} className="">
            <div className="p-1">
              <Card className="flex items-start justify-start w-full border border-none p-0">
                <CardContent className="w-4/5 md:w-5/5 lg:w-5/5 mx-autotext-start space-y-8 px-1">
                  <div className="flex flex-col items-start justify-start">
                    <blockquote className="font-light text-balance text-lg lg:text-3xl xl:text-3xl leading-normal lg:leading-relaxed xl:leading-normal">
                      {`“${testimonial.body}”`}
                    </blockquote>
                    <div className="flex items-start justify-start gap-x-4 px-1">
                      <Image
                        width={70}
                        height={70}
                        className="h-12 w-12 flex-none mt-5 rounded-full bg-gray-50"
                        src={testimonial.author.imageUrl}
                        alt={testimonial.author.name}
                      />
                      <div className="flex flex-col w-fit gap-1 mt-3">
                        <div className="font-semibold text-inherit w-fit">
                          {testimonial.author.name}
                        </div>
                        <div className="text-inherit/70 w-fit">{`@${testimonial.author.handle}`}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <CarouselNext className="absolute text-dark bg-[#020817] border-0 rounded-lg w-50 h-50 top-20 md:top-10 lg:md-0 right-4 lg:md-right-10 md:right-10">
        <ChevronRightIcon  className="text-muted  w-50 h-50"/>
      </CarouselNext>
    </Carousel>
    </div>
  );
}

export default FeaturedTestimonial;
