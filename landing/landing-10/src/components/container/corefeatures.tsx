"use client";
import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import { SHOWCASE_FEATURES } from "@/lib/enums";
import { CubeIcon } from "@radix-ui/react-icons";
import Image from "next/image";

const CoreFeatures = () => {
  return (
    <Container id="features" className="h-fit md:mb-10 mb:pb-10">
      <div className="px-4 md:px-24 md:mb-14">
        <Typography
          variant={"h3"}
          className="w-full flex items-center justify-start text-start pt-20 pb-2 text-primary"
        >
          Core Features
        </Typography>
        <Typography
          variant={"p"}
          className="w-full md:w-[40%] mb-12 text-start font-light"
        >
          Nextbase is built for scale. Whether you are building a small app or a
          huge app, Nextbase has all the tools you need.
        </Typography>
      </div>

      <div className="flex flex-col md:flex-row justify-between max-w-full px-4 md:px-24">
        <div className="w-full md:w-1/2 space-y-2 mt-4">
          {SHOWCASE_FEATURES.slice(0, 5).map((feature, idx) => (
            <div key={idx} className="pb-8">
              <Typography
                variant={"h5"}
                className="w-full flex items-center justify-start text-start gap-4 font-medium"
              >
                <CubeIcon className="w-6 h-6" />
                {feature.title}
              </Typography>
              <Typography variant={"p"} className="w-full mt-2 font-light">
                {feature.desc}
              </Typography>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/2 flex items-start justify-center mt-10 md:mt-0">
          <div className="w-full h-auto md:h-[668px] md:w-[561px] relative">
            <Image
              src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Core Features"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CoreFeatures;
