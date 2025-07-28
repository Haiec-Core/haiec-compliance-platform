import { Link } from "@/components/intl-link";
import { HashLink } from "./HashLink";

interface MdxLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children: React.ReactNode;
}

export function MdxLink({ children, href, ...props }: MdxLinkProps) {
  console.log("MdxLink", children, href, props);
  if (!href) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  const isTocLink = href.startsWith("#");
  if (isTocLink) {
    return (
      <HashLink href={href} {...props}>
        {children}
      </HashLink>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
