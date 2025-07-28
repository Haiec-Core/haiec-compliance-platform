import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormRadioGroupProps<TFieldValues extends FieldValues> {
  id: string;
  label: string;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  description?: string;
  options: { label: string; value: string }[];
}

export function FormRadioGroup<TFieldValues extends FieldValues>({
  id,
  label,
  control,
  name,
  description,
  options,
}: FormRadioGroupProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {options.map((option) => (
                <FormItem
                  className="flex items-center space-x-3 space-y-0"
                  key={option.value}
                >
                  <FormControl>
                    <RadioGroupItem
                      value={option.value}
                      id={`${id}-${option.value}`}
                    />
                  </FormControl>
                  <FormLabel htmlFor={`${id}-${option.value}`}>
                    {option.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
}
