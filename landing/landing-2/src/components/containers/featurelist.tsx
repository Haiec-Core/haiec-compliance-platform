"use client";
import React, { useState } from "react";
import Container from "./container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SHOWCASE_FEATURES } from "@/lib/enums";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "framer-motion";

const FeatureList = () => {
  return (
    <Container classNames="bg-lime-900">
      <div className="flex flex-col justify-center items-center col-span-12 mt-16">
        <Typography
          variant={"h2"}
          className="mx-auto w-full text-center text-card"
        >
          Nextbase makes your life easy
        </Typography>
        <Typography className="mx-auto w-2/3 text-center text-lime-100">
          Nextbase is built for scale. Whether you are building a small app or a
          huge app, Nextbase has all the tools you need.
        </Typography>
      </div>
      <div className="my-10 col-span-12 w-full overflow-hidden rounded bg-card border border-gray-200 lg:h-[540px]">
        <FeaturesAccordion />
      </div>
    </Container>
  );
};

export default FeatureList;

export function FeaturesAccordion() {
  const [currTab, setCurrTab] = useState<string>(SHOWCASE_FEATURES[0].title);

  const ImageSrc =
    SHOWCASE_FEATURES.find(({ title }) => title === currTab)?.imgSrc ||
    SHOWCASE_FEATURES[0].imgSrc;

  return (
    <div className="grid p-5 grid-cols-1 lg:grid-cols-3 w-full gap-10 ">
      <Accordion
        type="single"
        className="w-full h-full col-span-1"
        value={currTab}
        onValueChange={setCurrTab}
      >
        {SHOWCASE_FEATURES.map(({ title, desc }, idx) => {
          return (
            <AccordionItem defaultChecked={idx === 0} key={title} value={title}>
              <AccordionTrigger>{title}</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col items-start justify-start gap-4">
                  <Typography>{desc}</Typography>
                  <Button variant={"secondary"} size={"sm"}>
                    Learn More
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Preview Images */}
      <AnimatePresence>
        <motion.div
          key={ImageSrc}
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative lg:col-span-2 -mb-6 aspect-[1735/990] w-full overflow-hidden rounded-t-2xl shadow-2xl lg:mt-10 lg:h-[500px] lg:w-[800px]"
        >
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={ImageSrc}
            className="absolute h-full object-cover blur-0"
            height={990}
            width={1770}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
