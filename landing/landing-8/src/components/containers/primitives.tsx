import React from "react";
import Wrapper from "./wrapper";
import { Typography } from "../ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const Primitives = () => {
  return (
    <Wrapper classNames="">
      <div className="flex w-full flex-col justify-start items-start">
        <div className="flex flex-col gap-4 justify-center text-center w-full items-center">
          {" "}
          <Typography variant={"h2"}>Core features</Typography>
          <Typography
            variant="subheading"
            className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance text-center"
          >
            Great, now that we have your attention, we will actually talk about
            how we help you
          </Typography>
        </div>
        <div className="w-full mx-auto flex justify-center items-start mt-8">
          <Tabs defaultValue="Tab1">
            <TabsList className="space-x-4 w-full mx-auto">
              {["Tab1", "Tab2", "Tab3", "Tab4"].map((trigger) => (
                <TabsTrigger defaultChecked key={trigger} value={trigger}>
                  {trigger}
                </TabsTrigger>
              ))}
            </TabsList>
            {["Tab1", "Tab2", "Tab3", "Tab4"].map((trigger) => (
              <TabsContent
                key={trigger}
                value={trigger}
                className="hidden data-[state=active]:grid grid-rows-auto grid-cols-1 md:grid-cols-8 lg:grid-cols-7 data-[state=active]:p-[1px] data-[state=active]:gap-[1px] mt-12  mx-auto max-w-5xl rounded-md data-[state=active]:bg-gradient-to-tl bg-transparent from-green-800/60 via-orange-300/60 to-rose-900/60 shadow-[0_10px_100px_0_rgba(52,211,153,0.10)]"
              >
                <div className="flex flex-col gap-px md:col-span-4 md:rounded-tl-md st-current">
                  <div className="p-8 grow rounded-tl-md bg-slate-100/90 dark:bg-slate-950 backdrop-blur-md">
                    <Typography>{trigger}</Typography>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Rem quas eaque nam provident numquam praesentium
                      aspernatur optio assumenda totam iste! Lorem, ipsum dolor
                      sit amet consectetur adipisicing elit. Soluta, omnis id.
                      Esse illum nisi consequuntur nobis natus, mollitia
                      voluptatibus omnis deserunt sed dolorum. Tenetur harum
                      officiis atque ipsa enim asperiores.
                    </Typography>
                  </div>
                </div>
                <div className="md:col-span-4 lg:col-span-3 md:min-h-[492px] md:rounded-r-md bg-slate-100/90 backdrop-blur-md dark:bg-slate-950">
                  <div className="rounded-lg text-xs leading-relaxed  border-0 bg-transparent p-8 grow rounded-r-md">
                    <Typography>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Fugit voluptates sint ipsum assumenda debitis? Quis nisi
                      expedita ipsum veritatis vero! Earum cum fugit nesciunt ab
                      dicta illo itaque vel? Eos expedita odio voluptas totam
                      accusantium laboriosam, quaerat reprehenderit corrupti,
                      ipsum possimus aperiam magni minus voluptatum magnam
                      corporis porro sequi unde!
                    </Typography>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </Wrapper>
  );
};

export default Primitives;
