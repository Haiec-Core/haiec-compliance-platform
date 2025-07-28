import { Link } from "@/components/intl-link";
import { T } from "@/components/ui/Typography";
import { cn } from "@/utils/cn";

type PageHeadingProps = {
  title: string;
  subTitle?: string;
  actions?: React.ReactNode;
  titleHref?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  isLoading?: boolean;
  className?: string;
};

export function PageHeading({
  title,
  subTitle,
  titleHref,
  actions,
  titleClassName,
  subTitleClassName,
  isLoading,
  className,
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
  const subTitleElement = subTitle && (
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
        className,
      )}
    >
      <div className="min-w-0 flex-1">{wrappedTitleElement}</div>
      {actions && <div className="mt-4 md:mt-0 md:ml-4">{actions}</div>}
    </div>
  );
}
