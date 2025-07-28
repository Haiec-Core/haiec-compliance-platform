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
      <div className="px-4 md:px-40 md:mb-14">
        <Typography
          variant={"h3"}
          className="w-full flex items-center justify-start text-start pt-20 md:mt-24 pb-2 text-yellow-900"
        >
          Features
        </Typography>
        <Typography
          variant={"p"}
          className="w-full md:w-[40%] mb-12 text-start font-light"
        >
          Nextbase is built for scale. Whether you are building a small app or a
          huge app, Nextbase has all the tools you need.
        </Typography>
      </div>

      <div className="flex flex-col md:flex-row justify-between max-w-full px-4 md:px-40">
        <div className="w-full md:w-1/2 space-y-10 mt-4">
          {SHOWCASE_FEATURES.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="pb-8">
              <Typography
                variant={"h5"}
                className="w-full flex items-center justify-start text-start gap-4 font-medium"
              >
                <CubeIcon className="w-6 h-6" />
                {feature.title.split("-")[0]}
              </Typography>
              <Typography variant={"p"} className="w-full mt-2 font-light">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque iaculis ipsum eget justo tristique sodales.
                Curabitur magna est, placerat ac.
              </Typography>
            </div>
          ))}
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0 ml-32">
          <div className="w-full h-auto md:h-[438px] md:w-[461px] relative">
            <Image
              src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=2432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Core Features"
              layout="fill"
              objectFit="fill"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CoreFeatures;
