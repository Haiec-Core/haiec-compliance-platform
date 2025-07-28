"use client";

import React from "react";
import { FAQ_QUESTIONS } from "@lib/enums";
import Container from "./container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Typography } from "../ui/typography";

const FAQ = () => {
  return (
    <Container classNames="bg-cyan-50 py-0 min-h-[75dvh] lg:min-h-screen">
      <div className="col-span-12 flex justify-center items-center flex-col space-y-6 p-10 ">
        <Typography variant={"h2"}>Frequently asked questions.</Typography>
        <Typography
          variant="subheading"
          className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance text-center"
        >
          Great, now that we have your attention, we will actually talk about
          how we help you
        </Typography>
        <FeaturesAccordion />
      </div>
    </Container>
  );
};

export default FAQ;

export function FeaturesAccordion() {
  return (
    <div className="flex flex-col w-full max-w-5xl items-start space-y-10 ">
      <Accordion type="multiple" className="grid w-full">
        {FAQ_QUESTIONS.map(({ question, answer }) => {
          return (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger className="lg:text-xl text-black w-full text-center font-medium ">
                {question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-white/60 text-start leading-7 w-full text-lg">
                  <Typography className="text-black/60 text-start leading-7 w-full text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Animi repudiandae eaque quam sit, blanditiis iure fugiat rem
                    totam a aliquid adipisci sint placeat eligendi delectus
                    ducimus facere! Voluptas, necessitatibus culpa.
                  </Typography>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
