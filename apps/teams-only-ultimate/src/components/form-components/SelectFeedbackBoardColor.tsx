"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  FEEDBACK_BG_BOARD_COLORS,
  getFeedbackBoardColorClass,
} from "@/constants";
import { cn } from "@/utils/cn";
import { Check } from "lucide-react";
import { Control, FieldValues, Path } from "react-hook-form";

interface SelectFeedbackBoardColorProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  description?: string;
}

export function SelectFeedbackBoardColor<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
}: SelectFeedbackBoardColorProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="flex flex-wrap gap-2">
              {Object.entries(FEEDBACK_BG_BOARD_COLORS).map(([colorKey]) => (
                <button
                  key={colorKey}
                  type="button"
                  onClick={() => field.onChange(colorKey)}
                  className={cn(
                    "w-4 h-4 rounded-full flex items-center justify-center transition-all",
                    getFeedbackBoardColorClass(colorKey),
                    field.value === colorKey
                      ? "ring-2 ring-offset-2 ring-black dark:ring-white"
                      : "hover:ring-2 hover:ring-offset-2 hover:ring-gray-400",
                  )}
                >
                  {field.value === colorKey && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </button>
              ))}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
