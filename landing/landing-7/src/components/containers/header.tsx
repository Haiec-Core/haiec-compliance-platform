"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
}  from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  return (
    <header className="absolute top-0 max-w-screen  inset-x-0 z-50 flex h-[--navbar-height] py-4 w-full items-center justify-evenly lg:px-8 px-8 text-white bg-primary-foreground mx-auto">
       <nav className="max-w-screen-2xl flex justify-between items-center w-full">
        <div className="  gap-4">
          <Link
            className="mr-6 flex h-full w-full flex-grow items-baseline"
            href="#"
          >
             <span className="sr-only">Nextbase Template</span>
        <Image
          alt="brand-logo"
          width={20}
          className="dark:invert"
          height={20}
          src="/hepta-logo.svg"
          className="my-auto"
        />
        <span className="text-lg md:text-xl text-bold text-[#020817] leading-5 mx-2">duex</span>
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex text-center ml-auto justify-center">
        <NavigationMenuList className="text-[#020817]">
          <NavigationMenuLink asChild>
            <NavMenuItem href="#" content="Home" />
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <NavMenuItem href="#" content="Features" />
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <NavMenuItem href="#" content="Contact" />
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <NavMenuItem href="#" content="Pricing" />
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-auto flex items-center justify-end mt-3">
        <Button
          // variant={"default"}
          size={"sm"}
          rounded={"full"}
          className="hidden px-8 py-2 md:block  bg-primary text-sm font-medium leading-5 text-white hover:bg-black "
        >
          Get started for free
        </Button>

        <Button
          onClick={() => setOpenMobileNav((prev) => !prev)}
          variant={"outline"}
          rounded={"full"}
          className="ml-4 flex items-center justify-center md:hidden fill-gray-800 text-gray-800"
        >
          {openMobileNav ? (
            <Cross1Icon className="size-4" />
          ) : (
            <HamburgerMenuIcon className="size-4" />
          )}
        </Button>
      </div>
      {openMobileNav && (
        <div className="absolute md:hidden bottom-0 left-0 top-20 z-10 h-fit w-full bg-white pb-4 shadow-md ">
          <div className="flex w-full flex-col items-start justify-start pl-4">
            <MobileNavMenuItem href="#" content="Home" />
            <MobileNavMenuItem href="#" content="Pricing" />
            <MobileNavMenuItem href="#" content="Features" />
            <MobileNavMenuItem href="#" content="Contact" />
          </div>
        </div>
      )}
      </nav>
    </header>
  );
}


const NavMenuItem = ({
  href = "#",
  content,
}: {
  href: string;
  content: string;
}) => {
  return (
    <Link
      className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium underline decoration-transparent decoration-2 underline-offset-8 transition-colors hover:text-gray-900   hover:decoration-primary focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
      href={href}
    >
      {content}
    </Link>
  );
};

const MobileNavMenuItem = ({
  href = "#",
  content,
}: {
  href: string;
  content: string;
}) => {
  return (
    <Link
      href={href}
      className={"w-full justify-start pl-4 hover:bg-gray-100/50"}
    >
      <p className=" w-full py-4 text-start text-base font-medium text-gray-600 hover:text-primary ">
        {content}
      </p>
    </Link>
  );
};
