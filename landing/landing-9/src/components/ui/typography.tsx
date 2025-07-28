import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@lib/utils";
import { Slot } from "@radix-ui/react-slot";

const typographyVariants = cva("text-foreground w-fit h-fit", {
  variants: {
    variant: {
      h1: " text-4xl font-[var(--font-title)] md:text-5xl font-bold tracking-tight lg:text-7xl",
      h2: " font-bold font-[var(--font-title)] first:mt-0 text-center tracking-tight text-4xl md:text-5xl lg:text-6xl",
      h3: " text-4xl font-[var(--font-title)] font-bold tracking-tight",
      h4: " text-3xl font-[var(--font-title)] font-bold sm:text-4xl md:text-3xl tracking-tight",
      h5: " text-xl font-[var(--font-title)] font-bold tracking-tight",
      h6: " text-base font-[var(--font-title)] font-bold tracking-tight",
      p: "leading-7 font-[var(--font-body)] md:text-lg",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ul: "my-6 list-disc [&>li]:mt-2",
      inlineCode:
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      largeText: "text-lg font-semibold",
      smallText: "text-sm font-medium leading-none",
      mutedText: "text-sm text-muted-foreground",
      subheading: "text-base/6 font-light  md:text-xl/7 lg:text-2xl/8",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

type VariantPropType = VariantProps<typeof typographyVariants>;

const variantElementMap: Record<
  NonNullable<VariantPropType["variant"]>,
  string
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
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
