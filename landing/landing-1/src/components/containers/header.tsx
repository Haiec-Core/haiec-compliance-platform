"use client";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  return (
    <header className="sticky left-0 top-0 z-50 flex h-[--navbar-height] shrink-0 items-center bg-blue-50 md:px-8 px-4 backdrop-blur-md dark:border-gray-700">
      <Link
        className="mr-6 flex h-full w-fit items-center justify-start"
        href="#"
      >
        <span className="sr-only">Nextbase Template</span>
        <Image
          alt="brand-logo"
          width={100}
          className="dark:invert"
          height={64}
          src="/brand.svg"
        />
      </Link>

      <NavigationMenu className="hidden md:flex text-center ml-auto justify-center">
        <NavigationMenuList>
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
      <div className="ml-auto flex items-center justify-center">
        <Button
          variant={"default"}
          size={"sm"}
          rounded={"full"}
          className="hidden px-3 py-1 md:block"
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
        <div className="absolute md:hidden bottom-0 left-0 top-20 z-10 h-fit w-full bg-primary-foreground pb-4 shadow-md">
          <div className="flex w-full flex-col items-start justify-start pl-4">
            <MobileNavMenuItem href="#" content="Home" />
            <MobileNavMenuItem href="#" content="Pricing" />
            <MobileNavMenuItem href="#" content="Features" />
            <MobileNavMenuItem href="#" content="Contact" />
          </div>
        </div>
      )}
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
