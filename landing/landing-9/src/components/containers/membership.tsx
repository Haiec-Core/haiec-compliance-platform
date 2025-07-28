import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { TESTIMONIES } from "@/lib/enums";
import { Button } from "../ui/button";

const Membership = () => {
  return (
    <Container id="benefits" className="py-16">
      <div
        id="#benefits"
        className="flex col-span-12 max-w-screen-xl mx-auto flex-col items-center justify-between gap-24 py-16"
      >
        {" "}
        <Image
          aria-hidden
          alt="Wave"
          width={80}
          height={80}
          src={"/assets/asset_8.svg"}
        />
        <div className="flex mx-auto flex-col items-center max-w-screen-md justify-between gap-4">
          <Typography variant={"h2"}>Membership benefits</Typography>
          <Typography className="text-center max-w-screen-md">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem ex
            quaerat nemo iure repudiandae nam, mollitia similique voluptate
            beatae neque.
          </Typography>
          <Button variant={"default"}>See Plans</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {Array(6)
            .fill(1)
            .map((_, idx) => (
              <div
                key={idx}
                className="w-full h-full flex flex-col items-center justify-start gap-4 text-center text-black"
              >
                <div className="size-24 rounded-full overflow-hidden mx-auto">
                  <Image
                    width={100}
                    height={100}
                    src={`/assets/logo_${idx + 4}.svg`}
                    alt={TESTIMONIES[0].author}
                  />
                </div>
                <Typography variant={"h5"}>Lorem ipsum dolor.</Typography>
                <Typography>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non,
                  dicta.
                </Typography>
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
};

export default Membership;
