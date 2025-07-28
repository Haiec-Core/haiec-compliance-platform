import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { BoxIcon, MoveIcon, SunIcon } from "@radix-ui/react-icons";

const ICONS = [
  <MoveIcon key="move" className="text-primary size-6" />,
  <SunIcon key="dot" className="text-primary size-6" />,
  <BoxIcon key="box" className="text-primary size-6" />,
];

const HEADINGS = ["Secure", "Reliable", "Fast"];
const Showcase = () => {
  return (
    <Container>
      <div className="col-span-12 flex flex-col justify-center space-y-4 pt-20 pb-10">
        <Typography variant={"h2"} className=" text-start items-start pb-0 mb-0 tracking-tighter">Process</Typography>
        <Typography variant={"p"} className="md:w-3/5 text-start items-start mt-0 pt-0">Great, now that we have your attention, we will actually talk about how we help you</Typography>
        <div className="max-w-screen-xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          {Array(3)
            .fill(1)
            .map((_, idx) => (
              <Card
                key={idx}
                className="
              col-span-1 lg:basis-1/3 border-none shadow-none ring-transparent"
              >
                <CardHeader className="pb-0">
                  <div className="flex basis-1 lg:basis-1/3 space-x-4 items-center justify-start">
                    {" "}
                    <div className="bg-muted p-3 rounded-lg">
                    {ICONS[idx] }
                    </div>
                    <Typography
                      variant={"subheading"}
                      className="uppercase font-semibold text-nowrap line-clamp-1"
                    >
                      {HEADINGS[idx]}
                    </Typography>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ratione dolorum architecto qui fugiat, corporis, incidunt
                    nemo tempora veniam possimus placeat eveniet natus neque
                    aspernatur maxime saepe temporibus! Laboriosam, et aperiam.
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </Container>
  );
};

export default Showcase;
