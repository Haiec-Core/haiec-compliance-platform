import React from "react";
import Wrapper from "./wrapper";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import Image from "next/image";

const Showcase = () => {
  return (
    <Wrapper>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-4">
          {" "}
          <Typography variant={"h2"}>Ship faster, with confidence.</Typography>
          <Typography variant={"h3"}>
            With simple building blocks, you can construct even the most
            intricate systems without hassle.
          </Typography>
        </div>
        <div className="mt-24 mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First card */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden xl:min-h-[420px] px-8 pt-12 lg:pt-0 lg:px-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[40%_1fr] gap-8 md:gap-8 lg:gap-24 items-center bg-gradient-to-br from-emerald-400/10 to-cyan-400/10">
            <div className="md:pb-8 lg:py-12 lg:pb-12">
              <p className="text-2xl font-semibold mb-5">Feature One</p>
              <p className="text-lg mb-7 font-medium dark:text-slate-300 text-slate-700">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores corrupti ea minima sequi ullam facere fugiat suscipit
                molestias quam voluptates cum magnam laborum, error deserunt
                totam! Natus qui nisi dolore!
              </p>
            </div>
            <div className="flex flex-col justify-end h-full md:pt-8">
              <Image
                width={900}
                height={600}
                src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432513/usenextbase/auth_yhrpj6.webp"
                alt="Nextbase dashboard"
                className="
              w-full
                md:max-w-full md:min-w-[420px] xl:min-w-[520px] -mb-1
                rounded-tl-md drop-shadow-sm m-auto origin-center
                pointer-events-none
                max-w-6xl
              "
              />
            </div>
          </div>
          {/* Second card */}
          <div className="grid grid-rows-[auto_1fr] rounded-lg gap-8 md:gap-10 overflow-hidden bg-gradient-to-br from-emerald-400/10 to-cyan-400/10">
            <div className="pt-11 px-8 md:px-10">
              <p className="text-2xl font-semibold mb-5">Feature Two</p>
              <p className="text-lg mb-7 font-medium dark:text-slate-300 text-slate-700">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores corrupti ea minima sequi ullam facere fugiat suscipit
                molestias quam voluptates cum magnam laborum, error deserunt
                totam! Natus qui nisi dolore!
              </p>
            </div>
            <div className="flex flex-col justify-end h-full md:pt-8">
              <Image
                width={900}
                height={600}
                src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432513/usenextbase/auth_yhrpj6.webp"
                alt="Nextbase dashboard"
                className="
              w-full
                md:max-w-full md:min-w-[420px] xl:min-w-[520px] -mb-1
                rounded-t-md drop-shadow-sm m-auto origin-center
                pointer-events-none
                max-w-6xl
              "
              />
            </div>
          </div>
          {/* Third card */}
          <div className="grid grid-rows-[auto_1fr] rounded-lg gap-8 md:gap-10 overflow-hidden bg-gradient-to-br from-emerald-400/10 to-cyan-400/10">
            <div className="pt-11 px-8 md:px-10">
              <p className="text-2xl font-semibold mb-5">Feature Three</p>
              <p className="text-lg mb-7 font-medium dark:text-slate-300 text-slate-700">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores corrupti ea minima sequi ullam facere fugiat suscipit
                molestias quam voluptates cum magnam laborum, error deserunt
                totam! Natus qui nisi dolore!
              </p>
            </div>
            <div className="flex flex-col justify-end h-full md:pt-8">
              <Image
                width={520}
                height={600}
                src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432513/usenextbase/auth_yhrpj6.webp"
                alt="Nextbase dashboard"
                className="
              w-full
                md:max-w-full md:min-w-[420px] xl:min-w-[520px] -mb-1
                rounded-t-md drop-shadow-sm m-auto origin-center
                pointer-events-none
                max-w-6xl
              "
              />
            </div>
          </div>
          {/* Fourth card */}
          <div className="md:col-span-2 rounded-2xl overflow-hidden xl:min-h-[420px] px-8 pt-12 lg:pt-0 lg:px-16 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-[40%_1fr] gap-8 md:gap-8 lg:gap-24 items-center bg-gradient-to-br from-emerald-400/10 to-cyan-400/10">
            <div className="md:pb-8 lg:py-12 lg:pb-12">
              <p className="text-2xl font-semibold mb-5">Feature Four</p>
              <p className="text-lg mb-7 font-medium dark:text-slate-300 text-slate-700">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Maiores corrupti ea minima sequi ullam facere fugiat suscipit
                molestias quam voluptates cum magnam laborum, error deserunt
                totam! Natus qui nisi dolore!
              </p>
            </div>
            <div className="flex flex-col justify-end h-full md:pt-8">
              <Image
                width={900}
                height={600}
                src="https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432513/usenextbase/auth_yhrpj6.webp"
                alt="Nextbase dashboard"
                className="
              w-full
                md:max-w-full md:min-w-[420px] xl:min-w-[520px] -mb-1
                rounded-tl-md drop-shadow-sm m-auto origin-center
                pointer-events-none
                max-w-6xl
              "
              />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Showcase;
