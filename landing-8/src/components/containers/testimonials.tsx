import React from "react";
import Wrapper from "./wrapper";
import { TESTIMONIES } from "@/lib/enums";
import { Typography } from "../ui/typography";
import Image from "next/image";

const Testimonials = ({}) => {
  return (
    <Wrapper classNames="flex flex-col w-full text-center justify-center items-center lg:mb-44 mt-8 tracking-tighter">
      <Typography variant={"h2"} className="w-full text-center mx-auto">
        What our users are saying
      </Typography>
      <Typography
        variant="subheading"
        className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance text-center"
      >
        Great, now that we have your attention, we will actually talk about how
        we help you
      </Typography>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[...TESTIMONIES, ...TESTIMONIES, ...TESTIMONIES].map(
          (testimonial, idx) => {
            return (
              <div
                className="p-6 max-w-[420px] w-full mx-auto flex flex-col gap-4 rounded-md bg-card dark:bg-slate-900/80 border border-slate-500/10"
                key={`${testimonial.author}-${idx}`}
              >
                <div className="flex flex-row gap-4 w-full items-center font-medium">
                  <div className="size-12 rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      src={testimonial.profilePic}
                      alt={testimonial.author}
                    />
                    <div className="grow text-sm">
                      <Typography variant={"lead"} className="font-semibold">
                        {testimonial.author}
                      </Typography>
                      <Typography variant={"lead"} className="font-semibold">
                        @{testimonial.author}
                      </Typography>
                    </div>
                  </div>
                </div>
                <Typography className="text-sm md:text-base">
                  {testimonial.review}
                </Typography>
                <div></div>
              </div>
            );
          }
        )}
      </div>
    </Wrapper>
  );
};

export default Testimonials;
