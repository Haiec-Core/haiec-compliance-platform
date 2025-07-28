import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@lib/utils";
import { Slot } from "@radix-ui/react-slot";

const typographyVariants = cva(
  "text-black dark:text-slate-100 font-semibold text-start w-fit h-fit",
  {
    variants: {
      variant: {
        h1: `pb-8 bg-gradient-to-br from-black  dark:from-white to-slate-300 bg-clip-text text-transparent tracking-tight font-semibold text-4xl/[1.3] md:text-5xl/[1.3] lg:text-6xl/[1.3] `,
        h2: `text-2xl/[1.3] bg-gradient-to-br from-black  dark:from-white to-slate-300 bg-clip-text text-transparent md:text-5xl/[1.3] leading-snug`,
        h3: ` font-medium leading-loose text-sm sm:text-base md:text-lg text-slate-700/90 dark:text-indigo-100/90`,
        h4: ` text-3xl font-semibold sm:text-4xl md:text-3xl tracking-tight`,
        h5: "scroll-m-20 text-lg font-semibold tracking-tight",
        h6: "scroll-m-20 text-base font-semibold tracking-tight",
        p: `font-normal leading-7`,
        blockquote: "mt-6 border-l-2 pl-6 italic",
        ul: "my-6 list-disc [&>li]:mt-2",
        inlineCode:
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        lead: "text-xl text-muted-foreground",
        largeText: "text-lg font-semibold",
        smallText:
          "text-lg tracking-tight text-center text-slate-800 dark:text-slate-400 drop-shadow",
        mutedText: "text-sm text-white/50",
        subheading: "text-base/6 font-light  md:text-xl/7 lg:text-2xl/8",
      },
    },
    defaultVariants: {
      variant: "p",
    },
  }
);

type VariantPropType = VariantProps<typeof typographyVariants>;

const variantElementMap: Record<
  NonNullable<VariantPropType["variant"]>,
  string
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  blockquote: "blockquote",
  inlineCode: "code",
  largeText: "div",
  smallText: "small",
  lead: "p",
  mutedText: "p",
  ul: "ul",
  subheading: "p",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
  as?: string;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : as ?? (variant ? variantElementMap[variant] : undefined) ?? "div";
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
