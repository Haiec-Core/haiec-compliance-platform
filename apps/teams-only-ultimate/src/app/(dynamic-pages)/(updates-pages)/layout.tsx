import { Link } from "@/components/intl-link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

function UpdatesNavigation() {
  const links = [
    { name: "Docs", href: "/docs" },
    { name: "Feedback", href: "/feedback" },
    { name: "Blog", href: "/blog" },
    { name: "Changelog", href: "/changelog" },
    { name: "Roadmap", href: "/roadmap" },
  ];

  return (
    <nav>
      {/* Mobile Navigation */}
      <div className="flex md:hidden h-14 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {links.map(({ name, href }) => (
              <DropdownMenuItem key={name} asChild>
                <Link href={href}>{name}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex h-14 max-w-4xl w-full items-center">
        <div className="flex items-center gap-8">
          <ul className="flex gap-8 font-medium items-center">
            {links.map(({ name, href }) => (
              <li
                key={name}
                className="text-gray-500 dark:text-gray-300 font-regular text-sm hover:text-gray-800 dark:hover:text-gray-500"
              >
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-1 z-0 max-w-4xl w-full mx-auto">
      {/* Decorative top element */}
      <div className="fixed top-0 left-0 right-0 h-64 sm:h-52 -z-10 pointer-events-none select-none bg-muted border-b" />
      <UpdatesNavigation />
      <div>{children}</div>
    </div>
  );
}
