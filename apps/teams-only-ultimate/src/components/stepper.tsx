import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

interface Step {
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
}

interface StepperProps {
  steps: Step[];
  onStepChangeRequest?: (index: number) => void;
}

export function Stepper({ steps, onStepChangeRequest }: StepperProps) {
  return (
    <ol className="flex items-center w-full text-sm font-medium text-center text-muted-foreground sm:text-base">
      {steps.map((step, index) => (
        <React.Fragment key={step.name}>
          <li
            className={cn(
              "flex items-center",
              step.isActive
                ? "text-primary"
                : "text-muted-foreground opacity-50",
              onStepChangeRequest &&
                "cursor-pointer hover:text-primary transition-colors duration-200",
            )}
            onClick={() => onStepChangeRequest && onStepChangeRequest(index)}
          >
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 relative">
              {step.icon}
              {step.name}{" "}
              <span className="hidden sm:inline-flex sm:ms-2">Info</span>
            </span>
            {index < steps.length - 1 && (
              <Separator
                orientation="horizontal"
                className="hidden sm:block mx-6 xl:mx-10 w-[40px]"
              />
            )}
          </li>
        </React.Fragment>
      ))}
    </ol>
  );
}
