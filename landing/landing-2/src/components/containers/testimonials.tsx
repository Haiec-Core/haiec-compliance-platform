import React from "react";
import Container from "./container";
import { TESTIMONIES } from "@/lib/enums";
import { Typography } from "../ui/typography";
import Image from "next/image";

const Testimonials = ({}) => {
  return (
    <Container classNames="flex flex-col w-full text-center justify-center items-center mt-16">
      <Typography
        variant={"h2"}
        className="w-full text-center mx-auto text-lime-900 tracking-tighter"
      >
        What our users are saying
      </Typography>
      <Typography
        variant="p"
        className="my-2 mb-4 max-w-sm px-4 text-slate-950 md:max-w-lg md:px-0"
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
                  <div className="flex justify-start gap-4 w-full items-center rounded-full overflow-hidden">
                    <Image
                      width={48}
                      height={48}
                      className="rounded-full size-14 object-cover border-2 border-gray-200 p-0.5"
                      src={testimonial.profilePic}
                      alt={testimonial.author}
                    />
                    <div className="flex flex-col items-start justify-start w-full text-sm">
                      <Typography
                        variant={"lead"}
                        className="text-sm text-gray-600"
                      >
                        {testimonial.author}
                      </Typography>
                      <Typography
                        variant={"lead"}
                        className="text-xs text-gray-400"
                      >
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
    </Container>
  );
};

export default Testimonials;
