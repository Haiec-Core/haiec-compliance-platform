"use client";
import Container from "./container";
import React from "react";
import { Typography } from "../ui/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FAQ_QUESTIONS } from "@lib/enums";

const FAQ = () => {
  return (
    <Container classNames="py-0">
      <div className="col-span-12 lg:pt-[12rem] space-y-6 p-10 rounded-2xl ">
        <Typography
          variant={"h2"}
          className="w-full text-center mx-auto text-lime-900 tracking-tighter"
        >
          Frequently asked questions
        </Typography>
        <Typography
          variant="subheading"
          className="w-3/4 lg:max-w-[70%] mx-auto text-balance"
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
    <div className="flex items-center w-full md:ml-10">
      <Accordion
        type="multiple"
        className="flex flex-col md:w-full min-w-[60vw] md:max-w-3xl divide-y divide-white/10 h-full"
      >
        {FAQ_QUESTIONS.map(({ question, answer }) => {
          return (
            <AccordionItem
              key={question}
              value={question}
              className="w-full items-center max-w-none bg-white my-4 px-3 rounded-md"
            >
              <AccordionTrigger className="lg:text-xl text-black dark:text-white w-full max-w-none font-medium">
                {question}
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-black/60 dark:text-gray-100 text-start leading-7 w-full text-lg">
                  <Typography>
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
