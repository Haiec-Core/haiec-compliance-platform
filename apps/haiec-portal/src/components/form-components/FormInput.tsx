import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ComponentPropsWithoutRef } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

type FormInputProps<TFieldValues extends FieldValues> = {
  id: string;
  label: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  description?: string;
  type?: string;
  inputProps?: Omit<
    ComponentPropsWithoutRef<typeof Input>,
    "id" | "name" | "type"
  >;
};

export function FormInput<TFieldValues extends FieldValues>({
  id,
  label,
  control,
  name,
  description,
  type,
  inputProps,
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <FormControl>
            <Input id={id} type={type} {...inputProps} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
