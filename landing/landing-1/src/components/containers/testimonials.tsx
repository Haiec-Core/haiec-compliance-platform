import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TESTIMONIES } from "@/lib/enums";
import { Typography } from "../ui/typography";
import Container from "./container";
import { StarIcon } from "@radix-ui/react-icons";

export default function Testimonials() {
  return (
    <Container>
      <section className="col-span-12 h-fit w-full snap-start bg-transparent">
        <div className="mx-auto bg-transparent text-center">
          <Typography
            variant={"h2"}
            className="text-blue-900 text-pretty font-bold tracking-tighter dark:text-white md:mb-8"
          >
            What Our Users Are Saying
          </Typography>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-6 md:grid-rows-2 lg:grid-cols-3  lg:grid-rows-1">
            {TESTIMONIES.map((testimony) => (
              <TestimonyCard key={testimony.author} details={testimony} />
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}

type CardProps = {
  review: string;
  profilePic: string;
  fallback: string;
  author: string;
  role: string;
  brand: string;
};
const TestimonyCard = ({ details }: { details: CardProps }) => {
  return (
    <Card className="group relative z-[1] flex flex-col cursor-default items-start justify-start overflow-hidden p-4 shadow-md md:col-span-3 md:last:col-span-4 md:last:col-start-2 lg:col-span-1 lg:last:col-span-1 lg:last:col-start-3">
      <div className="flex gap-1 ml-5">
        <StarIcon className="text-yellow-300 h-4 w-4" />
        <StarIcon className="text-yellow-300 h-4 w-4" />
        <StarIcon className="text-yellow-300 h-4 w-4" />
        <StarIcon className="text-yellow-300 h-4 w-4" />
        <StarIcon className="text-yellow-300 h-4 w-4" />
      </div>
      <div
        aria-hidden
        className="absolute -bottom-72 -left-40 -z-[1] h-[20rem] w-full  rounded-tr-3xl bg-transparent blur-xl transition-all"
      ></div>
      <CardContent className="">
        <Typography
          variant={"p"}
          className="max-h-[16rem] text-pretty text-start"
        >
          {details.review}
        </Typography>
      </CardContent>
      <CardFooter className="mt-auto w-full ">
        <div className=" flex h-12 w-fit items-center justify-between">
          <Avatar className="mr-2">
            <AvatarImage
              alt={details.author}
              src={details.profilePic}
              className="object-cover"
            />
            <AvatarFallback>{details.fallback}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start justify-start">
            <Typography
              variant={"mutedText"}
              className=" text-secondary-foreground"
            >
              {details.author}
            </Typography>
            <Typography variant={"mutedText"}>
              {details.role + ", " + details.brand}
            </Typography>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
