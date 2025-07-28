"use client";

import { Link } from "@/components/intl-link";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { DocsMobileNavigation } from "./DocsMobileNavigation";
import { navbarLinks } from "./constants";

export function LeftNav() {
  const pathname = usePathname();

  const isBlogPage = pathname?.startsWith("/blog");
  const isDocsPage = pathname?.startsWith("/docs");

  return (
    <div className="flex items-center gap-8">
      <DocsMobileNavigation />
      <div className="flex space-x-8">
        <Link href="/" className={cn("font-bold text-xl ")}>
          <div className="relative flex space-x-2 h-10 md:w-fit items-center justify-center dark:-ml-4 -ml-2">
            <Image
              src={`/logos/nextbase.png`}
              width={32}
              height={32}
              alt="light-logo"
            />

            {isBlogPage && (
              <span className="font-bold text-foreground">Nextbase Blog</span>
            )}
            {isDocsPage && (
              <span className="font-bold font-bold text-foreground">
                Nextbase Docs
              </span>
            )}
            {!isBlogPage && !isDocsPage && (
              <span className="font-bold">Nextbase</span>
            )}
          </div>
        </Link>
      </div>
      <ul className="hidden lg:flex gap-8 font-medium items-center">
        {navbarLinks.map(({ name, href }) => (
          <li
            key={name}
            className="text-muted-foreground font-regular text-sm hover:text-foreground"
          >
            <Link href={href}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
