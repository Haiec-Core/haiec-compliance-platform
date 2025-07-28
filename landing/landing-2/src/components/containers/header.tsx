"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Typography } from "../ui/typography";

export default function Header() {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  return (
    <header className="sticky top-0 inset-x-0 z-50 flex h-[--navbar-height] items-center px-8 bg-lime-50 dark:bg-gray-950 mx-auto">
      <Link
        className="mr-6 flex h-full w-fit items-center justify-start"
        href="#"
      >
        <span className="sr-only">Nextbase Template</span>
        <span className="mr-2 bg-lime-900 rounded-full h-4 w-4 flex align-middle justify-center dark:invert"></span>
        <Typography className="text-center !mt-0" variant={"p"}>
          duex
        </Typography>
      </Link>
      <NavigationMenuDemo />

      <div className="ml-auto flex items-center justify-center gap-3">
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
          size={"icon"}
          variant={"outline"}
          rounded={"full"}
          className="ml-4 flex items-center justify-center md:hidden"
        >
          {openMobileNav ? <Cross1Icon /> : <HamburgerMenuIcon />}
        </Button>
      </div>
      {openMobileNav && (
        <div className="absolute md:hidden bottom-0 left-0 top-20 z-10 h-fit w-full bg-primary-foreground pb-4 shadow-md">
          <div className="flex w-full flex-col items-start justify-start">
            <MobileNavMenuItem href="#" content="Home" />
            <MobileNavMenuItem href="#" content="Features" />
            <MobileNavMenuItem href="#" content="Contact" />
            <MobileNavMenuItem href="#" content="Pricing" />
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
    <Link href={href} className={"w-full justify-start pl-4"}>
      <p className=" w-full p-4 text-start text-base font-medium text-gray-600 hover:text-primary ">
        {content}
      </p>
    </Link>
  );
};

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

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className="md:block hidden text-center ml-auto justify-center">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="#" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Features</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="#" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="#" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Pricing
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
