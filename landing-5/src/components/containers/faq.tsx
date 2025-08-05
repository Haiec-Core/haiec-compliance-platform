"use client";

import React from "react";
import { FAQ_QUESTIONS } from "@lib/enums";
import Container from "@ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Typography } from "../ui/typography";

const FAQ = () => {
  return (
    <Container classNames="py-0  min-h-[75vh] md:min-h-[100vh] lg:min-h-[85vh] lg:h-fit md:pt-20 items-start">
      <div className="col-span-12 max-w-7xl w-full mx-auto flex justify-center items-center flex-col space-y-6 md:p-10 ">
        <Typography variant={"h2"} className="font-bold  md:text-[40px] md:leading-[48px] ">Frequently asked questions.</Typography>
        <FeaturesAccordion />
      </div>
    </Container>
  );
};

export default FAQ;

export function FeaturesAccordion() {
  return (
    <div className="flex flex-col w-full max-w-5xl items-start space-y-10">
      <Accordion type="multiple" className="grid w-full ">
        {FAQ_QUESTIONS.map(({ question, answer }) => {
          return (
            <AccordionItem
              defaultChecked={true}
              key={question}
              value={question}
              className="bg-white my-3 md:my-4 rounded-lg"
            >
              <AccordionTrigger
                value={question}
                className="lg:text-xl text-black  dark:text-white w-full text-center font-medium ms-4"
              >
                {question}
              </AccordionTrigger>
              <AccordionContent defaultValue={answer}>
                <div className="text-white/60   text-start leading-7 w-full text-lg ms-4">
                  <Typography className="text-black/60 dark:text-white/60 text-start leading-7 w-full text-lg">
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
