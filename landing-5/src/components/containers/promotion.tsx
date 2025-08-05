import React from "react";
import Container from "../ui/container";
import { Typography } from "../ui/typography";

const Promotion = () => {
  return (
    <Container classNames="bg-primary-100 dark:bg-primary-100/70">
      <div className="col-span-12 max-w-7xl mx-auto w-full flex justify-between items-center py-20 px-5">
        <div className="flex flex-col items-start justify-start space-y-1">
          <Typography variant={"h1"}>Unlimited Sites!</Typography>
          <Typography>Generate unlimited websites with nextbase.</Typography>
        </div>
        <div className="flex flex-col items-start justify-start space-y-1">
          <Typography>Starting at</Typography>
          <Typography variant={"h1"}>$444</Typography>
        </div>
      </div>
    </Container>
  );
};

export default Promotion;
