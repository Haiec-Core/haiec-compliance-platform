import { T } from "@/components/ui/Typography";
import { cn } from "@/utils/cn";
import Link from 'next/link';

type PageHeadingProps = {
  title: string;
  subTitle?: string;
  actions?: React.ReactNode;
  titleHref?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  isLoading?: boolean;
};

export function PageHeading({
  title,
  subTitle,
  titleHref,
  actions,
  titleClassName,
  subTitleClassName,
  isLoading,
}: PageHeadingProps) {
  const titleElement = (
    <T.H2
      data-testid="page-heading-title"
      className={cn(
        "",
        titleClassName,
        isLoading ? "text-neutral-100 dark:text-neutral-800 text-4xl" : "",
      )}
    >
      {title}
    </T.H2>
  );
  const subTitleElement = (
    <T.P
      className={cn(
        "text-muted-foreground text-lg leading-6",
        subTitleClassName,
      )}
    >
      {subTitle}
    </T.P>
  );
  const wrappedTitleElement = titleHref ? (
    <Link href={titleHref}>{titleElement}</Link>
  ) : (
    <div className="max-w-4xl w-full">
      {titleElement}
      {subTitleElement}
    </div>
  );
  return (
    <div
      className={cn(
        "md:flex md:items-start md:justify-between",
        isLoading ? "animate-pulse pointer-events-none" : "",
      )}
    >
      <div className="min-w-0 flex-1">{wrappedTitleElement}</div>
      <div>{actions}</div>
    </div>
  );
}
