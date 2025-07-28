import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../ui/button";
import Wrapper from "./wrapper";

const Community = () => {
  return (
    <Wrapper>
      <div className="max-w-[1600px]  w-full mx-auto relative z-10 my-10 lg:mt-20 lg:mb-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="col-span-1 gap-y-8 flex flex-col items-start justify-start">
          <div className="bg-[#5765f2] w-full rounded flex items-center justify-center text-white h-[140px] lg:h-[200px] hover:opacity-80 transition-all duration-150">
            <DiscordLogoIcon className="size-16" />
          </div>
          <p className=" mt-4 lg:mt-8 mb-2 text-lg text-black dark:text-white">
            Discord Community
          </p>
          <p className=" text-slate-800 dark:text-slate-400 text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, a.
          </p>
          <Button>Join the community</Button>
        </div>
        {/* Open Source */}
        <div className=" col-span-1 gap-y-8 flex flex-col items-start justify-start">
          <div className="bg-slate-800 w-full rounded flex items-center justify-center text-white h-[140px] lg:h-[200px] hover:opacity-80 transition-all duration-150">
            <GitHubLogoIcon className="size-16" />
          </div>
          <p className=" mt-4 lg:mt-8 mb-2 text-lg text-black dark:text-white">
            Open Source
          </p>
          <p className=" text-slate-800 dark:text-slate-400 text-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, a.
          </p>
          <Button>View Project</Button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Community;
