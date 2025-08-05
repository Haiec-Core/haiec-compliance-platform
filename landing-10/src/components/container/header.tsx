"use client";

import Link from "next/link";

import * as React from "react";

import {
  FolderArchive,
  ListChecks,
  BanknoteIcon,
  HelpCircle,
  SquareKanban,
  ArrowUpIcon,
} from "lucide-react";

const HEADER_ITEMS = [
  { id: "#features ", label: "Features", icon: <SquareKanban /> },
  { id: "#recent_work", label: "Works", icon: <ListChecks /> },
  { id: "#blogs", label: "Blogs", icon: <BanknoteIcon /> },
  { id: "#custom_plan", label: "Contact", icon: <HelpCircle /> },
  { id: "#pricing", label: "Pricing", icon: <HelpCircle /> },
];
export default function Header() {
  return (
    <header className="fixed bottom-16 bg-gray-950 dark:bg-stone-900  -translate-x-1/2 left-1/2 text-white w-[95dvw] md:w-fit rounded-full z-[60] flex items-center justify-evenly">
      <div className="  w-full flex text-xs lg:text-base justify-between items-center">
        <button
          className="p-0 flex justify-center items-center size-14 min-h-12 md:min-h-14 bg-gray-700 rounded-full hover:bg-emerald-700"
          onClick={() =>
            window.scroll({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <ArrowUpIcon className="size-6" />
        </button>
        {HEADER_ITEMS.map(({ id, label, icon }) => (
          <Link
            href={id}
            key={id}
            className="rounded-none hover:rounded-full font-semibold transition-all hover:bg-white min-h-14 hover:text-black
                 w-14 md:w-fit px-1.5 md:px-6 py-2 h-full text-nowrap flex justify-center items-center"
          >
            <span className="hidden md:block">{label}</span>
            <span className="md:hidden">{icon}</span>
          </Link>
        ))}
        <Link
          className="p-0 flex justify-center items-center px-4 md:px-8 min-h-14 h-full py-2 bg-gray-700 rounded-full hover:bg-emerald-700"
          href="#"
        >
          Login
        </Link>
      </div>
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
