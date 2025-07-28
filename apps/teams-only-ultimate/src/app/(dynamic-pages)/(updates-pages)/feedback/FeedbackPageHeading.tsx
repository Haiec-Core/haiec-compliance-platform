import { Link } from "@/components/intl-link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { T } from "@/components/ui/Typography";
import { cn } from "@/utils/cn";
import { MoreVertical } from "lucide-react";

interface FeedbackPageHeadingProps {
  title: string;
  subTitle?: string;
  actions?: React.ReactNode;
  titleHref?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  isLoading?: boolean;
  className?: string;
}

export function FeedbackPageHeading({
  title,
  subTitle,
  titleHref,
  actions,
  titleClassName,
  subTitleClassName,
  isLoading,
  className,
}: FeedbackPageHeadingProps) {
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
        "flex justify-between",
        isLoading ? "animate-pulse pointer-events-none" : "",
        className,
      )}
    >
      <div className="min-w-0 flex-1">{wrappedTitleElement}</div>
      {actions && (
        <div className="ml-4 shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                data-testid="feedback-heading-actions-trigger"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open actions menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {actions}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
