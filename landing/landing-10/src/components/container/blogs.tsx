"use client";
import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { Button } from "../ui/button";
import { useScroll, useTransform, motion } from "framer-motion";

const Blogs = () => {
  const { scrollYProgress } = useScroll();
  const transformX = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  const LARGE_BLOGS = [
    {
      img: "https://res.cloudinary.com/dkqrmlxlg/image/upload/w_600,h_400/v1709153210/pexels-quang-nguyen-vinh-6415966_eshhkw.webp",
      label: "Sustainable Tech Breakthroughs",
    },
    {
      img: "https://res.cloudinary.com/dkqrmlxlg/image/upload/w_600,h_400/v1709153209/pexels-marcin-jozwiak-2564360_wrnqxa.webp",
      label: "Eco Innovations: Our Technical Vision",
    },
    {
      img: "https://res.cloudinary.com/dkqrmlxlg/image/upload/w_600,h_400/v1709153206/pexels-pixabay-414837_dgmara.webp",
      label: "Green Engineering Unveiled",
    },
    {
      img: "https://res.cloudinary.com/dkqrmlxlg/image/upload/w_600,h_400/v1709153205/pexels-google-deepmind-17485678_bcnirm.webp",
      label: "Tech-Driven Sustainability Solutions",
    },
    {
      img: "https://res.cloudinary.com/dkqrmlxlg/image/upload/w_600,h_400/v1709153203/pexels-hasan-zahra-2118560_m8y891.webp",
      label: "Sustainability Through Technical Ingenuity",
    },
    {
      img: "https://res.cloudinary.com/dkqrmlxlg/image/upload/w_600,h_400/v1709153203/pexels-scott-webb-137602_zxjbre.webp",
      label: "Innovative Green Technologies: Our Startup's Focus",
    },
  ];

  const firstTransformY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -1.1 * 100]
  );
  const secondTransformY = useTransform(
    scrollYProgress,
    [0, 0.75],
    [600, -1.2 * 100]
  );
  const thirdTransformY = useTransform(
    scrollYProgress,
    [0, 0.75],
    [900, -1.3 * 100]
  );

  return (
    <Container id="blogs" className="pb-10 mt-20">
      <div className="text-left w-full pb-1 md:px-24 px-4">
        <Typography
          className="text-left w-full pb-2 text-primary"
          variant={"h3"}
        >
          Our Blog posts
        </Typography>
        <Typography variant="p" className="md:w-[30%] w-fit font-light">
          Great, now that we have your attention, we will actually talk about
          how we help you do the above.
        </Typography>

        <div className="flex lg:hidden items-center justify-start gap-8 min-w-screen mt-10 pl-[600px]">
          {LARGE_BLOGS.map((_, idx) => (
            <motion.div
              style={{ translateX: transformX }}
              key={idx}
              className="col-span-1 group w-full h-full bg-white dark:bg-transparent min-w-72 flex flex-col items-start justify-start gap-4"
            >
              <div className="min-h-40 bg-rose-50 w-full">
                <Image
                  src={_.img}
                  width={600}
                  height={400}
                  className="object-cover"
                  alt={_.label}
                />
              </div>
              <div className="flex justify-start items-start pl-4 py-8 flex-col gap-4 w-full">
                <Typography className="capitalize">{_.label}</Typography>
                <Typography variant={"mutedText"}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Deleniti illum iure ut veniam aliquam, voluptate natus optio
                  quas harum odio.
                </Typography>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="hidden lg:grid mt-8 grid-cols-2 xl:grid-cols-3 gap-8 pt-6">
          {LARGE_BLOGS.map((item, idx) => (
            <div
              key={idx}
              className="col-span-1 group w-full h-auto bg-white dark:bg-transparent min-w-72 flex flex-col items-start gap-2"
            >
              <div className="min-h-40 bg-rose-50 w-full relative">
                <Image
                  src={item.img}
                  width={600}
                  height={400}
                  className="object-cover"
                  alt={item.label}
                />
              </div>
              <div className="flex justify-start items-start px-4 py-4 flex-col gap-4 w-full">
                <Typography className="capitalize font-bold" variant={"p"}>
                  Blog post
                </Typography>
                <Typography variant={"mutedText"}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Deleniti illum iure ut veniam aliquam, voluptate natus optio
                  quas harum odio.
                </Typography>
                <Button variant={"ghost"} className="font-thin px-0">
                  Read More
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Blogs;
