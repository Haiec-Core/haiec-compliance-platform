"use client";
import Container from "@containers/container";
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
    <Container id="faq" className="py-0 pb-20 pt-20 min-h-[50vh] w-full">
      <div className="col-span-12 flex flex-col md:flex-row items-start ml-6 md:ml-40 h-full">
        <div className="flex flex-col md:w-auto h-full">
          <Typography variant={"h3"} className="md:self-start mb-4">
            Frequently Asked Questions
          </Typography>
          <Typography variant={"p"} className="self-start mb-4">
            Nextbase is built for scale. Whether you are building a small app or
            a huge app.
          </Typography>
        </div>
        <FeaturesAccordion />
      </div>
    </Container>
  );
};

export default FAQ;

export function FeaturesAccordion() {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:w-[70%] md:ml-10">
      <Accordion
        type="multiple"
        className="flex flex-col md:w-full min-w-[320px] md:max-w-3xl divide-y divide-white/10 h-full"
      >
        {FAQ_QUESTIONS.map(({ question, answer }) => {
          return (
            <AccordionItem
              key={question}
              value={question}
              className="w-full max-w-none bg-white my-4 px-3"
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
