import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex text-md p-3.5  px-10  font-bold items-center w-fit rounded-xl tracking-tight cursor-pointer hover:scale-105 duration-300 ease-out justify-center overflow-hidden whitespace-nowrap ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-[inset_0_-4px_0_0_rgba(0,0,0,.25)] h-fit min-h-10",
  {
    variants: {
      variant: {
        default: "bg-white text-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "text-white bg-black hover:bg-white hover:text-primary bg-transparent border-2 p-4 border-white",
        secondary:
          "bg-gray-800 mt-8 rounded-xl border p-4 outline outline-white text-white w-full hover:bg-white hover:text-primary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-fit min-h-10",
        sm: "h-9",
        lg: "my-4 w-full lg:py-4 lg:px-16 lg:text-lg h-[4rem] md:h-[7rem] text-2xl font-semibold",
        icon: "h-10 w-10 p-4 flex justify-center items-center text-black fill-black",
      },
      rounded: {
        default: "rounded-xl",
        sm: "rounded-md",
        lg: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
