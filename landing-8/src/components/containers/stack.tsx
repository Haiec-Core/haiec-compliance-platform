import React from "react";
import Wrapper from "./wrapper";
import { Typography } from "../ui/typography";
import Image from "next/image";

const CLOUD_SERVICES = [
  "Vercel_dark.svg",
  "netlify.svg",
  "aws.svg",
  "heroku.svg",
  "cloudflare.svg",
];

const CODEBASE = [
  "nextjs.svg",
  "express.js_dark.svg",
  "Remix_dark.svg",
  "cloudflare.svg",
  "redwoodjs.svg",
  "fastify_dark.svg",
];

const LANGUAGE = ["typescript.svg", "go.svg", "python.svg", "/rust.png"];
const Stack = () => {
  return (
    <Wrapper>
      <div className="flex flex-col justify-start items-center">
        <div className="flex flex-col justify-center items-center space-y-4">
          {" "}
          <Typography variant={"h2"}>Flexibility for your team.</Typography>
          <Typography variant={"h3"}>
            Using simple primitives you can build the most complex systems
            without the stress.
          </Typography>
        </div>
        <div
          className="grid  grid-cols-1  lg:grid-cols-2  p-px  gap-px  mt-16  mx-auto  max-w-6xl  rounded-md  bg-gradient-to-tl  from-green-800/60  via-orange-300/60  to-rose-900/60  shadow-[0_10px_100px_0_rgba(52,211,153,0.15)]
"
        >
          {/* First Block */}
          <div
            className="lg:col-span-2  p-8  md:rounded-t-md   bg-card dark:bg-slate-950
"
          >
            <Typography
              variant={"h2"}
              className="text-center w-full  lg:mt-12
"
            >
              Works in any cloud
            </Typography>
            <Typography
              className="max-w-xl  mx-auto  my-6  text-center w-full
"
            >
              Lorem iTypographysum dolor sit amet consectetur adipisicing elit.
              Impedit, voluptatibus.
            </Typography>
            <div
              className="mt-16  grid  grid-cols-2  items-center  justify-center  max-w-[1200px]  m-auto  sm:px-6  lg:grid-cols-5  gap-x-4  gap-y-8
"
            >
              {CLOUD_SERVICES.map((logo, idx) => (
                <div
                  key={idx}
                  className="group  flex  items-center  justify-center  h-16  w-40  max-w-[90%]  px-6  py-6  m-auto  rounded-lg  border  transition-all  border-slate-700  hover:border-slate-600
"
                >
                  <Image
                    alt={logo}
                    src={logo}
                    width="120"
                    height="30"
                    className="text-black dark:text-white max-h-[40px] pointer-events-none opacity-80 transition-all group-hover:opacity-100"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Second Block */}
          <div className="md:rounded-bl-md p-8  bg-card dark:bg-slate-950">
            <Typography
              variant={"h2"}
              className="text-center w-full  lg:mt-12
"
            >
              Works in any cloud
            </Typography>
            <Typography
              className="max-w-xl  mx-auto  my-6  text-center w-full
"
            >
              Lorem iTypographysum dolor sit amet consectetur adipisicing elit.
              Impedit, voluptatibus.
            </Typography>
            <div className="my-12 grid grid-cols-3 gap-6 gap-y-8 items-center justify-items-center">
              {CODEBASE.map((logo, idx) => (
                <div
                  key={idx}
                  className="group
"
                >
                  <Image
                    alt={logo}
                    src={logo}
                    width="120"
                    height="30"
                    className="text-black invert dark:invert-0 dark:text-white  max-h-[40px] pointer-events-none opacity-80 group:hover:opacity-100 transition-all group-hover:opacity-100 grayscale group-hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Third Block */}
          <div className="md:rounded-bl-md p-8  bg-card dark:bg-slate-950">
            <Typography
              variant={"h2"}
              className="text-center w-full  lg:mt-12
"
            >
              Language Agnostic
            </Typography>
            <Typography
              className="max-w-xl  mx-auto  my-6  text-center w-full
"
            >
              Lorem iTypographysum dolor sit amet consectetur adipisicing elit.
              Impedit, voluptatibus.
            </Typography>
            <div className="my-12 grid grid-cols-2 gap-6 gap-y-12 items-center justify-items-center">
              {LANGUAGE.map((logo, idx) => (
                <div
                  key={idx}
                  className="group relative h-full w-full sm:w-auto flex items-center justify-center
"
                >
                  <Image
                    alt={logo}
                    src={logo}
                    width="60"
                    height="60"
                    decoding="async"
                    data-nimg="1"
                    className="text-black dark:text-white  max-h-[60px] pointer-events-none transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Stack;
