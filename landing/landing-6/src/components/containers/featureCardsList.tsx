import React from "react";
import Container from "./container";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import {
  ChevronRightIcon,
  CodeSandboxLogoIcon,
  DiscordLogoIcon,
  FigmaLogoIcon,
  GitHubLogoIcon,
  NotionLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";

const LOGOS = [
  <GitHubLogoIcon key="github" className="size-8 text-teal-50" />,
  <FigmaLogoIcon key="figma" className="size-8 text-teal-50" />,
  <CodeSandboxLogoIcon key="csb" className="size-8 text-teal-50" />,
  <TwitterLogoIcon key="twitter" className="size-8 text-teal-50" />,
  <DiscordLogoIcon key="discord" className="size-8 text-teal-50" />,
  <NotionLogoIcon key="notion" className="size-8 text-teal-50" />,
];
const FeatureCardsList = () => {
  return (
    <div className="flex relative w-full flex-col justify-start items-start bg-primary py-10 md:py-20 ">
      <Container>
        <section className="col-span-12 row-auto grid h-full w-full overflow-visible bg-inherit space-y-8">
          <div className="flex flex-col w-100 justify-start items-start  text-white">
            <Typography variant={"h2"} className="text-inherit text-start tracking-tighter">
              Features Portfolio
            </Typography>
            <Typography className="w-4/4 md:w-2/4 text-inherit font-extralight">
            Nextbase is built for scale. Whether you are building a small app or a huge app, Nextbase has all the tools you need.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-2xl mx-auto z-10">
            {Array(6)
              .fill(1)
              .map((_, idx) => {
                return (
                  <Card
                    key={idx}
                    className={cn(
                      "bg-transparent border-tr border-white/20 text-white"
                    )}
                  >
                    <div className="h-40 rounded-t-lg bg-teal-800 flex justify-center items-center fill-primary text-primary">
                      {LOGOS[idx]}
                    </div>
                    <CardContent>
                      <CardTitle>Feature {idx + 1}</CardTitle>
                      <CardDescription className="text-secondary-foreground/60 pt-4">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Maiores corrupti ea minima sequi ullam facere
                        fugiat suscipit molestias quam voluptates cum magnam
                        laborum, error deserunt totam! Natus qui nisi dolore!
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={"link"}
                        className="text-start justify-start px-0 decoration-primary text-secondary-foreground/80 hover:text-secondary text-sm font-normal "
                        size={"sm"}
                      >
                        Read more <ChevronRightIcon className="size-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default FeatureCardsList;
