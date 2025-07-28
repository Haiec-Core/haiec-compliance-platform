import Link from "next/link";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FOOTER_LINKS, FooterCategory } from "@/lib/enums";
import { CubeIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-start relative bg-gray-950 px-8 md:pt-8  pt-8">
      <div className="flex col-span-11 md:col-span-6 mx-auto flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <Typography
            variant="h1"
            className="font-bold text-white md:text-[40px] md:leading-[48px] tracking-tighter"
          >
            A fancy looking hero text to catch your attention{" "}
          </Typography>
          <Typography
            variant="p"
            className="max-w-xl text-primary-foreground md:px-0 leading-7 font-extralight text-fuchsia-50 mt-10"
          >
            Great, now that we have your attention, we will actually talk about
            how we help you
          </Typography>
        </div>
        <div className="w-full flex lg:flex-row flex-col  items-start gap-8 lg:items-center my-10">
          <div className="w-max-2/4 mx-auto relative md:flex justify-center">
            <Button className="mt-0 scroll-m-0 relative bg-fuchsia-50 text-dark hover:text-fuchsia-50 font-medium">
              Get started for free
            </Button>
            <Button className="my-3 md:my-0 px-16  md:ms-5  scroll-m-0 relative bg-transparent font-medium border border-fushia-50 text-fuchsia-50">
              Watch Video
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 h-full gap-8 lg:grid-cols-2 lg:gap-10">
        <div className="col-span-1 flex flex-wrap justify-start lg:justify-normal items-start w-full content-start gap-4 pt-4 md:pt-12 md:mx-auto md:mt-8 md:gap-8 lg:col-span-1 lg:mt-0">
          {FOOTER_LINKS.map((details) => {
            return <FooterCategory key={details.id} footerDetails={details} />;
          })}
        </div>
        <div className="col-span-1 lg:order-2 order-1 mx-auto w-full space-y-4 pt-16 md:px-10 md:pt-8 lg:pt-12">
          <div className="space-y-2 text-start">
            <Typography variant={"h5"} className=" text-gray-200">
              Subscribe to our Newsletter
            </Typography>
            <Typography className=" text-gray-400">
              Stay updated with our latest news, articles, and updates.
            </Typography>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300" htmlFor="email">
                Email
              </Label>
              <Input
                className=" border-gray-600 bg-gray-800 placeholder:text-gray-100"
                id="email"
                placeholder="Enter your email"
                required
                type="email"
              />
            </div>
            <Button
              className="w-full py-0 bg-fuchsia-50 text-dark hover:text-white"
              type="submit"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
      <div className="overflow-x-none mt-8 w-full border-t-2 border-gray-700 py-8 md:mt-0  lg:px-8">
        <Typography variant={"mutedText"}>
          Disclaimer: This is just a template website and is not endorsed by or
          affiliated with any Corporation, registered in the U.S. and other
          countries.
        </Typography>
        <Typography variant={"mutedText"}>
          Copyright © 2023 NextBase. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
}

const FooterCategory = ({
  footerDetails,
}: {
  footerDetails: FooterCategory;
}) => {
  return (
    <div className="mb-8 flex flex-auto lg:w-1/4 flex-col md:items-baseline">
      <Typography variant={"h5"} className="mb-4 text-lg text-[#94A3B8]">
        {footerDetails.title}
      </Typography>
      <ul className="flex w-fit flex-col space-y-2">
        {footerDetails.links?.map(({ link, title }) => (
          <Link
            key={title}
            href={link}
            className="text-lg text-[#F8FAFC] transition-colors hover:text-gray-200"
          >
            <li>{title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};