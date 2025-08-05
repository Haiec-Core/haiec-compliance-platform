"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FOOTER_LINKS, FooterCategory } from "@/lib/enums";
import Image from "next/image";
import {
  CubeIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import * as Separator from "@radix-ui/react-separator";

export default function Footer() {
  return (
    <footer className="flex flex-col max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1700px] rounded-xl justify-start relative mx-auto pl-4 md:mx-24 md:pt-8 lg:pt-8">
      <div className="hidden md:flex flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="bg-[#a6f2cf] rounded-full h-6 w-6 flex items-center justify-center"></div>
          <span className="ml-2">Nextbase</span>
          <div className=" h-6 w-[1px] ml-6 bg-gray-300"></div>
          <span className="ml-6">The future of computing starts now</span>
        </div>
        <div className="flex space-x-6 md:mr-4 mr-1 pr-8">
          <div className="bg-[#a6f2cf] rounded-full h-6 w-6 flex items-center justify-center">
            <a href="https://twitter.com" aria-label="Twitter">
              <TwitterLogoIcon />
            </a>
          </div>

          <div className="bg-[#a6f2cf] rounded-full h-6 w-6 flex items-center justify-center">
            <a href="https://facebook.com" aria-label="Facebook">
              <CubeIcon className=" " />
            </a>
          </div>

          <div className="bg-[#a6f2cf] rounded-full h-6 w-6 flex items-center justify-center">
            <a href="https://instagram.com" aria-label="Instagram">
              <InstagramLogoIcon className=" " />
            </a>
          </div>

          <div className="bg-[#a6f2cf] rounded-full h-6 w-6 flex items-center justify-center">
            <a href="https://github.com" aria-label="GitHub">
              <GitHubLogoIcon className=" " />
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 h-full gap-8 lg:grid-cols-3 lg:gap-10">
        <div className="order-2 col-span-1 flex flex-wrap place-content-stretch lg:justify-normal items-start w-full content-start gap-4 pt-12 md:order-2 md:mx-auto md:mt-8 md:gap-8 lg:col-span-2  lg:mt-0">
          {FOOTER_LINKS.map((details) => {
            return <FooterCategory key={details.id} footerDetails={details} />;
          })}
        </div>
        <div className="lg:order-2 max-w-[380px] md:max-w-full space-y-4 md:px-10 md:pt-8 lg:pt-12">
          <div className="space-y-2 text-start mb-12 ml-4">
            <Typography variant={"h5"} className=" font-semibold">
              Subscribe to Newsletter
            </Typography>
            <Typography variant={"smallText"} className="font-light">
              Stay updated with our latest news, articles and updates.
            </Typography>
          </div>
          <form className="space-y-4 ml-4 max-w-[420px]">
            <div className="space-y-2 mx-auto">
              <Label className="text-base" htmlFor="email">
                Email
              </Label>
              <Input
                className="  text-base placeholder:text-gray-600"
                id="email"
                placeholder="Enter your email"
                required
                type="email"
              />
            </div>
            <Button
              variant={"outline"}
              className="w-full bg-black text-white dark:bg-primary dark:text-white"
              type="submit"
            >
              Subscribe
            </Button>
          </form>

          <div className="flex flex-col md:hidden items-stretch justify-around">
            <div className="flex items-center my-12 ml-4">
              <div className="bg-[#a6f2cf] rounded-full h-6 w-6 flex items-center justify-center"></div>
              <span className="ml-2">Nextbase</span>
              <div className=" h-6 w-[1px] ml-6 bg-gray-300"></div>
              <span className="ml-6 text-sm">
                The future of computing starts now
              </span>
            </div>

            <div className="flex space-x-6 mr-1 justify-center">
              <div className="bg-[#a6f2cf] rounded-full h-6 w-6 flex items-center justify-center">
                <a href="https://twitter.com" aria-label="Twitter">
                  <TwitterLogoIcon />
                </a>
              </div>

              <div className="bg-[#a6f2cf] rounded-full h-6 w-6 flex items-center justify-center">
                <a href="https://facebook.com" aria-label="Facebook">
                  <CubeIcon className=" " />
                </a>
              </div>

              <div className="bg-[#a6f2cf] rounded-full h-6 w-6 flex items-center justify-center">
                <a href="https://instagram.com" aria-label="Instagram">
                  <InstagramLogoIcon className=" " />
                </a>
              </div>

              <div className="bg-[#a6f2cf] rounded-full h-6 w-6 flex items-center justify-center">
                <a href="https://github.com" aria-label="GitHub">
                  <GitHubLogoIcon className=" " />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-none max-w-[1720px] mt-8 w-full py-8 md:mt-0 flex flex-col items-center">
        <Separator.Root className="h-[1px] w-full bg-gray-300 mb-4" />
        <Typography variant={"mutedText"} className="text-xs">
          Disclaimer: This is just a template website and is not endorsed by or
          affiliated with any Corporation, registered in the U.S. and other
          countries.
        </Typography>
        <Typography variant={"mutedText"} className="mt-2 text-xs">
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
    <div className="mb-4 flex w-1/3 md:w-1/4 flex-col md:items-baseline ml-4 items-start">
      <Typography variant={"h5"} className="mb-4 text-lg font-bold">
        {footerDetails.title}
      </Typography>
      <ul className="flex w-fit flex-col space-y-2">
        {footerDetails.links?.map(({ link, title }) => (
          <Link
            key={title}
            href={link}
            className="prose font-medium text-gray-500 transition-colors hover:text-gray-200"
          >
            <li>{title}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
