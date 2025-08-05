import { CheckCircledIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";

type FeatureType = {
  title: string;
  subtitle: string;
  desc: string;
  features?: string[];
  navigateTo: string;
  imgSrc: string;
};
export default function FeatureCard({
  feature,
  id,
}: {
  feature: FeatureType;
  id: number;
}) {
  return (
    <div className=" group relative h-fit lg:py-0 py-8 md:py-10 lg:h-[100vh] row-span-1 mx-auto w-full rounded-md bg-inherit flex justify-center items-center">
      <div className="relative lg:h-3/4 h-full max-h-none z-10 w-full border-none bg-transparent">
        <div
          className={"col-span-1 flex flex-col  items-center gap-8 lg:flex-row"}
        >
          <div className="order-0 lg:w-1/3 w-full flex flex-col justify-center items-start space-y-4">
            <Typography variant={"p"}>FEATURE {id}</Typography>
            <Typography variant={"h3"} className="text-cyan-900">
              {feature.title}
            </Typography>
            <Typography className="text-pretty text-secondary-foreground">
              {feature.subtitle}
            </Typography>
            <Typography variant={"ul"} className="my-4 list-none">
              {feature.features?.map((feature) => (
                <li
                  key={feature}
                  className="flex w-full items-center
                   justify-start overflow-hidden text-secondary-foreground"
                >
                  <CheckCircledIcon className="mr-2 flex h-6 w-6 items-center justify-center capitalize text-cyan-600" />

                  <p className="text-ellipsis text-wrap">{feature}</p>
                </li>
              ))}
            </Typography>

            <div className="py-6 flex items-center">
              <Typography variant={"p"}>Learn more</Typography>
              <ChevronRightIcon className="ml-4" />
            </div>
          </div>
          <div className="order-2 w-full lg:w-1/2 col-span-2 flex h-full items-center justify-center">
            <video
              autoPlay
              loop
              muted
              className="aspect-[4/3] min-h-[260px] w-full rounded-lg bg-gray-300 object-cover object-center shadow-lg md:min-h-[400px] md:min-w-[600px] lg:aspect-[900/700]"
              src={feature.imgSrc}
              preload=""
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
}
