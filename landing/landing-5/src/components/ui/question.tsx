import Container from "@ui/container";
import React from "react";
import { Typography } from "./typography";
import Image from "next/image";

type QuestionType = {
  question: string;
  answer: string;
  logo: string;
};

const QuestionsArr: QuestionType[] = [
  {
    question: "Full-time developers are expensive.",
    answer: `Full-time developers can be expensive due to high salaries (over
        $100k), plus benefits and vacation days.`,
    logo: "scribble-dollar.svg",
  },
  {
    question: "Hiring is pain in the ass.",
    answer: `It's hard to find and manage the right freelancer. This often leads to wasted time and money. We make it easy by taking care of the management and quality for you.`,
    logo: "sad-scribble.svg",
  },
  {
    question: "Onboarding takes months",
    answer: `Traditional hiring means weeks, even months, before a developer can start actual work. We cut through the extensive onboarding, SOWs, and contracts.`,
    logo: "onboarding-scribble.svg",
  },
  {
    question: "You can’t pause employee pay",
    answer: `Unlike fixed employee salaries, you can pause & resume your subscription as needed without wasting resources.`,
    logo: "pause-scribble.svg",
  },
];
const Questions = () => {
  return (
    <Container>
      <div className="flex flex-col items-center col-span-12 pt-20 justify-between ">
        <div className="flex flex-row items-center justify-center text-center mb-10 lg:w-1/2 w-full">
          <Typography variant={"h2"}>
            Can&apos;t I just hire a full time developer?
          </Typography>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20  w-3/4">
          {QuestionsArr?.map((question) => (
            <QuestionCard question={question} key={question.question} />
          ))}
        </div>
      </div>
    </Container>
  );
};

const QuestionCard = ({ question }: { question: QuestionType }) => {
  return (
    <div className="text-white text-3xl flex-col space-y-6">
      <Image
        alt="scribble"
        priority
        width="30"
        height="50"
        className="w-[30px]"
        src={question.logo}
      />
      <div className="flex flex-col space-y-2">
        <Typography className="text-xl lg:text-2xl font-semibold">
          {question.question}
        </Typography>
        <Typography className="text-lg lg:text-xl text-[#A3A3A3]">
          {question.answer}
        </Typography>
      </div>
    </div>
  );
};

export default Questions;
