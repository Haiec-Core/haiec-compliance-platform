import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormCheckboxProps<TFieldValues extends FieldValues> {
  id: string;
  label: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  description?: string;
}

export function FormCheckbox<TFieldValues extends FieldValues>({
  id,
  label,
  control,
  name,
  description,
}: FormCheckboxProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              id={id}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel htmlFor={id}>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
        </FormItem>
      )}
    />
  );
}
