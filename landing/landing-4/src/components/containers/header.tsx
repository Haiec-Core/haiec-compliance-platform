"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";

export default function Header() {
  return (
    <header className="sticky max-w-screen inset-x-0 z-50 flex h-[--navbar-height] py-4 w-full items-center justify-evenly lg:px-8 px-0 bg-cyan-50 mx-auto">
      <nav className="max-w-screen-2xl flex justify-between items-center w-full">
        <div className="gap-4">
          <Link
            className="mr-6 flex h-full w-full flex-grow items-center justify-center"
            href="#"
          >
            <span className="sr-only">Nextbase Template</span>
            <Image
              alt="brand-logo"
              width={40}
              className="size-10 ml-5 md:ml-0"
              height={40}
              src="/quad_logo.svg"
            />
          </Link>
        </div>
        <div className="hidden lg:flex justify-around items-center ml-auto mr-4 space-x-4">
          <Button size="sm" variant={"link"} asChild>
            <Link href="#home">Home</Link>
          </Button>
          <Button size="sm" variant={"link"} asChild>
            <Link href="#features">Features</Link>
          </Button>
          <Button size="sm" variant={"link"} asChild>
            <Link href="#contact">Contact</Link>
          </Button>
          <Button size="sm" variant={"link"} asChild>
            <Link href="#pricing">Pricing</Link>
          </Button>
        </div>
        <Button
          size="sm"
          variant={"default"}
          className="ml-auto hidden lg:flex justify-around items-center gap-4 "
        >
          Get started for free
        </Button>
      </nav>
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
