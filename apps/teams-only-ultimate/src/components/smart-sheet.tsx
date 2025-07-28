"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import useMatchMedia from "@/hooks/useMatchMedia";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ReactNode } from "react";

type SheetProps = React.ComponentPropsWithoutRef<typeof Sheet>;

interface SmartSheetProps extends SheetProps {
  children: ReactNode;
  className?: string;
}

export function SmartSheet({ children, className, ...props }: SmartSheetProps) {
  const isMobile = useMatchMedia("(max-width: 768px)");
  const sheetDirection = isMobile ? "bottom" : "right";

  return (
    <Sheet {...props}>
      <SheetContent
        className={cn(
          isMobile ? "max-h-100svh" : "",
          !isMobile
            ? "w-[400px] sm:w-[540px] md:w-[640px] lg:w-[800px] xl:w-[1000px] max-w-none!"
            : "",
          "bg-muted",
          className,
        )}
        side={sheetDirection}
      >
        <VisuallyHidden>
          <SheetTitle></SheetTitle>
        </VisuallyHidden>
        <div
          className={cn(
            isMobile ? "overflow-y-auto pb-20" : "",
            !isMobile ? "max-h-full overflow-y-auto pb-20" : "",
          )}
          style={{
            maxHeight: isMobile ? "calc(100svh - 100px)" : undefined,
          }}
        >
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
