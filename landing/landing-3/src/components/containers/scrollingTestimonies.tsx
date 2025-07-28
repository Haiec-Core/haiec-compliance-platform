"use client";
import Marquee from "@components/ui/marquee";
import { testimonials } from "@lib/enums";
import { cn } from "@lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import React from "react";

const ScrollingTestimonies = () => {
  return (
    <div className="pt-10 lg:pt-20">
      {testimonials.map((columnGroup, columnGroupIdx) => (
        <div
          key={columnGroupIdx}
          className="space-y-8 xl:contents xl:space-y-4"
        >
          {columnGroup.map((column, columnIdx) => (
            <div
              key={columnIdx}
              className={cn(
                (columnGroupIdx === 0 && columnIdx === 0) ||
                  (columnGroupIdx === testimonials.length - 1 &&
                    columnIdx === columnGroup.length - 1)
                  ? "xl:row-span-2"
                  : "xl:row-start-1",
                "space-y-8"
              )}
            >
              <Marquee
                pauseOnHover
                fade
                reverse={columnIdx === 1 ? false : true}
              >
                {column.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.body}
                    testimonial={testimonial}
                  />
                ))}
              </Marquee>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScrollingTestimonies;

const TestimonialCard = ({ testimonial }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const handelMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const percX = mouseX / width - 0.5;
    const percY = mouseY / height - 0.5;

    x.set(percX);
    y.set(percY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.figure
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handelMouseMove}
      onMouseLeave={handleMouseLeave}
      key={testimonial.author.handle}
      className="bg-card shadow-lg ring-1 ring-gray-900/5 border border-[#5A5A5A]/20 hover:border-[#5A5A5A]/40  group   rounded-2xl p-8 md:w-[450px] w-[300px] flex flex-col items-start  space-y-6 text-start cursor-pointer hover:bg-[#181818] transition duration-300 ease-out"
    >
      <blockquote className="text-card-foreground/70 hover:text-card-foreground">
        <p>{`“${testimonial.body}”`}</p>
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-x-4">
        <Image
          width={40}
          height={40}
          className="h-10 w-10 rounded-full bg-gray-50"
          src={testimonial.author.imageUrl}
          alt=""
        />
        <div>
          <div className="font-semibold">{testimonial.author.name}</div>
          <div className="text-gray-600">{`@${testimonial.author.handle}`}</div>
        </div>
      </figcaption>
    </motion.figure>
  );
};
