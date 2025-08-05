import React from "react";
import Container from "./container";
import Image from "next/image";
import { Typography } from "../ui/typography";

const Globe = () => {
  return (
    <Container>
      <div className="mx-auto max-w-xl h-fit col-span-12 text-center flex flex-col justify-start items-center gap-4">
        <Typography variant={"h2"}>
          Built to scale{" "}
          <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
            with you.
          </span>
        </Typography>
        <Typography variant={"p"} className="">
          Nextbase is built for scale. Whether you are building a small app or
          an app to serve millions of users, Nextbase has all the tools you
          need.
        </Typography>
      </div>
      <div className="aspect-square w-full row-span-1 col-span-12 mx-auto max-w-[820px] flex justify-center items-start">
        <Image
          width={820}
          height={820}
          src={"/globe.png"}
          alt="Users around the globe"
        />
      </div>
    </Container>
  );
};

export default Globe;
