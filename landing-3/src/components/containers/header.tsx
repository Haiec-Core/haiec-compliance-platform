"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import {
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenu,
} from "@/components/ui/navigation-menu";

const NavMenuItem = ({
  href = "#",
  content,
}: {
  href: string;
  content: string;
}) => {
  return (
    <Link
      className="group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium decoration-transparent decoration-2 transition-colors hover:decoration-primary focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
      href={href}
    >
      {content}
    </Link>
  );
};

export default function Header() {
  return (
    <header className="sticky left-0 top-0 z-50 flex h-[--navbar-height] shrink-0 items-center max-w-screen-2xl inset-x-0 w-full justify-evenly md:px-8 px-4 lg:px-8 bg-card backdrop-blur-md">
      <Link
        className="mr-6 flex h-full w-fit items-center justify-start"
        href="#"
      >
        <span className="sr-only">Nextbase Template</span>
        <Image alt="brand-logo" width={80} height={64} src="/trois_title.svg" />
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

      <Button variant={"default"} className="ml-auto">
        Get started for free
      </Button>
    </header>
  );
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];
