import React from "react";
import Container from "./container";
import { Typography } from "@ui/typography";
import { MailIcon } from "lucide-react";
import { GitHubLogoIcon, LoopIcon } from "@radix-ui/react-icons";

const STEPS = [
  {
    id: 0,
    content: `Send in your requests and our elfs will diligently craft each of them one by one, in sequence. Santa is pretty strict about that fyi.`,
  },
  {
    id: 1,
    content: `You dont have to wait for us at the door with cookies ( as much as we would live to ), all the changes will be pushed to you and youll be notified diligently`,
  },
  {
    id: 2,
    content: `We don't believe in one time relationships, life can throw a pause, so can you. And resume it right where we left off.`,
  },
];

const ICONS = [
  <MailIcon key="mail" className="size-16" />,
  <GitHubLogoIcon key="github" className="size-16" />,
  <LoopIcon key="loop" className="size-16" />,
];
const WalkThrough = () => {
  return (
    <Container className="py-20 bg-background">
      <div className="flex col-span-12 max-w-screen-xl mx-auto flex-col items-center justify-between gap-24">
        <div className="flex mx-auto flex-col items-center max-w-screen-md justify-between gap-4">
          <Typography variant={"h2"}>
            We didn&apos;t reinvent the wheel, just development
          </Typography>
          <Typography className="text-center max-w-screen-md">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem ex
            quaerat nemo iure repudiandae nam, mollitia similique voluptate
            beatae neque.
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS?.map(({ id, content }) => (
            <WalkThroughCard key={id} id={id} content={content} />
          ))}
        </div>
      </div>
    </Container>
  );
};

const WalkThroughCard = ({ id, content }: { id: number; content: string }) => {
  return (
    <div className="relative flex flex-col items-center text-center w-full p-4 gap-6">
      {ICONS[id]}
      <Typography>{content}</Typography>
    </div>
  );
};
export default WalkThrough;
