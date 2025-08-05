import React from "react";
import { Typography } from "../ui/typography";
import Image from "next/image";
import Container from "./container";

const TestimonialFeatureCard = () => {
  return (
    <Container className="md:py-12 py-6 px-6 mb-12 md:px-28">
      <div className="flex flex-col mb-14 items-start justify-start">
        <Typography
          variant="h3"
          className="text-start lg:text-left text-primary"
        >
          Loved by industry leaders
        </Typography>
        <Typography variant="p" className="text-start lg:text-left pt-4">
          Great, now that we have your attention, we actually talk about how we
          help you
        </Typography>
      </div>
      {/* First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 mb-8 md:gap-72 gap-10">
        <div className="lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 1"
            width={600}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="lg:order-2 order-2 flex items-center justify-center">
          <Typography
            variant="h4"
            className="text-start lg:text-left text-sm font-normal"
          >
            "I've been using Nextbase for a few months now, and it has
            transformed the way my team collaborates. The efficiency and ease of
            use are unparalleled."
            <br className="hidden md:block" />
            <span className="text-center lg:text-right lg:text-lg text-sm ml-4 text-primary font-bold">
              - CEO, Apple
            </span>
          </Typography>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-72 gap-10 mb-8">
        <div className="lg:order-1 order-2 flex items-center justify-center">
          <Typography
            variant="h4"
            className="text-start lg:text-left font-normal text-sm"
          >
            "Nextbase's innovative features have boosted our productivity
            significantly. The intuitive design and powerful tools make it a
            must-have for any organization."
            <br />
            <span className="text-center lg:text-right lg:text-lg text-sm text-primary font-bold">
              - CEO, Microsoft
            </span>
          </Typography>
        </div>
        <div className="lg:order-2 order-1">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 2"
            width={600}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-72 gap-10 mb-8">
        <div className="lg:order-1 order-1 flex items-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Image 3"
            width={600}
            height={400}
            className="object-cover rounded-lg"
          />
        </div>
        <div className="lg:order-2 order-2 flex items-center justify-center">
          <Typography
            variant="h4"
            className="text-start lg:text-left font-normal text-sm"
          >
            "Switching to Nextbase was the best decision for our company. It’s
            incredibly user-friendly and has enhanced our workflow dramatically"
            <br />
            <span className="text-center lg:text-right lg:text-lg text-sm text-primary font-bold">
              - CEO, Nvidia
            </span>
          </Typography>
        </div>
      </div>
    </Container>
  );
};

export default TestimonialFeatureCard;
