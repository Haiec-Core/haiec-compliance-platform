import React from "react";
import Container from "./container";
import { Typography } from "@components/ui/typography";
import Image from "next/image";

const STEPS = [
  {
    id: 1,
    title: "Pick a Plan",
    content: `Choose the perfect package for your needs. From one-time projects to
ongoing support, we've got you covered.`,
  },
  {
    id: 2,
    title: "Drool over it",
    content: `We know that no matter which pack you choose you would be beaming with happiness.`,
  },
  {
    id: 3,
    title: "Ka-ching!!",
    content: `Happiness deposited right back to you from your's truly. Now go enjoy the little details bundled in.`,
  },
];
const WalkThrough = () => {
  return (
    <Container classNames="bg-transparent">
      <div className="col-span-12 md:w-3/4 md:max-w-7xl xl:max-w-[1400px] mt-20  lg:mt-[12rem] mx-auto flex flex-col items-center justify-center space-y-6 lg:space-y-12 bg-gradient-to-b from-[#1a1a1a] to-transparent rounded-2xl md:p-10 p-10 px-6 ">
        <p
          className={
            "text-sm uppercase line-clamp-1 text-nowrap font-base text-gray-400x"
          }
        >
          Latest update details hook here.
        </p>
        <Typography variant={"h2"} className="max-w-7xl relative mx-auto">
          Supafast,{" "}
          <span className="inline-flex">
            Supaeasy
            <Image
              alt="Smile Scribble"
              width={50}
              height={50}
              className="w-[30px] lg:w-[50px] hidden md:flex"
              src="smile-scribble.svg"
            />
          </span>
          <Image
            alt="scribble"
            loading="eager"
            width="280"
            height="50"
            className="absolute -bottom-12 right-12 z-10 w-[100px] lg:w-[160px] xl:w-[280px]"
            src="random-scribble.svg"
          />
        </Typography>
        <div className="flex justify-between lg:flex-row flex-col gap-4 items-center place-content-baseline space-y-4 w-full pt-10">
          {STEPS?.map(({ id, title, content }) => (
            <>
              <WalkThroughCard
                key={id}
                id={id}
                title={title}
                content={content}
              />
              {id < 3 && (
                <Image
                  alt="arrow-scribble"
                  loading="eager"
                  width="50"
                  height="50"
                  className="rotate-90 lg:rotate-0"
                  src="arrow-scribble.svg"
                />
              )}
            </>
          ))}
        </div>
        <div className="pt-10 flex justify-between items-center space-x-4">
          <p className="hidden lg:block">payment securely done with stripe</p>
        </div>
      </div>
    </Container>
  );
};

const WalkThroughCard = ({
  id,
  title,
  content,
}: {
  id: number;
  title: string;
  content: string;
}) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center text-center w-[300px] xl:w-[400px]">
      <Image
        alt={`image-${id}`}
        width={40}
        height={40}
        src={`/${id}.svg`}
        className="absolute -z-10 text-[12rem] flex w-[80px] h-[120px] lg:w-[100px] lg:h-[140px]"
      />
      <Typography variant={"h3"}>{title}</Typography>
      <Typography>{content}</Typography>
    </div>
  );
};
export default WalkThrough;
