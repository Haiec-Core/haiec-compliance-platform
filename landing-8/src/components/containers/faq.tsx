"use client";
import Container from "./container";
import React from "react";
import { Typography } from "../ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordian";
import { FAQ_QUESTIONS } from "@lib/enums";

const FAQ = () => {
  return (
    <Container classNames="py-0">
      <div className="col-span-12 lg:pt-[12rem] space-y-6 p-10 rounded-2xl ">
        <Typography variant={"h2"} className="text-center w-full">
          Frequently asked questions
        </Typography>
        <Typography
          variant="subheading"
          className="w-full lg:max-w-[100%] my-6 mx-auto text-balance text-white/60 text-center"
        >
          Nextbase is built for scale. Whether you are building a small app or a
          huge app, Nextbase has all the tools you need.
        </Typography>
        <FeaturesAccordion />
      </div>
    </Container>
  );
};

export default FAQ;

export function FeaturesAccordion() {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:space-x-20 lg:pt-10 space-y-10 lg:space-y-0 ">
      <Accordion
        type="multiple"
        className="grid w-2/3 divide-y divide-white/10 mx-auto"
      >
        {FAQ_QUESTIONS.map(({ question, answer }) => {
          return (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger className="lg:text-2xl text-white font-medium">
                {question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-white/60 text-start leading-7 w-full text-lg">
                  <Typography className="text-white/60 text-start leading-7 w-full text-lg">
                    {answer}
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
